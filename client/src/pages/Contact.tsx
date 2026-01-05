import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact LDSS</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Located conveniently in Lavushimanda District, ready to serve the community.
                    </p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Contact Info Sidebar */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">School Address</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Physical Address</h3>
                                            <p className="text-gray-600 text-sm">Lukulu Day Secondary School</p>
                                            <p className="text-gray-600 text-sm">Great North Road (500m off main road)</p>
                                            <p className="text-gray-600 text-sm">Lavushimanda District</p>
                                            <p className="text-gray-600 text-sm">Muchinga Province, Zambia</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                                            <p className="text-gray-600 text-sm">Monday – Friday</p>
                                            <p className="text-gray-600 text-sm font-semibold">08:00 – 16:00</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Leadership Contacts</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Headteacher</p>
                                            <p className="font-bold text-gray-900">Mr. Muma Abraham</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Deputy Headteacher</p>
                                            <p className="font-bold text-gray-900">Mr. Mukisi Desmond</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-emerald-50 border border-emerald-100">
                                <h3 className="font-bold text-emerald-900 mb-2">Admission Inquiries</h3>
                                <p className="text-sm text-emerald-800 mb-3">
                                    For admission information, please visit the school office or contact us during office hours.
                                </p>
                                <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-100">
                                    Visit Admissions Page
                                </Button>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-3">
                            <Card className="p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button type="submit" variant="primary" className="w-full py-4 text-lg flex items-center justify-center gap-2">
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Find Us</h2>
                    <p className="text-gray-600 mb-8">Look for our signage on the Great North Road, Lavushimanda District.</p>
                    <Card className="overflow-hidden">
                        <div className="bg-gray-200 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 font-semibold">Interactive Map Area</p>
                                <p className="text-sm text-gray-500 mt-2">Exact coordinates to be embedded here</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};
