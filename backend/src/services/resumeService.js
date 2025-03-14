const analyzeSkills = (text) => {
    // Example: Extract skills using regex
    const skillsList = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Git'];
    const extractedSkills = skillsList.filter(skill => 
        new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );
    return extractedSkills;
};

const matchJobs = (skills) => {
    const jobs = [
        {
            title: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            employment_type: 'Full-time',
            description: 'Responsible for designing and implementing high-performance, scalable software solutions for enterprise clients.',
            requirements: ['5+ years of experience in software development', 'Proficient in React, Node.js, and AWS'],
            matching_skills: ['JavaScript', 'React', 'Node.js'],
            missing_skills: ['AWS'],
            match_percentage: 85,
            apply_link: 'https://example.com/job/123'
        },
        {
            title: 'Data Scientist',
            company: 'Data Insights LLC',
            location: 'Remote',
            employment_type: 'Full-time',
            description: 'Analyze large datasets to derive actionable insights and build predictive models.',
            requirements: ['3+ years of experience in data science', 'Proficient in Python and Machine Learning'],
            matching_skills: ['Python'],
            missing_skills: ['Machine Learning'],
            match_percentage: 70,
            apply_link: 'https://example.com/job/456'
        }
    ];

    return jobs
        .filter(job => job.matching_skills.some(skill => skills.includes(skill)))
        .map(job => ({
            ...job,
            match_percentage: Math.floor(
                (job.matching_skills.filter(skill => skills.includes(skill)).length / job.matching_skills.length) * 100
            )
        }));
};

module.exports = { analyzeSkills, matchJobs };