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
    grades: { subjectId: string; score: number; term: string; year: number }[];
    currentScore?: string; // Local state for input
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
            const res = await fetch('http://localhost:5000/api/classes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setClasses(await res.json());
        } catch (e) {
            console.error(e);
        }
    };

    const fetchSubjects = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/academic/subjects', {
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
            const res = await fetch(`http://localhost:5000/api/academic/class/${classId}/students`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data: Student[] = await res.json();

                // Map existing grades to current scores if they exist
                const studentsWithScores = data.map(student => {
                    const existingGrade = student.grades.find(
                        g => g.subjectId === selectedSubject &&
                            g.term === selectedTerm &&
                            g.year === parseInt(selectedYear)
                    );
                    return {
                        ...student,
                        currentScore: existingGrade ? existingGrade.score.toString() : ''
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

    const handleScoreChange = (studentId: string, score: string) => {
        setStudents(prev => prev.map(s =>
            s.id === studentId ? { ...s, currentScore: score } : s
        ));
    };

    const handleSave = async () => {
        if (!selectedSubject) {
            alert('Please select a subject');
            return;
        }

        setIsSaving(true);
        const gradesPayload = students
            .filter(s => s.currentScore && s.currentScore.trim() !== '')
            .map(s => ({
                studentId: s.id,
                score: s.currentScore
            }));

        if (gradesPayload.length === 0) {
            alert('No grades to save');
            setIsSaving(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/academic/grades', {
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
                            <p className="text-gray-500">Record assessment results for your class</p>
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
                                        <th className="p-4">Admission No</th>
                                        <th className="p-4">Student Name</th>
                                        <th className="p-4 w-48">Score (%)</th>
                                        <th className="p-4 w-32">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoading ? (
                                        <tr><td colSpan={4} className="p-8 text-center">Loading students...</td></tr>
                                    ) : students.length === 0 ? (
                                        <tr><td colSpan={4} className="p-8 text-center text-red-500">No students found in this class yet.</td></tr>
                                    ) : (
                                        students.map(student => {
                                            const score = parseFloat(student.currentScore || '0');
                                            let grade = '-';
                                            if (student.currentScore) {
                                                if (score >= 80) grade = 'A'; // Distinction
                                                else if (score >= 70) grade = 'B'; // Merit
                                                else if (score >= 60) grade = 'C'; // Credit
                                                else if (score >= 50) grade = 'D'; // Pass
                                                else grade = 'F'; // Fail
                                            }

                                            return (
                                                <tr key={student.id} className="hover:bg-gray-50">
                                                    <td className="p-4 text-sm font-mono text-gray-600">{student.admissionNo}</td>
                                                    <td className="p-4 font-medium">{student.user.name}</td>
                                                    <td className="p-4">
                                                        <input
                                                            type="number"
                                                            min="0" max="100"
                                                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                                            placeholder="Enter score"
                                                            value={student.currentScore}
                                                            onChange={e => handleScoreChange(student.id, e.target.value)}
                                                            disabled={!selectedSubject}
                                                        />
                                                    </td>
                                                    <td className="p-4 font-bold">
                                                        <span className={`px-3 py-1 rounded-full text-sm ${grade === 'A' ? 'bg-green-100 text-green-700' :
                                                                grade === 'B' ? 'bg-blue-100 text-blue-700' :
                                                                    grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                                                                        grade === 'F' ? 'bg-red-100 text-red-700' :
                                                                            'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {grade}
                                                        </span>
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
