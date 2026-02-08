import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { generateMockComplaints } from '../utils/mockData'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const { user } = useAuth()
    const [complaints, setComplaints] = useState([])
    const [userInteractions, setUserInteractions] = useState({})
    const [lastComplaintId, setLastComplaintId] = useState(null)

    // Load mock complaints on mount
    useEffect(() => {
        const mockComplaints = generateMockComplaints()
        setComplaints(mockComplaints)

        // Load user interactions from localStorage
        const storedInteractions = localStorage.getItem('cityconnect_interactions')
        if (storedInteractions) {
            try {
                setUserInteractions(JSON.parse(storedInteractions))
            } catch (error) {
                console.error('Error parsing interactions:', error)
            }
        }
    }, [])

    // Save interactions to localStorage whenever they change
    useEffect(() => {
        if (Object.keys(userInteractions).length > 0) {
            localStorage.setItem('cityconnect_interactions', JSON.stringify(userInteractions))
        }
    }, [userInteractions])

    // Add a new complaint
    const addComplaint = (complaintData) => {
        const newComplaint = {
            id: '#' + (12300 + complaints.length + 1),
            ...complaintData,
            status: 'pending',
            upvotes: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            raisedBy: user
        }

        setComplaints(prev => [newComplaint, ...prev])
        setLastComplaintId(newComplaint.id)
        return newComplaint
    }

    // Toggle upvote on a complaint
    const toggleUpvote = (complaintId) => {
        if (!user) return

        const interactionKey = `${user.id}_${complaintId}`
        const hasUpvoted = userInteractions[interactionKey]?.upvoted

        // Update user interactions
        setUserInteractions(prev => ({
            ...prev,
            [interactionKey]: {
                ...prev[interactionKey],
                upvoted: !hasUpvoted
            }
        }))

        // Update complaint upvote count
        setComplaints(prev => prev.map(complaint => {
            if (complaint.id === complaintId) {
                return {
                    ...complaint,
                    upvotes: hasUpvoted ? complaint.upvotes - 1 : complaint.upvotes + 1
                }
            }
            return complaint
        }))
    }

    // Toggle support on a complaint
    const toggleSupport = (complaintId) => {
        if (!user) return

        const interactionKey = `${user.id}_${complaintId}`
        const hasSupported = userInteractions[interactionKey]?.supported

        setUserInteractions(prev => ({
            ...prev,
            [interactionKey]: {
                ...prev[interactionKey],
                supported: !hasSupported
            }
        }))
    }

    // Get user's complaints
    const getUserComplaints = () => {
        if (!user) return []
        return complaints.filter(c => c.raisedBy.id === user.id)
    }

    // Get user statistics
    const getUserStats = () => {
        const userComplaints = getUserComplaints()
        return {
            reported: userComplaints.length,
            resolved: userComplaints.filter(c => c.status === 'resolved').length,
            pending: userComplaints.filter(c => c.status === 'pending' || c.status === 'in_progress').length
        }
    }

    // Check if user has upvoted a complaint
    const hasUpvoted = (complaintId) => {
        if (!user) return false
        const interactionKey = `${user.id}_${complaintId}`
        return userInteractions[interactionKey]?.upvoted || false
    }

    // Check if user has supported a complaint
    const hasSupported = (complaintId) => {
        if (!user) return false
        const interactionKey = `${user.id}_${complaintId}`
        return userInteractions[interactionKey]?.supported || false
    }

    const value = {
        complaints,
        addComplaint,
        toggleUpvote,
        toggleSupport,
        getUserComplaints,
        getUserStats,
        hasUpvoted,
        hasSupported,
        lastComplaintId
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook to use app context
export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within an AppProvider')
    }
    return context
}
