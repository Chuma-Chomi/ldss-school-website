import { Image as ImageIcon } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const PhotoGallery = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">School Photo Gallery</h1>
                    <p className="text-xl text-gray-600">Capturing moments and memories at LDSS</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Card key={item} className="overflow-hidden group cursor-pointer">
                            <div className="bg-gray-200 h-64 flex items-center justify-center relative">
                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-bold">View Image</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900">Gallery Item {item}</h3>
                                <p className="text-sm text-gray-500">Event Description</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
