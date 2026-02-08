import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const Profile = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white h-screen flex flex-col overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a2634] border-b border-[#e5e7eb] dark:border-gray-800 shrink-0 sticky top-0 z-50">
                <div className="w-10"></div>
                <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">Profile</h1>
                <button className="w-10 h-10 flex items-center justify-center text-primary dark:text-blue-400 font-medium text-sm">
                    Done
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
                {/* Profile Header Section */}
                <div className="px-4 pt-6 pb-2">
                    <div className="bg-white dark:bg-[#1a2634] rounded-xl p-6 shadow-sm border border-[#e5e7eb] dark:border-gray-800 flex flex-col items-center gap-4">
                        <div className="relative group">
                            <div
                                className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 bg-center bg-cover border-4 border-white dark:border-[#1a2634] shadow-md"
                                style={{
                                    backgroundImage: user?.photo
                                        ? `url('${user.photo}')`
                                        : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYQ4_KZo3FPMl1XAC7CRJLzq5dXwhHS55zqZc33rOzMpAhQWO9bSzkcMj-bZv4XHxGI2vk1zaYy0sXLSZY-JyMNRHoPEpS0ZX31vwykHdTJTw9Cy8-9zH0wsWIzU9TV30dfNe5tK5ZEA9ZyRxSd7WN_F4muJDpFtPKuRlrj-ydnvyJVxNSKL4PTvE9nXRmsJt8_3Hdl5njyR5NE8w868azNYHolrmGguAR8vUShFn4Ad4484H5zOacMm9qN7fKTzA4uBwfXRxL-w')",
                                }}
                            ></div>
                            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-[#1a2634] flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1.5">
                                <h2 className="text-xl font-bold text-[#111418] dark:text-white">{user?.name || 'User'}</h2>
                                {user?.verified && (
                                    <span
                                        className="material-symbols-outlined text-primary text-[20px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                        title="Verified Resident"
                                    >
                                        verified
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-[#637588] dark:text-gray-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                                {user?.locality || 'Location not set'}
                            </p>
                        </div>
                        <div className="w-full flex justify-center mt-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                Active Citizen
                            </span>
                        </div>
                    </div>
                </div>

                {/* Civic Details Section */}
                <div className="px-4 mt-6">
                    <h3 className="text-xs font-semibold text-[#637588] dark:text-gray-400 uppercase tracking-wider mb-2 pl-2">
                        Civic Details
                    </h3>
                    <div className="bg-white dark:bg-[#1a2634] rounded-xl overflow-hidden shadow-sm border border-[#e5e7eb] dark:border-gray-800 divide-y divide-[#f0f2f4] dark:divide-gray-800">
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">how_to_vote</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-[#111418] dark:text-white">Ward Number</span>
                                    <span className="text-xs text-[#637588] dark:text-gray-400">{user?.ward || 'Not set'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">badge</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-[#111418] dark:text-white">Voter ID</span>
                                    <span className="text-xs text-[#637588] dark:text-gray-400">XM-9928-11</span>
                                </div>
                            </div>
                            <button className="text-primary text-xs font-bold">View</button>
                        </div>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div className="px-4 mt-6">
                    <h3 className="text-xs font-semibold text-[#637588] dark:text-gray-400 uppercase tracking-wider mb-2 pl-2">
                        Contact Info
                    </h3>
                    <div className="bg-white dark:bg-[#1a2634] rounded-xl overflow-hidden shadow-sm border border-[#e5e7eb] dark:border-gray-800 divide-y divide-[#f0f2f4] dark:divide-gray-800">
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <span className="text-sm font-medium text-[#111418] dark:text-white">{user?.phone || 'Not set'}</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                chevron_right
                            </span>
                        </div>
                        {user?.email && (
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <span className="text-sm font-medium text-[#111418] dark:text-white">{user.email}</span>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                    chevron_right
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Settings & Actions Section */}
                <div className="px-4 mt-6">
                    <h3 className="text-xs font-semibold text-[#637588] dark:text-gray-400 uppercase tracking-wider mb-2 pl-2">
                        Settings
                    </h3>
                    <div className="bg-white dark:bg-[#1a2634] rounded-xl overflow-hidden shadow-sm border border-[#e5e7eb] dark:border-gray-800 divide-y divide-[#f0f2f4] dark:divide-gray-800">
                        <Link
                            to="/home"
                            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined">history_edu</span>
                                </div>
                                <span className="text-sm font-medium text-[#111418] dark:text-white">My Reports History</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold dark:bg-red-900/30 dark:text-red-400">
                                    2 New
                                </span>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                    chevron_right
                                </span>
                            </div>
                        </Link>
                        <button className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <span className="text-sm font-medium text-[#111418] dark:text-white">Notification Settings</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                chevron_right
                            </span>
                        </button>
                        <button className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">language</span>
                                </div>
                                <span className="text-sm font-medium text-[#111418] dark:text-white">Language</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">English (US)</span>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                    chevron_right
                                </span>
                            </div>
                        </button>
                        <button className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">help</span>
                                </div>
                                <span className="text-sm font-medium text-[#111418] dark:text-white">Help & Support</span>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-[20px]">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="px-4 mt-6 mb-8">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white dark:bg-[#1a2634] active:scale-[0.98] transition-transform text-red-600 font-bold text-sm py-4 rounded-xl border border-[#e5e7eb] dark:border-gray-800 shadow-sm flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        Log Out
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">App Version 1.0.4 • Build 2023</p>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <BottomNav />
        </div>
    )
}

export default Profile
