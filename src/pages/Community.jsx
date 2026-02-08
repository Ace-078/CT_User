import { useState } from 'react'
import { useApp } from '../context/AppContext'
import ComplaintCard from '../components/ComplaintCard'
import BottomNav from '../components/BottomNav'

const Community = () => {
    const { complaints, toggleSupport } = useApp()
    const [view, setView] = useState('locality') // 'locality' or 'citywide'

    // For demo purposes, both views show all complaints
    // In production, filter by user's locality
    const displayedComplaints = complaints

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white pb-24 min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Community Feed
                    </h1>
                    <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
                            notifications
                        </span>
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#101922]"></span>
                    </button>
                </div>

                {/* View Toggle */}
                <div className="px-4 pb-3">
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                            onClick={() => setView('locality')}
                            className={`flex-1 py-1.5 px-3 rounded-[0.4rem] text-sm font-semibold transition-all duration-200 ${view === 'locality'
                                    ? 'bg-white dark:bg-[#1c2834] shadow-sm text-primary'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            My Locality
                        </button>
                        <button
                            onClick={() => setView('citywide')}
                            className={`flex-1 py-1.5 px-3 rounded-[0.4rem] text-sm font-medium transition-all duration-200 ${view === 'citywide'
                                    ? 'bg-white dark:bg-[#1c2834] shadow-sm text-primary'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            City-wide
                        </button>
                    </div>
                </div>
            </header>

            {/* Complaints Feed */}
            <main className="px-4 py-4 space-y-4">
                {displayedComplaints.length === 0 ? (
                    <div className="bg-white dark:bg-[#1c2834] rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">
                            forum
                        </span>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            No complaints in your area yet
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                            Be the first to report an issue!
                        </p>
                    </div>
                ) : (
                    displayedComplaints.map((complaint) => (
                        <ComplaintCard
                            key={complaint.id}
                            complaint={complaint}
                            onSupport={toggleSupport}
                            showInteractions={true}
                        />
                    ))
                )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    )
}

export default Community
