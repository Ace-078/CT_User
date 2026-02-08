import { supabase } from '../supabaseClient'

export async function signUpUser(username, password, fullName) {
    try {
        // Insert new user
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username: username,
                    password_hash: password, // In real app, hash this!
                    full_name: fullName
                }
            ])
            .select()

        if (error) throw error

        alert('Sign up successful!')
        return data
    } catch (error) {
        alert('Error: ' + error.message)
    }
}