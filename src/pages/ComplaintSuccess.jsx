import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const ComplaintSuccess = () => {
    const { lastComplaintId } = useApp()

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md mx-auto bg-white dark:bg-card-dark rounded-2xl shadow-xl p-8 text-center">
                {/* Success Animation */}
                <div className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-6xl">
                        check_circle
                    </span>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl font-bold text-[#111418] dark:text-white mb-3">
                    Complaint Submitted Successfully!
                </h1>
                <p className="text-[#617589] dark:text-gray-400 text-base leading-relaxed mb-6">
                    Your complaint has been registered and will be reviewed by the authorities shortly.
                </p>

                {/* Complaint ID */}
                {lastComplaintId && (
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                        <p className="text-sm text-[#617589] dark:text-gray-400 mb-1">Complaint ID</p>
                        <p className="text-xl font-bold text-primary">{lastComplaintId}</p>
                    </div>
                )}

                {/* Next Steps */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6 text-left">
                    <h3 className="text-sm font-semibold text-[#111418] dark:text-white mb-3">What's Next?</h3>
                    <ul className="text-sm text-[#617589] dark:text-gray-400 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">done</span>
                            <span>Authorities have been notified</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">notifications</span>
                            <span>You'll receive updates on your complaint status</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">people</span>
                            <span>Community members can support your complaint</span>
                        </li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link
                        to="/home"
                        className="w-full h-12 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-base transition-colors shadow-sm active:scale-[0.98] flex items-center justify-center"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        to="/community"
                        className="w-full h-12 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#111418] dark:text-white rounded-xl font-medium text-base transition-colors active:scale-[0.98] flex items-center justify-center"
                    >
                        View Community Feed
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ComplaintSuccess
