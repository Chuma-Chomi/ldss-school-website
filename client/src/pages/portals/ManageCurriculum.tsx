import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Plus, Trash2, Edit, User, Users } from 'lucide-react';

export const ManageCurriculum = () => {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState<'classes' | 'subjects'>('classes');

    // Data State
    const [classes, setClasses] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null); // ID of item being edited

    // Create/Edit Fields
    const [itemName, setItemName] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState(''); // For Class Teacher
    const [selectedSubjectTeachers, setSelectedSubjectTeachers] = useState<string[]>([]); // For Subject Teachers (Multi)

    useEffect(() => {
        fetchData();
        fetchStaff();
    }, [activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            if (activeTab === 'classes') {
                const res = await fetch('/api/classes', { headers: { 'Authorization': `Bearer ${token}` } });
                if (res.ok) setClasses(await res.json());
            } else {
                const res = await fetch('/api/academic/subjects', { headers: { 'Authorization': `Bearer ${token}` } });
                if (res.ok) setSubjects(await res.json());
            }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    const fetchStaff = async () => {
        try {
            const res = await fetch('/api/staff', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) setStaff(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = activeTab === 'classes' ? '/api/classes' : '/api/academic/subjects';
            const body = activeTab === 'classes' ? { name: itemName } : { name: itemName, code: itemCode };

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert('Created successfully!');
                resetForm();
                fetchData();
            } else {
                alert('Creation failed');
            }
        } catch (e) { console.error(e); }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEditing) return;
        try {
            let url, body;

            if (activeTab === 'classes') {
                url = `/api/classes/${isEditing}`;
                body = { name: itemName, classTeacherId: selectedTeacher };
            } else {
                // Update Subject Teachers
                // Note: Updating Name/Code is not implemented in backend update endpoint yet (only create/delete).
                // But we added assignSubjectTeachers which is separate. 
                // Ideally I should add updateSubject endpoint completely.
                // For now, I'll hit the assign endpoint if teachers changed.
                // If name/code logic is missing in backend update, I might skip updating them or implement it now.
                // I only implemented "assignSubjectTeachers" PUT. I didn't verify standard update.
                // Let's assume I only update Teachers for subjects for now.
                url = `/api/academic/subjects/${isEditing}/teachers`;
                body = { teacherIds: selectedSubjectTeachers };
            }

            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert('Updated successfully!');
                resetForm();
                fetchData();
            } else {
                alert('Update failed');
            }
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure? This cannot be undone.')) return;
        try {
            const url = activeTab === 'classes' ? `/api/classes/${id}` : `/api/academic/subjects/${id}`;
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchData();
            else alert('Delete failed (item might be in use)');
        } catch (e) { console.error(e); }
    };

    const startEdit = (item: any) => {
        setIsEditing(item.id);
        setItemName(item.name);
        if (activeTab === 'classes') {
            setSelectedTeacher(item.classTeacherId || '');
        } else {
            setItemCode(item.code || '');
            // Pre-select teachers
            const tIds = item.teachers ? item.teachers.map((t: any) => t.id) : [];
            setSelectedSubjectTeachers(tIds);
        }
        setIsCreating(true);
    };

    const toggleSubjectTeacher = (teacherId: string) => {
        setSelectedSubjectTeachers(prev => {
            if (prev.includes(teacherId)) return prev.filter(id => id !== teacherId);
            return [...prev, teacherId];
        });
    };

    const resetForm = () => {
        setIsCreating(false);
        setIsEditing(null);
        setItemName('');
        setItemCode('');
        setSelectedTeacher('');
        setSelectedSubjectTeachers([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Curriculum Management</h1>
                            <p className="text-gray-500">Configure academic structure</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => { setActiveTab('classes'); resetForm(); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'classes' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Layers className="w-5 h-5" />
                        Classes
                    </button>
                    <button
                        onClick={() => { setActiveTab('subjects'); resetForm(); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'subjects' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        <BookOpen className="w-5 h-5" />
                        Subjects
                    </button>
                </div>

                <div className="flex justify-end mb-4">
                    <Button onClick={() => { resetForm(); setIsCreating(true); }}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New {activeTab === 'classes' ? 'Class' : 'Subject'}
                    </Button>
                </div>

                {isCreating && (
                    <Card className="mb-6 p-6 border-l-4 border-emerald-500">
                        <h3 className="font-bold text-lg mb-4">{isEditing ? 'Edit' : 'Create'} {activeTab === 'classes' ? 'Class' : 'Subject'}</h3>
                        <form onSubmit={isEditing ? handleUpdate : handleCreate} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        className="w-full p-2 border rounded bg-gray-50"
                                        placeholder={activeTab === 'classes' ? "e.g. Grade 10 A" : "e.g. Mathematics"}
                                        required
                                        disabled={!!isEditing && activeTab === 'subjects'} // Disable name edit for subjects if backend doesn't support it easily yet
                                        value={itemName}
                                        onChange={e => setItemName(e.target.value)}
                                    />
                                </div>
                                {activeTab === 'subjects' && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Code</label>
                                        <input
                                            className="w-full p-2 border rounded bg-gray-50"
                                            placeholder="e.g. MATH101"
                                            required
                                            disabled={!!isEditing} // Code immutable generally
                                            value={itemCode}
                                            onChange={e => setItemCode(e.target.value)}
                                        />
                                    </div>
                                )}
                                {activeTab === 'classes' && isEditing && (
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1">Class Teacher</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={selectedTeacher}
                                            onChange={e => setSelectedTeacher(e.target.value)}
                                        >
                                            <option value="">Select Teacher...</option>
                                            {staff.map(s => (
                                                <option key={s.id} value={s.id}>{s.user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {activeTab === 'subjects' && isEditing && (
                                    <div className="col-span-2 bg-gray-50 p-4 rounded border">
                                        <label className="block text-sm font-bold mb-2 text-gray-700">Assign Subject Teachers</label>
                                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                                            {staff.map(s => (
                                                <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubjectTeachers.includes(s.id)}
                                                        onChange={() => toggleSubjectTeacher(s.id)}
                                                        className="rounded text-emerald-600"
                                                    />
                                                    <span>{s.user.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
                                <Button type="submit">{isEditing ? 'Save Changes' : 'Create'}</Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="grid gap-4">
                    {activeTab === 'classes' ? (
                        classes.map(c => (
                            <div key={c.id} className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-center group">
                                <div className="flex-1 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Layers className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <span className="font-medium text-lg block">{c.name}</span>
                                        {c.classTeacher ? (
                                            <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium mt-1">
                                                <User className="w-3 h-3" />
                                                Teacher: {c.classTeacher.user.name}
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400 mt-1 italic">No teacher assigned</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => startEdit(c)}>
                                        <Edit className="w-4 h-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(c.id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        subjects.map(s => (
                            <div key={s.id} className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-center group">
                                <div className="flex-1 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-lg">{s.name}</p>
                                        <p className="text-xs text-gray-500 font-mono mb-1">{s.code}</p>
                                        {s.teachers && s.teachers.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {s.teachers.map((t: any) => (
                                                    <span key={t.id} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold">
                                                        {t.user.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-red-400 italic">No teachers assigned</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => startEdit(s)}>
                                        <Edit className="w-4 h-4 text-blue-500" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
