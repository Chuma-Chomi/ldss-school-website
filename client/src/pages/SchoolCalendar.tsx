import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Trash2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchoolCalendar = () => {
    const { user, token } = useAuth();
    const isAdminOrStaff = user?.role === 'ADMIN' || user?.role === 'STAFF';

    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('ACADEMIC');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/calendar', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setEvents(await res.json());
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ title, description, startDate, endDate, type })
            });

            if (res.ok) {
                setIsCreating(false);
                setTitle('');
                setDescription('');
                setStartDate('');
                setEndDate('');
                fetchEvents();
            }
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this event?')) return;
        try {
            const res = await fetch(`/api/calendar/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchEvents();
        } catch (e) { console.error(e); }
    };

    const formatDate = (d: string) => {
        return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'ACADEMIC': return 'bg-blue-100 text-blue-800';
            case 'HOLIDAY': return 'bg-green-100 text-green-800';
            case 'EXAM': return 'bg-red-100 text-red-800';
            case 'SPORT': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to={user?.role === 'ADMIN' ? '/admin' : user?.role === 'STAFF' ? '/staff' : '/dashboard'}>
                            <Button variant="ghost" size="sm">Back</Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">School Calendar</h1>
                            <p className="text-gray-500">Upcoming events and important dates</p>
                        </div>
                    </div>
                    {isAdminOrStaff && (
                        <Button onClick={() => setIsCreating(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Event
                        </Button>
                    )}
                </div>

                {isCreating && (
                    <Card className="mb-8 p-6 border-l-4 border-emerald-500">
                        <h3 className="font-bold text-lg mb-4">Add New Event</h3>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Event Title</label>
                                <input className="w-full p-2 border rounded" required value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea className="w-full p-2 border rounded" rows={2} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input type="date" className="w-full p-2 border rounded" required value={startDate} onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <input type="date" className="w-full p-2 border rounded" required value={endDate} onChange={e => setEndDate(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select className="w-full p-2 border rounded" value={type} onChange={e => setType(e.target.value)}>
                                    <option value="ACADEMIC">Academic</option>
                                    <option value="HOLIDAY">Holiday</option>
                                    <option value="EXAM">Exam</option>
                                    <option value="SPORT">Sport</option>
                                    <option value="GENERAL">General</option>
                                </select>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2 mt-2">
                                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button type="submit">Save Event</Button>
                            </div>
                        </form>
                    </Card>
                )}

                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-blue-500 hover:shadow-md transition-shadow relative group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${getTypeColor(event.type)}`}>
                                            {event.type}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <CalendarIcon className="w-3 h-3" />
                                            {formatDate(event.startDate)} {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                    {event.description && <p className="text-gray-600 mt-1">{event.description}</p>}
                                </div>
                                {isAdminOrStaff && (
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {!isLoading && events.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-lg border border-dashed text-gray-400">
                            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No upcoming events.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
