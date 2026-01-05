import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Check, X, Clock, HelpCircle } from 'lucide-react';

interface ClassItem {
    id: string;
    name: string;
}

interface AttendanceRecord {
    id: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    date: string;
}

interface Student {
    id: string;
    admissionNo: string;
    user: { name: string };
    attendance: AttendanceRecord[];
    currentStatus?: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'; // Local state
}

export const TakeAttendance = () => {
    const { token } = useAuth();

    // State
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass && selectedDate) {
            fetchStudents();
        } else {
            setStudents([]);
        }
    }, [selectedClass, selectedDate]);

    const fetchClasses = async () => {
        try {
            const res = await fetch('/api/classes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setClasses(await res.json());
        } catch (e) {
            console.error(e);
        }
    };

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/attendance/class/${selectedClass}?date=${selectedDate}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data: Student[] = await res.json();

                // Set initial status from DB or default to nothing (or could default to PRESENT)
                const studentsWithStatus = data.map(s => ({
                    ...s,
                    currentStatus: s.attendance.length > 0 ? s.attendance[0].status : undefined
                }));

                setStudents(studentsWithStatus);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const setStatus = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED') => {
        setStudents(prev => prev.map(s =>
            s.id === studentId ? { ...s, currentStatus: status } : s
        ));
    };

    const markAllPresent = () => {
        setStudents(prev => prev.map(s => ({ ...s, currentStatus: 'PRESENT' })));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const recordsPayload = students
            .filter(s => s.currentStatus)
            .map(s => ({
                studentId: s.id,
                status: s.currentStatus
            }));

        if (recordsPayload.length === 0) {
            alert('No attendance marked to save');
            setIsSaving(false);
            return;
        }

        try {
            const res = await fetch('/api/attendance/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    classId: selectedClass,
                    date: selectedDate,
                    records: recordsPayload
                })
            });

            if (res.ok) {
                alert('Attendance saved successfully!');
            } else {
                alert('Failed to save attendance');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving attendance');
        } finally {
            setIsSaving(false);
        }
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'PRESENT': return 'bg-green-100 text-green-700 border-green-200';
            case 'ABSENT': return 'bg-red-100 text-red-700 border-red-200';
            case 'LATE': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'EXCUSED': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-50 text-gray-400 border-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/staff">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Class Attendance</h1>
                            <p className="text-gray-500">Record daily attendance</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {students.length > 0 && selectedClass && (
                            <Button variant="outline" onClick={markAllPresent}>
                                Mark All Present
                            </Button>
                        )}
                        <Button onClick={handleSave} disabled={isSaving || !selectedClass}>
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? 'Saving...' : 'Save Attendance'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-4 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={selectedClass}
                                onChange={e => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class...</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded-md"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </Card>
                </div>

                <Card className="overflow-hidden">
                    {!selectedClass ? (
                        <div className="p-12 text-center text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <p>Please select a class to take attendance.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4">Admission No</th>
                                        <th className="p-4">Student Name</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoading ? (
                                        <tr><td colSpan={4} className="p-8 text-center">Loading students...</td></tr>
                                    ) : students.length === 0 ? (
                                        <tr><td colSpan={4} className="p-8 text-center text-red-500">No students found in this class.</td></tr>
                                    ) : (
                                        students.map(student => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="p-4 text-sm font-mono text-gray-600">{student.admissionNo}</td>
                                                <td className="p-4 font-medium">{student.user.name}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(student.currentStatus)}`}>
                                                        {student.currentStatus || 'UNMARKED'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => setStatus(student.id, 'PRESENT')}
                                                            className={`p-2 rounded-full hover:bg-green-100 ${student.currentStatus === 'PRESENT' ? 'bg-green-100 text-green-700 ring-2 ring-green-500' : 'text-gray-400'}`}
                                                            title="Present"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setStatus(student.id, 'ABSENT')}
                                                            className={`p-2 rounded-full hover:bg-red-100 ${student.currentStatus === 'ABSENT' ? 'bg-red-100 text-red-700 ring-2 ring-red-500' : 'text-gray-400'}`}
                                                            title="Absent"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setStatus(student.id, 'LATE')}
                                                            className={`p-2 rounded-full hover:bg-yellow-100 ${student.currentStatus === 'LATE' ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500' : 'text-gray-400'}`}
                                                            title="Late"
                                                        >
                                                            <Clock className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setStatus(student.id, 'EXCUSED')}
                                                            className={`p-2 rounded-full hover:bg-blue-100 ${student.currentStatus === 'EXCUSED' ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' : 'text-gray-400'}`}
                                                            title="Excused"
                                                        >
                                                            <HelpCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
