import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('civiltrack_user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error('Error parsing stored user:', error)
                localStorage.removeItem('civiltrack_user')
            }
        }
        setLoading(false)
    }, [])

    // Login function - mock authentication
    const login = async (credentials) => {
        try {
            // Mock login - in production, this would call an API
            const { name, emailOrPhone, password } = credentials

            // Simple validation
            if (!name || !emailOrPhone || !password) {
                throw new Error('Please provide name, email/phone, and password')
            }

            // Mock user data - use the actual name provided by the user
            // In production, this would be fetched from the database
            const mockUser = {
                id: 'user_' + Date.now(),
                name: name,
                email: emailOrPhone.includes('@') ? emailOrPhone : null,
                phone: emailOrPhone.includes('@') ? '+91 9876543210' : emailOrPhone,
                locality: 'Indiranagar, Sector 4',
                ward: 'Ward 04 - Central District',
                verified: true,
                voterIdphoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwEXGSeOijOmgJCWhteG0CUXd02A0nuYDOrbf_kVPNLQUZUhfHzMJU0BQlqBB8F3yaRviF1NEXaKX1PAxZv-9lPqG8SlPwTENd2SBYpRSaBfSkrOY3DGStibIp6hwg258hSCScFFDefkLCio_dRu_swTp16zZOFVSZROBM0JcufaurthuG-xsjU-3wdxdkgChBcFsHo_hOjYZbOv66lOvIwLpp3fx8-6dF4sbnY2xgk6l9eI6x70BJf9LAJfCuqvDAneYID4dElQ'
            }

            // Store user in localStorage
            localStorage.setItem('civiltrack_user', JSON.stringify(mockUser))
            setUser(mockUser)

            return { success: true, user: mockUser }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Signup function - mock registration
    const signup = async (userData) => {
        try {
            const { fullName, email, phone, locality, gender } = userData

            // Validation
            if (!fullName || !email || !phone || !locality || !gender) {
                throw new Error('Please fill in all required fields')
            }

            // Gender-based profile photos
            const malePhoto = 'https://api.dicebear.com/7.x/avataaars/svg?seed=male&backgroundColor=b6e3f4'
            const femalePhoto = 'https://api.dicebear.com/7.x/avataaars/svg?seed=female&backgroundColor=ffd5dc&hair=long'

            // Mock user creation
            const newUser = {
                id: 'user_' + Date.now(),
                name: fullName,
                email: email,
                phone: phone,
                locality: locality,
                gender: gender,
                ward: 'Ward 04 - Central District',
                verified: false,
                photo: gender === 'male' ? malePhoto : femalePhoto
            }

            // Store user in localStorage
            localStorage.setItem('civiltrack_user', JSON.stringify(newUser))
            setUser(newUser)

            return { success: true, user: newUser }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem('civiltrack_user')
        setUser(null)
    }

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
