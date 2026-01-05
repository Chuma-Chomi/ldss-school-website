import { Book, Search, Laptop } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const LibraryResources = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Library Resources</h1>
                    <p className="text-xl text-gray-600">A hub for knowledge, research, and independent learning</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card className="p-6">
                        <Book className="w-10 h-10 text-emerald-800 mb-4" />
                        <CardTitle className="mb-2">Book Collection</CardTitle>
                        <CardDescription>
                            Our library houses a comprehensive collection of textbooks, reference materials, fiction, and non-fiction
                            books to support the curriculum and encourage reading for pleasure.
                        </CardDescription>
                    </Card>
                    <Card className="p-6">
                        <Laptop className="w-10 h-10 text-emerald-800 mb-4" />
                        <CardTitle className="mb-2">Digital Resources</CardTitle>
                        <CardDescription>
                            Students have access to digital learning materials, e-books, and past examination papers through
                            our computer lab and learner portal.
                        </CardDescription>
                    </Card>
                </div>

                <div className="bg-emerald-800 text-white rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Opening Hours</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-emerald-100">
                        <div>
                            <p className="font-bold">Monday - Thursday</p>
                            <p>08:00 - 16:30</p>
                        </div>
                        <div>
                            <p className="font-bold">Friday</p>
                            <p>08:00 - 13:00</p>
                        </div>
                        <div>
                            <p className="font-bold">Weekends</p>
                            <p>Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
