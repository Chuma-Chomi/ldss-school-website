import { Atom, Globe, Calculator, BookText, DollarSign, Palette, Users } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const Departments = () => {
    const departments = [
        {
            name: 'Sciences',
            icon: Atom,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            subjects: ['Physics', 'Chemistry', 'Biology', 'General Science'],
            description: 'Our Science department equips students with practical and theoretical knowledge in natural sciences, preparing them for careers in medicine, engineering, and scientific research.'
        },
        {
            name: 'Mathematics',
            icon: Calculator,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            subjects: ['Pure Mathematics', 'Applied Mathematics', 'Statistics'],
            description: 'The Mathematics department fosters logical thinking and problem-solving skills essential for various academic and professional pursuits.'
        },
        {
            name: 'Languages',
            icon: BookText,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            subjects: ['English Language', 'Literature in English', 'Local Languages'],
            description: 'Our Languages department develops communication skills, literary appreciation, and cultural understanding through comprehensive language education.'
        },
        {
            name: 'Social Studies',
            icon: Globe,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            subjects: ['History', 'Geography', 'Civic Education', 'Religious Education'],
            description: 'The Social Studies department helps students understand society, culture, and the world around them, fostering responsible citizenship.'
        },
        {
            name: 'Commercial Studies',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            subjects: ['Accounts', 'Commerce', 'Economics', 'Business Studies'],
            description: 'Our Commercial department prepares students for careers in business, finance, and entrepreneurship with practical business education.'
        },
        {
            name: 'Creative Arts',
            icon: Palette,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100',
            subjects: ['Visual Arts', 'Music', 'Drama', 'Design'],
            description: 'The Creative Arts department nurtures creativity and self-expression through various artistic disciplines and practical projects.'
        }
    ];

    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Departments</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Specialized departments delivering excellence in every subject area
                    </p>
                </div>
            </section>

            {/* Departments Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Departments</h2>
                        <p className="text-gray-600">
                            Expert teachers and comprehensive curricula across all subject areas
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, index) => {
                            const Icon = dept.icon;
                            return (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className={`w-14 h-14 ${dept.bgColor} rounded-full flex items-center justify-center mb-4`}>
                                        <Icon className={`w-7 h-7 ${dept.color}`} />
                                    </div>
                                    <CardTitle className="mb-3 text-xl">{dept.name}</CardTitle>
                                    <CardDescription className="mb-4 text-base leading-relaxed">
                                        {dept.description}
                                    </CardDescription>
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Subjects Offered</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dept.subjects.map((subject, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Department Heads Info */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Leadership</h2>
                        <p className="text-gray-600">
                            Experienced educators leading each academic department
                        </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm">
                        <p className="text-gray-600 text-center mb-8">
                            Each department is led by an experienced Head of Department (HOD) who coordinates
                            curriculum delivery, teacher development, and student support within their subject area.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {departments.map((dept, index) => {
                                const Icon = dept.icon;
                                return (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className={`w-12 h-12 ${dept.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`w-6 h-6 ${dept.color}`} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{dept.name} HOD</h4>
                                            <p className="text-sm text-gray-600">Mr./Mrs. [Name]</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities by Department */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Facilities</h2>
                        <p className="text-gray-600">
                            Specialized learning spaces supporting each academic area
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Atom className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Science Laboratories</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Fully equipped labs for Physics, Chemistry, and Biology practical work
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li>• Modern equipment and apparatus</li>
                                        <li>• Safety equipment and protocols</li>
                                        <li>• Supervised practical sessions</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Calculator className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Mathematics Classrooms</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Dedicated spaces with teaching aids and problem-solving resources
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li>• Interactive whiteboards</li>
                                        <li>• Mathematical instruments</li>
                                        <li>• Reference materials</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <BookText className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Library & Reading Room</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Extensive collection of literature, reference books, and study materials
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li>• Fiction and non-fiction books</li>
                                        <li>• Quiet study spaces</li>
                                        <li>• Research resources</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Palette className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Arts Studio</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        Creative space for visual arts, music, and performance activities
                                    </p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        <li>• Art supplies and materials</li>
                                        <li>• Musical instruments</li>
                                        <li>• Exhibition space</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-emerald-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Users className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
                    <h2 className="text-3xl font-bold mb-4">Join Our Academic Community</h2>
                    <p className="text-emerald-100 mb-8 text-lg">
                        Our dedicated teachers and comprehensive programs are ready to support your academic journey
                    </p>
                    <a
                        href="/admissions"
                        className="inline-block bg-white text-emerald-800 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                    >
                        Learn About Admissions
                    </a>
                </div>
            </section>
        </div>
    );
};
