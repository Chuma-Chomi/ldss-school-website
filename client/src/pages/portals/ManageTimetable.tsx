import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Plus, Trash2, Edit } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00'];

export const ManageTimetable = () => {
    const { token } = useAuth();
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [timetable, setTimetable] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState<{ day: string, time: string } | null>(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');

    // Auto-filter teachers based on subject assignment if possible? 
    // Data model: Subject -> Teachers. I'll use that to filter dropdown.

    useEffect(() => {
        fetchMetadata();
    }, []);

    useEffect(() => {
        if (selectedClass) fetchTimetable();
    }, [selectedClass]);

    const fetchMetadata = async () => {
        try {
            const [cRes, sRes, tRes] = await Promise.all([
                fetch('/api/classes', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/academic/subjects', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/staff', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);
            if (cRes.ok) setClasses(await cRes.json());
            if (sRes.ok) setSubjects(await sRes.json());
            if (tRes.ok) setStaff(await tRes.json());
        } catch (e) { console.error(e); }
    };

    const fetchTimetable = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/timetable/class/${selectedClass}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setTimetable(await res.json());
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSaveSlot = async () => {
        if (!editingSlot || !selectedClass) return;
        try {
            // End time is inferred as +40min or +1hr. I'll just set it to +50min for now.
            const [hr, min] = editingSlot.time.split(':').map(Number);
            const endTime = `${hr}:${min + 50}`; // simple string logic (doesn't handle carry over, assumes :00)

            const res = await fetch('/api/timetable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    classId: selectedClass,
                    day: editingSlot.day,
                    startTime: editingSlot.time,
                    endTime: `${hr}:50`, // hardcoded end for simplicity
                    subjectId: selectedSubject,
                    teacherId: selectedTeacher || null
                })
            });

            if (res.ok) {
                fetchTimetable();
                closeModal();
            }
        } catch (e) { console.error(e); }
    };

    const handleDeleteSlot = async (id: string) => {
        if (!confirm('Clear this slot?')) return;
        try {
            const res = await fetch(`/api/timetable/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchTimetable();
        } catch (e) { console.error(e); }
    };

    const openModal = (day: string, time: string, existing: any = null) => {
        setEditingSlot({ day, time });
        setSelectedSubject(existing?.subjectId || '');
        setSelectedTeacher(existing?.teacherId || '');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSlot(null);
        setSelectedSubject('');
        setSelectedTeacher('');
    };

    const getSlot = (day: string, time: string) => {
        return timetable.find(t => t.day === day && t.startTime === time);
    };

    // Derived teachers list: if subject selected, try to find assigned teachers.
    // subjects array structure: { id, name, teachers: [] }
    const currentSubjectObj = subjects.find(s => s.id === selectedSubject);
    const availableTeachers = currentSubjectObj?.teachers && currentSubjectObj.teachers.length > 0
        ? currentSubjectObj.teachers.map((t: any) => ({ user: t.user, id: t.id })) // map to flat structure used in select
        : staff; // Fallback to all staff if no specific assignment or empty

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manage Timetables</h1>
                            <p className="text-gray-500">Weekly schedule editor</p>
                        </div>
                    </div>
                    <select
                        className="p-2 border rounded-lg min-w-[200px]"
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                    >
                        <option value="">Select Class...</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {selectedClass ? (
                    <div className="bg-white rounded-lg shadow border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="p-3 text-left w-24">Time</th>
                                    {DAYS.map(d => <th key={d} className="p-3 text-left border-l">{d}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {TIMES.map(time => (
                                    <tr key={time} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-500 border-r">{time}</td>
                                        {DAYS.map(day => {
                                            const slot = getSlot(day, time);
                                            return (
                                                <td key={`${day}-${time}`} className="p-2 border-l min-w-[140px]">
                                                    {slot ? (
                                                        <div className="bg-emerald-50 border border-emerald-200 rounded p-2 relative group">
                                                            <div className="font-bold text-emerald-800">{slot.subject.name}</div>
                                                            <div className="text-xs text-emerald-600 line-clamp-1">{slot.teacher?.user.name || 'No Teacher'}</div>
                                                            <div className="absolute top-1 right-1 hidden group-hover:flex gap-1 bg-white/80 rounded">
                                                                <button onClick={() => openModal(day, time, slot)} className="p-1 hover:text-blue-500">
                                                                    <Edit className="w-3 h-3" />
                                                                </button>
                                                                <button onClick={() => handleDeleteSlot(slot.id)} className="p-1 hover:text-red-500">
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => openModal(day, time)}
                                                            className="w-full h-full min-h-[50px] flex items-center justify-center text-gray-300 hover:bg-gray-100 hover:text-gray-400 rounded border border-transparent border-dashed hover:border-gray-300 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400 bg-white rounded-lg border border-dashed">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>Select a class to view timetable</p>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md p-6">
                            <h3 className="font-bold text-lg mb-4">Edit Slot ({editingSlot?.day} @ {editingSlot?.time})</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subject</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedSubject}
                                        onChange={e => setSelectedSubject(e.target.value)}
                                    >
                                        <option value="">Select Subject...</option>
                                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Teacher</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedTeacher}
                                        onChange={e => setSelectedTeacher(e.target.value)}
                                        disabled={!selectedSubject}
                                    >
                                        <option value="">Select Teacher...</option>
                                        {availableTeachers.map((t: any) => (
                                            <option key={t.id} value={t.id}>{t.user?.name || t.name}</option>
                                            // Handle both flattened staff object and Teacher object
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                                    <Button onClick={handleSaveSlot}>Save</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};
