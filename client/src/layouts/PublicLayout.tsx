import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer className="bg-emerald-900 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Excellence Statement */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Excellence in Education</h4>
                        <p className="text-emerald-100 text-sm leading-relaxed">
                            Lukulu Day Secondary School is committed to nurturing academic excellence,
                            character development, and holistic growth for every student in our community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-emerald-100 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/academics" className="hover:text-white transition-colors">Academics</a></li>
                            <li><a href="/admissions" className="hover:text-white transition-colors">Admissions</a></li>
                            <li><a href="https://www.examinationscouncil.org.zm/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ECZ Portal</a></li>
                            <li><a href="https://www.tsc.gov.zm/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TCZ Portal</a></li>
                            <li><a href="https://pmec.edu.zm/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PMEC Portal</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                        <div className="mt-6 text-emerald-100 text-sm">
                            <p>Email: info@ldss.edu.zm</p>
                            <p>Phone: +260 XXX XXX XXX</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-emerald-800 text-center text-emerald-200 text-sm">
                    <p>&copy; {new Date().getFullYear()} Lukulu Day Secondary School. All rights reserved.</p>
                    <p className="mt-2 text-xs">Developed by Kahyata Gift Kataka</p>
                </div>
            </footer>
        </div>
    );
};
