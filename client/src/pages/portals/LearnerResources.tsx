import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Search, BookOpen } from 'lucide-react';
import API_URL from '../../config/api';

interface Resource {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileType: string;
    subject: { name: string };
    createdAt: string;
}

export const LearnerResources = () => {
    const { token } = useAuth();
    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All');

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const res = await fetch(`${API_URL}/api/resources`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setResources(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter logic
    const filteredResources = resources.filter(res => {
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.subject.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = selectedSubject === 'All' || res.subject.name === selectedSubject;
        return matchesSearch && matchesSubject;
    });

    // Get unique subjects for filter dropdown
    const subjects = ['All', ...Array.from(new Set(resources.map(r => r.subject.name)))];

    const getFileIcon = (type: string) => {
        // Simple mapping, could be more specific
        return <FileText className="w-8 h-8 text-emerald-600" />;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/learner">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Study Resources</h1>
                            <p className="text-gray-500">Access notes, past papers, and assignments</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-8 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="p-2 border rounded-md"
                            value={selectedSubject}
                            onChange={e => setSelectedSubject(e.target.value)}
                        >
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </Card>

                {/* Resources Grid */}
                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading resources...</div>
                ) : filteredResources.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No resources found.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map(resource => (
                            <Card key={resource.id} className="p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-lg">
                                        {getFileIcon(resource.fileType)}
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {resource.fileType}
                                    </span>
                                </div>

                                <h3 className="font-bold text-gray-900 mb-1">{resource.title}</h3>
                                <p className="text-sm text-emerald-600 font-medium mb-2">{resource.subject.name}</p>

                                {resource.description && (
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{resource.description}</p>
                                )}

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <span className="text-xs text-gray-400">
                                        {new Date(resource.createdAt).toLocaleDateString()}
                                    </span>
                                    <a
                                        href={`${API_URL}${resource.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
