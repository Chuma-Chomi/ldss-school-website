import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export const SystemSettings = () => {
    const { token } = useAuth();
    const [settings, setSettings] = useState({
        schoolName: 'Lukulu Day Secondary School',
        address: 'P.O. Box 920002, Lukulu, Zambia',
        phone: '+260 97 000 0000',
        email: 'info@lukuluday.edu.zm',
        currentTerm: '1',
        currentYear: '2026'
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings', { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                if (Object.keys(data).length > 0) setSettings(prev => ({ ...prev, ...data }));
            }
        } catch (e) { console.error(e); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(settings)
            });
            if (res.ok) alert('Settings saved successfully!');
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                        <p className="text-gray-500">Global configuration</p>
                    </div>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">School Name</label>
                            <input name="schoolName" className="w-full p-2 border rounded" value={settings.schoolName} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input name="address" className="w-full p-2 border rounded" value={settings.address} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input name="phone" className="w-full p-2 border rounded" value={settings.phone} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input name="email" className="w-full p-2 border rounded" value={settings.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t pt-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Term</label>
                                <input name="currentTerm" className="w-full p-2 border rounded" value={settings.currentTerm} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Year</label>
                                <input name="currentYear" className="w-full p-2 border rounded" value={settings.currentYear} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading}>
                                <Save className="w-4 h-4 mr-2" />
                                {isLoading ? 'Saving...' : 'Save Configuration'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
