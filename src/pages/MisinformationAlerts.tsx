
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useMisinformationAlerts } from '@/hooks/useMisinformationAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, ExternalLink, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

const MisinformationAlerts = () => {
  const { alerts, loading, resolveAlert } = useMisinformationAlerts();

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'investigating':
        return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      await resolveAlert(alertId, 'Manual resolution - threat addressed');
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Misinformation Alerts</h1>
            <p className="text-gray-600 mt-2">
              AI-powered monitoring for unauthorized use and misinformation
            </p>
          </div>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Run New Scan
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {alerts.filter(a => a.threat_level === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {alerts.length > 0 ? Math.round(alerts.reduce((sum, a) => sum + (a.ai_confidence || 0), 0) / alerts.length * 100) : 0}%
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading alerts...</span>
          </div>
        ) : alerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Alerts Found</h3>
              <p className="text-gray-600 text-center max-w-md mb-4">
                Our AI monitoring system hasn't detected any threats to your IP assets.
              </p>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Run Manual Scan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <CardTitle className="text-lg">{alert.ip_asset_title}</CardTitle>
                        <CardDescription>
                          Detected on: {new URL(alert.source_url).hostname}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getThreatLevelColor(alert.threat_level)}>
                        {alert.threat_level} threat
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alert.content_snippet && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 italic">
                          "{alert.content_snippet}"
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Detected: {new Date(alert.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      {alert.ai_confidence && (
                        <div className="flex items-center text-gray-600">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>AI Confidence: {Math.round(alert.ai_confidence * 100)}%</span>
                        </div>
                      )}
                      
                      {alert.resolved_at && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span>Resolved: {new Date(alert.resolved_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {alert.response_action && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Action Taken:</strong> {alert.response_action}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Source
                      </Button>
                      <div className="flex space-x-2">
                        {alert.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                            <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                              Resolve
                            </Button>
                          </>
                        )}
                        {alert.status === 'investigating' && (
                          <Button size="sm" onClick={() => handleResolveAlert(alert.id)}>
                            Mark Resolved
                          </Button>
                        )}
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

export default MisinformationAlerts;
