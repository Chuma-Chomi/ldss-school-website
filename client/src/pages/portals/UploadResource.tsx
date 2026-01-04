import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, File, CheckCircle } from 'lucide-react';
import API_URL from '../../config/api';

interface ClassItem {
    id: string;
    name: string;
}

interface Subject {
    id: string;
    name: string;
}

export const UploadResource = () => {
    const { token } = useAuth();

    // Form State
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState(''); // Optional

    // Data List State
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [subRes, classRes] = await Promise.all([
                fetch(`${API_URL}/api/academic/subjects`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_URL}/api/classes`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (subRes.ok) setSubjects(await subRes.json());
            if (classRes.ok) setClasses(await classRes.json());
        };
        fetchData();
    }, [token]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title || !selectedSubject) {
            alert('Please fill in all required fields');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('subjectId', selectedSubject);
        if (selectedClass) formData.append('classId', selectedClass);

        try {
            const res = await fetch(`${API_URL}/api/resources/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('File uploaded successfully!');
                // Reset form
                setTitle('');
                setDescription('');
                setFile(null);
                setSelectedSubject('');
                setSelectedClass('');
            } else {
                const err = await res.json();
                alert(`Upload failed: ${err.message || err.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error uploading file');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/staff">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Upload Resources</h1>
                        <p className="text-gray-500">Share study materials with students</p>
                    </div>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleUpload} className="space-y-6">
                        {/* File Drop Area (Simple for now) */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.jpg,.png"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                {file ? (
                                    <>
                                        <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
                                        <span className="text-sm font-medium text-emerald-700">{file.name}</span>
                                        <span className="text-xs text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                        <span className="text-sm font-medium text-gray-700">Click to upload a file</span>
                                        <span className="text-xs text-gray-500 mt-1">PDF, Word, Images (Max 5MB)</span>
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded-md"
                                    placeholder="e.g. Math Term 1 Notes"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                                <select
                                    required
                                    className="w-full p-2 border rounded-md"
                                    value={selectedSubject}
                                    onChange={e => setSelectedSubject(e.target.value)}
                                >
                                    <option value="">Select Subject...</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full p-2 border rounded-md h-24"
                                placeholder="Brief description of the material..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class (Optional)</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={selectedClass}
                                onChange={e => setSelectedClass(e.target.value)}
                            >
                                <option value="">All Classes</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Leave blank to make available to all students taking this subject.</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload Resource'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
