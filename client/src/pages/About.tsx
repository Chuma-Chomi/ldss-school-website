import { Card } from '../components/ui/Card';
import { Target, Heart, Award, Users } from 'lucide-react';

export const About = () => {
    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About LDSS</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Building futures through quality education and character development
                    </p>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600">
                                To be a center of academic excellence that nurtures innovative, ethical, and skilled
                                individuals prepared for the challenges of the 21st century.
                            </p>
                        </Card>

                        <Card className="p-8 text-center border-emerald-200">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                To provide quality, inclusive, and holistic education that empowers learners to reach
                                their full potential and become responsible global citizens.
                            </p>
                        </Card>

                        <Card className="p-8 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
                            <p className="text-gray-600">
                                Integrity, Respect, Excellence, Innovation, and Inclusivity guide everything we do
                                at Lukulu Day Secondary School.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Lukulu Day Secondary School was established to provide accessible, quality secondary
                                    education to the youth of Lukulu District and surrounding areas in Western Province, Zambia.
                                </p>
                                <p>
                                    From our humble beginnings, we have grown into a respected institution known for
                                    academic excellence, strong moral values, and comprehensive student development. Our
                                    dedicated teachers and modern facilities support students in achieving their full potential.
                                </p>
                                <p>
                                    Today, LDSS serves hundreds of students from Grades 8 through 12, preparing them for
                                    higher education and meaningful careers through our rigorous curriculum and supportive
                                    learning environment.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-8">
                            <h3 className="text-2xl font-bold text-emerald-800 mb-6">School Motto</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-4 italic">
                                "Soar High like an Eagle for Clear Vision"
                            </p>
                            <p className="text-gray-600">
                                This motto inspires our students to rise above challenges, maintain focus on their goals,
                                and pursue excellence in all their endeavors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* School Statistics */}
            <section className="py-16 px-4 bg-emerald-800 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">LDSS at a Glance</h2>
                        <p className="text-emerald-100">Key facts about our school community</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">500+</div>
                            <div className="text-emerald-200">Students Enrolled</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">30+</div>
                            <div className="text-emerald-200">Qualified Teachers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">95%</div>
                            <div className="text-emerald-200">Pass Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold mb-2">6</div>
                            <div className="text-emerald-200">Academic Departments</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">School Leadership</h2>
                        <p className="text-gray-600">Meet the dedicated team leading our school</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="w-10 h-10 text-emerald-800" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl mb-2">Headteacher</h3>
                                    <p className="text-emerald-800 font-semibold mb-3">Mr./Mrs. [Name]</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Leading the school with vision, dedication, and a commitment to academic excellence
                                        and student development.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="w-10 h-10 text-emerald-800" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl mb-2">Deputy Headteacher</h3>
                                    <p className="text-emerald-800 font-semibold mb-3">Mr./Mrs. [Name]</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Supporting academic programs, student welfare, and the overall smooth operation
                                        of the school.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Community Impact */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Community Focused</h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        At LDSS, we believe in nurturing well-rounded individuals who will contribute positively to
                        society. Beyond academics, we engage with the local community through outreach programs,
                        cultural events, and partnerships that benefit both our students and the broader Lukulu District.
                    </p>
                    <a
                        href="/admissions"
                        className="inline-block bg-emerald-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                        Join Our Community
                    </a>
                </div>
            </section>
        </div>
    );
};
