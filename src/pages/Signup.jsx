import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { localityOptions } from '../utils/mockData'

const Signup = () => {
    const navigate = useNavigate()
    const { signup, isAuthenticated } = useAuth()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        locality: '',
        gender: ''
    })
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

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address (e.g., name@gmail.com)')
            return
        }

        setLoading(true)

        const result = await signup(formData)

        setLoading(false)

        if (result.success) {
            navigate('/home', { replace: true })
        } else {
            setError(result.error || 'Signup failed. Please try again.')
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white min-h-screen flex flex-col justify-between">
            <div className="flex-1 flex flex-col w-full max-w-md mx-auto">
                {/* Top Navigation */}
                <div className="flex items-center justify-between p-4 pb-2">
                    <Link
                        to="/login"
                        className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <div className="text-sm font-medium text-primary">Step 1 of 2</div>
                </div>

                {/* Header Section */}
                <div className="px-4 pt-2 pb-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-5xl">location_city</span>
                    </div>
                    <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
                        Let's fix the city together
                    </h1>
                    <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal max-w-xs">
                        Create an account to report issues, track progress, and improve your neighborhood.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pb-4">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Full Name Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                            Full Name
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-[#617589] material-symbols-outlined">person</span>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-[#9aa2ac] pl-12 pr-4 text-base font-normal leading-normal transition-all"
                                placeholder="Jane Doe"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                            Email Address
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-[#617589] material-symbols-outlined">mail</span>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-[#9aa2ac] pl-12 pr-4 text-base font-normal leading-normal transition-all"
                                placeholder="name@gmail.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Gender Selection */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                            Gender
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'male' })}
                                className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all ${formData.gender === 'male'
                                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                                        : 'border-[#dbe0e6] dark:border-[#2a3642] text-[#617589] dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <span className="material-symbols-outlined">male</span>
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, gender: 'female' })}
                                className={`flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition-all ${formData.gender === 'female'
                                        ? 'border-primary bg-primary/10 text-primary font-semibold'
                                        : 'border-[#dbe0e6] dark:border-[#2a3642] text-[#617589] dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <span className="material-symbols-outlined">female</span>
                                Female
                            </button>
                        </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                            Mobile Number
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-[#617589] material-symbols-outlined">smartphone</span>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-[#9aa2ac] pl-12 pr-4 text-base font-normal leading-normal transition-all"
                                placeholder="(555) 000-0000"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <p className="text-xs text-[#617589] dark:text-gray-500 pl-1">
                            We'll send a verification code to this number.
                        </p>
                    </div>

                    {/* Locality Selector */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                            Locality
                        </label>
                        <div className="relative cursor-pointer group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] material-symbols-outlined">
                                location_on
                            </span>
                            <select
                                className="form-select w-full appearance-none rounded-xl bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] text-[#111418] dark:text-white h-14 pl-12 pr-10 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                                name="locality"
                                value={formData.locality}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Select your neighborhood
                                </option>
                                {localityOptions.map((locality) => (
                                    <option key={locality} value={locality}>
                                        {locality}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#617589] material-symbols-outlined">
                                expand_more
                            </span>
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 text-primary text-sm font-medium pl-1 mt-1 hover:underline self-start"
                        >
                            <span className="material-symbols-outlined text-lg">my_location</span>
                            Use my current location
                        </button>
                    </div>
                </form>

                {/* Footer Actions */}
                <div className="p-4 mt-auto">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] w-full mb-4 shadow-sm hover:bg-blue-600 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="truncate">{loading ? 'Creating account...' : 'Continue'}</span>
                    </button>
                    <p className="text-[#617589] dark:text-gray-400 text-xs text-center leading-relaxed">
                        By tapping "Continue", you agree to our{' '}
                        <a className="text-primary hover:underline" href="#">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a className="text-primary hover:underline" href="#">
                            Privacy Policy
                        </a>
                        .
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6 mb-2">
                        <span className="text-[#111418] dark:text-gray-300 text-sm">Already have an account?</span>
                        <Link to="/login" className="text-primary text-sm font-bold hover:underline">
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
