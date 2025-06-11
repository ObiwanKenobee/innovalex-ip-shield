
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, Calendar, DollarSign, Plus, AlertTriangle } from 'lucide-react';

const LegalCases = () => {
  // Mock data - replace with real data from Supabase
  const cases = [
    {
      id: '1',
      case_number: 'LC-2024-001',
      title: 'Patent Infringement Case - AI Technology',
      description: 'Unauthorized use of our AI patent by competitor XYZ Corp',
      case_status: 'in_progress',
      priority: 'high',
      estimated_value: 500000,
      filing_date: '2024-01-15',
      client_name: 'InnovaTech Solutions'
    },
    {
      id: '2',
      case_number: 'LC-2024-002',
      title: 'Trademark Dispute - Brand Logo',
      description: 'Competitor using similar trademark causing confusion',
      case_status: 'open',
      priority: 'medium',
      estimated_value: 150000,
      filing_date: '2024-02-01',
      client_name: 'Creative Brands Inc'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
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
            <h1 className="text-3xl font-bold text-gray-900">Legal Cases</h1>
            <p className="text-gray-600 mt-2">
              Manage active legal proceedings and case status
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases.map((case_item) => (
            <Card key={case_item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Scale className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{case_item.case_number}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(case_item.case_status)}>
                      {case_item.case_status.replace('_', ' ')}
                    </Badge>
                    <Badge className={getPriorityColor(case_item.priority)}>
                      {case_item.priority}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{case_item.title}</CardTitle>
                <CardDescription>
                  {case_item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Filed: {new Date(case_item.filing_date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Est. Value: ${case_item.estimated_value.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>Client: {case_item.client_name}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {cases.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Scale className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Cases</h3>
              <p className="text-gray-600 text-center max-w-md mb-4">
                You don't have any active legal cases at the moment.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create First Case
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LegalCases;
