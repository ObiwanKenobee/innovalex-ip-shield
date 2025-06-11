
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Mail, Phone, Plus, UserCheck } from 'lucide-react';

const Team = () => {
  // Mock team data
  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'IP Attorney',
      email: 'sarah.johnson@innovalex.ai',
      phone: '+1 (555) 123-4567',
      status: 'active',
      specialization: 'Patent Law',
      cases: 12,
      avatar: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Legal Researcher',
      email: 'michael.chen@innovalex.ai',
      phone: '+1 (555) 234-5678',
      status: 'active',
      specialization: 'Copyright Law',
      cases: 8,
      avatar: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Paralegal',
      email: 'emily.rodriguez@innovalex.ai',
      phone: '+1 (555) 345-6789',
      status: 'active',
      specialization: 'Document Preparation',
      cases: 15,
      avatar: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'David Park',
      role: 'AI Legal Analyst',
      email: 'david.park@innovalex.ai',
      phone: '+1 (555) 456-7890',
      status: 'active',
      specialization: 'AI & Technology Law',
      cases: 6,
      avatar: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-2">
              Manage your legal team and collaborate on cases
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite Team Member
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.reduce((sum, member) => sum + member.cases, 0)}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Load</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(teamMembers.reduce((sum, member) => sum + member.cases, 0) / teamMembers.length)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Specializations</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
                <UserCheck className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">Specialization</p>
                    <p className="text-sm text-gray-600">{member.specialization}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Active Cases:</span>
                    <span className="font-semibold text-gray-900">{member.cases}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Message
                      </Button>
                      <Button size="sm" className="flex-1">
                        Assign Case
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Collaboration */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Collaborations</CardTitle>
            <CardDescription>
              Team activities and case assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Johnson assigned to Patent Case #LC-2024-003</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Michael Chen completed research for Trademark Case #LC-2024-002</p>
                  <p className="text-xs text-gray-600">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Emily Rodriguez prepared NDA documents for client review</p>
                  <p className="text-xs text-gray-600">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Team;
