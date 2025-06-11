
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIPAssets } from '@/hooks/useIPAssets';

interface CreateIPAssetFormProps {
  onSuccess?: () => void;
}

export const CreateIPAssetForm: React.FC<CreateIPAssetFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ip_type: '' as 'patent' | 'trademark' | 'copyright' | 'trade_secret' | '',
    registration_number: '',
    filing_date: '',
    expiry_date: '',
  });
  const [loading, setLoading] = useState(false);
  const { createAsset } = useIPAssets();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ip_type) return;

    setLoading(true);
    try {
      await createAsset({
        title: formData.title,
        description: formData.description,
        ip_type: formData.ip_type,
        registration_number: formData.registration_number || undefined,
        filing_date: formData.filing_date || undefined,
        expiry_date: formData.expiry_date || undefined,
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        ip_type: '',
        registration_number: '',
        filing_date: '',
        expiry_date: '',
      });
      
      onSuccess?.();
    } catch (error) {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New IP Asset</CardTitle>
        <CardDescription>
          Add a new intellectual property asset to your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter IP asset title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ip_type">Type *</Label>
              <Select
                value={formData.ip_type}
                onValueChange={(value: 'patent' | 'trademark' | 'copyright' | 'trade_secret') => 
                  setFormData(prev => ({ ...prev, ip_type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select IP type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patent">Patent</SelectItem>
                  <SelectItem value="trademark">Trademark</SelectItem>
                  <SelectItem value="copyright">Copyright</SelectItem>
                  <SelectItem value="trade_secret">Trade Secret</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your intellectual property..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registration_number">Registration Number</Label>
              <Input
                id="registration_number"
                value={formData.registration_number}
                onChange={(e) => setFormData(prev => ({ ...prev, registration_number: e.target.value }))}
                placeholder="e.g., US1234567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filing_date">Filing Date</Label>
              <Input
                id="filing_date"
                type="date"
                value={formData.filing_date}
                onChange={(e) => setFormData(prev => ({ ...prev, filing_date: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading || !formData.title || !formData.ip_type}>
            {loading ? 'Creating...' : 'Create IP Asset'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
