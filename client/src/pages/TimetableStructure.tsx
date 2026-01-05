import { Sun, Moon, Clock, Calendar } from 'lucide-react';
import { Card, CardTitle } from '../components/ui/Card';

export const TimetableStructure = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">School Timetable Structure</h1>
                    <p className="text-xl text-gray-600">
                        Operating a dual-session system to accommodate all learners effectively
                    </p>
                </div>

                <div className="grid gap-8">
                    {/* Morning Session */}
                    <Card className="border-t-4 border-emerald-500">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <Sun className="w-8 h-8 text-yellow-700" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Morning Session (Junior Secondary)</CardTitle>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <Clock className="w-4 h-4" /> 07:00 – 13:20
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Key Details</h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Target Classes</span>
                                        <span className="font-medium">Forms 1-2</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Period Duration</span>
                                        <span className="font-medium">40 minutes</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Break Time</span>
                                        <span className="font-medium">10:20 – 10:40 (20m)</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Assembly</span>
                                        <span className="font-medium">06:50 – 07:00</span>
                                    </li>
                                    <li className="flex justify-between pt-2">
                                        <span>Teaching Hours</span>
                                        <span className="font-bold text-emerald-800">30 hrs/week</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Bell Schedule</h4>
                                <div className="space-y-0.5 text-sm">
                                    {[
                                        { p: 'Period 1', t: '07:00 – 07:40' },
                                        { p: 'Period 2', t: '07:40 – 08:20' },
                                        { p: 'Period 3', t: '08:20 – 09:00' },
                                        { p: 'Period 4', t: '09:00 – 09:40' },
                                        { p: 'Period 5', t: '09:40 – 10:20' },
                                        { p: 'BREAK', t: '10:20 – 10:40', isBreak: true },
                                        { p: 'Period 6', t: '10:40 – 11:20' },
                                        { p: 'Period 7', t: '11:20 – 12:00' },
                                        { p: 'Period 8', t: '12:00 – 12:40' },
                                        { p: 'Period 9', t: '12:40 – 13:20' },
                                    ].map((slot, i) => (
                                        <div key={i} className={`flex justify-between py-1.5 px-3 rounded ${slot.isBreak ? 'bg-yellow-50 font-bold text-yellow-800' : 'bg-gray-50'}`}>
                                            <span>{slot.p}</span>
                                            <span>{slot.t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Afternoon Session */}
                    <Card className="border-t-4 border-emerald-900">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Moon className="w-8 h-8 text-indigo-700" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">Afternoon Session (Senior Secondary)</CardTitle>
                                <p className="text-gray-600 flex items-center gap-2 mt-1">
                                    <Clock className="w-4 h-4" /> 12:05 – 17:00
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Key Details</h4>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Target Classes</span>
                                        <span className="font-medium">Grades 10-12</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Period Duration</span>
                                        <span className="font-medium">35 minutes</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Break Time</span>
                                        <span className="font-medium">14:25 – 14:40 (15m)</span>
                                    </li>
                                    <li className="flex justify-between border-b border-dashed pb-2">
                                        <span>Assembly</span>
                                        <span className="font-medium">11:55 – 12:05</span>
                                    </li>
                                    <li className="flex justify-between pt-2">
                                        <span>Teaching Hours</span>
                                        <span className="font-bold text-emerald-800">23.3 hrs/week</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Bell Schedule</h4>
                                <div className="space-y-0.5 text-sm">
                                    {[
                                        { p: 'Period 1', t: '12:05 – 12:40' },
                                        { p: 'Period 2', t: '12:40 – 13:15' },
                                        { p: 'Period 3', t: '13:15 – 13:50' },
                                        { p: 'Period 4', t: '13:50 – 14:25' },
                                        { p: 'BREAK', t: '14:25 – 14:40', isBreak: true },
                                        { p: 'Period 5', t: '14:40 – 15:15' },
                                        { p: 'Period 6', t: '15:15 – 15:50' },
                                        { p: 'Period 7', t: '15:50 – 16:25' },
                                        { p: 'Period 8', t: '16:25 – 17:00' },
                                    ].map((slot, i) => (
                                        <div key={i} className={`flex justify-between py-1.5 px-3 rounded ${slot.isBreak ? 'bg-yellow-50 font-bold text-yellow-800' : 'bg-gray-50'}`}>
                                            <span>{slot.p}</span>
                                            <span>{slot.t}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="text-center mt-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Timetables operate Monday through Friday
                    </div>
                </div>
            </div>
        </div>
    );
};
