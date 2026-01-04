import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        We're here to help. Reach out to us with any questions or concerns
                    </p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Contact Info Sidebar */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Whether you're a prospective student, parent, or community member, we'd love to hear from you.
                                    Our team is ready to assist you with any inquiries.
                                </p>
                            </div>

                            <Card className="p-6">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                            <p className="text-gray-600 text-sm">+260 XXX XXX XXX</p>
                                            <p className="text-gray-600 text-sm">+260 XXX XXX XXX (Alternative)</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                            <p className="text-gray-600 text-sm">info@ldss.edu.zm</p>
                                            <p className="text-gray-600 text-sm">admissions@ldss.edu.zm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                                            <p className="text-gray-600 text-sm">Main Road, Lukulu</p>
                                            <p className="text-gray-600 text-sm">Western Province, Zambia</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                                            <p className="text-gray-600 text-sm">Monday - Friday: 08:00 - 15:00</p>
                                            <p className="text-gray-600 text-sm">Saturday - Sunday: Closed</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Quick Links */}
                            <Card className="p-6 bg-gray-50">
                                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                                <div className="space-y-2">
                                    <a href="/admissions" className="block text-emerald-800 hover:text-emerald-700 text-sm">
                                        → Admissions Information
                                    </a>
                                    <a href="/academics" className="block text-emerald-800 hover:text-emerald-700 text-sm">
                                        → Academic Programs
                                    </a>
                                    <a href="/news" className="block text-emerald-800 hover:text-emerald-700 text-sm">
                                        → Latest News
                                    </a>
                                </div>
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
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                placeholder="+260 XXX XXX XXX"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="admissions">Admissions Inquiry</option>
                                                <option value="academics">Academic Information</option>
                                                <option value="general">General Question</option>
                                                <option value="facilities">Facilities & Resources</option>
                                                <option value="other">Other</option>
                                            </select>
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
                                            placeholder="Type your message here..."
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
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
                        <p className="text-gray-600">Find us in Lukulu, Western Province</p>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="bg-gray-200 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">Map integration coming soon</p>
                                <p className="text-sm text-gray-500 mt-2">Lukulu Town, Western Province, Zambia</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Quick answers to common questions</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: 'What are your admission requirements?',
                                a: 'See our Admissions page for detailed requirements for Grade 8 and Grade 10 entry.'
                            },
                            {
                                q: 'What is the school fee structure?',
                                a: 'Fees vary by grade level. Contact our office or visit the Admissions page for current rates.'
                            },
                            {
                                q: 'Do you offer boarding facilities?',
                                a: 'No, LDSS is a day school. Students commute daily from home.'
                            },
                            {
                                q: 'What subjects are offered for Grade 12?',
                                a: 'We offer Science, Arts, and Commercial pathways. See our Academics page for details.'
                            }
                        ].map((faq, index) => (
                            <Card key={index} className="p-6">
                                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                                <p className="text-gray-600 text-sm">{faq.a}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
