import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kylgbjbcqbcufgwzploc.supabase.co'  // Replace with your URL
const supabaseKey = 'sb_publishable_UxWKRkuxcaoDkKYl90Xt9A_l2QFMSlR'      // Replace with your key

export const supabase = createClient(supabaseUrl, supabaseKey)