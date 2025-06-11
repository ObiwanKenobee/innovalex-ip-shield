
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Scale, FileText, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useIPAssets } from '@/hooks/useIPAssets';
import { useLegalCases } from '@/hooks/useLegalCases';
import { useDocuments } from '@/hooks/useDocuments';
import { useMisinformationAlerts } from '@/hooks/useMisinformationAlerts';

export const DashboardOverview = () => {
  const { assets } = useIPAssets();
  const { cases } = useLegalCases();
  const { documents } = useDocuments();
  const { alerts } = useMisinformationAlerts();

  const stats = [
    {
      title: 'IP Assets Protected',
      value: assets.length.toString(),
      description: 'Active intellectual property assets',
      icon: Shield,
      trend: `${assets.filter(a => a.status === 'active').length} active`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Legal Cases',
      value: cases.filter(c => c.case_status === 'in_progress' || c.case_status === 'open').length.toString(),
      description: 'Cases in progress',
      icon: Scale,
      trend: `${cases.filter(c => c.case_status === 'open').length} new`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Documents Generated',
      value: documents.length.toString(),
      description: 'AI-generated legal documents',
      icon: FileText,
      trend: `${documents.filter(d => d.ai_generated).length} AI-created`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Threats Detected',
      value: alerts.length.toString(),
      description: 'Misinformation alerts',
      icon: AlertTriangle,
      trend: `${alerts.filter(a => a.status === 'resolved').length} resolved`,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentActivity = [
    {
      action: 'New IP asset registered',
      details: assets.length > 0 ? assets[0]?.title || 'Recent IP asset' : 'AI-powered legal document analysis system',
      time: assets.length > 0 ? new Date(assets[0]?.created_at).toLocaleTimeString() : '2 hours ago',
      type: 'success',
    },
    {
      action: 'Misinformation threat detected',
      details: alerts.length > 0 ? `${alerts[0]?.threat_level} threat detected` : 'Unauthorized use of trademark detected on social media',
      time: alerts.length > 0 ? new Date(alerts[0]?.created_at).toLocaleTimeString() : '4 hours ago',
      type: 'warning',
    },
    {
      action: 'Legal case updated',
      details: cases.length > 0 ? cases[0]?.title || 'Recent case update' : 'Copyright infringement case - preliminary response filed',
      time: cases.length > 0 ? new Date(cases[0]?.created_at).toLocaleTimeString() : '1 day ago',
      type: 'info',
    },
    {
      action: 'Document generated',
      details: documents.length > 0 ? documents[0]?.title || 'Recent document' : 'Confidentiality agreement for partnership discussion',
      time: documents.length > 0 ? new Date(documents[0]?.created_at).toLocaleTimeString() : '2 days ago',
      type: 'success',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your AI-powered legal defense command center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  {stat.description}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your legal defense system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Defense Status</CardTitle>
            <CardDescription>
              Real-time monitoring and protection overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Monitoring Status</span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Threat Detection</span>
                <span className="flex items-center text-sm text-blue-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Scanning
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Legal Assistant</span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Document Pipeline</span>
                <span className="flex items-center text-sm text-yellow-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Processing {documents.filter(d => !d.lawyer_approved).length} docs
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
