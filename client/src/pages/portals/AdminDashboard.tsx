import { Users, BookOpen, GraduationCap, Settings, LogOut, BarChart3, UserPlus, FileText } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';

export const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const stats = [
        { label: 'Total Students', value: '542', icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Staff', value: '32', icon: Users, color: 'bg-green-100 text-green-600' },
        { label: 'Active Classes', value: '18', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
        { label: 'Departments', value: '6', icon: BarChart3, color: 'bg-orange-100 text-orange-600' }
    ];

    const quickActions = [
        { title: 'Manage Users', description: 'Add, edit, or remove users', icon: UserPlus, action: () => navigate('/admin/users') },
        { title: 'View Reports', description: 'Access system analytics', icon: BarChart3, action: () => { } },
        { title: 'System Settings', description: 'Configure school settings', icon: Settings, action: () => { } },
        { title: 'Academic Records', description: 'Manage student records', icon: FileText, action: () => { } }
    ];

    return (
        <PageTransition className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="LDSS Logo" className="w-10 h-10 object-contain" />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
                                <p className="text-xs text-gray-500">Lukulu Day Secondary School</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.name}!
                    </h2>
                    <p className="text-gray-600">
                        Here's an overview of your school management system
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index} className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <Card
                                    key={index}
                                    className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                                    onClick={action.action}
                                >
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                        <Icon className="w-6 h-6 text-emerald-800" />
                                    </div>
                                    <CardTitle className="mb-2 text-base">{action.title}</CardTitle>
                                    <CardDescription className="text-xs">{action.description}</CardDescription>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity & Notifications */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[
                                { action: 'New student registered', time: '2 hours ago', user: 'Admin' },
                                { action: 'Grade 12 results uploaded', time: '5 hours ago', user: 'Mr. Mwale' },
                                { action: 'Staff member added', time: '1 day ago', user: 'Admin' },
                                { action: 'System backup completed', time: '2 days ago', user: 'System' }
                            ].map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-900">{activity.action}</p>
                                        <p className="text-xs text-gray-500">{activity.time} by {activity.user}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4">View All Activity</Button>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Notifications</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Term 1 Starting Soon', desc: 'Prepare for new academic year', type: 'info' },
                                { title: 'Fee Payment Reminder', desc: '23 students pending payment', type: 'warning' },
                                { title: 'System Update Available', desc: 'Version 2.1.0 ready', type: 'success' }
                            ].map((notification, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">{notification.title}</p>
                                    <p className="text-xs text-gray-600">{notification.desc}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4">View All Notifications</Button>
                    </Card>
                </div>
            </main>
        </PageTransition>
    );
};
