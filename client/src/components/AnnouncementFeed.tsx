import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './ui/Card';
import { Bell, Calendar, Tag } from 'lucide-react';

interface Announcement {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

export const AnnouncementFeed = ({ limit }: { limit?: number }) => {
    const { token } = useAuth();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(limit ? data.slice(0, limit) : data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category?.toUpperCase()) {
            case 'ACADEMIC': return 'bg-blue-100 text-blue-700';
            case 'EVENTS': return 'bg-purple-100 text-purple-700';
            case 'EMERGENCY': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (isLoading) return <div className="text-center p-4">Loading announcements...</div>;

    if (announcements.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
                <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500 text-sm">No recent announcements</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {announcements.map((item) => (
                <div key={item.id} className="p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${getCategoryColor(item.category)}`}>
                            {item.category}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 ml-0">{item.content}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
