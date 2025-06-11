
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
      // First get alerts for user's IP assets
      const { data: userAssets, error: assetsError } = await supabase
        .from('ip_assets')
        .select('id')
        .eq('owner_id', user.id);

      if (assetsError) throw assetsError;

      const assetIds = userAssets?.map(asset => asset.id) || [];

      if (assetIds.length === 0) {
        setAlerts([]);
        setLoading(false);
        return;
      }

      // Get alerts for those assets
      const { data: alertsData, error: alertsError } = await supabase
        .from('misinformation_alerts')
        .select('*')
        .in('ip_asset_id', assetIds)
        .order('created_at', { ascending: false });

      if (alertsError) throw alertsError;

      // Get IP asset titles separately
      const { data: assetsWithTitles, error: titleError } = await supabase
        .from('ip_assets')
        .select('id, title')
        .in('id', assetIds);

      if (titleError) throw titleError;

      // Map alerts with IP asset titles
      const formattedAlerts = alertsData?.map(alert => {
        const asset = assetsWithTitles?.find(a => a.id === alert.ip_asset_id);
        return {
          ...alert,
          ip_asset_title: asset?.title || 'Unknown Asset'
        };
      }) || [];
      
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
