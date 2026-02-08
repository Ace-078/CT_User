import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
    const location = useLocation()

    const navItems = [
        { path: '/home', icon: 'home', label: 'Home' },
        { path: '/community', icon: 'map', label: 'Map' },
        { path: '/profile', icon: 'person', label: 'Profile' },
    ]

    return (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 z-30 safe-area-bottom">
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 w-full transition-colors ${isActive
                                    ? 'text-primary'
                                    : 'text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary'
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                {item.icon}
                            </span>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNav
