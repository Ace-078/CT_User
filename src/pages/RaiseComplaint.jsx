import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { categoryOptions, localityOptions } from '../utils/mockData'

const RaiseComplaint = () => {
    const navigate = useNavigate()
    const { addComplaint } = useApp()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        severity: 'normal',
        imageUrl: null
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validation
        if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.imageUrl) {
            setError('Please fill in all required fields, including a photo')
            return
        }

        setLoading(true)

        // Simulate API delay
        setTimeout(() => {
            addComplaint(formData)
            setLoading(false)
            navigate('/complaint/success')
        }, 500)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Mock image upload - in production, upload to server
            setFormData({
                ...formData,
                imageUrl: URL.createObjectURL(file)
            })
        }
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col w-full max-w-md mx-auto bg-white dark:bg-background-dark">
                {/* Header */}
                <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a2634] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                    <Link
                        to="/home"
                        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold">Raise Complaint</h1>
                    <div className="w-10"></div>
                </header>

                {/* Form */}
                <div className="flex-1 overflow-y-auto p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Image Upload */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Attach Photo <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors cursor-pointer bg-gray-50 dark:bg-[#1a2632]"
                                >
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                                            <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                                            <span className="text-sm">Click to upload photo</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="form-input flex w-full rounded-xl text-[#111418] dark:text-white bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] focus:border-primary focus:ring-1 focus:ring-primary h-14 placeholder:text-[#9aa2ac] px-4 text-base font-normal transition-all"
                                placeholder="Brief description of the issue"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] material-symbols-outlined">
                                    category
                                </span>
                                <select
                                    className="form-select w-full appearance-none rounded-xl bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] text-[#111418] dark:text-white h-14 pl-12 pr-10 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categoryOptions.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#617589] material-symbols-outlined">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="form-textarea flex w-full rounded-xl text-[#111418] dark:text-white bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#9aa2ac] px-4 py-3 text-base font-normal transition-all min-h-[120px]"
                                placeholder="Describe the issue in detail..."
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#617589] material-symbols-outlined">
                                    location_on
                                </span>
                                <select
                                    className="form-select w-full appearance-none rounded-xl bg-white dark:bg-[#1a2632] border border-[#dbe0e6] dark:border-[#2a3642] text-[#111418] dark:text-white h-14 pl-12 pr-10 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select location</option>
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
                        </div>

                        {/* Severity */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#111418] dark:text-white text-base font-medium leading-normal pl-1">
                                Severity
                            </label>
                            <div className="flex gap-2">
                                {['normal', 'major', 'critical'].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, severity: level })}
                                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all capitalize ${formData.severity === level
                                            ? 'border-primary bg-primary/10 text-primary font-semibold'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>


                    </form>
                </div>

                {/* Submit Button */}
                <div className="p-4 bg-white dark:bg-[#1a2634] border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-12 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-base transition-colors shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RaiseComplaint
