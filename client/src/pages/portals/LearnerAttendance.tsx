import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AttendanceRecord {
    id: string;
    date: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
}

interface AttendanceStats {
    total: number;
    present: number;
    rate: number;
}

export const LearnerAttendance = () => {
    const { token, user } = useAuth();
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [stats, setStats] = useState<AttendanceStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const res = await fetch('/api/attendance/my-stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setRecords(data.records);
                setStats(data.stats);
            } else {
                setError('Failed to load attendance records');
            }
        } catch (e) {
            setError('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PRESENT': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'ABSENT': return <XCircle className="w-5 h-5 text-red-500" />;
            case 'LATE': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'EXCUSED': return <CheckCircle className="w-5 h-5 text-blue-500" />;
            default: return null;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PRESENT': return 'Present';
            case 'ABSENT': return 'Absent';
            case 'LATE': return 'Late';
            case 'EXCUSED': return 'Excused';
            default: return status;
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading attendance...</div>;

    if (error) return (
        <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
            <Card className="max-w-md w-full p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Link to="/learner"><Button>Back to Dashboard</Button></Link>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/learner">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
                            <p className="text-gray-500">Track your school attendance record</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Overall Rate</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.rate || 0}%</h3>
                        </div>
                    </Card>
                    <Card className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Days Present</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.present || 0}</h3>
                        </div>
                    </Card>
                    <Card className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total School Days</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats?.total || 0}</h3>
                        </div>
                    </Card>
                </div>

                {/* History List */}
                <Card className="overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                        Attendance History
                    </div>
                    <div className="divide-y divide-gray-100">
                        {records.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No attendance records found.</div>
                        ) : (
                            records.map(record => (
                                <div key={record.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 p-2 rounded text-center min-w-[3rem]">
                                            <div className="text-xs text-gray-500 uppercase">{new Date(record.date).toLocaleString('default', { month: 'short' })}</div>
                                            <div className="text-lg font-bold text-gray-900">{new Date(record.date).getDate()}</div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{new Date(record.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500">{new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${record.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                                            record.status === 'ABSENT' ? 'bg-red-100 text-red-700' :
                                                record.status === 'LATE' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100'
                                        }`}>
                                        {getStatusIcon(record.status)}
                                        {getStatusText(record.status)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};
