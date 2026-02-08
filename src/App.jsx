import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import RaiseComplaint from './pages/RaiseComplaint'
import ComplaintSuccess from './pages/ComplaintSuccess'
import Community from './pages/Community'
import Profile from './pages/Profile'

// Components
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="/complaint/new" element={
                    <ProtectedRoute>
                        <RaiseComplaint />
                    </ProtectedRoute>
                } />

                <Route path="/complaint/success" element={
                    <ProtectedRoute>
                        <ComplaintSuccess />
                    </ProtectedRoute>
                } />

                <Route path="/community" element={
                    <ProtectedRoute>
                        <Community />
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    )
}

export default App
