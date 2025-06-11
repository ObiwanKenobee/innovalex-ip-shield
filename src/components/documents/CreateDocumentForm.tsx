
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useDocuments } from '@/hooks/useDocuments';
import { useLegalCases } from '@/hooks/useLegalCases';
import { useIPAssets } from '@/hooks/useIPAssets';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  document_type: z.enum(['nda', 'cease_desist', 'dmca', 'license', 'contract']),
  content: z.string().optional(),
  case_id: z.string().optional(),
  ip_asset_id: z.string().optional(),
  signature_required: z.boolean().default(false),
  ai_generated: z.boolean().default(false),
});

interface CreateDocumentFormProps {
  onSuccess?: () => void;
}

export const CreateDocumentForm: React.FC<CreateDocumentFormProps> = ({ onSuccess }) => {
  const { createDocument } = useDocuments();
  const { cases } = useLegalCases();
  const { assets } = useIPAssets();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      signature_required: false,
      ai_generated: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createDocument(values);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter document title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nda">NDA</SelectItem>
                  <SelectItem value="cease_desist">Cease & Desist</SelectItem>
                  <SelectItem value="dmca">DMCA</SelectItem>
                  <SelectItem value="license">License</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter document content..."
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="case_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Case (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select case..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cases.map((case_item) => (
                      <SelectItem key={case_item.id} value={case_item.id}>
                        {case_item.case_number} - {case_item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ip_asset_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related IP Asset (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select IP asset..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="signature_required"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Signature Required</FormLabel>
                  <div className="text-sm text-gray-600">
                    Document requires electronic signature
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ai_generated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">AI Generated</FormLabel>
                  <div className="text-sm text-gray-600">
                    Document created using AI
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Document
        </Button>
      </form>
    </Form>
  );
};
