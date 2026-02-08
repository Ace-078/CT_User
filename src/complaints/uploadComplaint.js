import { supabase } from '../supabaseClient'

export async function uploadComplaint(title, description, photoFile, location) {
    try {
        const userId = localStorage.getItem('userId')

        // Upload photo first
        const fileName = `${Date.now()}_${photoFile.name}`
        const { data: photoData, error: photoError } = await supabase.storage
            .from('complaint-photos')
            .upload(fileName, photoFile)

        if (photoError) throw photoError

        // Get photo URL
        const { data: urlData } = supabase.storage
            .from('complaint-photos')
            .getPublicUrl(fileName)

        // Create complaint
        const { data, error } = await supabase
            .from('complaints')
            .insert([
                {
                    user_id: userId,
                    title: title,
                    description: description,
                    photo_url: urlData.publicUrl,
                    location: location
                }
            ])
            .select()

        if (error) throw error

        alert('Complaint submitted successfully!')
        return data
    } catch (error) {
        alert('Error: ' + error.message)
    }
}