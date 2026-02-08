// Helper utility functions

// Format date to readable string
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
}

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSeconds < 60) {
        return 'Just now'
    } else if (diffMinutes < 60) {
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`
    } else if (diffHours < 24) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    } else if (diffDays < 30) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
    } else {
        return formatDate(dateString)
    }
}

// Generate unique ID
export const generateId = () => {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

// Get category icon
export const getCategoryIcon = (category) => {
    const iconMap = {
        garbage: 'delete',
        road: 'road',
        water: 'water_drop',
        electricity: 'lightbulb',
        other: 'report_problem'
    }
    return iconMap[category] || 'report'
}

// Get category color
export const getCategoryColor = (category) => {
    const colorMap = {
        garbage: 'red',
        road: 'purple',
        water: 'blue',
        electricity: 'yellow',
        other: 'gray'
    }
    return colorMap[category] || 'gray'
}

// Get status badge color
export const getStatusColor = (status) => {
    const colorMap = {
        pending: 'amber',
        in_progress: 'blue',
        resolved: 'green'
    }
    return colorMap[status] || 'gray'
}

// Get status display text
export const getStatusText = (status) => {
    const textMap = {
        pending: 'Pending',
        in_progress: 'In Progress',
        resolved: 'Resolved'
    }
    return textMap[status] || status
}

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// Validate phone number (Indian format)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
}

// Format phone number
export const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
}
