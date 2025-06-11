
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Scale, FileText, AlertTriangle, TrendingUp, Users } from 'lucide-react';

export const DashboardOverview = () => {
  const stats = [
    {
      title: 'IP Assets Protected',
      value: '24',
      description: 'Active intellectual property assets',
      icon: Shield,
      trend: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Legal Cases',
      value: '3',
      description: 'Cases in progress',
      icon: Scale,
      trend: '+2 this month',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Documents Generated',
      value: '156',
      description: 'AI-generated legal documents',
      icon: FileText,
      trend: '+34 this week',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Threats Detected',
      value: '7',
      description: 'Misinformation alerts resolved',
      icon: AlertTriangle,
      trend: '-2 from last week',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const recentActivity = [
    {
      action: 'New patent application filed',
      details: 'AI-powered legal document analysis system',
      time: '2 hours ago',
      type: 'success',
    },
    {
      action: 'Misinformation threat detected',
      details: 'Unauthorized use of trademark detected on social media',
      time: '4 hours ago',
      type: 'warning',
    },
    {
      action: 'Legal case updated',
      details: 'Copyright infringement case - preliminary response filed',
      time: '1 day ago',
      type: 'info',
    },
    {
      action: 'NDA generated and sent',
      details: 'Confidentiality agreement for partnership discussion',
      time: '2 days ago',
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
                  Processing 3 docs
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
