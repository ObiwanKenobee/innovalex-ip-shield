
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface LegalCase {
  id: string;
  client_id: string;
  assigned_lawyer_id?: string;
  ip_asset_id?: string;
  case_number: string;
  title: string;
  description: string;
  case_status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimated_value?: number;
  filing_date: string;
  resolution_date?: string;
  outcome?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

interface CreateLegalCaseData {
  title: string;
  description: string;
  ip_asset_id?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimated_value?: number;
}

export const useLegalCases = () => {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCases = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('legal_cases')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching legal cases:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch legal cases",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCase = async (caseData: CreateLegalCaseData) => {
    if (!user) return;

    try {
      const caseNumber = `LC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      
      const { data, error } = await supabase
        .from('legal_cases')
        .insert([{
          ...caseData,
          client_id: user.id,
          case_number: caseNumber,
        }])
        .select()
        .single();

      if (error) throw error;

      setCases(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Legal case created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating legal case:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create legal case",
      });
      throw error;
    }
  };

  const updateCase = async (id: string, updates: Partial<LegalCase>) => {
    try {
      const { data, error } = await supabase
        .from('legal_cases')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setCases(prev => prev.map(case_item => 
        case_item.id === id ? { ...case_item, ...data } : case_item
      ));

      toast({
        title: "Success",
        description: "Legal case updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating legal case:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update legal case",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCases();
  }, [user]);

  return {
    cases,
    loading,
    createCase,
    updateCase,
    refetch: fetchCases,
  };
};
