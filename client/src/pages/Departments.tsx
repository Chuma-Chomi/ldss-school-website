import { BookOpen, Monitor, FlaskConical, Globe, Utensils, Briefcase, Palette } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const Departments = () => {
    const departments = [
        {
            id: 'languages',
            title: 'Literature & Languages Department',
            mission: 'Developing communication excellence and cultural appreciation',
            icon: BookOpen,
            junior: [
                'English Language',
                'Literature in English',
                'Zambian Languages (Icibemba, Chitonga, Cinyanja, Silozi, Lunda, Luvale, Kiikaonde)',
                'Literature in Zambian Languages',
                'French, Chinese, Portuguese, Swahili'
            ],
            senior: [
                '1121 English',
                '2011 Literature in English',
                '3147-3160 Zambian Languages',
                '3016 French',
                '3017 Chinese'
            ]
        },
        {
            id: 'math-cs',
            title: 'Mathematics & Computer Science',
            mission: 'Building analytical thinking and digital literacy',
            icon: Monitor,
            junior: [
                'Mathematics I (Foundational)',
                'Mathematics II (Advanced)',
                'Computer Science',
                'ICT'
            ],
            senior: [
                '4024 Mathematics',
                '4030 Additional Mathematics',
                '7010 Computer Studies',
                'ICT'
            ]
        },
        {
            id: 'science',
            title: 'Natural Sciences Department',
            mission: 'Exploring the natural world through inquiry and experimentation',
            icon: FlaskConical,
            junior: [
                'Physics',
                'Chemistry',
                'Biology',
                'Agricultural Science'
            ],
            senior: [
                '5054 Physics',
                '5070 Chemistry',
                '5090 Biology',
                '5037 Agricultural Science',
                '5124 Combined Science'
            ]
        },
        {
            id: 'social',
            title: 'Social Sciences Department',
            mission: 'Understanding society, culture, and civic responsibility',
            icon: Globe,
            junior: [
                'Civic Education',
                'Geography',
                'History',
                'Religious Education'
            ],
            senior: [
                '2030 Civic Education',
                '2218 Geography',
                '2167 History',
                '2044/2046 Religious Education (A/B)'
            ]
        },
        {
            id: 'home-economics',
            title: 'Home Economics Department',
            mission: 'Developing practical life skills and self-sufficiency',
            icon: Utensils,
            junior: [
                'Food & Nutrition',
                'Home Management',
                'Fashion & Fabrics'
            ],
            senior: [
                '6065 Food & Nutrition',
                '6075 Home Management',
                '6050 Fashion & Fabrics'
            ]
        },
        {
            id: 'business',
            title: 'Business & Finance Department',
            mission: 'Preparing future entrepreneurs and business leaders',
            icon: Briefcase,
            junior: [
                'Commerce',
                'Principles of Accounts'
            ],
            senior: [
                '7100 Commerce',
                '7110 Principles of Accounts'
            ]
        },
        {
            id: 'arts',
            title: 'Expressive Arts Department',
            mission: 'Nurturing creativity, physical wellness, and artistic expression',
            icon: Palette,
            junior: [
                'Design & Technology',
                'Musical Arts',
                'Art & Design',
                'Physical Education'
            ],
            senior: [
                '6045 Design & Technology',
                '6020 Music',
                '6010 Art & Design',
                '6080 Physical Education'
            ]
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">The 7-Department Academic Engine</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our curriculum is organized into 7 comprehensive departments, offering a wide range of subjects
                        from Forms 1-2 (Junior Secondary) through Grades 10-12 (Senior Secondary).
                    </p>
                </div>

                <div className="grid gap-8">
                    {departments.map((dept) => (
                        <Card key={dept.id} className="relative overflow-hidden border-t-4 border-emerald-600">
                            <div className="grid md:grid-cols-[1fr,2fr] gap-8">
                                <div className="bg-emerald-50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                    <dept.icon className="w-16 h-16 text-emerald-800 mb-4" />
                                    <CardTitle className="mb-2">{dept.title}</CardTitle>
                                    <p className="text-sm text-emerald-800 font-semibold italic">"{dept.mission}"</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Junior Secondary (Forms 1-2)</h4>
                                        <ul className="space-y-2">
                                            {dept.junior.map((subject, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                                                    <span className="text-emerald-500 mt-1">•</span>
                                                    {subject}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-3 border-b pb-2">Senior Secondary (Grades 10-12)</h4>
                                        <ul className="space-y-2">
                                            {dept.senior.map((subject, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                                                    <span className="text-emerald-500 mt-1">•</span>
                                                    {subject}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
