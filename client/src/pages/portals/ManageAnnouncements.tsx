import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Megaphone } from 'lucide-react';
import { AnnouncementFeed } from '../../components/AnnouncementFeed';

export const ManageAnnouncements = () => {
    const { token, user } = useAuth();
    const [isCreating, setIsCreating] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('ACADEMIC');
    const [target, setTarget] = useState('ALL');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // We can't reuse AnnouncementFeed easily for deletion unless we modify it to accept actions.
    // For speed, I'll fetch announcements here separately for management.
    const [announcements, setAnnouncements] = useState<any[]>([]);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setAnnouncements(await res.json());
        } catch (e) {
            console.error(e);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/announcements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, category, target })
            });

            if (res.ok) {
                alert('Announcement posted!');
                setIsCreating(false);
                setTitle('');
                setContent('');
                fetchAnnouncements();
            } else {
                alert('Failed to post');
            }
        } catch (e) {
            alert('Error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this announcement?')) return;
        try {
            const res = await fetch(`/api/announcements/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchAnnouncements();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to={user?.role === 'ADMIN' ? '/admin' : '/staff'}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
                            <p className="text-gray-500">Manage school-wide notices</p>
                        </div>
                    </div>
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        New Announcement
                    </Button>
                </div>

                {isCreating && (
                    <Card className="mb-8 p-6 bg-white border-l-4 border-emerald-500">
                        <h3 className="font-bold text-lg mb-4">Create New Announcement</h3>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input className="w-full p-2 border rounded" required value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <textarea className="w-full p-2 border rounded h-24" required value={content} onChange={e => setContent(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select className="w-full p-2 border rounded" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="ACADEMIC">Academic</option>
                                        <option value="EVENTS">Events</option>
                                        <option value="ADMINISTRATIVE">Administrative</option>
                                        <option value="EMERGENCY">Emergency</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Target Audience</label>
                                    <select className="w-full p-2 border rounded" value={target} onChange={e => setTarget(e.target.value)}>
                                        <option value="ALL">Everyone</option>
                                        <option value="LEARNER">Learners Only</option>
                                        <option value="STAFF">Staff Only</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>Publish</Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="space-y-4">
                    {announcements.map((a) => (
                        <Card key={a.id} className="p-4 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-gray-100 text-xs px-2 py-1 rounded font-bold">{a.category}</span>
                                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded font-bold">{a.target}</span>
                                    <span className="text-gray-400 text-xs">{new Date(a.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-lg">{a.title}</h4>
                                <p className="text-gray-600 mt-1">{a.content}</p>
                            </div>
                            {user?.role === 'ADMIN' && (
                                <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </Card>
                    ))}
                    {announcements.length === 0 && <p className="text-center text-gray-500">No announcements found.</p>}
                </div>
            </div>
        </div>
    );
};
