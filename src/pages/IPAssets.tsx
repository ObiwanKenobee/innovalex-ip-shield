
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreateIPAssetForm } from '@/components/ip-assets/CreateIPAssetForm';
import { useIPAssets } from '@/hooks/useIPAssets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Calendar, Hash, Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const IPAssets = () => {
  const { assets, loading } = useIPAssets();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getIPTypeIcon = (type: string) => {
    switch (type) {
      case 'patent':
        return <Shield className="h-4 w-4" />;
      case 'trademark':
        return <Hash className="h-4 w-4" />;
      case 'copyright':
        return <FileText className="h-4 w-4" />;
      case 'trade_secret':
        return <Shield className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">IP Assets</h1>
            <p className="text-gray-600 mt-2">
              Manage and protect your intellectual property portfolio
            </p>
          </div>
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add IP Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New IP Asset</DialogTitle>
                <DialogDescription>
                  Register a new intellectual property asset in your portfolio
                </DialogDescription>
              </DialogHeader>
              <CreateIPAssetForm onSuccess={() => setShowCreateForm(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Assets Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading IP assets...</span>
          </div>
        ) : assets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No IP Assets Yet</h3>
              <p className="text-gray-600 text-center max-w-md mb-4">
                Start building your intellectual property portfolio by registering your first asset.
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First IP Asset
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getIPTypeIcon(asset.ip_type)}
                      <CardTitle className="text-lg">{asset.title}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {asset.description || 'No description provided'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Hash className="h-4 w-4 mr-2" />
                      <span className="capitalize">{asset.ip_type.replace('_', ' ')}</span>
                    </div>
                    
                    {asset.registration_number && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Reg: {asset.registration_number}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Created: {new Date(asset.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    {asset.expiry_date && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Expires: {new Date(asset.expiry_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IPAssets;
