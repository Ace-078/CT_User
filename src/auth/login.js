import { supabase } from '../supabaseClient'

export async function loginUser(username, password) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password_hash', password)
            .single()

        if (error) throw error

        if (data) {
            alert('Login successful!')
            localStorage.setItem('userId', data.id)
            return data
        }
    } catch (error) {
        alert('Invalid username or password')
    }
}