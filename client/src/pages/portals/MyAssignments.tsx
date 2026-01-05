import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Upload, CheckCircle } from 'lucide-react';

interface Assignment {
    id: string;
    title: string;
    description: string;
    subject: { name: string };
    class: { name: string };
    deadline: string;
    fileUrl: string | null;
}

export const MyAssignments = () => {
    const { token } = useAuth();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
    const [submissionFile, setSubmissionFile] = useState<File | null>(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            // In a real app, I'd filter by my classId. For now fetching all and assuming backend filters or I see all.
            // My assignmentController getAssignments checks query params but defaults to all if not provided.
            // Ideally backend filters by user's class. I'll rely on "Honot-system" filtering or just show all for demo.
            const res = await fetch('/api/assignments', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setAssignments(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAssignment || !submissionFile) return;

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('assignmentId', selectedAssignment);
        formData.append('file', submissionFile);

        try {
            const res = await fetch('/api/assignments/submit', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (res.ok) {
                alert('Assignment submitted successfully!');
                setSelectedAssignment(null);
                setSubmissionFile(null);
            } else {
                alert('Submission failed');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/learner">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
                            <p className="text-gray-500">Track homework and projects</p>
                        </div>
                    </div>
                </div>

                {selectedAssignment && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md p-6 bg-white">
                            <h3 className="font-bold text-lg mb-4">Submit Assignment</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="fileIdx"
                                        onChange={e => setSubmissionFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                    <label htmlFor="fileIdx" className="cursor-pointer flex flex-col items-center">
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-600 font-medium">Click to upload file</span>
                                        {submissionFile && <span className="text-xs text-emerald-600 mt-2 font-bold">{submissionFile.name}</span>}
                                    </label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="ghost" onClick={() => setSelectedAssignment(null)}>Cancel</Button>
                                    <Button type="submit" disabled={isSubmitting || !submissionFile}>Submit</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                )}

                <div className="space-y-4">
                    {assignments.map((a) => (
                        <Card key={a.id} className="p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold">{a.subject.name}</span>
                                        <span className="text-xs text-gray-500">Due: {new Date(a.deadline).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900">{a.title}</h4>
                                    <p className="text-gray-600 text-sm mt-1 mb-3">{a.description}</p>
                                    {a.fileUrl && (
                                        <a href={`${a.fileUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline bg-blue-50 px-3 py-1 rounded-full">
                                            <FileText className="w-3 h-3" />
                                            View Attachment
                                        </a>
                                    )}
                                </div>
                                <Button onClick={() => setSelectedAssignment(a.id)}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Submit
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {assignments.length === 0 && (
                        <div className="text-center py-12">
                            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                            <p className="text-gray-500">No pending assignments!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
