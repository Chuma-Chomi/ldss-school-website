import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Send, Inbox, User, Clock, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
    id: string;
    subject: string;
    content: string;
    isRead: boolean;
    createdAt: string;
    sender?: { name: string; email: string; role: string };
    receiver?: { name: string; email: string; role: string };
}

interface Recipient {
    id: string;
    name: string;
    email: string;
    role: string;
}

export const Messages = () => {
    const { token, user } = useAuth();
    const [view, setView] = useState<'inbox' | 'sent'>('inbox');
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isComposing, setIsComposing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Compose State
    const [recipientSearch, setRecipientSearch] = useState('');
    const [searchResults, setSearchResults] = useState<Recipient[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchMessages();
    }, [view]);

    // Search recipients debounce
    useEffect(() => {
        if (!recipientSearch || selectedRecipient) {
            setSearchResults([]);
            return;
        }
        const timer = setTimeout(searchUsers, 500);
        return () => clearTimeout(timer);
    }, [recipientSearch]);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const endpoint = view === 'inbox' ? 'inbox' : 'sent';
            const res = await fetch(`/api/messages/${endpoint}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setMessages(await res.json());
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const searchUsers = async () => {
        try {
            const res = await fetch(`/api/messages/recipients?q=${recipientSearch}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setSearchResults(await res.json());
        } catch (e) { console.error(e); }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRecipient) return;

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiverId: selectedRecipient.id,
                    subject,
                    content
                })
            });

            if (res.ok) {
                alert('Message sent!');
                setIsComposing(false);
                setSubject('');
                setContent('');
                setSelectedRecipient(null);
                setRecipientSearch('');
                if (view === 'sent') fetchMessages();
            } else {
                alert('Failed to send');
            }
        } catch (e) { console.error(e); }
    };

    const handleSelectMessage = async (msg: Message) => {
        setSelectedMessage(msg);
        // Mark read if inbox and unread
        if (view === 'inbox' && !msg.isRead) {
            try {
                await fetch(`/api/messages/${msg.id}/read`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                // Update local state
                setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
            } catch (e) { console.error(e); }
        }
    };

    const getRoleBadge = (role?: string) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-700';
            case 'STAFF': return 'bg-blue-100 text-blue-700';
            case 'LEARNER': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-[calc(100vh-64px)] md:h-screen sticky top-0">
                <div className="mb-6">
                    <Link to={user?.role === 'LEARNER' ? '/learner' : user?.role === 'STAFF' ? '/staff' : '/admin'}>
                        <Button variant="ghost" size="sm" className="mb-4 -ml-2">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            To Dashboard
                        </Button>
                    </Link>
                    <Button className="w-full justify-start gap-2" onClick={() => setIsComposing(true)}>
                        <Send className="w-4 h-4" />
                        Compose
                    </Button>
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => { setView('inbox'); setSelectedMessage(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'inbox' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Inbox className="w-4 h-4" />
                        Inbox
                    </button>
                    <button
                        onClick={() => { setView('sent'); setSelectedMessage(null); }}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'sent' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Send className="w-4 h-4" />
                        Sent
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {isComposing ? (
                    <Card className="max-w-2xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">New Message</h2>
                            <Button variant="ghost" size="sm" onClick={() => setIsComposing(false)}>Cancel</Button>
                        </div>
                        <form onSubmit={handleSend} className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">To:</label>
                                {selectedRecipient ? (
                                    <div className="flex items-center justify-between p-2 border rounded bg-emerald-50 border-emerald-200">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-emerald-600" />
                                            <span>{selectedRecipient.name} ({selectedRecipient.role})</span>
                                        </div>
                                        <button type="button" onClick={() => { setSelectedRecipient(null); setRecipientSearch(''); }} className="text-gray-400 hover:text-red-500">
                                            &times;
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                            <input
                                                className="w-full pl-9 p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                                placeholder="Search user name or email..."
                                                value={recipientSearch}
                                                onChange={e => setRecipientSearch(e.target.value)}
                                            />
                                        </div>
                                        {searchResults.length > 0 && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                {searchResults.map(u => (
                                                    <div
                                                        key={u.id}
                                                        className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                                                        onClick={() => { setSelectedRecipient(u); setSearchResults([]); }}
                                                    >
                                                        <div>
                                                            <p className="font-medium text-sm text-gray-900">{u.name}</p>
                                                            <p className="text-xs text-gray-500">{u.email}</p>
                                                        </div>
                                                        <span className={`text-[10px] px-2 py-1 rounded font-bold ${getRoleBadge(u.role)}`}>{u.role}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                                    required
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none h-48 resize-none"
                                    required
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Send Message</Button>
                            </div>
                        </form>
                    </Card>
                ) : selectedMessage ? (
                    <Card className="max-w-3xl mx-auto p-6 h-full">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)} className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to {view}
                        </Button>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>
                                        {view === 'inbox' ? `From: ${selectedMessage.sender?.name}` : `To: ${selectedMessage.receiver?.name}`}
                                    </span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${getRoleBadge(view === 'inbox' ? selectedMessage.sender?.role : selectedMessage.receiver?.role)}`}>
                                        {view === 'inbox' ? selectedMessage.sender?.role : selectedMessage.receiver?.role}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(selectedMessage.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                            {selectedMessage.content}
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{view}</h2>
                        {messages.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                                <Inbox className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                <p>No messages found</p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div
                                    key={msg.id}
                                    onClick={() => handleSelectMessage(msg)}
                                    className={`p-4 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${!msg.isRead && view === 'inbox' ? 'border-l-4 border-l-emerald-500' : 'border-gray-200'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-semibold ${!msg.isRead && view === 'inbox' ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {view === 'inbox' ? msg.sender?.name : `To: ${msg.receiver?.name}`}
                                            </span>
                                            {!msg.isRead && view === 'inbox' && (
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className={`text-sm mb-1 ${!msg.isRead && view === 'inbox' ? 'font-bold text-gray-800' : 'text-gray-700'}`}>
                                        {msg.subject}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">{msg.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
