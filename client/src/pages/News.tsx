import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const News = () => {
    const newsArticles = [
        {
            date: 'January 5, 2026',
            category: 'Academic',
            title: 'Term 1 Opening - Welcome Back Students',
            excerpt: 'We are excited to welcome all students back for Term 1 of the 2026 academic year. Classes begin on January 6th. All students are expected to report with their required materials and in proper uniform.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'December 20, 2025',
            category: 'Achievements',
            title: 'Outstanding Grade 12 Results Announced',
            excerpt: 'Lukulu Day Secondary School celebrates exceptional performance in the 2025 ECZ Grade 12 examinations. Our pass rate of 95% demonstrates our commitment to academic excellence.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'December 15, 2025',
            category: 'Facilities',
            title: 'New Science Laboratory Officially Opened',
            excerpt: 'The school community gathered to celebrate the opening of our state-of-the-art science laboratory, equipped with modern apparatus for Physics, Chemistry, and Biology practical work.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'December 1, 2025',
            category: 'Sports',
            title: 'LDSS Wins Inter-School Football Championship',
            excerpt: 'Our school football team brought home the trophy after an exciting final match in the District Inter-School Football Championship, defeating rivals 3-2.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'November 20, 2025',
            category: 'Community',
            title: 'Career Day Inspires Future Professionals',
            excerpt: 'Students had the opportunity to interact with professionals from various fields during our annual Career Day event. Guest speakers shared insights about careers in medicine, engineering, business, and more.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'November 10, 2025',
            category: 'Academic',
            title: 'Science Club Wins Regional Competition',
            excerpt: 'LDSS Science Club members secured first place in the Western Province Science Fair with their innovative project on renewable energy solutions for rural communities.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'October 25, 2025',
            category: 'Events',
            title: 'Annual Cultural Day Celebrates Diversity',
            excerpt: 'The school came alive with cultural performances, traditional attire, and ethnic cuisines as students showcased the rich cultural heritage of Zambia\'s diverse communities.',
            image: '/hero-bg.jpg'
        },
        {
            date: 'October 10, 2025',
            category: 'Announcements',
            title: 'Parent-Teacher Meetings Scheduled',
            excerpt: 'Parents and guardians are invited to attend the Term 3 Parent-Teacher meetings on October 15-16. This is an opportunity to discuss your child\'s progress and academic needs.',
            image: '/hero-bg.jpg'
        }
    ];

    const categories = ['All', 'Academic', 'Achievements', 'Sports', 'Events', 'Facilities', 'Community', 'Announcements'];

    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Announcements</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Stay updated with the latest happenings at Lukulu Day Secondary School
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 px-4 bg-gray-50 border-b border-gray-200">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${index === 0
                                        ? 'bg-emerald-800 text-white'
                                        : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured News */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
                    </div>

                    <Card className="overflow-hidden border-emerald-200">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="h-64 md:h-auto bg-gray-200">
                                <img
                                    src={newsArticles[0].image}
                                    alt={newsArticles[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {newsArticles[0].category}
                                    </span>
                                    <span className="text-gray-500 text-sm flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {newsArticles[0].date}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    {newsArticles[0].title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {newsArticles[0].excerpt}
                                </p>
                                <Button variant="primary" className="w-fit">
                                    Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Recent News Grid */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Recent News</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.slice(1).map((article, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {article.category}
                                        </span>
                                        <span className="text-gray-500 text-xs flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <a
                                        href="#"
                                        className="text-emerald-800 font-semibold text-sm hover:text-emerald-700 flex items-center gap-1"
                                    >
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 px-4 bg-emerald-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
                    <p className="text-emerald-100 mb-8 text-lg">
                        Subscribe to receive the latest news and announcements directly to your inbox
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white outline-none"
                        />
                        <Button type="submit" className="bg-white text-emerald-800 hover:bg-emerald-50">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>

            {/* Archive Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">News Archive</h2>
                        <p className="text-gray-600">Browse news from previous terms and years</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <Button variant="outline" className="w-full">
                            2025 Archive
                        </Button>
                        <Button variant="outline" className="w-full">
                            2024 Archive
                        </Button>
                        <Button variant="outline" className="w-full">
                            2023 Archive
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
