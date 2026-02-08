import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'
import { formatDate, getCategoryIcon, getCategoryColor } from '../utils/helpers'
import BottomNav from '../components/BottomNav'
import StatusBadge from '../components/StatusBadge'

const Dashboard = () => {
    const { user } = useAuth()
    const { getUserComplaints, getUserStats } = useApp()

    const stats = getUserStats()
    const userComplaints = getUserComplaints().slice(0, 4) // Show recent 4

    const getCategoryColorClass = (category) => {
        const color = getCategoryColor(category)
        const colorMap = {
            red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
            yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
            blue: 'bg-blue-50 dark:bg-blue-900/20 text-primary',
            purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
            gray: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600'
        }
        return colorMap[color] || colorMap.gray
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-text-primary-light dark:text-text-primary-dark overflow-hidden h-screen flex flex-col">
            <main className="flex-1 overflow-y-auto no-scrollbar pb-32 relative">
                {/* Header */}
                <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div
                                className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-primary/20"
                                style={{
                                    backgroundImage: user?.photo ? `url('${user.photo}')` : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBwEXGSeOijOmgJCWhteG0CUXd02A0nuYDOrbf_kVPNLQUZUhfHzMJU0BQlqBB8F3yaRviF1NEXaKX1PAxZv-9lPqG8SlPwTENd2SBYpRSaBfSkrOY3DGStibIp6hwg258hSCScFFDefkLCio_dRu_swTp16zZOFVSZROBM0JcufaurthuG-xsjU-3wdxdkgChBcFsHo_hOjYZbOv66lOvIwLpp3fx8-6dF4sbnY2xgk6l9eI6x70BJf9LAJfCuqvDAneYID4dElQ')",
                                }}
                            ></div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                Welcome back,
                            </h2>
                            <h1 className="text-lg font-bold leading-tight">{user?.name?.split(' ')[0] || 'User'} 👋</h1>
                        </div>
                    </div>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                        <span className="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark">
                            notifications
                        </span>
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
                    </button>
                </header>

                {/* Overview Section */}
                <section className="px-4 py-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-4 pl-1">
                        Overview
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                            <span className="text-2xl font-bold text-primary mb-1">{stats.reported}</span>
                            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                Reported
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                            <span className="text-2xl font-bold text-green-600 mb-1">{stats.resolved}</span>
                            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                Resolved
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-card-light dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
                            <span className="text-2xl font-bold text-orange-500 mb-1">{stats.pending}</span>
                            <span className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                Pending
                            </span>
                        </div>
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-4 pl-1">
                        <h3 className="text-lg font-bold">Recent Activity</h3>
                        <Link to="/community" className="text-sm font-medium text-primary hover:text-blue-600">
                            View All
                        </Link>
                    </div>

                    {userComplaints.length === 0 ? (
                        <div className="bg-card-light dark:bg-card-dark rounded-xl p-8 text-center border border-gray-100 dark:border-gray-800">
                            <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-3 block">
                                inbox
                            </span>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                                No complaints yet. Be the first to report an issue!
                            </p>
                            <Link
                                to="/complaint/new"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Raise Your First Complaint
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {userComplaints.map((complaint) => (
                                <article
                                    key={complaint.id}
                                    className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-100"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${getCategoryColorClass(complaint.category)}`}>
                                                <span className="material-symbols-outlined text-[20px]">
                                                    {getCategoryIcon(complaint.category)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base line-clamp-1">{complaint.title}</h4>
                                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                                    {complaint.id}
                                                </span>
                                            </div>
                                        </div>
                                        <StatusBadge status={complaint.status} />
                                    </div>
                                    <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
                                    <div className="flex items-center justify-between text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                                            <span>{complaint.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                            <span>{formatDate(complaint.createdAt)}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="h-28"></div>
                </section>
            </main>

            {/* Floating Raise Complaint Button */}
            <div className="fixed bottom-24 left-0 right-0 z-30 px-4 flex justify-center w-full">
                <Link
                    to="/complaint/new"
                    className="w-full max-w-[90%] bg-primary hover:bg-blue-600 text-white shadow-[0_8px_30px_rgb(19,127,236,0.4)] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 py-4 rounded-full active:scale-[0.97]"
                >
                    <span className="material-symbols-outlined text-[24px]">add</span>
                    <span className="font-bold text-base tracking-wide">Raise Complaint</span>
                </Link>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    )
}

export default Dashboard
