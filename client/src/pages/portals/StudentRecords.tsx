import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, GraduationCap, UserPlus } from 'lucide-react';

interface Student {
    id: string;
    admissionNo: string;
    user: {
        name: string;
        email: string;
    };
    class?: {
        name: string;
    };
}

interface UnenrolledLearner {
    id: string;
    name: string;
    email: string;
}

interface ClassItem {
    id: string;
    name: string;
}

export const StudentRecords = () => {
    const { token } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Enrollment Modal State
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [unenrolledLearners, setUnenrolledLearners] = useState<UnenrolledLearner[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);

    // Form State
    const [enrollData, setEnrollData] = useState({
        userId: '',
        admissionNo: '',
        classId: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch data when modal opens
    useEffect(() => {
        if (isEnrolling) {
            fetchUnenrolledLearners();
            fetchClasses();
        }
    }, [isEnrolling]);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/students', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUnenrolledLearners = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/unenrolled', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUnenrolledLearners(data);
                // Auto-select first learner if available
                if (data.length > 0 && !enrollData.userId) {
                    setEnrollData(prev => ({ ...prev, userId: data[0].id }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch learners:', error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/classes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setClasses(data);
                // Auto-select first class if available
                if (data.length > 0 && !enrollData.classId) {
                    setEnrollData(prev => ({ ...prev, classId: data[0].id }));
                }
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error);
        }
    };

    const handleEnroll = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(enrollData)
            });

            if (response.ok) {
                await fetchStudents();
                setIsEnrolling(false);
                setEnrollData({ userId: '', admissionNo: '', classId: '' });
                alert('Student enrolled successfully!');
            } else {
                const error = await response.json();
                alert(`Error: ${error.message || error.error}`);
            }
        } catch (error) {
            console.error('Enrollment failed:', error);
        }
    };

    const filteredStudents = students.filter(student =>
        student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/staff">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Student Records</h1>
                            <p className="text-gray-500">View and manage student profiles</p>
                        </div>
                    </div>
                    <Button onClick={() => setIsEnrolling(true)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Enroll Student
                    </Button>
                </div>

                {/* Enrollment Modal */}
                {isEnrolling && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md p-6 m-4">
                            <h2 className="text-xl font-bold mb-4">Enroll a Student</h2>

                            {unenrolledLearners.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-gray-500 mb-4">No unenrolled learners found.</p>
                                    <p className="text-sm text-gray-400">Create a new user with "Learner" role first.</p>
                                    <Button variant="ghost" onClick={() => setIsEnrolling(false)} className="mt-4">
                                        Close
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleEnroll} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Learner</label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={enrollData.userId}
                                            onChange={e => setEnrollData({ ...enrollData, userId: e.target.value })}
                                            required
                                        >
                                            {unenrolledLearners.map(learner => (
                                                <option key={learner.id} value={learner.id}>
                                                    {learner.name} ({learner.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="e.g. 2026/001"
                                            value={enrollData.admissionNo}
                                            onChange={e => setEnrollData({ ...enrollData, admissionNo: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Assign Class</label>
                                        <select
                                            className="w-full p-2 border rounded-md"
                                            value={enrollData.classId}
                                            onChange={e => setEnrollData({ ...enrollData, classId: e.target.value })}
                                            required
                                        >
                                            <option value="">Select a class...</option>
                                            {classes.map(cls => (
                                                <option key={cls.id} value={cls.id}>
                                                    {cls.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-6">
                                        <Button type="button" variant="ghost" onClick={() => setIsEnrolling(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit">Enroll Student</Button>
                                    </div>
                                </form>
                            )}
                        </Card>
                    </div>
                )}

                {/* Search & List */}
                <Card className="p-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or admission no..."
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm">
                                <tr>
                                    <th className="p-4">Student Name</th>
                                    <th className="p-4">Admission No</th>
                                    <th className="p-4">Class</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">Loading students...</td>
                                    </tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center p-4">
                                                <GraduationCap className="w-12 h-12 text-gray-300 mb-2" />
                                                <p>No student records found.</p>
                                                <Button size="sm" variant="ghost" onClick={() => setIsEnrolling(true)} className="mt-2 text-emerald-600">
                                                    Enroll your first student
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map(student => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{student.user.name}</td>
                                            <td className="p-4 text-gray-600 font-mono text-sm">{student.admissionNo}</td>
                                            <td className="p-4">
                                                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                    {student.class?.name || 'Unassigned'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-sm">{student.user.email}</td>
                                            <td className="p-4 text-right">
                                                <Button variant="ghost" size="sm">
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};
