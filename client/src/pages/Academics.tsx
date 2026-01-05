import { BookOpen, Award, GraduationCap, ClipboardList, Calendar } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const Academics = () => {
    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Excellence in education through comprehensive curriculum and dedicated teaching
                    </p>
                </div>
            </section>

            {/* Junior & Senior Secondary */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Programs</h2>
                        <p className="text-gray-600">Comprehensive education from Grade 8 to Grade 12</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-4 text-2xl">Junior Secondary (Forms 1-2)</CardTitle>
                            <CardDescription className="text-base leading-relaxed mb-6">
                                Our Junior Secondary program follows the Zambian Competence-Based Curriculum (CBC),
                                providing a strong foundation in core subjects including Mathematics, English,
                                Science, Social Studies, and more. We prepare students for Grade 9 examinations.
                            </CardDescription>
                            <div className="space-y-3">
                                <h4 className="font-bold text-gray-900">Core Subjects:</h4>
                                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                    <li>• English</li>
                                    <li>• Mathematics</li>
                                    <li>• Integrated Science</li>
                                    <li>• Social Studies</li>
                                    <li>• CRE/IRE</li>
                                    <li>• ICT</li>
                                    <li>• Physical Education</li>
                                    <li>• Creative Arts</li>
                                </ul>
                            </div>
                        </Card>

                        <Card className="p-8 border-emerald-200">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <GraduationCap className="w-8 h-8 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-4 text-2xl">Senior Secondary (Grades 10-12)</CardTitle>
                            <CardDescription className="text-base leading-relaxed mb-6">
                                Our Senior Secondary program prepares learners for Examinations Council of Zambia (ECZ) examinations.
                                Learners choose specialized subject combinations aligned with their career goals.
                            </CardDescription>
                            <div className="space-y-3">
                                <h4 className="font-bold text-gray-900">Study Pathways:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <strong className="text-emerald-800">Science:</strong> Mathematics, Physics, Chemistry, Biology
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <strong className="text-emerald-800">Arts:</strong> Literature, History, Geography, CRE/IRE
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <strong className="text-emerald-800">Commercial:</strong> Accounts, Commerce, Economics
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Examinations Links */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Examinations & Assessments</h2>
                        <p className="text-gray-600">Preparing students for national examinations and tracking progress</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card className="text-center p-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ClipboardList className="w-6 h-6 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-3">Grade 9 Examination</CardTitle>
                            <CardDescription>
                                National assessment marking the completion of Junior Secondary education.
                            </CardDescription>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-3">Grade 12 Examination</CardTitle>
                            <CardDescription>
                                Final secondary school examination determining university entrance.
                            </CardDescription>
                        </Card>

                        <Card className="text-center p-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-6 h-6 text-emerald-800" />
                            </div>
                            <CardTitle className="mb-3">Continuous Assessment</CardTitle>
                            <CardDescription>
                                Regular 40% Continuous Assessment contribution to final grades.
                            </CardDescription>
                        </Card>
                    </div>

                    <div className="text-center">
                        <a href="/academics/assessment" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10 transition-colors">
                            View Detailed Assessment & Grading System
                        </a>
                    </div>
                </div>
            </section>

            {/* Timetable Link Section */}
            <section className="py-16 px-4 bg-emerald-50 border-y border-emerald-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">School Timetable & Daily Schedule</h2>
                    <p className="text-gray-700 mb-8 text-lg">
                        LDSS operates a dual-session system (Morning & Afternoon) to maximize learning opportunities for all grades.
                        Check the detailed bell schedule and session timings.
                    </p>
                    <a href="/academics/timetable" className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-emerald-50 transition-colors">
                        View Timetable Structure
                    </a>
                </div>
            </section>

            {/* Academic Support */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Academic Support Services</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Remedial Classes</h4>
                                        <p className="text-gray-600 text-sm">
                                            Extra support for students who need additional help in specific subjects
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Study Groups</h4>
                                        <p className="text-gray-600 text-sm">
                                            Peer-led study sessions to enhance collaborative learning
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Library Resources</h4>
                                        <p className="text-gray-600 text-sm">
                                            Access to textbooks, reference materials, and study guides
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Career Guidance</h4>
                                        <p className="text-gray-600 text-sm">
                                            Counseling services to help students plan their academic and career paths
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-emerald-800 text-white p-8 rounded-lg shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Academic Excellence</h3>
                            <p className="text-emerald-100 mb-6">
                                Our commitment to academic excellence is reflected in our consistent performance
                                in national examinations and the success of our graduates in higher education and
                                professional careers.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-900/50 p-4 rounded border border-emerald-700">
                                    <div className="text-3xl font-bold mb-1">95%</div>
                                    <div className="text-sm text-emerald-200">Pass Rate</div>
                                </div>
                                <div className="bg-emerald-900/50 p-4 rounded border border-emerald-700">
                                    <div className="text-3xl font-bold mb-1">30+</div>
                                    <div className="text-sm text-emerald-200">Qualified Teachers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Calendar */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Calendar 2026</h2>
                        <p className="text-gray-600">Key dates for the academic year</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { term: 'Term 1', dates: 'January - April', details: 'Opening: January 6 | Closing: April 10' },
                            { term: 'Term 2', dates: 'May - August', details: 'Opening: May 4 | Closing: August 14' },
                            { term: 'Term 3', dates: 'September - December', details: 'Opening: September 7 | Closing: December 18' }
                        ].map((term, index) => (
                            <div key={index} className="bg-white border-l-4 border-emerald-600 p-6 rounded shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-emerald-100 p-2 rounded-full">
                                            <Calendar className="w-5 h-5 text-emerald-800" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{term.term}</h4>
                                            <p className="text-emerald-800 font-semibold">{term.dates}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{term.details}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
