import { Compass, Briefcase, GraduationCap, Users } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const CareerGuidance = () => {
    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Guidance & Counseling</h1>
                    <p className="text-xl text-gray-600">
                        Helping learners navigate their path to a successful future
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card className="p-6 bg-emerald-50 border-emerald-100">
                        <div className="flex items-center gap-4 mb-4">
                            <Compass className="w-10 h-10 text-emerald-700" />
                            <CardTitle>Our Mission</CardTitle>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            To empower students with self-knowledge, educational information, and career planning skills
                            that will enable them to make informed decisions about their future education and career choices.
                        </p>
                    </Card>
                    <Card className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Users className="w-10 h-10 text-emerald-700" />
                            <CardTitle>Counseling Services</CardTitle>
                        </div>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Individual career counseling</li>
                            <li>• University selection guidance</li>
                            <li>• Subject combination advice (Grade 9 to 10)</li>
                            <li>• Psychosocial support</li>
                        </ul>
                    </Card>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pathways to Success</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <GraduationCap className="w-8 h-8 text-emerald-700 mb-4" />
                        <CardTitle className="mb-2">University Education</CardTitle>
                        <CardDescription>
                            Guidance on requirements for public and private universities in Zambia and abroad.
                        </CardDescription>
                    </Card>
                    <Card>
                        <Briefcase className="w-8 h-8 text-emerald-700 mb-4" />
                        <CardTitle className="mb-2">Vocational Training</CardTitle>
                        <CardDescription>
                            Information on TEVETA institutions and skills training programs.
                        </CardDescription>
                    </Card>
                    <Card>
                        <Compass className="w-8 h-8 text-emerald-700 mb-4" />
                        <CardTitle className="mb-2">Entrepreneurship</CardTitle>
                        <CardDescription>
                            Encouraging innovation and self-employment skills for the modern economy.
                        </CardDescription>
                    </Card>
                </div>
            </div>
        </div>
    );
};
