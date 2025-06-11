import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const Analytics = () => {
  // Mock analytics data
  const ipAssetTrends = [
    { month: 'Jan', patents: 4, trademarks: 2, copyrights: 3 },
    { month: 'Feb', patents: 6, trademarks: 3, copyrights: 4 },
    { month: 'Mar', patents: 8, trademarks: 5, copyrights: 6 },
    { month: 'Apr', patents: 10, trademarks: 7, copyrights: 8 },
    { month: 'May', patents: 12, trademarks: 9, copyrights: 10 },
    { month: 'Jun', patents: 15, trademarks: 11, copyrights: 12 },
  ];

  const threatDistribution = [
    { name: 'Patent Infringement', value: 45, color: '#ef4444' },
    { name: 'Trademark Violation', value: 30, color: '#f97316' },
    { name: 'Copyright Theft', value: 20, color: '#eab308' },
    { name: 'Trade Secret Breach', value: 5, color: '#22c55e' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive analytics for your IP portfolio and legal activities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threat Prevention</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Success rate this quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">
                Average alert response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <PieChart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$180K</div>
              <p className="text-xs text-muted-foreground">
                Saved in legal fees
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>IP Asset Growth</CardTitle>
              <CardDescription>
                Monthly registration trends by asset type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ipAssetTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patents" fill="#3b82f6" name="Patents" />
                  <Bar dataKey="trademarks" fill="#ef4444" name="Trademarks" />
                  <Bar dataKey="copyrights" fill="#10b981" name="Copyrights" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Threat Distribution</CardTitle>
              <CardDescription>
                Types of IP threats detected this quarter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={threatDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {threatDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance Reports</CardTitle>
            <CardDescription>
              AI-generated insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-900">Patent Portfolio Optimization</h4>
                <p className="text-sm text-gray-600 mt-1">
                  AI analysis suggests consolidating 3 overlapping patent applications to reduce maintenance costs by $45K annually.
                </p>
                <span className="text-xs text-blue-600">Generated 2 hours ago</span>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-900">Threat Mitigation Success</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Successfully prevented trademark infringement case through automated cease & desist, saving approximately $25K in legal fees.
                </p>
                <span className="text-xs text-green-600">Generated 1 day ago</span>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-orange-900">Market Expansion Opportunity</h4>
                <p className="text-sm text-gray-600 mt-1">
                  IP landscape analysis indicates potential for expanding AI technology patents in European markets with 73% success probability.
                </p>
                <span className="text-xs text-orange-600">Generated 3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
