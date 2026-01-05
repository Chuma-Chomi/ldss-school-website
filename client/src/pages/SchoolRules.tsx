import { FileText, Clock, Shirt, Book } from 'lucide-react';
import { Card, CardTitle } from '../components/ui/Card';

export const SchoolRules = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">School Rules & Regulations</h1>
                    <p className="text-xl text-gray-600">
                        Maintaining discipline and a conducive learning environment
                    </p>
                </div>

                <div className="grid gap-6">
                    <Card className="border-l-4 border-emerald-600">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                                <Clock className="w-6 h-6 text-emerald-800" />
                            </div>
                            <div>
                                <CardTitle className="mb-2">1. Punctuality and Attendance</CardTitle>
                                <p className="text-gray-700 mb-2">
                                    All learners must be present at school by <strong>06:50 hours</strong> for the morning session
                                    and <strong>11:55 hours</strong> for the afternoon session.
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                                    <li>Latecomers will be subject to disciplinary action.</li>
                                    <li>Absenteeism requires a written letter from a parent/guardian.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-l-4 border-emerald-600">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                                <Shirt className="w-6 h-6 text-emerald-800" />
                            </div>
                            <div>
                                <CardTitle className="mb-2">2. School Uniform</CardTitle>
                                <p className="text-gray-700 mb-2">
                                    Learners must be in full, clean school uniform at all times within school premises.
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                                    <li><strong>Boys:</strong> White shirt, grey trousers, school tie, grey socks, black shoes.</li>
                                    <li><strong>Girls:</strong> White shirt, school skirt (appropriate length), white socks, black shoes.</li>
                                    <li>No jewelry or unauthorized accessories are allowed.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-l-4 border-emerald-600">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                                <FileText className="w-6 h-6 text-emerald-800" />
                            </div>
                            <div>
                                <CardTitle className="mb-2">3. General Conduct</CardTitle>
                                <p className="text-gray-700">
                                    Respect for staff, prefects, and fellow learners is mandatory. Bullying, fighting,
                                    and use of abusive language are strictly prohibited and punishable by suspension or expulsion.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-l-4 border-emerald-600">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                                <Book className="w-6 h-6 text-emerald-800" />
                            </div>
                            <div>
                                <CardTitle className="mb-2">4. Academic Commitment</CardTitle>
                                <p className="text-gray-700">
                                    Learners are expected to attend all classes, complete assignments on time, and
                                    participate actively in learning activities.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
