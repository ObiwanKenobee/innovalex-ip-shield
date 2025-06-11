
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface LegalDocument {
  id: string;
  case_id?: string;
  ip_asset_id?: string;
  creator_id: string;
  document_type: 'nda' | 'cease_desist' | 'dmca' | 'license' | 'contract';
  title: string;
  content?: string;
  template_id?: string;
  ai_generated: boolean;
  lawyer_approved: boolean;
  approved_by?: string;
  file_url?: string;
  signature_required: boolean;
  signed_at?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

interface CreateDocumentData {
  title: string;
  document_type: 'nda' | 'cease_desist' | 'dmca' | 'license' | 'contract';
  content?: string;
  case_id?: string;
  ip_asset_id?: string;
  signature_required?: boolean;
  ai_generated?: boolean;
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('legal_documents')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch documents",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDocument = async (documentData: CreateDocumentData) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('legal_documents')
        .insert([{
          ...documentData,
          creator_id: user.id,
          ai_generated: documentData.ai_generated || false,
          signature_required: documentData.signature_required || false,
        }])
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Document created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create document",
      });
      throw error;
    }
  };

  const updateDocument = async (id: string, updates: Partial<LegalDocument>) => {
    try {
      const { data, error } = await supabase
        .from('legal_documents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, ...data } : doc
      ));

      toast({
        title: "Success",
        description: "Document updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating document:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update document",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  return {
    documents,
    loading,
    createDocument,
    updateDocument,
    refetch: fetchDocuments,
  };
};
