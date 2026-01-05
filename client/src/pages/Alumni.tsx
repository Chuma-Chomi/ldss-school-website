import { Users } from 'lucide-react';
import { Card, CardTitle } from '../components/ui/Card';

export const Alumni = () => {
    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Network</h1>
                    <p className="text-xl text-gray-600">Connecting past students and celebrating their achievements</p>
                </div>

                <Card className="p-8 text-center bg-gray-50 border border-gray-200">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-10 h-10 text-emerald-800" />
                    </div>
                    <CardTitle className="mb-4">Join the LDSS Alumni Community</CardTitle>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        We are building a strong network of former students to support the school's development
                        and mentor current learners. If you are a former student of Lukulu Day Secondary School,
                        we invite you to register with us.
                    </p>
                    <button className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                        Register as Alumni (Coming Soon)
                    </button>
                </Card>
            </div>
        </div>
    );
};
