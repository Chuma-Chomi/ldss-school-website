import { Users, BookOpen, FileText, LogOut, Calendar, TrendingUp, UserCheck, ClipboardList, Upload } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';

export const StaffDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const stats = [
        { label: 'My Classes', value: '5', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Students', value: '127', icon: Users, color: 'bg-green-100 text-green-600' },
        { label: 'Pending Tasks', value: '8', icon: ClipboardList, color: 'bg-orange-100 text-orange-600' },
        { label: 'Attendance Rate', value: '94%', icon: UserCheck, color: 'bg-purple-100 text-purple-600' }
    ];

    const recentClasses = [
        { class: 'Grade 10A - Mathematics', students: 32, time: 'Today, 08:00 AM' },
        { class: 'Grade 11B - Mathematics', students: 28, time: 'Today, 10:00 AM' },
        { class: 'Grade 12C - Pure Mathematics', students: 24, time: 'Today, 14:00 PM' }
    ];

    const pendingTasks = [
        { task: 'Submit Grade 10 test results', deadline: 'Due in 2 days', priority: 'high' },
        { task: 'Update attendance register', deadline: 'Due today', priority: 'urgent' },
        { task: 'Prepare Grade 11 lesson plan', deadline: 'Due in 1 week', priority: 'normal' }
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
                                <h1 className="text-lg font-bold text-gray-900">Staff Portal</h1>
                                <p className="text-xs text-gray-500">Lukulu Day Secondary School</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">Teacher</p>
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
                        Welcome, {user?.name}!
                    </h2>
                    <p className="text-gray-600">
                        Manage your classes, students, and academic records
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
                        <Card
                            className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                            onClick={() => navigate('/staff/attendance')}
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                <UserCheck className="w-6 h-6 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Take Attendance</CardTitle>
                            <CardDescription className="text-xs">Mark student attendance</CardDescription>
                        </Card>

                        <Card
                            className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                            onClick={() => navigate('/staff/grades')}
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                <TrendingUp className="w-6 h-6 text-blue-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Enter Grades</CardTitle>
                            <CardDescription className="text-xs">Record student results</CardDescription>
                        </Card>

                        <Card
                            className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                            onClick={() => navigate('/staff/students')}
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                <FileText className="w-6 h-6 text-purple-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">View Records</CardTitle>
                            <CardDescription className="text-xs">Access student data</CardDescription>
                        </Card>

                        <Card
                            className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                            onClick={() => navigate('/staff/resources/upload')}
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                <Upload className="w-6 h-6 text-orange-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Resources</CardTitle>
                            <CardDescription className="text-xs">Upload study materials</CardDescription>
                        </Card>
                    </div>
                </div>

                {/* Today's Classes & Pending Tasks */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                            Today's Classes
                        </h3>
                        <div className="space-y-4">
                            {recentClasses.map((classItem, index) => (
                                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{classItem.class}</p>
                                        <p className="text-xs text-gray-600">{classItem.students} students • {classItem.time}</p>
                                    </div>
                                    <BookOpen className="w-5 h-5 text-emerald-600" />
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4">View Full Schedule</Button>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-orange-600" />
                            Pending Tasks
                        </h3>
                        <div className="space-y-4">
                            {pendingTasks.map((task, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="text-sm font-semibold text-gray-900">{task.task}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                                'bg-gray-200 text-gray-700'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600">{task.deadline}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4">View All Tasks</Button>
                    </Card>
                </div>
            </main>
        </PageTransition>
    );
};
