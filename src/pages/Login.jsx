import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { login, isAuthenticated } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        emailOrPhone: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Redirect if already authenticated
    if (isAuthenticated) {
        navigate('/home', { replace: true })
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(formData)

        setLoading(false)

        if (result.success) {
            navigate('/home', { replace: true })
        } else {
            setError(result.error || 'Login failed. Please try again.')
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#0d141b] dark:text-slate-100 min-h-screen flex flex-col">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[480px] mx-auto bg-white dark:bg-background-dark shadow-xl">
                {/* Top Status Bar Spacer */}
                <div className="h-12 w-full"></div>

                {/* Header Image Section */}
                <div className="@container">
                    <div className="@[480px]:px-4 @[480px]:py-3">
                        <div
                            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-100 dark:bg-slate-800 @[480px]:rounded-lg min-h-64"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXcICTdW93F-C_kqMaHFEOFdL3FVRYB_LpshRIOJhvqZ9JdKfMMzBFDjtN_ptY2bZ13UFa-p_UKOO0FcyIIpr9qjgg7wIL05PMi7sgwjz2B6ffQsR27M_gJNyO0H5gdOMMggo8qV2kB1DQKC1nBMF0zMwG798kNomzUPibrv71jyv3F9a73Jv3uNycG2mW2BdR7lHefj53snZ2wteTuUzFYAfInMU0WXm9jeiRVX_temGUK2HXweoC4aVesoH2NL6Dp3-auAWVxq3_')",
                            }}
                        ></div>
                    </div>
                </div>

                {/* Welcome Text */}
                <div className="px-6 pt-8 pb-2">
                    <h1 className="text-[#0d141b] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left">
                        Welcome to Civil Track
                    </h1>
                    <p className="text-[#4c739a] dark:text-slate-400 text-base font-normal leading-normal mt-2">
                        Log in to report issues and improve your neighborhood.
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 px-6 py-4">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Name Input */}
                    <label className="flex flex-col w-full">
                        <p className="text-[#0d141b] dark:text-slate-200 text-sm font-semibold leading-normal pb-2">
                            Your Name
                        </p>
                        <div className="relative">
                            <input
                                className="form-input flex w-full rounded-xl text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                                placeholder="e.g. John Doe"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </label>

                    {/* Email/Phone Input */}
                    <label className="flex flex-col w-full">
                        <p className="text-[#0d141b] dark:text-slate-200 text-sm font-semibold leading-normal pb-2">
                            Email or Phone Number
                        </p>
                        <div className="relative">
                            <input
                                className="form-input flex w-full rounded-xl text-[#0d141b] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                                placeholder="e.g. name@example.com"
                                type="text"
                                name="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </label>

                    {/* Password Input */}
                    <label className="flex flex-col w-full">
                        <div className="flex justify-between items-center pb-2">
                            <p className="text-[#0d141b] dark:text-slate-200 text-sm font-semibold leading-normal">
                                Password
                            </p>
                            <a className="text-primary text-sm font-medium hover:underline" href="#">
                                Forgot password?
                            </a>
                        </div>
                        <div className="flex w-full items-stretch rounded-xl border border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50">
                            <input
                                className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent h-14 text-[#0d141b] dark:text-white placeholder:text-[#4c739a] p-[15px] text-base font-normal focus:ring-0"
                                placeholder="Enter your password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                className="text-[#4c739a] flex items-center justify-center px-4"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </label>
                </form>

                {/* Main CTA */}
                <div className="px-6 py-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                {/* SSO Options */}
                <div className="px-6 py-2 flex flex-col gap-3">
                    <div className="relative flex py-3 items-center">
                        <div className="flex-grow border-t border-[#cfdbe7] dark:border-slate-700"></div>
                        <span className="flex-shrink mx-4 text-[#4c739a] dark:text-slate-500 text-xs uppercase tracking-wider font-bold">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-[#cfdbe7] dark:border-slate-700"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 h-12 border border-[#cfdbe7] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <img
                                alt="Google logo"
                                className="w-5 h-5"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93Cu-fVj8iKqJT_f72FZ85svZeHQGwZPFsq-icllQWDQGKa-BqMj8dtE5utRg1MQTTiURA2KxZCDuRF1x0DOmdvH2OfRSCe00TnwECOpHJU76W8pZBG6m4LqizwepRPPiMMqXAuekx1voewJGnh2qmN85dUGCF2lCNoamPCSt0AwPYhVp43eAgh279C1QtiVw2si8VoJTa3Qb-ShM1W3AqW-_kzfJp1CSJasybh9m3OQZpQq3L8Ibw5QVKYeLLJ7TWU_Y-dYbyfNQ"
                            />
                            <span className="text-sm font-semibold text-[#0d141b] dark:text-white">Google</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 h-12 border border-[#cfdbe7] dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl text-[#0d141b] dark:text-white">
                                ios
                            </span>
                            <span className="text-sm font-semibold text-[#0d141b] dark:text-white">Apple</span>
                        </button>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Sign Up Link */}
                <div className="px-6 pt-4 pb-10 text-center">
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary font-bold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* iOS Home Indicator Space */}
                <div className="h-6 w-full"></div>
            </div>
        </div>
    )
}

export default Login
