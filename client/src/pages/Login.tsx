import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardTitle } from '../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
    const [role, setRole] = useState<'ADMIN' | 'STAFF' | 'LEARNER' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) return;

        setError('');
        setIsLoading(true);

        try {
            await login(email, password);

            // Navigate based on role
            const portalRoutes = {
                ADMIN: '/admin',
                STAFF: '/staff',
                LEARNER: '/learner'
            };

            navigate(portalRoutes[role]);
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4">
                        <img src="/logo.png" alt="LDSS Logo" className="w-12 h-12 object-contain" />
                        <span className="text-2xl font-black text-white">LDSS Portals</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-white">Secure Access</h2>
                    <p className="text-emerald-100 mt-2">Login to your portal</p>
                </div>

                <AnimatePresence mode="wait">
                    {!role ? (
                        <motion.div
                            key="role-selection"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <p className="text-emerald-100 text-center mb-6">Select your portal to continue</p>
                            <RoleCard
                                icon={<Shield className="w-6 h-6 text-red-500" />}
                                title="Admin Portal"
                                subtitle="System & User Management"
                                onClick={() => setRole('ADMIN')}
                            />
                            <RoleCard
                                icon={<Users className="w-6 h-6 text-blue-500" />}
                                title="Staff Portal"
                                subtitle="Academic & Student Records"
                                onClick={() => setRole('STAFF')}
                            />
                            <RoleCard
                                icon={<GraduationCap className="w-6 h-6 text-yellow-500" />}
                                title="Learner Portal"
                                subtitle="Results & Study Resources"
                                onClick={() => setRole('LEARNER')}
                            />
                            <Link to="/" className="block text-center text-emerald-200 text-sm hover:underline mt-8">
                                ← Back to home
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setRole(null);
                                            setError('');
                                            setEmail('');
                                            setPassword('');
                                        }}
                                        className="p-2 h-auto text-xs hover:bg-emerald-50"
                                    >
                                        ← Back
                                    </Button>
                                    <span className="text-gray-700 text-sm font-bold uppercase tracking-widest">
                                        {role} Login
                                    </span>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm text-gray-700 font-semibold block ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
                                            placeholder="name@example.com"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm text-gray-700 font-semibold block ml-1">Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-medium"
                                                placeholder="••••••••"
                                                required
                                                disabled={isLoading}
                                            />
                                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full py-4 text-lg rounded-xl shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                Sign In <ArrowRight className="ml-2 w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-8 text-center">
                                    <a href="#" className="text-emerald-700 text-sm font-medium hover:text-emerald-800 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const RoleCard = ({ icon, title, subtitle, onClick }: {
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onClick: () => void
}) => (
    <Card
        hover
        className="flex items-center gap-5 cursor-pointer group hover:scale-[1.02] active:scale-95 bg-white border-emerald-200"
        onClick={onClick}
    >
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
            {icon}
        </div>
        <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-emerald-800 transition-colors">{title}</CardTitle>
            <div className="text-gray-500 text-xs mt-0.5">{subtitle}</div>
        </div>
        <ArrowRight className="text-gray-400 group-hover:text-emerald-600 transition-colors" />
    </Card>
);
