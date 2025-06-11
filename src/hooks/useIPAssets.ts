
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface IPAsset {
  id: string;
  title: string;
  description: string;
  ip_type: 'patent' | 'trademark' | 'copyright' | 'trade_secret';
  status: string;
  file_hash?: string;
  blockchain_proof?: string;
  registration_number?: string;
  filing_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

interface CreateIPAssetData {
  title: string;
  description: string;
  ip_type: 'patent' | 'trademark' | 'copyright' | 'trade_secret';
  file_hash?: string;
  registration_number?: string;
  filing_date?: string;
  expiry_date?: string;
}

export const useIPAssets = () => {
  const [assets, setAssets] = useState<IPAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAssets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ip_assets')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching IP assets:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch IP assets",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAsset = async (assetData: CreateIPAssetData) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ip_assets')
        .insert([{
          ...assetData,
          owner_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "IP asset created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating IP asset:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create IP asset",
      });
      throw error;
    }
  };

  const updateAsset = async (id: string, updates: Partial<IPAsset>) => {
    try {
      const { data, error } = await supabase
        .from('ip_assets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAssets(prev => prev.map(asset => 
        asset.id === id ? { ...asset, ...data } : asset
      ));

      toast({
        title: "Success",
        description: "IP asset updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating IP asset:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update IP asset",
      });
      throw error;
    }
  };

  const deleteAsset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ip_assets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAssets(prev => prev.filter(asset => asset.id !== id));
      toast({
        title: "Success",
        description: "IP asset deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting IP asset:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete IP asset",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user]);

  return {
    assets,
    loading,
    createAsset,
    updateAsset,
    deleteAsset,
    refetch: fetchAssets,
  };
};
