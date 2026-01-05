import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, FileText, Calendar, Upload } from 'lucide-react';

export const ManageAssignments = () => {
    const { token } = useAuth();
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [deadline, setDeadline] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lists
    const [assignments, setAssignments] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);

    useEffect(() => {
        fetchMetadata();
        fetchAssignments();
    }, []);

    const fetchMetadata = async () => {
        try {
            const [classRes, subjectRes] = await Promise.all([
                fetch('/api/classes', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/academic/subjects', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (classRes.ok) setClasses(await classRes.json());
            if (subjectRes.ok) setSubjects(await subjectRes.json());
        } catch (e) { console.error(e); }
    };

    const fetchAssignments = async () => {
        try {
            const res = await fetch('/api/assignments', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setAssignments(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('classId', selectedClass);
        formData.append('subjectId', selectedSubject);
        formData.append('deadline', deadline);
        if (file) formData.append('file', file);

        try {
            const res = await fetch('/api/assignments', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }, // Don't set Content-Type for FormData
                body: formData
            });

            if (res.ok) {
                alert('Assignment created!');
                setIsCreating(false);
                fetchAssignments();
                // Reset form
                setTitle('');
                setDescription('');
                setFile(null);
            } else {
                alert('Failed to create assignment');
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
                        <Link to="/staff">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manage Assignments</h1>
                            <p className="text-gray-500">Create and track classwork</p>
                        </div>
                    </div>
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Assignment
                    </Button>
                </div>

                {isCreating && (
                    <Card className="mb-8 p-6 bg-white border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg mb-4">Create New Assignment</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input className="w-full p-2 border rounded" required value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Deadline</label>
                                    <input type="datetime-local" className="w-full p-2 border rounded" required value={deadline} onChange={e => setDeadline(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea className="w-full p-2 border rounded h-24" required value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Class</label>
                                    <select className="w-full p-2 border rounded" required value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                                        <option value="">Select Class...</option>
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subject</label>
                                    <select className="w-full p-2 border rounded" required value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                                        <option value="">Select Subject...</option>
                                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Attachment (Optional)</label>
                                <input type="file" className="w-full p-2 border rounded" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>Create Assignment</Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="space-y-4">
                    {assignments.map((a) => (
                        <Card key={a.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">{a.subject.name}</span>
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold">{a.class.name}</span>
                                    </div>
                                    <h4 className="font-bold text-lg">{a.title}</h4>
                                    <p className="text-gray-600 text-sm mt-1 mb-2">{a.description}</p>
                                    {a.fileUrl && (
                                        <a href={`${a.fileUrl}`} target="_blank" rel="noreferrer" className="text-blue-500 text-xs flex items-center gap-1 hover:underline">
                                            <FileText className="w-3 h-3" />
                                            Download Attachment
                                        </a>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-red-600 font-semibold flex items-center gap-1 justify-end">
                                        <Calendar className="w-3 h-3" />
                                        Due: {new Date(a.deadline).toLocaleDateString()}
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-2">View Submissions</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {assignments.length === 0 && <p className="text-center text-gray-500">No assignments created yet.</p>}
                </div>
            </div>
        </div>
    );
};
