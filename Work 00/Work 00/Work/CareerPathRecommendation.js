// Global variables
let currentQuestionIndex = 0;
let userResponses = [];
let techScore = 0;
let mgmtScore = 0;
let questionFlow = [];
let userProfile = null;

// Question Database
const questions = {
    core: [
        {
            id: 'core_1',
            text: 'When faced with a problem, what do you enjoy more?',
            options: [
                { text: 'Writing code / building a solution', type: 'tech', weight: 2 },
                { text: 'Analyzing the problem & planning strategy', type: 'neutral', weight: 1 },
                { text: 'Coordinating people & execution', type: 'mgmt', weight: 2 }
            ]
        },
        {
            id: 'core_2',
            text: 'Which activity excites you the most?',
            options: [
                { text: 'Debugging a technical issue', type: 'tech', weight: 2 },
                { text: 'Optimizing a business process', type: 'neutral', weight: 1 },
                { text: 'Presenting ideas to stakeholders', type: 'mgmt', weight: 2 }
            ]
        },
        {
            id: 'core_3',
            text: 'How do you prefer to spend most of your workday?',
            options: [
                { text: 'Working independently on systems', type: 'tech', weight: 2 },
                { text: 'Working with data & reports', type: 'neutral', weight: 1 },
                { text: 'Interacting with people & teams', type: 'mgmt', weight: 2 }
            ]
        },
        {
            id: 'core_4',
            text: 'What frustrates you more?',
            options: [
                { text: 'Poorly written code', type: 'tech', weight: 2 },
                { text: 'Lack of clear business goals', type: 'neutral', weight: 1 },
                { text: 'Poor communication within teams', type: 'mgmt', weight: 2 }
            ]
        }
    ],
    
    goals: [
        {
            id: 'goal_1',
            text: 'Where do you see yourself in 5 years?',
            options: [
                { text: 'Technical expert', type: 'tech', weight: 2 },
                { text: 'Team lead / Manager', type: 'mgmt', weight: 2 },
                { text: 'Entrepreneur', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'goal_2',
            text: 'What matters more to you in a job?',
            options: [
                { text: 'Problem-solving', type: 'tech', weight: 2 },
                { text: 'Impact & growth', type: 'neutral', weight: 1 },
                { text: 'Authority & responsibility', type: 'mgmt', weight: 2 }
            ]
        },
        {
            id: 'goal_3',
            text: 'Are you interested in roles that require client interaction?',
            options: [
                { text: 'Yes, frequently', type: 'mgmt', weight: 2 },
                { text: 'Sometimes, when needed', type: 'neutral', weight: 1 },
                { text: 'No, prefer minimal interaction', type: 'tech', weight: 2 }
            ]
        },
        {
            id: 'goal_4',
            text: 'How do you feel about taking ownership of outcomes?',
            options: [
                { text: 'Very comfortable, I thrive on it', type: 'mgmt', weight: 2 },
                { text: 'Neutral, depends on the situation', type: 'neutral', weight: 1 },
                { text: 'Prefer to focus on my technical work', type: 'tech', weight: 2 }
            ]
        },
        {
            id: 'goal_5',
            text: 'Which environment suits you better?',
            options: [
                { text: 'Structured technical role', type: 'tech', weight: 2 },
                { text: 'Dynamic business role', type: 'mgmt', weight: 2 },
                { text: 'Hybrid role (Tech + Management)', type: 'neutral', weight: 1 }
            ]
        }
    ],
    
    technical: [
        {
            id: 'tech_1',
            text: 'Do you enjoy learning new programming languages or frameworks?',
            options: [
                { text: 'Yes, constantly exploring new technologies', type: 'tech', weight: 2 },
                { text: 'Occasionally, when required', type: 'neutral', weight: 1 },
                { text: 'No, prefer mastering what I know', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'tech_2',
            text: 'How do you approach solving a complex technical problem?',
            options: [
                { text: 'Break it into smaller pieces and solve systematically', type: 'tech', weight: 2 },
                { text: 'Research best practices and apply them', type: 'neutral', weight: 1 },
                { text: 'Consult with others for collaborative solution', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_3',
            text: 'What excites you more in a project?',
            options: [
                { text: 'Building the core architecture', type: 'tech', weight: 2 },
                { text: 'Seeing the final product work', type: 'neutral', weight: 1 },
                { text: 'Impact on end users', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_4',
            text: 'How comfortable are you with algorithm optimization?',
            options: [
                { text: 'Very comfortable, I enjoy it', type: 'tech', weight: 2 },
                { text: 'Somewhat comfortable', type: 'neutral', weight: 1 },
                { text: 'Not my strength', type: 'neutral', weight: 0 }
            ]
        },
        {
            id: 'tech_5',
            text: 'Do you prefer working on backend systems or user interfaces?',
            options: [
                { text: 'Backend systems and databases', type: 'tech', weight: 2 },
                { text: 'User interfaces and UX', type: 'neutral', weight: 1 },
                { text: 'Both equally', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'tech_6',
            text: 'How do you feel about code reviews?',
            options: [
                { text: 'Essential for quality, I value them highly', type: 'tech', weight: 2 },
                { text: 'Useful but time-consuming', type: 'neutral', weight: 1 },
                { text: 'Prefer focusing on delivery', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_7',
            text: 'What type of documentation do you prefer?',
            options: [
                { text: 'Detailed technical documentation', type: 'tech', weight: 2 },
                { text: 'High-level architecture docs', type: 'neutral', weight: 1 },
                { text: 'User-facing guides', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_8',
            text: 'How do you stay updated with technology trends?',
            options: [
                { text: 'Deep dives into technical blogs and papers', type: 'tech', weight: 2 },
                { text: 'General tech news and podcasts', type: 'neutral', weight: 1 },
                { text: 'Industry trends and business impact', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_9',
            text: 'What kind of technical challenges motivate you?',
            options: [
                { text: 'Complex algorithmic problems', type: 'tech', weight: 2 },
                { text: 'System design challenges', type: 'tech', weight: 2 },
                { text: 'Integration and deployment issues', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'tech_10',
            text: 'How comfortable are you with debugging production issues at 2 AM?',
            options: [
                { text: 'Very comfortable, part of the job', type: 'tech', weight: 2 },
                { text: 'Okay if necessary', type: 'neutral', weight: 1 },
                { text: 'Prefer standard working hours', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_11',
            text: 'What type of projects do you gravitate towards?',
            options: [
                { text: 'Greenfield projects with new tech', type: 'tech', weight: 2 },
                { text: 'Improving existing systems', type: 'neutral', weight: 1 },
                { text: 'Projects with clear business value', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_12',
            text: 'How do you feel about open source contributions?',
            options: [
                { text: 'Actively contribute and maintain projects', type: 'tech', weight: 2 },
                { text: 'Occasionally contribute', type: 'neutral', weight: 1 },
                { text: 'Mostly use but don\'t contribute', type: 'neutral', weight: 0 }
            ]
        },
        {
            id: 'tech_13',
            text: 'What\'s your approach to learning new technologies?',
            options: [
                { text: 'Build projects to learn hands-on', type: 'tech', weight: 2 },
                { text: 'Take courses and tutorials', type: 'neutral', weight: 1 },
                { text: 'Learn on-the-job when needed', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'tech_14',
            text: 'How important is writing clean, maintainable code to you?',
            options: [
                { text: 'Extremely important, I refactor regularly', type: 'tech', weight: 2 },
                { text: 'Important but balanced with deadlines', type: 'neutral', weight: 1 },
                { text: 'Delivery comes first', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_15',
            text: 'What motivates you more in technical work?',
            options: [
                { text: 'Solving challenging technical problems', type: 'tech', weight: 2 },
                { text: 'Building something that works well', type: 'neutral', weight: 1 },
                { text: 'Creating value for users/business', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_16',
            text: 'How do you handle technical debt?',
            options: [
                { text: 'Prioritize fixing it proactively', type: 'tech', weight: 2 },
                { text: 'Address it when it becomes problematic', type: 'neutral', weight: 1 },
                { text: 'Balance with feature development', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_17',
            text: 'What\'s your preferred role in a development team?',
            options: [
                { text: 'Core developer/architect', type: 'tech', weight: 2 },
                { text: 'Full-stack developer', type: 'neutral', weight: 1 },
                { text: 'Tech lead coordinating the team', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_18',
            text: 'How do you approach testing?',
            options: [
                { text: 'Write comprehensive unit and integration tests', type: 'tech', weight: 2 },
                { text: 'Write tests for critical functionality', type: 'neutral', weight: 1 },
                { text: 'Rely on QA team for testing', type: 'mgmt', weight: 0 }
            ]
        },
        {
            id: 'tech_19',
            text: 'What type of technical skills do you want to develop?',
            options: [
                { text: 'Deep expertise in specific technologies', type: 'tech', weight: 2 },
                { text: 'Broad knowledge across tech stack', type: 'neutral', weight: 1 },
                { text: 'Enough to make informed decisions', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_20',
            text: 'How do you feel about attending technical conferences?',
            options: [
                { text: 'Excited to learn cutting-edge tech', type: 'tech', weight: 2 },
                { text: 'Interested in networking and trends', type: 'neutral', weight: 1 },
                { text: 'Prefer business/leadership conferences', type: 'mgmt', weight: 1 }
            ]
        },
        {
            id: 'tech_21',
            text: 'What\'s your view on technical certifications?',
            options: [
                { text: 'Valuable for deep technical knowledge', type: 'tech', weight: 2 },
                { text: 'Good for career progression', type: 'neutral', weight: 1 },
                { text: 'Experience matters more', type: 'neutral', weight: 1 }
            ]
        }
    ],
    
    management: [
        {
            id: 'mgmt_1',
            text: 'How comfortable are you leading a team meeting?',
            options: [
                { text: 'Very comfortable, I enjoy it', type: 'mgmt', weight: 2 },
                { text: 'Comfortable when needed', type: 'neutral', weight: 1 },
                { text: 'Prefer to participate rather than lead', type: 'tech', weight: 1 }
            ]
        },
        {
            id: 'mgmt_2',
            text: 'How do you handle conflict within a team?',
            options: [
                { text: 'Address it directly and mediate', type: 'mgmt', weight: 2 },
                { text: 'Help find technical solutions', type: 'neutral', weight: 1 },
                { text: 'Escalate to leadership', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_3',
            text: 'What excites you about stakeholder presentations?',
            options: [
                { text: 'Influencing decisions and strategy', type: 'mgmt', weight: 2 },
                { text: 'Explaining technical achievements', type: 'neutral', weight: 1 },
                { text: 'They stress me out', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_4',
            text: 'How do you prioritize tasks in a project?',
            options: [
                { text: 'Based on business value and impact', type: 'mgmt', weight: 2 },
                { text: 'Based on technical dependencies', type: 'tech', weight: 1 },
                { text: 'Balance both factors', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'mgmt_5',
            text: 'What\'s your approach to mentoring junior team members?',
            options: [
                { text: 'Active mentorship and career guidance', type: 'mgmt', weight: 2 },
                { text: 'Technical guidance when asked', type: 'neutral', weight: 1 },
                { text: 'Focus on my own work primarily', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_6',
            text: 'How do you handle project deadlines?',
            options: [
                { text: 'Coordinate team and adjust scope', type: 'mgmt', weight: 2 },
                { text: 'Work harder to meet deadlines', type: 'tech', weight: 1 },
                { text: 'Communicate risks to stakeholders', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'mgmt_7',
            text: 'What\'s your preferred communication style?',
            options: [
                { text: 'Regular meetings and updates', type: 'mgmt', weight: 2 },
                { text: 'Written documentation and async', type: 'tech', weight: 1 },
                { text: 'Mix of both based on need', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'mgmt_8',
            text: 'How do you approach strategic planning?',
            options: [
                { text: 'Lead planning sessions and roadmaps', type: 'mgmt', weight: 2 },
                { text: 'Contribute technical feasibility input', type: 'neutral', weight: 1 },
                { text: 'Execute on defined plans', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_9',
            text: 'What motivates you in a leadership role?',
            options: [
                { text: 'Developing people and seeing them grow', type: 'mgmt', weight: 2 },
                { text: 'Achieving team goals', type: 'neutral', weight: 1 },
                { text: 'Technical excellence', type: 'tech', weight: 1 }
            ]
        },
        {
            id: 'mgmt_10',
            text: 'How comfortable are you with budget and resource planning?',
            options: [
                { text: 'Very comfortable, part of my skillset', type: 'mgmt', weight: 2 },
                { text: 'Can do when needed', type: 'neutral', weight: 1 },
                { text: 'Not my strength', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_11',
            text: 'What\'s your view on organizational politics?',
            options: [
                { text: 'Necessary to navigate for team success', type: 'mgmt', weight: 2 },
                { text: 'Manageable but not enjoyable', type: 'neutral', weight: 1 },
                { text: 'Prefer to avoid them', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_12',
            text: 'How do you handle difficult conversations with team members?',
            options: [
                { text: 'Direct and constructive feedback', type: 'mgmt', weight: 2 },
                { text: 'Focus on specific technical issues', type: 'neutral', weight: 1 },
                { text: 'Avoid if possible', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_13',
            text: 'What excites you about cross-functional collaboration?',
            options: [
                { text: 'Aligning different perspectives', type: 'mgmt', weight: 2 },
                { text: 'Learning from other domains', type: 'neutral', weight: 1 },
                { text: 'Prefer working within my team', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_14',
            text: 'How do you measure success in your role?',
            options: [
                { text: 'Team performance and business impact', type: 'mgmt', weight: 2 },
                { text: 'Project delivery and quality', type: 'neutral', weight: 1 },
                { text: 'Technical achievements', type: 'tech', weight: 1 }
            ]
        },
        {
            id: 'mgmt_15',
            text: 'What\'s your approach to risk management?',
            options: [
                { text: 'Proactive identification and mitigation', type: 'mgmt', weight: 2 },
                { text: 'Technical risk assessment', type: 'neutral', weight: 1 },
                { text: 'React to issues as they arise', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_16',
            text: 'How comfortable are you with public speaking?',
            options: [
                { text: 'Very comfortable, I enjoy it', type: 'mgmt', weight: 2 },
                { text: 'Can do when necessary', type: 'neutral', weight: 1 },
                { text: 'Prefer smaller audiences', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_17',
            text: 'What\'s your view on agile methodologies?',
            options: [
                { text: 'Focus on ceremonies and collaboration', type: 'mgmt', weight: 2 },
                { text: 'Useful framework for delivery', type: 'neutral', weight: 1 },
                { text: 'Sometimes bureaucratic', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_18',
            text: 'How do you handle underperforming team members?',
            options: [
                { text: 'Coaching and performance improvement plans', type: 'mgmt', weight: 2 },
                { text: 'Provide technical guidance', type: 'neutral', weight: 1 },
                { text: 'Leave to their manager', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_19',
            text: 'What energizes you in your career?',
            options: [
                { text: 'Building and scaling teams', type: 'mgmt', weight: 2 },
                { text: 'Solving complex problems', type: 'tech', weight: 1 },
                { text: 'Continuous learning', type: 'neutral', weight: 1 }
            ]
        },
        {
            id: 'mgmt_20',
            text: 'How do you approach vendor or partner negotiations?',
            options: [
                { text: 'Lead negotiations for best outcomes', type: 'mgmt', weight: 2 },
                { text: 'Focus on technical requirements', type: 'neutral', weight: 1 },
                { text: 'Support but not lead', type: 'tech', weight: 0 }
            ]
        },
        {
            id: 'mgmt_21',
            text: 'What\'s your long-term career aspiration?',
            options: [
                { text: 'Executive leadership position', type: 'mgmt', weight: 2 },
                { text: 'Technical fellow or principal engineer', type: 'tech', weight: 2 },
                { text: 'Flexible, based on opportunities', type: 'neutral', weight: 1 }
            ]
        }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAssessment();
    setupEventListeners();
});

function initializeAssessment() {
    // Start with core and goals questions for everyone
    questionFlow = [...questions.core, ...questions.goals];
    displayQuestion();
}

function setupEventListeners() {
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    document.getElementById('prevQuestionBtn').addEventListener('click', prevQuestion);
    document.getElementById('finishBtn').addEventListener('click', finishAssessment);
    document.getElementById('retakeAssessmentBtn').addEventListener('click', retakeAssessment);
}

function displayQuestion() {
    const question = questionFlow[currentQuestionIndex];
    
    // Update question number and text
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('questionText').textContent = question.text;
    
    // Clear previous options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.setAttribute('data-index', index);
        
        // Check if this option was previously selected
        const previousResponse = userResponses[currentQuestionIndex];
        if (previousResponse && previousResponse.selectedIndex === index) {
            button.classList.add('selected');
            document.getElementById('nextQuestionBtn').disabled = false;
        }
        
        button.addEventListener('click', function() {
            selectOption(index);
        });
        
        optionsContainer.appendChild(button);
    });
    
    // Update progress
    updateProgress();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Animate card
    const questionCard = document.getElementById('questionCard');
    questionCard.style.animation = 'none';
    setTimeout(() => {
        questionCard.style.animation = 'slideIn 0.5s ease';
    }, 10);
}

function selectOption(index) {
    // Remove selection from all options
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.option-button')[index].classList.add('selected');
    
    // Store response
    const question = questionFlow[currentQuestionIndex];
    const selectedOption = question.options[index];
    
    userResponses[currentQuestionIndex] = {
        questionId: question.id,
        selectedIndex: index,
        option: selectedOption
    };
    
    // Enable next button
    document.getElementById('nextQuestionBtn').disabled = false;
}

function nextQuestion() {
    // Check if we need to determine branching after core + goals questions
    if (currentQuestionIndex === questions.core.length + questions.goals.length - 1) {
        determineBranching();
    }
    
    if (currentQuestionIndex < questionFlow.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function determineBranching() {
    // Calculate preliminary scores from core + goals questions
    let prelimTechScore = 0;
    let prelimMgmtScore = 0;
    
    userResponses.forEach(response => {
        if (response && response.option) {
            if (response.option.type === 'tech') {
                prelimTechScore += response.option.weight;
            } else if (response.option.type === 'mgmt') {
                prelimMgmtScore += response.option.weight;
            } else if (response.option.type === 'neutral') {
                prelimTechScore += response.option.weight;
                prelimMgmtScore += response.option.weight;
            }
        }
    });
    
    const totalPrelim = prelimTechScore + prelimMgmtScore;
    const techPercentage = (prelimTechScore / totalPrelim) * 100;
    
    // Determine which deep-dive questions to add
    if (techPercentage >= 60) {
        // Technical leaning - add technical questions
        questionFlow = [...questionFlow, ...questions.technical];
    } else if (techPercentage <= 40) {
        // Management leaning - add management questions
        questionFlow = [...questionFlow, ...questions.management];
    } else {
        // Balanced - add a mix (first 10 from each)
        questionFlow = [
            ...questionFlow,
            ...questions.technical.slice(0, 10),
            ...questions.management.slice(0, 10)
        ];
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questionFlow.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Question ${currentQuestionIndex + 1} of ${questionFlow.length}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevQuestionBtn');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    // Show/hide previous button
    prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    
    // Show/hide next/finish button
    if (currentQuestionIndex === questionFlow.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
        
        // Enable finish button if question is answered
        const currentResponse = userResponses[currentQuestionIndex];
        finishBtn.disabled = !currentResponse;
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

function finishAssessment() {
    calculateScores();
    classifyProfile();
    displayResults();
}

function calculateScores() {
    techScore = 0;
    mgmtScore = 0;
    
    userResponses.forEach(response => {
        if (response && response.option) {
            if (response.option.type === 'tech') {
                techScore += response.option.weight;
            } else if (response.option.type === 'mgmt') {
                mgmtScore += response.option.weight;
            } else if (response.option.type === 'neutral') {
                techScore += response.option.weight;
                mgmtScore += response.option.weight;
            }
        }
    });
}

function classifyProfile() {
    const totalScore = techScore + mgmtScore;
    const techPercentage = (techScore / totalScore) * 100;
    const mgmtPercentage = (mgmtScore / totalScore) * 100;
    
    if (techPercentage >= 70) {
        userProfile = {
            type: 'tech-dominant',
            title: '🔧 Tech Dominant',
            description: 'Your profile strongly aligns with technical roles. You excel at problem-solving, enjoy deep technical work, and prefer building solutions independently.',
            roles: [
                { icon: '💻', title: 'Software Developer', description: 'Build and maintain software applications' },
                { icon: '📊', title: 'Data Scientist / Analyst', description: 'Analyze data and build predictive models' },
                { icon: '🤖', title: 'AI / ML Engineer', description: 'Develop artificial intelligence solutions' },
                { icon: '🔒', title: 'Cybersecurity Engineer', description: 'Protect systems and data from threats' }
            ],
            techPercentage: Math.round(techPercentage),
            mgmtPercentage: Math.round(mgmtPercentage)
        };
    } else if (mgmtPercentage >= 70) {
        userProfile = {
            type: 'mgmt-dominant',
            title: '👔 Management Dominant',
            description: 'Your profile aligns with management and leadership roles. You excel at coordinating people, strategic planning, and driving business outcomes.',
            roles: [
                { icon: '📋', title: 'Project Manager', description: 'Lead projects and coordinate teams' },
                { icon: '⚙️', title: 'Operations Manager', description: 'Optimize business processes and operations' },
                { icon: '🎯', title: 'Product Owner', description: 'Define product vision and priorities' },
                { icon: '💼', title: 'Management Consultant', description: 'Advise organizations on strategy' }
            ],
            techPercentage: Math.round(techPercentage),
            mgmtPercentage: Math.round(mgmtPercentage)
        };
    } else {
        userProfile = {
            type: 'balanced',
            title: '⚖️ Balanced Profile',
            description: 'Your profile shows a strong balance between technical and management skills. You thrive in hybrid roles that combine both domains.',
            roles: [
                { icon: '📦', title: 'Product Manager', description: 'Bridge technology and business needs' },
                { icon: '📈', title: 'Business Analyst', description: 'Analyze requirements and design solutions' },
                { icon: '🔧', title: 'Technical Consultant', description: 'Advise clients on technical solutions' },
                { icon: '🏗️', title: 'Solutions Architect', description: 'Design end-to-end technical solutions' }
            ],
            techPercentage: Math.round(techPercentage),
            mgmtPercentage: Math.round(mgmtPercentage)
        };
    }
}

function displayResults() {
    // Hide assessment, show results
    document.getElementById('assessmentSection').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Display scores
    document.getElementById('techPercentage').textContent = userProfile.techPercentage + '%';
    document.getElementById('mgmtPercentage').textContent = userProfile.mgmtPercentage + '%';
    
    // Create chart
    createChart();
    
    // Display classification
    const badge = document.getElementById('profileBadge');
    badge.textContent = userProfile.title;
    badge.className = 'profile-badge ' + userProfile.type;
    
    document.getElementById('profileDescription').textContent = userProfile.description;
    
    // Display roles
    const rolesGrid = document.getElementById('rolesGrid');
    rolesGrid.innerHTML = '';
    
    userProfile.roles.forEach(role => {
        const roleCard = document.createElement('div');
        roleCard.className = 'role-card';
        roleCard.innerHTML = `
            <div class="role-icon">${role.icon}</div>
            <div class="role-title">${role.title}</div>
            <div class="role-description">${role.description}</div>
        `;
        rolesGrid.appendChild(roleCard);
    });
    
    // Generate explanation
    generateExplanation();
}

function createChart() {
    const canvas = document.getElementById('profileChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    // Calculate angles
    const techAngle = (userProfile.techPercentage / 100) * 2 * Math.PI;
    
    // Draw Management slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, techAngle);
    ctx.closePath();
    ctx.fillStyle = '#4facfe';
    ctx.fill();
    
    // Draw Tech slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, techAngle, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = '#f5576c';
    ctx.fill();
    
    // Draw center circle (donut effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Add labels
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Tech label
    const techLabelAngle = techAngle / 2;
    const techLabelX = centerX + Math.cos(techLabelAngle) * (radius * 0.8);
    const techLabelY = centerY + Math.sin(techLabelAngle) * (radius * 0.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Tech', techLabelX, techLabelY);
    
    // Mgmt label
    const mgmtLabelAngle = techAngle + ((2 * Math.PI - techAngle) / 2);
    const mgmtLabelX = centerX + Math.cos(mgmtLabelAngle) * (radius * 0.8);
    const mgmtLabelY = centerY + Math.sin(mgmtLabelAngle) * (radius * 0.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Mgmt', mgmtLabelX, mgmtLabelY);
}

function generateExplanation() {
    const explanationText = document.getElementById('explanationText');
    const explanations = [];
    
    // Analyze response patterns
    const techResponses = userResponses.filter(r => r && r.option && r.option.type === 'tech').length;
    const mgmtResponses = userResponses.filter(r => r && r.option && r.option.type === 'mgmt').length;
    
    if (userProfile.type === 'tech-dominant') {
        explanations.push('Your responses consistently showed preference for technical problem-solving and independent work.');
        explanations.push(`You selected ${techResponses} strongly technical-oriented answers, indicating deep interest in coding, system design, and technical challenges.`);
        explanations.push('You prefer working on systems and technology over managing people and processes.');
        explanations.push('Your ideal work environment involves solving complex technical problems with minimal managerial responsibilities.');
    } else if (userProfile.type === 'mgmt-dominant') {
        explanations.push('Your responses showed strong preference for leadership, strategy, and people management.');
        explanations.push(`You selected ${mgmtResponses} management-oriented answers, indicating interest in coordinating teams and driving business outcomes.`);
        explanations.push('You excel at stakeholder communication and prefer roles with authority and responsibility.');
        explanations.push('Your career path aligns with positions that require strategic thinking and team leadership.');
    } else {
        explanations.push('Your responses showed balanced interest in both technical and management aspects.');
        explanations.push('You can bridge the gap between technical teams and business stakeholders effectively.');
        explanations.push('You prefer roles that combine hands-on technical work with strategic planning and coordination.');
        explanations.push('Your versatile profile makes you ideal for hybrid roles like Product Management or Technical Consulting.');
    }
    
    const ul = document.createElement('ul');
    explanations.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
    });
    
    explanationText.innerHTML = '';
    explanationText.appendChild(ul);
}

function retakeAssessment() {
    // Reset everything
    currentQuestionIndex = 0;
    userResponses = [];
    techScore = 0;
    mgmtScore = 0;
    userProfile = null;
    
    // Reset question flow
    questionFlow = [...questions.core, ...questions.goals];
    
    // Show assessment, hide results
    document.getElementById('assessmentSection').style.display = 'block';
    document.getElementById('progressContainer').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // Display first question
    displayQuestion();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}