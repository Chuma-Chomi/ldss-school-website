import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Trophy } from 'lucide-react';

interface Grade {
    id: string;
    score: number;
    term: string;
    year: number;
    subject: {
        name: string;
        code: string;
    };
}

interface StudentData {
    id: string;
    admissionNo: string;
    class: { name: string };
    grades: Grade[];
}

export const MyResults = () => {
    const { token, user } = useAuth();
    const [student, setStudent] = useState<StudentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/academic/my-results', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setStudent(data);
            } else {
                const err = await res.json();
                // If 404, it might mean the learner hasn't been enrolled yet
                if (res.status === 404) {
                    setError('Student profile not found. Please contact administration to enroll.');
                } else {
                    setError(err.message || 'Failed to fetch results');
                }
            }
        } catch (e: any) {
            setError('Connection error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateGrade = (score: number) => {
        if (score >= 80) return { grade: 'A', color: 'text-green-600 bg-green-50' };
        if (score >= 70) return { grade: 'B', color: 'text-blue-600 bg-blue-50' };
        if (score >= 60) return { grade: 'C', color: 'text-yellow-600 bg-yellow-50' };
        if (score >= 50) return { grade: 'D', color: 'text-orange-600 bg-orange-50' };
        return { grade: 'F', color: 'text-red-600 bg-red-50' };
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading results...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <Card className="max-w-md w-full p-8 text-center">
                    <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Notice</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/learner">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (!student) return null;

    // Calculate Summary
    const totalSubjects = student.grades.length;
    const averageScore = totalSubjects > 0
        ? (student.grades.reduce((sum, g) => sum + g.score, 0) / totalSubjects).toFixed(1)
        : '0';

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
                            <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
                            <p className="text-gray-500">Academic Performance Report</p>
                        </div>
                    </div>
                </div>

                {/* Student Info Card */}
                <Card className="mb-6 p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-2xl">
                                {user?.name?.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                                <p className="text-sm text-gray-500">{student.class.name} • {student.admissionNo}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Total Subjects</p>
                                <p className="text-xl font-bold text-gray-900">{totalSubjects}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-1">Average Score</p>
                                <p className="text-xl font-bold text-gray-900">{averageScore}%</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Results Table */}
                <Card className="overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-emerald-600" />
                            Term 1 Results
                        </h3>
                        <span className="text-sm text-gray-500">{new Date().getFullYear()}</span>
                    </div>

                    {student.grades.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No results available for this student yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white border-b border-gray-100 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4">Subject</th>
                                        <th className="p-4 w-32">Score (%)</th>
                                        <th className="p-4 w-32">Grade</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {student.grades.map((grade) => {
                                        const { grade: letter, color } = calculateGrade(grade.score);
                                        return (
                                            <tr key={grade.id} className="hover:bg-gray-50">
                                                <td className="p-4">
                                                    <p className="font-medium text-gray-900">{grade.subject.name}</p>
                                                    <p className="text-xs text-gray-400">{grade.subject.code}</p>
                                                </td>
                                                <td className="p-4 font-bold text-gray-700">
                                                    {grade.score}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm ${color}`}>
                                                        {letter}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`text-sm ${grade.score >= 50 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {grade.score >= 50 ? 'Passed' : 'Failed'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
