import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Printer, Download } from 'lucide-react';

export const ReportCard = () => {
    const { token, user } = useAuth();
    const [student, setStudent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Determine API endpoint: If admin is viewing, might be different, but for now specific to logged in user or need logic.
                // Assuming Learner is printing their own, or Staff printing specific student.
                // If staff, we likely need query param: ?studentId=...
                // But MyResults link didn't pass ID. So it's for 'Me' (Learner).
                // I'll stick to 'my-results' endpoint for now.
                const res = await fetch('/api/academic/my-results', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) setStudent(await res.json());
            } catch (e) { console.error(e); } finally { setIsLoading(false); }
        };
        fetchResults();
    }, [token]);

    const handlePrint = () => {
        window.print();
    };

    if (isLoading) return <div className="p-10 text-center">Generating Report...</div>;
    if (!student) return <div className="p-10 text-center text-red-500">Report unavailable.</div>;

    const grades = student.grades || [];
    const average = grades.length ? (grades.reduce((sum: number, g: any) => sum + (g.total || 0), 0) / grades.length).toFixed(1) : 0;
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white flex justify-center">
            {/* Action Bar (Hidden on Print) */}
            <div className="fixed top-4 right-4 flex gap-2 print:hidden z-50">
                <Button onClick={handlePrint} className="shadow-lg">
                    <Printer className="w-4 h-4 mr-2" />
                    Print / Save as PDF
                </Button>
            </div>

            {/* A4 Paper Container */}
            <div className="bg-white w-[210mm] min-h-[297mm] shadow-xl print:shadow-none p-[20mm] relative text-black">
                {/* Header */}
                <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
                        <div className="text-left">
                            <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wider">Lukulu Day Secondary</h1>
                            <p className="text-sm font-semibold tracking-widest text-gray-600 uppercase">Excellence in Education</p>
                            <p className="text-xs text-gray-500 mt-1">P.O. Box 920002, Lukulu, Zambia | Tel: +260 97 000 0000</p>
                            <p className="text-xs text-gray-500">Email: info@lukuluday.edu.zm</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold uppercase underline">Official Term Report</h2>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm mb-8 border border-gray-300 p-6 rounded-lg">
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Student Name:</span>
                        <span className="font-bold uppercase">{user?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Admission No:</span>
                        <span className="uppercase">{student.admissionNo}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Class / Grade:</span>
                        <span className="uppercase">{student.class?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Term / Year:</span>
                        <span className="uppercase">Term 1 / {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Date Issued:</span>
                        <span>{date}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span className="font-bold text-gray-600">Class Tutor:</span>
                        <span>{student.class?.classTeacher?.user?.name || 'N/A'}</span>
                    </div>
                </div>

                {/* Grades Table */}
                <div className="mb-8">
                    <table className="w-full border-collapse border border-gray-900 text-sm">
                        <thead>
                            <tr className="bg-gray-100 print:bg-gray-200">
                                <th className="border border-gray-900 p-2 text-left w-1/3">Subject</th>
                                <th className="border border-gray-900 p-2 text-center">Test 1 (20)</th>
                                <th className="border border-gray-900 p-2 text-center">Test 2 (20)</th>
                                <th className="border border-gray-900 p-2 text-center">Exam (60)</th>
                                <th className="border border-gray-900 p-2 text-center font-bold">Total %</th>
                                <th className="border border-gray-900 p-2 text-center">Grade</th>
                                <th className="border border-gray-900 p-2 text-left w-1/4">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((g: any) => {
                                let comments = "Good effort";
                                if (g.total >= 80) comments = "Excellent performance";
                                else if (g.total >= 70) comments = "Very good";
                                else if (g.total >= 60) comments = "Good";
                                else if (g.total >= 50) comments = "Satisfactory";
                                else comments = "Needs improvement";

                                let gradeLetter = 'F';
                                if (g.total >= 80) gradeLetter = 'A';
                                else if (g.total >= 70) gradeLetter = 'B';
                                else if (g.total >= 60) gradeLetter = 'C';
                                else if (g.total >= 50) gradeLetter = 'D';

                                return (
                                    <tr key={g.id}>
                                        <td className="border border-gray-900 p-2 font-medium">{g.subject.name}</td>
                                        <td className="border border-gray-900 p-2 text-center">{g.test1 || '-'}</td>
                                        <td className="border border-gray-900 p-2 text-center">{g.test2 || '-'}</td>
                                        <td className="border border-gray-900 p-2 text-center">{g.exam || '-'}</td>
                                        <td className="border border-gray-900 p-2 text-center font-bold">{g.total || 0}</td>
                                        <td className="border border-gray-900 p-2 text-center font-bold">{gradeLetter}</td>
                                        <td className="border border-gray-900 p-2 text-xs italic text-gray-600">{comments}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-50 print:bg-gray-100 font-bold">
                                <td colSpan={4} className="border border-gray-900 p-2 text-right">OVERALL AVERAGE:</td>
                                <td className="border border-gray-900 p-2 text-center text-lg">{average}%</td>
                                <td className="border border-gray-900 p-2 bg-gray-200"></td>
                                <td className="border border-gray-900 p-2"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Performance Summary & Signatures */}
                <div className="grid grid-cols-2 gap-8 mt-12">
                    <div className="border border-gray-900 p-4 h-32 relative">
                        <p className="font-bold underline mb-2">Class Teacher's Comments:</p>
                        <p className="text-sm italic text-gray-500">Student has shown steady progress...</p>
                        <div className="absolute bottom-4 right-4 text-xs">
                            Signature: __________________________
                        </div>
                    </div>
                    <div className="border border-gray-900 p-4 h-32 relative">
                        <p className="font-bold underline mb-2">Head Teacher's Comments:</p>
                        <p className="text-sm italic text-gray-500">Promoted to next grade.</p>
                        <div className="absolute bottom-4 right-4 text-xs">
                            Signature: __________________________
                        </div>
                    </div>
                </div>

                {/* Footer Stamp */}
                <div className="mt-12 text-center text-xs text-gray-400">
                    <p>This document is system generated and is valid without a seal if accessed via the official portal.</p>
                    <p>Generated on {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};
