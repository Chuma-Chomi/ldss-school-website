import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, TrendingUp } from 'lucide-react';

interface ClassItem {
    id: string;
    name: string;
}

interface Subject {
    id: string;
    name: string;
    code: string;
}

interface Student {
    id: string;
    admissionNo: string;
    user: { name: string };
    grades: {
        subjectId: string;
        test1?: number;
        test2?: number;
        exam?: number;
        total?: number;
        term: string;
        year: number
    }[];
    // Local state for inputs
    test1Str?: string;
    test2Str?: string;
    examStr?: string;
}

export const EnterGrades = () => {
    const { token } = useAuth();

    // Selection State
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTerm, setSelectedTerm] = useState('Term 1');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    // Data State
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchClasses();
        fetchSubjects();
    }, []);

    // Fetch students when a class is selected
    useEffect(() => {
        if (selectedClass) {
            fetchStudents(selectedClass);
        } else {
            setStudents([]);
        }
    }, [selectedClass, selectedSubject, selectedTerm, selectedYear]);

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

    const fetchSubjects = async () => {
        try {
            const res = await fetch('/api/academic/subjects', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setSubjects(await res.json());
        } catch (e) {
            console.error(e);
        }
    };

    const fetchStudents = async (classId: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/academic/class/${classId}/students`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data: Student[] = await res.json();

                // Map existing grades to current inputs if they exist
                const studentsWithScores = data.map(student => {
                    const existingGrade = student.grades.find(
                        g => g.subjectId === selectedSubject &&
                            g.term === selectedTerm &&
                            g.year === parseInt(selectedYear)
                    );
                    return {
                        ...student,
                        test1Str: existingGrade?.test1?.toString() || '',
                        test2Str: existingGrade?.test2?.toString() || '',
                        examStr: existingGrade?.exam?.toString() || ''
                    };
                });

                setStudents(studentsWithScores);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (studentId: string, field: 'test1Str' | 'test2Str' | 'examStr', value: string) => {
        setStudents(prev => prev.map(s =>
            s.id === studentId ? { ...s, [field]: value } : s
        ));
    };

    const calculateTotal = (s: Student) => {
        const t1 = parseFloat(s.test1Str || '0');
        const t2 = parseFloat(s.test2Str || '0');
        const ex = parseFloat(s.examStr || '0');
        return (t1 + t2 + ex).toFixed(0);
    };

    const calculateGrade = (total: number) => {
        if (total >= 75) return { grade: '1', desc: 'Distinction', color: 'bg-green-100 text-green-700' };
        if (total >= 70) return { grade: '2', desc: 'Distinction', color: 'bg-green-50 text-green-600' };
        if (total >= 65) return { grade: '3', desc: 'Merit', color: 'bg-blue-100 text-blue-700' };
        if (total >= 60) return { grade: '4', desc: 'Merit', color: 'bg-blue-50 text-blue-600' };
        if (total >= 55) return { grade: '5', desc: 'Credit', color: 'bg-yellow-100 text-yellow-700' };
        if (total >= 50) return { grade: '6', desc: 'Credit', color: 'bg-yellow-50 text-yellow-600' };
        if (total >= 45) return { grade: '7', desc: 'Pass', color: 'bg-orange-100 text-orange-700' };
        if (total >= 40) return { grade: '8', desc: 'Pass', color: 'bg-orange-50 text-orange-600' };
        return { grade: '9', desc: 'Fail', color: 'bg-red-100 text-red-700' };
    };

    const handleSave = async () => {
        if (!selectedSubject) {
            alert('Please select a subject');
            return;
        }

        setIsSaving(true);
        const gradesPayload = students
            .filter(s => (s.test1Str || s.test2Str || s.examStr))
            .map(s => ({
                studentId: s.id,
                test1: s.test1Str || 0,
                test2: s.test2Str || 0,
                exam: s.examStr || 0
            }));

        if (gradesPayload.length === 0) {
            alert('No grades to save');
            setIsSaving(false);
            return;
        }

        try {
            const res = await fetch('/api/academic/grades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    grades: gradesPayload,
                    subjectId: selectedSubject,
                    term: selectedTerm,
                    year: selectedYear
                })
            });

            if (res.ok) {
                alert('Grades saved successfully!');
            } else {
                alert('Failed to save grades');
            }
        } catch (e) {
            console.error(e);
            alert('Error saving grades');
        } finally {
            setIsSaving(false);
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
                            <h1 className="text-2xl font-bold text-gray-900">Enter Grades</h1>
                            <p className="text-gray-500">Record Continuous Assessment & Exam Scores</p>
                        </div>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving || !selectedClass || !selectedSubject}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Saving...' : 'Save Grades'}
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-4 md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={selectedSubject}
                                onChange={e => setSelectedSubject(e.target.value)}
                            >
                                <option value="">Select Subject...</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={selectedTerm}
                                onChange={e => setSelectedTerm(e.target.value)}
                            >
                                <option>Term 1</option>
                                <option>Term 2</option>
                                <option>Term 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={selectedYear}
                                onChange={e => setSelectedYear(e.target.value)}
                            />
                        </div>
                    </Card>
                </div>

                <Card className="overflow-hidden">
                    {!selectedClass ? (
                        <div className="p-12 text-center text-gray-500">
                            <TrendingUp className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                            <p>Please select a class and subject to start entering grades.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4 w-40">Admission No</th>
                                        <th className="p-4">Student Name</th>
                                        <th className="p-4 w-32 text-center">Test 1 (20)</th>
                                        <th className="p-4 w-32 text-center">Test 2 (20)</th>
                                        <th className="p-4 w-32 text-center">Exam (60)</th>
                                        <th className="p-4 w-24 text-center">Total</th>
                                        <th className="p-4 w-32 text-center">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoading ? (
                                        <tr><td colSpan={7} className="p-8 text-center">Loading students...</td></tr>
                                    ) : students.length === 0 ? (
                                        <tr><td colSpan={7} className="p-8 text-center text-red-500">No students found in this class yet.</td></tr>
                                    ) : (
                                        students.map(student => {
                                            const total = parseFloat(calculateTotal(student));
                                            const { grade, color } = calculateGrade(total);

                                            return (
                                                <tr key={student.id} className="hover:bg-gray-50">
                                                    <td className="p-4 text-sm font-mono text-gray-600">{student.admissionNo}</td>
                                                    <td className="p-4 font-medium">{student.user.name}</td>
                                                    <td className="p-4">
                                                        <input
                                                            type="number" min="0" max="20"
                                                            className="w-full p-2 border rounded text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                                                            value={student.test1Str}
                                                            onChange={e => handleInputChange(student.id, 'test1Str', e.target.value)}
                                                            placeholder="-"
                                                        />
                                                    </td>
                                                    <td className="p-4">
                                                        <input
                                                            type="number" min="0" max="20"
                                                            className="w-full p-2 border rounded text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                                                            value={student.test2Str}
                                                            onChange={e => handleInputChange(student.id, 'test2Str', e.target.value)}
                                                            placeholder="-"
                                                        />
                                                    </td>
                                                    <td className="p-4">
                                                        <input
                                                            type="number" min="0" max="60"
                                                            className="w-full p-2 border rounded text-center focus:ring-2 focus:ring-emerald-500 outline-none"
                                                            value={student.examStr}
                                                            onChange={e => handleInputChange(student.id, 'examStr', e.target.value)}
                                                            placeholder="-"
                                                        />
                                                    </td>
                                                    <td className="p-4 text-center font-bold text-gray-800">
                                                        {total > 0 ? total : '-'}
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        {total > 0 && (
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
                                                                {grade}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
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
