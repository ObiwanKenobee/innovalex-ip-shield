
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreateDocumentForm } from '@/components/documents/CreateDocumentForm';
import { useDocuments } from '@/hooks/useDocuments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, Download, Plus, Bot, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Documents = () => {
  const { documents, loading } = useDocuments();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'nda':
        return 'bg-blue-100 text-blue-800';
      case 'cease_desist':
        return 'bg-red-100 text-red-800';
      case 'dmca':
        return 'bg-purple-100 text-purple-800';
      case 'license':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'nda':
        return 'NDA';
      case 'cease_desist':
        return 'Cease & Desist';
      case 'dmca':
        return 'DMCA';
      case 'license':
        return 'License';
      case 'contract':
        return 'Contract';
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Documents</h1>
            <p className="text-gray-600 mt-2">
              AI-generated legal documents and templates
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Bot className="h-4 w-4 mr-2" />
              AI Generator
            </Button>
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create New Document</DialogTitle>
                  <DialogDescription>
                    Create a new legal document in your system
                  </DialogDescription>
                </DialogHeader>
                <CreateDocumentForm onSuccess={() => setShowCreateForm(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading documents...</span>
          </div>
        ) : documents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
              <p className="text-gray-600 text-center max-w-md mb-4">
                Start creating legal documents with our AI-powered generator.
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Bot className="h-4 w-4 mr-2" />
                Generate First Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <Badge className={getDocumentTypeColor(document.document_type)}>
                        {getDocumentTypeName(document.document_type)}
                      </Badge>
                    </div>
                    {document.ai_generated && (
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        <Bot className="h-3 w-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Created: {new Date(document.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-600" />
                        <span className={document.lawyer_approved ? 'text-green-600' : 'text-yellow-600'}>
                          {document.lawyer_approved ? 'Lawyer Approved' : 'Pending Review'}
                        </span>
                      </div>
                    </div>
                    
                    {document.signature_required && (
                      <div className="text-sm">
                        <span className={document.signed_at ? 'text-green-600' : 'text-orange-600'}>
                          {document.signed_at ? 'Signed' : 'Signature Required'}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm">
                          View
                        </Button>
                      </div>
                    </div>
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

export default Documents;
