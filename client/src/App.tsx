
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Academics } from './pages/Academics';
import { Departments } from './pages/Departments';
import { AssessmentGrading } from './pages/AssessmentGrading';
import { TimetableStructure } from './pages/TimetableStructure';
import { SchoolRules } from './pages/SchoolRules';
import { CareerGuidance } from './pages/CareerGuidance';
import { PhotoGallery } from './pages/PhotoGallery';
import { Alumni } from './pages/Alumni';
import { LibraryResources } from './pages/LibraryResources';
import { Admissions } from './pages/Admissions';
import { News } from './pages/News';
import { AdminDashboard } from './pages/portals/AdminDashboard';
import { StaffDashboard } from './pages/portals/StaffDashboard';
import { LearnerDashboard } from './pages/portals/LearnerDashboard';
import { UserManagement } from './pages/portals/UserManagement';
import { StudentRecords } from './pages/portals/StudentRecords';
import { EnterGrades } from './pages/portals/EnterGrades';
import { MyResults } from './pages/portals/MyResults';
import { TakeAttendance } from './pages/portals/TakeAttendance';
import { UploadResource } from './pages/portals/UploadResource';
import { LearnerResources } from './pages/portals/LearnerResources';
import { LearnerAttendance } from './pages/portals/LearnerAttendance';
import { ManageAnnouncements } from './pages/portals/ManageAnnouncements';
import { ManageAssignments } from './pages/portals/ManageAssignments';
import { MyAssignments } from './pages/portals/MyAssignments';
import { Messages } from './pages/Messages';
import { ManageCurriculum } from './pages/portals/ManageCurriculum';
import { ManageTimetable } from './pages/portals/ManageTimetable';
import { SchoolCalendar } from './pages/SchoolCalendar';
import { ReportCard } from './pages/ReportCard';
import { SystemSettings } from './pages/portals/SystemSettings';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/academics" element={<Academics />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/academics/assessment" element={<AssessmentGrading />} />
                        <Route path="/academics/timetable" element={<TimetableStructure />} />
                        <Route path="/school-rules" element={<SchoolRules />} />
                        <Route path="/career-guidance" element={<CareerGuidance />} />
                        <Route path="/library" element={<LibraryResources />} />
                        <Route path="/gallery" element={<PhotoGallery />} />
                        <Route path="/alumni" element={<Alumni />} />
                        <Route path="/admissions" element={<Admissions />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Portal Routes */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <UserManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/curriculum"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <ManageCurriculum />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/timetable"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <ManageTimetable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/settings"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                                <SystemSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/announcements"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'STAFF']}>
                                <ManageAnnouncements />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF']}>
                                <StaffDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/students"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF']}>
                                <StudentRecords />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/resources/upload"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                                <UploadResource />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/grades"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                                <EnterGrades />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/attendance"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                                <TakeAttendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/announcements"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                                <ManageAnnouncements />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/staff/assignments"
                        element={
                            <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                                <ManageAssignments />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learner"
                        element={
                            <ProtectedRoute allowedRoles={['LEARNER']}>
                                <LearnerDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learner/results"
                        element={
                            <ProtectedRoute allowedRoles={['LEARNER']}>
                                <MyResults />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learner/resources"
                        element={
                            <ProtectedRoute allowedRoles={['LEARNER']}>
                                <LearnerResources />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learner/attendance"
                        element={
                            <ProtectedRoute allowedRoles={['LEARNER']}>
                                <LearnerAttendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/learner/assignments"
                        element={
                            <ProtectedRoute allowedRoles={['LEARNER']}>
                                <MyAssignments />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/messages"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'STAFF', 'LEARNER']}>
                                <Messages />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'STAFF', 'LEARNER']}>
                                <SchoolCalendar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/report-card"
                        element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'STAFF', 'LEARNER']}>
                                <ReportCard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
