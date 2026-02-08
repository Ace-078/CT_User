import { formatDate, formatRelativeTime, getCategoryIcon, getCategoryColor } from '../utils/helpers'
import StatusBadge from './StatusBadge'
import { useApp } from '../context/AppContext'

const ComplaintCard = ({ complaint, onSupport, showInteractions = true }) => {
    const { hasUpvoted, hasSupported, toggleUpvote } = useApp()
    const isUpvoted = hasUpvoted(complaint.id)
    const isSupported = hasSupported(complaint.id)

    const categoryIcon = getCategoryIcon(complaint.category)
    const categoryColor = getCategoryColor(complaint.category)

    const categoryColorClasses = {
        red: 'bg-red-50 dark:bg-red-900/20 text-red-500',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
        blue: 'bg-blue-50 dark:bg-blue-900/20 text-primary',
        purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
        gray: 'bg-gray-50 dark:bg-gray-900/20 text-gray-600'
    }

    return (
        <article className="bg-white dark:bg-[#1c2834] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                        {complaint.raisedBy.photo && (
                            <img
                                alt="User Avatar"
                                className="h-full w-full object-cover"
                                src={complaint.raisedBy.photo}
                            />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                            {complaint.raisedBy.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatRelativeTime(complaint.createdAt)}
                        </p>
                    </div>
                </div>
                <StatusBadge status={complaint.status} />
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {complaint.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                    {complaint.description}
                </p>

                {/* Image */}
                {complaint.imageUrl && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 group">
                        <div
                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${complaint.status === 'resolved' ? 'grayscale' : ''
                                }`}
                            style={{ backgroundImage: `url('${complaint.imageUrl}')` }}
                        />
                        {complaint.status === 'resolved' && (
                            <div className="absolute inset-0 bg-green-900/10 flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">
                                        check_circle
                                    </span>
                                    <span className="text-xs font-bold text-green-700 dark:text-green-300 uppercase tracking-wide">
                                        Fixed
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400 mb-3">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary">
                        location_on
                    </span>
                    <span className="text-sm">{complaint.location}</span>
                </div>
            </div>

            {/* Actions */}
            {showInteractions && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => toggleUpvote(complaint.id)}
                            className={`flex items-center gap-1.5 transition-colors group ${isUpvoted
                                    ? 'text-primary'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
                                }`}
                        >
                            <span
                                className="material-symbols-outlined text-[20px] group-active:scale-110 transition-transform"
                                style={isUpvoted ? { fontVariationSettings: "'FILL' 1" } : {}}
                            >
                                thumb_up
                            </span>
                            <span className="text-sm font-medium">{complaint.upvotes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                            <span className="text-sm font-medium">{complaint.commentsCount}</span>
                        </button>
                    </div>
                    <button
                        onClick={() => onSupport && onSupport(complaint.id)}
                        className={`flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded-lg shadow-sm transition-all active:scale-95 ${isSupported
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                : 'bg-primary text-white hover:bg-blue-600'
                            }`}
                    >
                        {isSupported ? 'Supported' : 'Support'}
                    </button>
                </div>
            )}
        </article>
    )
}

export default ComplaintCard
