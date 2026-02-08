// Mock data generation utilities

export const generateMockComplaints = () => {
    const mockUsers = [
        {
            id: 'user_1',
            name: 'Sarah Jenkins',
            locality: 'Downtown District',
            photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp0kUiG0aJXGhTSNw1_qtPbFfjm7w-cxCX8NNg8UcLGN94WP1KTnmndVdQ9ZaHymIMukBrWdu3PPZoA2ehReIqSS-9vD8hiUnULPJL8ODTYTw6jasL3UBdQusMSIpNe71Bgsb7qTe_7ymuZ6kp6vT_79LgW7MJJYf6HUKD9U-afpotkFYApfhQ-f72GqeCpMHt-_V3_tKZDSCz-1LSem3ms_5LzXLU2KI3I2Z7apy9t_M4GhYSc8dpt0emkMjercxDYM2fdQvDbQ'
        },
        {
            id: 'user_2',
            name: 'Marcus Chen',
            locality: 'North Side',
            photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp1vf9qPQPg3GpxuD79VBltjOWqqZIpKd4lfJ8dOKY2zab2MFAcd_taK4IqOLp0Ua67C00v9Jb5GZl7_DpNGgas_YafdgNk9raPS5U-BqH6doUdClOMaqRJae_XX40B7ARrqnZy65ciIyTd50_WVEe-Zqxg5FwXju7poorOCmvu3AZCk-itubSX1oBne8mYm1LerKjflwh6CmT_xSQQs783TmB57cUbZIvJpmo4B6GYVrkRe0OvvC-zyd8D-vE5IoZ1FSX0bSASw'
        },
        {
            id: 'user_3',
            name: 'Elena Rodriguez',
            locality: 'Central Park',
            photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATsZkHxZ2bFYUr8A4uC1SVG_Bov5En-6hrCTswZLmDnHJBnzmPBaxRS2n7QfrrpdHt3RGXVZUFuYPrjCRG1yz75arNlf5LMFN8uOnyCCq6MgMeYmKytgCf8Kz1EcUo31cNqocRuPsH3G7dq6Flu6PlQj2WGyo5eHW896crpIdIxl_iMAbvRNxSXSfdOBcY3RmxeEDBHuuY4WwxzZUC3RmxNy2mWllQUh_sJ2g-_ZaiCEkI4xk4zDU2QY9k1I0Jtk9rRofruzhRww'
        }
    ]

    const complaints = [
        {
            id: '#12345',
            title: 'Pothole on Main St.',
            description: 'Large pothole causing traffic slowdown near the school entrance. It\'s getting deeper with the recent rain.',
            category: 'road',
            status: 'pending',
            severity: 'major',
            location: '123 Main St, Downtown District',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            upvotes: 124,
            commentsCount: 12,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzDpGOndXlCxSGBOi2nTLkDxvoDQpyEiNi5dOMt-cvs4-d5NjoBpAxZ8eBXV96wxFfmlmf6OLSRqm8qSaVEE_Hngl_im88GHNBadTaqNk1_0QCVyOgJEnV3T6qcuVIRbmbS46sSaNVv63qVHvq-sl31GNVcItJr41c1pXfBAPwcEd1DMHtNLNm9woZ_Miaew6FGK-PybPolserrGoL7ZvcuC4JPu1QaxLokMtDJN8gCffUAVEu-tstiDuqu1QGPQi53kVHewFyYA',
            raisedBy: mockUsers[0]
        },
        {
            id: '#12344',
            title: 'Broken Streetlight',
            description: 'Streetlight flickering dangerously at the corner of Elm and 5th. It\'s completely dark at night now.',
            category: 'electricity',
            status: 'in_progress',
            severity: 'normal',
            location: 'Corner of Elm & 5th, North Side',
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            upvotes: 45,
            commentsCount: 8,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrSdJkdiXpruvgs02Kow37FbmYtBPBhW4Z60L3vdFug9Epi5Ur3eLvSG2yVWumwRV8R3YfdbVJoEGeZ-bLaIvCh3SMtFQiND3WN0vxY7HnHNKcLZJY8_01vh7NYjyJYU1r6lJriTA41jub_v6yXZf3XNzIonNYbXK3qkC4F5xq61ejxzsQnGDCeToOKgBeux7nVw4SlWK4HN9Sf9zJNYul5VBhPSpDJhpgjWoDzpcSZdiu2K73Zx3AUZtFLDjkYZUlATj6pAsFxw',
            raisedBy: mockUsers[1]
        },
        {
            id: '#12343',
            title: 'Overflowing Trash Bin',
            description: 'The public trash bin near the park entrance has been overflowing for days.',
            category: 'garbage',
            status: 'resolved',
            severity: 'normal',
            location: 'Central Park, West Gate',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            upvotes: 89,
            commentsCount: 24,
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoJqtHOj5O1Wzmy5EggaRK101LCv6AEFlih9B9dymqDbGESjT4Xt-28P7_C1iWcAkT1qg5O5wGmKY_xGmXwnppQCYNZz2r2mnghnyFiMt20haJ8uEMd1Ixed_SJ8YAS3i1kfwqpOSuWE9xV6frEHSFhCmpZJlLtl7azuKn6AVYltKOL44Y-YheCBGb89aeuVyeNmXxvjCa1FZbJXP-JeIVzsX_dtPwFGp_K9mZ51w4R2xxvdQ43J10FTmRMgLtkgOyG017LDjD7w',
            raisedBy: mockUsers[2]
        },
        {
            id: '#12301',
            title: 'Water Leakage',
            description: 'Continuous water leakage from the main pipe causing waterlogging on the street.',
            category: 'water',
            status: 'pending',
            severity: 'major',
            location: 'Koramangala, 5th Block',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            upvotes: 32,
            commentsCount: 5,
            imageUrl: null,
            raisedBy: mockUsers[0]
        },
        {
            id: '#12289',
            title: 'Garbage Pileup near Park',
            description: 'Garbage has been piling up for over a week at the park entrance. Strong odor and health hazard.',
            category: 'garbage',
            status: 'in_progress',
            severity: 'critical',
            location: 'Indiranagar, Sector 4',
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
            upvotes: 67,
            commentsCount: 15,
            imageUrl: null,
            raisedBy: mockUsers[1]
        }
    ]

    return complaints
}

export const categoryOptions = [
    { value: 'garbage', label: 'Garbage & Waste', icon: 'delete' },
    { value: 'road', label: 'Road & Infrastructure', icon: 'road' },
    { value: 'water', label: 'Water Supply/Drainage', icon: 'water_drop' },
    { value: 'electricity', label: 'Streetlights/Power', icon: 'lightbulb' },
    { value: 'other', label: 'Other Issues', icon: 'report_problem' }
]

export const localityOptions = [
    'Downtown District',
    'Uptown Heights',
    'Westside Commons',
    'Eastville Industrial',
    'Northern Suburbs',
    'Indiranagar, Sector 4',
    'Koramangala, 5th Block',
    'MG Road',
    'Jayanagar, 9th Block'
]
