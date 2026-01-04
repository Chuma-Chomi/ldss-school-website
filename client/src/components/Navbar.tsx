import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/Button';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 w-full z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="LDSS Logo" className="w-12 h-12 object-contain" />
                        <span className="text-lg font-bold text-emerald-900">Lukulu Day Secondary School</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-emerald-800 transition-colors">Home</Link>
                        <Link to="/academics" className="text-gray-700 hover:text-emerald-800 transition-colors">Academics</Link>
                        <Link to="/departments" className="text-gray-700 hover:text-emerald-800 transition-colors">Departments</Link>
                        <Link to="/admissions" className="text-gray-700 hover:text-emerald-800 transition-colors">Admissions</Link>
                        <Link to="/news" className="text-gray-700 hover:text-emerald-800 transition-colors">News</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-emerald-800 transition-colors">Contact</Link>
                        <Link to="/login">
                            <Button variant="primary" size="sm">Portals</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
                    <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                        <Link
                            to="/"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/academics"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Academics
                        </Link>
                        <Link
                            to="/departments"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Departments
                        </Link>
                        <Link
                            to="/admissions"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Admissions
                        </Link>
                        <Link
                            to="/news"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            to="/contact"
                            className="text-2xl text-gray-700 hover:text-emerald-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="primary" size="lg" className="w-48">Portals</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
