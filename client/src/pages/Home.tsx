import { useState } from 'react';
import { BookOpen, Users, Award, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';


export const Home = () => {
    const [activeTab, setActiveTab] = useState('academics');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/90 z-10"></div>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}></div>

                {/* Content */}
                <div className="relative z-20 max-w-4xl mx-auto px-4">
                    {/* School Crest */}
                    <div className="w-32 h-32 mx-auto mb-6">
                        <img src="/logo.png" alt="LDSS School Crest" className="w-full h-full object-contain drop-shadow-lg" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Lukulu Day Secondary School
                    </h1>
                    <p className="text-2xl text-emerald-100 mb-6 font-semibold">
                        Soar High like an Eagle for Clear Vision
                    </p>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                        Empowering students through quality education, character development, and academic excellence
                        in the heart of Lukulu District.
                    </p>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-emerald-800">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* About & Leadership Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* About */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our School</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Lukulu Day Secondary School is a government-aided educational institution located in
                                Lukulu District, Western Province of Zambia. Established to provide quality secondary
                                education, we serve students from across the district and beyond.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our school is committed to academic excellence, character development, and preparing
                                students for higher education and productive citizenship.
                            </p>

                            {/* Mission & Vision */}
                            <div className="mt-8 space-y-4">
                                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4">
                                    <h3 className="font-bold text-emerald-900 mb-2">Our Mission</h3>
                                    <p className="text-gray-700 text-sm">
                                        To provide quality, inclusive, and holistic education that empowers learners
                                        to reach their full potential and become responsible global citizens.
                                    </p>
                                </div>
                                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4">
                                    <h3 className="font-bold text-emerald-900 mb-2">Our Vision</h3>
                                    <p className="text-gray-700 text-sm">
                                        To be a center of academic excellence that nurtures innovative, ethical,
                                        and skilled individuals prepared for the challenges of the 21st century.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Leadership */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">School Leadership</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-emerald-800" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Headteacher</h4>
                                        <p className="text-emerald-800 font-semibold">Mr./Mrs. [Name]</p>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Leading the school with vision and commitment to excellence
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-emerald-800" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Deputy Headteacher</h4>
                                        <p className="text-emerald-800 font-semibold">Mr./Mrs. [Name]</p>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Supporting academic programs and student development
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-emerald-800">500+</div>
                                    <div className="text-sm text-gray-600 mt-1">Students</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl font-bold text-emerald-800">30+</div>
                                    <div className="text-sm text-gray-600 mt-1">Teachers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Discover Section (Tabbed) */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Our School</h2>
                        <p className="text-gray-600">Explore what makes LDSS a great place to learn and grow</p>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['academics', 'facilities', 'co-curricular', 'staff', 'resources', 'gallery'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === tab
                                    ? 'bg-emerald-800 text-white'
                                    : 'bg-white text-gray-700 hover:bg-emerald-50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        {activeTab === 'academics' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                        <BookOpen className="w-6 h-6 text-emerald-800" />
                                    </div>
                                    <CardTitle className="mb-3">Junior Secondary (Grades 8-9)</CardTitle>
                                    <CardDescription className="leading-relaxed">
                                        Our Junior Secondary program follows the Zambian national curriculum,
                                        providing a strong foundation in core subjects including Mathematics, English,
                                        Science, Social Studies, and more. We prepare students for Grade 9 examinations.
                                    </CardDescription>
                                </Card>
                                <Card>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                                        <Award className="w-6 h-6 text-emerald-800" />
                                    </div>
                                    <CardTitle className="mb-3">Senior Secondary (Grades 10-12)</CardTitle>
                                    <CardDescription className="leading-relaxed">
                                        Students in our Senior Secondary program choose from Science, Arts, and Commercial
                                        pathways, preparing for ECZ examinations. We maintain high academic standards and
                                        provide comprehensive support for university preparation.
                                    </CardDescription>
                                </Card>
                            </div>
                        )}
                        {activeTab === 'facilities' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Facilities</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-semibold text-emerald-800">📚 Library</p>
                                        <p className="text-sm text-gray-600 mt-1">Well-stocked with books and resources</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-semibold text-emerald-800">🔬 Science Labs</p>
                                        <p className="text-sm text-gray-600 mt-1">Modern equipment for practical learning</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="font-semibold text-emerald-800">💻 Computer Lab</p>
                                        <p className="text-sm text-gray-600 mt-1">ICT resources for digital literacy</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'co-curricular' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Co-Curricular Activities</h3>
                                <p className="text-gray-600 mb-4">
                                    We offer a wide range of activities to develop well-rounded students:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-800 mb-2">Sports</h4>
                                        <ul className="text-gray-600 space-y-1 text-sm">
                                            <li>• Football</li>
                                            <li>• Netball</li>
                                            <li>• Athletics</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-800 mb-2">Clubs & Societies</h4>
                                        <ul className="text-gray-600 space-y-1 text-sm">
                                            <li>• Debate Club</li>
                                            <li>• Science Club</li>
                                            <li>• Drama & Music</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'staff' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Teaching Staff</h3>
                                <p className="text-gray-600">
                                    Our dedicated team of qualified teachers brings passion and expertise to the classroom.
                                    With a student-teacher ratio that ensures personalized attention, we maintain high
                                    standards of instruction across all subject areas.
                                </p>
                            </div>
                        )}
                        {activeTab === 'resources' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Resources</h3>
                                <p className="text-gray-600 mb-4">
                                    We provide comprehensive learning materials including textbooks, digital resources,
                                    and supplementary materials to support student success.
                                </p>
                            </div>
                        )}
                        {activeTab === 'gallery' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>
                                <p className="text-gray-600">
                                    Coming soon: Photos showcasing school life, events, and achievements.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* News & Announcements */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
                        <p className="text-gray-600">Stay updated with school events and announcements</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <div className="text-emerald-800 text-sm font-semibold mb-2">January 5, 2026</div>
                            <CardTitle className="mb-3">Term 1 Opening</CardTitle>
                            <CardDescription className="mb-4">
                                The first term of the 2026 academic year begins. All students are expected to report
                                on time with all required materials.
                            </CardDescription>
                            <a href="#" className="text-emerald-800 font-semibold text-sm hover:text-emerald-700">
                                Read More →
                            </a>
                        </Card>
                        <Card>
                            <div className="text-emerald-800 text-sm font-semibold mb-2">December 15, 2025</div>
                            <CardTitle className="mb-3">Grade 12 Results</CardTitle>
                            <CardDescription className="mb-4">
                                Congratulations to our Grade 12 class on their outstanding performance in the ECZ
                                examinations. Full results available at the school office.
                            </CardDescription>
                            <a href="#" className="text-emerald-800 font-semibold text-sm hover:text-emerald-700">
                                Read More →
                            </a>
                        </Card>
                        <Card>
                            <div className="text-emerald-800 text-sm font-semibold mb-2">December 1, 2025</div>
                            <CardTitle className="mb-3">New Science Lab Opened</CardTitle>
                            <CardDescription className="mb-4">
                                We are proud to announce the opening of our new, state-of-the-art Science laboratory,
                                enhancing learning opportunities for all students.
                            </CardDescription>
                            <a href="#" className="text-emerald-800 font-semibold text-sm hover:text-emerald-700">
                                Read More →
                            </a>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Admissions Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Admissions</h2>
                        <p className="text-gray-600">How to Apply</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { step: 1, title: 'Obtain Application Form', desc: 'Visit the school office to collect an application form or download it from our website.' },
                            { step: 2, title: 'Complete the Form', desc: 'Fill in all required information accurately and attach necessary documents (birth certificate, Grade 7 results, etc.).' },
                            { step: 3, title: 'Submit Application', desc: 'Return the completed form to the school office before the deadline. Application fees may apply.' },
                            { step: 4, title: 'Wait for Response', desc: 'The school will review applications and notify successful candidates. Keep your contact information current.' }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-emerald-800 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600">Get in touch with us</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-emerald-800" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                    <p className="text-gray-600">+260 XXX XXX XXX</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-emerald-800" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600">info@ldss.edu.zm</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <Button type="submit" variant="primary" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
