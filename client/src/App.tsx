
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
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
