import { BookOpen, FileText, LogOut, Calendar, Trophy, BarChart3, Download, Clock } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';

export const LearnerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const studentInfo = {
        grade: 'Grade 11',
        studentId: 'LDSS/2024/0542',
        class: '11B',
        pathway: 'Science'
    };

    const stats = [
        { label: 'Overall Average', value: '78%', icon: BarChart3, color: 'bg-blue-100 text-blue-600' },
        { label: 'Attendance', value: '96%', icon: Calendar, color: 'bg-green-100 text-green-600' },
        { label: 'Subjects', value: '9', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
        { label: 'Rank', value: '5th', icon: Trophy, color: 'bg-yellow-100 text-yellow-600' }
    ];

    const recentResults = [
        { subject: 'Mathematics', grade: 'A', percentage: 85, color: 'text-green-600' },
        { subject: 'Physics', grade: 'B+', percentage: 78, color: 'text-blue-600' },
        { subject: 'Chemistry', grade: 'A-', percentage: 82, color: 'text-emerald-600' },
        { subject: 'Biology', grade: 'B', percentage: 75, color: 'text-cyan-600' },
        { subject: 'English', grade: 'B+', percentage: 76, color: 'text-indigo-600' }
    ];

    const upcomingTests = [
        { subject: 'Chemistry', date: 'January 15, 2026', type: 'Test' },
        { subject: 'Mathematics', date: 'January 18, 2026', type: 'Quiz' },
        { subject: 'Physics', date: 'January 22, 2026', type: 'Test' }
    ];

    const resources = [
        { title: 'Mathematics Past Papers', type: 'PDF', size: '2.4 MB' },
        { title: 'Chemistry Revision Notes', type: 'PDF', size: '1.8 MB' },
        { title: 'Physics Practical Guide', type: 'PDF', size: '3.2 MB' }
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
                                <h1 className="text-lg font-bold text-gray-900">Learner Portal</h1>
                                <p className="text-xs text-gray-500">Lukulu Day Secondary School</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">{studentInfo.grade} • {studentInfo.class}</p>
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
                        Student ID: {studentInfo.studentId} • {studentInfo.pathway} Pathway
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
                            onClick={() => navigate('/learner/results')}
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                <FileText className="w-6 h-6 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">View Results</CardTitle>
                            <CardDescription className="text-xs">Check your grades</CardDescription>
                        </Card>

                        <Card className="p-6 hover:shadow-lg cursor-pointer transition-all group">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                <Calendar className="w-6 h-6 text-blue-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Timetable</CardTitle>
                            <CardDescription className="text-xs">View class schedule</CardDescription>
                        </Card>

                        <Card
                            className="p-6 hover:shadow-lg cursor-pointer transition-all group"
                            onClick={() => navigate('/learner/resources')}
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                <BookOpen className="w-6 h-6 text-purple-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Resources</CardTitle>
                            <CardDescription className="text-xs">Study materials</CardDescription>
                        </Card>

                        <Card className="p-6 hover:shadow-lg cursor-pointer transition-all group">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                <Trophy className="w-6 h-6 text-orange-800" />
                            </div>
                            <CardTitle className="mb-2 text-base">Achievements</CardTitle>
                            <CardDescription className="text-xs">View awards</CardDescription>
                        </Card>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Recent Results */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                            Recent Test Results
                        </h3>
                        <div className="space-y-3">
                            {recentResults.map((result, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">{result.subject}</p>
                                        <p className="text-xs text-gray-600">{result.percentage}%</p>
                                    </div>
                                    <span className={`text-lg font-bold ${result.color}`}>
                                        {result.grade}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4" onClick={() => navigate('/learner/results')}>View All Results</Button>
                    </Card>

                    {/* Upcoming Tests */}
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            Upcoming Assessments
                        </h3>
                        <div className="space-y-3">
                            {upcomingTests.map((test, index) => (
                                <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{test.subject}</p>
                                            <p className="text-xs text-gray-600 mt-1">{test.date}</p>
                                        </div>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                            {test.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4">View Full Calendar</Button>
                    </Card>
                </div>

                {/* Study Resources */}
                <Card className="p-6 mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        Study Resources
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {resources.map((resource, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between mb-2">
                                    <FileText className="w-8 h-8 text-purple-600" />
                                    <Download className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                                </div>
                                <p className="text-sm font-semibold text-gray-900 mb-1">{resource.title}</p>
                                <p className="text-xs text-gray-600">{resource.type} • {resource.size}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4">Browse All Resources</Button>
                </Card>
            </main>
        </PageTransition>
    );
};
