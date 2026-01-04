import { CheckCircle, FileText, Calendar, Users, AlertCircle, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Admissions = () => {
    return (
        <div className="bg-white">
            {/* Page Header */}
            <section className="bg-emerald-800 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions</h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        Join the LDSS family and embark on a journey of academic excellence
                    </p>
                </div>
            </section>

            {/* Application Process */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Apply</h2>
                        <p className="text-gray-600">Follow these simple steps to complete your application</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                step: 1,
                                title: 'Obtain Application Form',
                                description: 'Visit the school office during working hours (08:00 - 15:00, Monday to Friday) to collect an application form. Alternatively, download the form from our website.',
                                icon: FileText
                            },
                            {
                                step: 2,
                                title: 'Complete the Form',
                                description: 'Fill in all required information accurately. Ensure all details are correct and legible. Attach certified copies of the required documents (see requirements below).',
                                icon: CheckCircle
                            },
                            {
                                step: 3,
                                title: 'Submit Application',
                                description: 'Return the completed form to the school office before the deadline. Pay any applicable application fees at the school bursary and attach the receipt.',
                                icon: Calendar
                            },
                            {
                                step: 4,
                                title: 'Wait for Response',
                                description: 'The school will review all applications and notify successful candidates via phone or email. Keep your contact information current and check regularly for updates.',
                                icon: Users
                            }
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.step} className="flex gap-6 items-start bg-gray-50 p-6 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-2xl">
                                            {item.step}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-2">
                                            <Icon className="w-6 h-6 text-emerald-600 mt-1" />
                                            <h3 className="font-bold text-gray-900 text-xl">{item.title}</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Entry Requirements */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Entry Requirements</h2>
                        <p className="text-gray-600">Academic and documentation requirements for admission</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="text-emerald-600" />
                                Grade 8 Entry Requirements
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-emerald-600 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-1">Academic Requirement</h4>
                                    <p className="text-gray-600 text-sm">Successful completion of Grade 7</p>
                                </div>
                                <div className="border-l-4 border-gray-300 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-1">Required Documents</h4>
                                    <ul className="text-gray-600 text-sm space-y-1">
                                        <li>• Birth certificate (certified copy)</li>
                                        <li>• Grade 7 report card or certificate</li>
                                        <li>• Transfer letter from previous school</li>
                                        <li>• Two passport-size photos</li>
                                        <li>• Medical certificate (if applicable)</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle className="text-emerald-600" />
                                Grade 10 Entry Requirements
                            </h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-emerald-600 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-1">Academic Requirement</h4>
                                    <p className="text-gray-600 text-sm">Successful completion of Grade 9 with qualifying grades</p>
                                </div>
                                <div className="border-l-4 border-gray-300 pl-4">
                                    <h4 className="font-semibold text-gray-900 mb-1">Required Documents</h4>
                                    <ul className="text-gray-600 text-sm space-y-1">
                                        <li>• Birth certificate (certified copy)</li>
                                        <li>• Grade 9 certificate or results slip</li>
                                        <li>• School transfer letter</li>
                                        <li>• Two passport-size photos</li>
                                        <li>• Subject selection form</li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Important Dates */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
                        <p className="text-gray-600">Mark these key dates in your calendar</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Application Period</h4>
                                    <p className="text-gray-700">December 1 - January 15</p>
                                    <p className="text-sm text-gray-600 mt-1">For the following academic year</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Selection Results</h4>
                                    <p className="text-gray-700">January 20</p>
                                    <p className="text-sm text-gray-600 mt-1">Successful applicants notified</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Registration</h4>
                                    <p className="text-gray-700">January 25 - February 5</p>
                                    <p className="text-sm text-gray-600 mt-1">Confirm enrollment and pay fees</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Term Opening</h4>
                                    <p className="text-gray-700">First Monday of January</p>
                                    <p className="text-sm text-gray-600 mt-1">All students report to school</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fees Information */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">School Fees</h2>
                        <p className="text-gray-600">Transparent fee structure for all students</p>
                    </div>

                    <Card className="p-8">
                        <div className="flex items-start gap-3 mb-6 bg-blue-50 p-4 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-900">
                                As a government-aided school, LDSS offers affordable education. Fees are charged per term
                                and cover operational costs, learning materials, and school activities.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                <span className="font-semibold text-gray-900">Tuition Fee (per term)</span>
                                <span className="text-gray-700">ZMW XXX</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                <span className="font-semibold text-gray-900">PTA Levy (per term)</span>
                                <span className="text-gray-700">ZMW XX</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                                <span className="font-semibold text-gray-900">Examination Fee (Grade 9 & 12 only)</span>
                                <span className="text-gray-700">As per ECZ requirements</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-bold text-gray-900">Total per Term</span>
                                <span className="font-bold text-emerald-800">ZMW XXX</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-600">
                                <strong>Payment Options:</strong> Payments can be made at the school bursary via cash, mobile money,
                                or bank transfer. Payment plans may be available for families in need.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Download Forms</h2>
                    <p className="text-gray-600 mb-8">Get the forms you need to apply</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6">
                            <Download className="w-5 h-5" />
                            Application Form (PDF)
                        </Button>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-6">
                            <Download className="w-5 h-5" />
                            Prospectus (PDF)
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-4 bg-emerald-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-emerald-100 mb-8 text-lg">
                        Our admissions team is here to help you through the application process
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-block bg-white text-emerald-800 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                        >
                            Contact Us
                        </a>
                        <a
                            href="tel:+260XXXXXXXXX"
                            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-800 transition-colors"
                        >
                            Call: +260 XXX XXX XXX
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
