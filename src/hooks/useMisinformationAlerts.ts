
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface MisinformationAlert {
  id: string;
  ip_asset_id: string;
  source_url: string;
  content_snippet?: string;
  threat_level: 'low' | 'medium' | 'high' | 'critical';
  ai_confidence?: number;
  status: string;
  response_action?: string;
  resolved_at?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  ip_asset_title?: string;
}

export const useMisinformationAlerts = () => {
  const [alerts, setAlerts] = useState<MisinformationAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAlerts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('misinformation_alerts')
        .select(`
          *,
          ip_assets!inner(title, owner_id)
        `)
        .eq('ip_assets.owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedAlerts = data?.map(alert => ({
        ...alert,
        ip_asset_title: alert.ip_assets?.title || 'Unknown Asset'
      })) || [];
      
      setAlerts(formattedAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch misinformation alerts",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAlert = async (id: string, updates: Partial<MisinformationAlert>) => {
    try {
      const { data, error } = await supabase
        .from('misinformation_alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, ...data } : alert
      ));

      toast({
        title: "Success",
        description: "Alert updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update alert",
      });
      throw error;
    }
  };

  const resolveAlert = async (id: string, responseAction: string) => {
    return updateAlert(id, {
      status: 'resolved',
      response_action: responseAction,
      resolved_at: new Date().toISOString(),
    });
  };

  useEffect(() => {
    fetchAlerts();
  }, [user]);

  return {
    alerts,
    loading,
    updateAlert,
    resolveAlert,
    refetch: fetchAlerts,
  };
};
