import { Calculator, Award, GraduationCap, TrendingUp } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';

export const AssessmentGrading = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Assessment & Grading System</h1>
                    <p className="text-xl text-gray-600">
                        Understanding how we measure and track academic progress at LDSS
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* The 40/60 Model */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                                <Calculator className="w-6 h-6 text-emerald-800" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">The 40/60 Assessment Model</h2>
                        </div>
                        <Card className="bg-white">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-emerald-800 mb-4">Continuous Assessment (40%)</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="font-medium text-gray-700">Test 1</span>
                                            <span className="font-bold text-emerald-600">20 marks</span>
                                        </li>
                                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                            <span className="font-medium text-gray-700">Test 2</span>
                                            <span className="font-bold text-emerald-600">20 marks</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-2 italic">* Conducted throughout the term to monitor progress</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-emerald-800 mb-4">Final Examination (60%)</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded border border-emerald-100">
                                            <span className="font-medium text-gray-700">Test 3 (Mandatory)</span>
                                            <span className="font-bold text-emerald-600">60 marks</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-2 italic">* Comprehensive end-of-term examination covering all topics</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t text-center">
                                <p className="font-bold text-gray-900">Total Score = (Test 1 + Test 2) + Final Exam = <span className="text-emerald-600 text-xl">100 Marks</span></p>
                            </div>
                        </Card>
                    </section>

                    {/* Junior Grading */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                                <Award className="w-6 h-6 text-emerald-800" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Junior Secondary Grading (Forms 1-2)</h2>
                        </div>
                        <Card className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 border-b font-bold text-gray-700">Percentage</th>
                                            <th className="p-4 border-b font-bold text-gray-700">Grade</th>
                                            <th className="p-4 border-b font-bold text-gray-700">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr className="bg-emerald-50">
                                            <td className="p-4 font-medium text-emerald-900">75 – 100%</td>
                                            <td className="p-4 font-bold text-emerald-900">1</td>
                                            <td className="p-4 text-emerald-900">Distinction</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-gray-700">60 – 74%</td>
                                            <td className="p-4 font-bold text-gray-900">2</td>
                                            <td className="p-4 text-gray-600">Merit</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-gray-700">50 – 59%</td>
                                            <td className="p-4 font-bold text-gray-900">3</td>
                                            <td className="p-4 text-gray-600">Credit</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-gray-700">40 – 49%</td>
                                            <td className="p-4 font-bold text-gray-900">4</td>
                                            <td className="p-4 text-gray-600">Pass</td>
                                        </tr>
                                        <tr className="bg-red-50">
                                            <td className="p-4 font-medium text-red-900">0 – 39%</td>
                                            <td className="p-4 font-bold text-red-900">F</td>
                                            <td className="p-4 text-red-900">Fail</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gray-50 p-4 text-sm text-gray-600">
                                <strong>Classes:</strong> Forms 1A, 1B, 1C, 2A, 2B, 2C
                            </div>
                        </Card>
                    </section>

                    {/* Senior Grading */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                                <GraduationCap className="w-6 h-6 text-emerald-800" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Senior Secondary Grading (Grades 10-12)</h2>
                        </div>
                        <Card className="overflow-hidden">
                            <p className="mb-4 text-gray-600">Following the ECZ Official 1-9 Scale:</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 border-b font-bold text-gray-700">Grade</th>
                                            <th className="p-4 border-b font-bold text-gray-700">Description</th>
                                            <th className="p-4 border-b font-bold text-gray-700">Interpretation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr className="bg-emerald-50">
                                            <td className="p-4 font-bold text-emerald-900">1 - 2</td>
                                            <td className="p-4 text-emerald-900">Distinction</td>
                                            <td className="p-4 text-emerald-900">Excellent Performance</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-gray-900">3 - 4</td>
                                            <td className="p-4 text-gray-600">Merit</td>
                                            <td className="p-4 text-gray-600">Very Good Performance</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-gray-900">5 - 6</td>
                                            <td className="p-4 text-gray-600">Credit</td>
                                            <td className="p-4 text-gray-600">Good Performance</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-gray-900">7 - 8</td>
                                            <td className="p-4 text-gray-600">Satisfactory</td>
                                            <td className="p-4 text-gray-600">Acceptable Performance</td>
                                        </tr>
                                        <tr className="bg-red-50">
                                            <td className="p-4 font-bold text-red-900">9</td>
                                            <td className="p-4 text-red-900">Fail</td>
                                            <td className="p-4 text-red-900">Needs Improvement</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gray-50 p-4 border-t mt-4">
                                <h4 className="font-bold text-emerald-900 mb-1">University Entry Requirements</h4>
                                <p className="text-sm text-gray-700">
                                    Learners require credits (Grade 6 or better) in 5 subjects including English and Mathematics for university entry in Zambia.
                                </p>
                            </div>
                        </Card>
                    </section>

                    {/* Tracking */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-emerald-800" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Performance Tracking</h2>
                        </div>
                        <Card>
                            <CardDescription className="mb-4">
                                Learners and parents can track academic progress through multiple channels designed to ensure transparency and support student growth.
                            </CardDescription>
                            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded text-center border hover:border-emerald-300 transition-colors">
                                    <h5 className="font-bold text-gray-900 mb-2">Reports</h5>
                                    <p className="text-sm text-gray-600">Termly report cards with detailed results</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded text-center border hover:border-emerald-300 transition-colors">
                                    <h5 className="font-bold text-gray-900 mb-2">Feedback</h5>
                                    <p className="text-sm text-gray-600">Continuous assessment feedback from teachers</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded text-center border hover:border-emerald-300 transition-colors">
                                    <h5 className="font-bold text-gray-900 mb-2">Ranking</h5>
                                    <p className="text-sm text-gray-600">Class ranking and position analysis</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded text-center border hover:border-emerald-300 transition-colors">
                                    <h5 className="font-bold text-gray-900 mb-2">Portal</h5>
                                    <p className="text-sm text-gray-600">24/7 Online learner portal access for parents</p>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
};
