// Skill Gap Assessment - JavaScript

// State Management
const assessmentState = {
    currentSection: 1,
    selectedProfession: null,
    selectedSkills: [],
    selectedExperience: null,
    yearsOfExperience: 0,
    professionType: null // 'technical' or 'management'
};

// Skill Database
const skillDatabase = {
    'Software Developer': {
        type: 'technical',
        required: {
            technical: [
                'JavaScript', 'Python', 'Java', 'C++', 'Git', 'SQL', 'REST APIs',
                'Data Structures', 'Algorithms', 'OOP', 'Testing', 'Debugging'
            ],
            management: [
                'Communication', 'Problem Solving', 'Time Management', 'Teamwork'
            ]
        }
    },
    'Data Analyst': {
        type: 'technical',
        required: {
            technical: [
                'Python', 'R', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Statistics',
                'Data Visualization', 'Data Cleaning', 'Pandas', 'NumPy'
            ],
            management: [
                'Communication', 'Critical Thinking', 'Business Acumen', 'Presentation Skills'
            ]
        }
    },
    'AI/ML Engineer': {
        type: 'technical',
        required: {
            technical: [
                'Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning',
                'Neural Networks', 'NLP', 'Computer Vision', 'Statistics', 'Linear Algebra'
            ],
            management: [
                'Research Skills', 'Problem Solving', 'Communication', 'Project Management'
            ]
        }
    },
    'Web Developer': {
        type: 'technical',
        required: {
            technical: [
                'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB',
                'Responsive Design', 'REST APIs', 'Git', 'TypeScript'
            ],
            management: [
                'Communication', 'Time Management', 'Creativity', 'Attention to Detail'
            ]
        }
    },
    'Cybersecurity Analyst': {
        type: 'technical',
        required: {
            technical: [
                'Network Security', 'Penetration Testing', 'Cryptography', 'Linux',
                'Firewalls', 'SIEM Tools', 'Incident Response', 'Risk Assessment'
            ],
            management: [
                'Analytical Thinking', 'Communication', 'Problem Solving', 'Compliance Knowledge'
            ]
        }
    },
    'Product Manager': {
        type: 'management',
        required: {
            technical: [
                'Product Analytics', 'SQL', 'A/B Testing', 'Wireframing', 'Agile/Scrum',
                'User Research', 'Market Analysis'
            ],
            management: [
                'Leadership', 'Strategic Thinking', 'Communication', 'Stakeholder Management',
                'Decision Making', 'Prioritization', 'Roadmap Planning', 'Cross-functional Collaboration'
            ]
        }
    },
    'Project Manager': {
        type: 'management',
        required: {
            technical: [
                'Project Management Tools', 'Agile/Scrum', 'Gantt Charts', 'Risk Management',
                'Budget Management', 'MS Project'
            ],
            management: [
                'Leadership', 'Communication', 'Planning', 'Time Management',
                'Team Coordination', 'Conflict Resolution', 'Stakeholder Management'
            ]
        }
    },
    'Business Analyst': {
        type: 'management',
        required: {
            technical: [
                'SQL', 'Excel', 'Data Analysis', 'Business Intelligence', 'Process Modeling',
                'Requirements Gathering', 'Documentation'
            ],
            management: [
                'Analytical Thinking', 'Communication', 'Problem Solving', 'Stakeholder Management',
                'Critical Thinking', 'Business Acumen'
            ]
        }
    },
    'Operations Manager': {
        type: 'management',
        required: {
            technical: [
                'Process Optimization', 'Supply Chain Management', 'Quality Control',
                'Data Analysis', 'ERP Systems', 'Lean Six Sigma'
            ],
            management: [
                'Leadership', 'Strategic Planning', 'Decision Making', 'Team Management',
                'Communication', 'Problem Solving', 'Resource Allocation'
            ]
        }
    },
    'Management Consultant': {
        type: 'management',
        required: {
            technical: [
                'Business Analysis', 'Financial Modeling', 'Market Research',
                'Data Analysis', 'Strategy Frameworks', 'Excel'
            ],
            management: [
                'Strategic Thinking', 'Communication', 'Presentation Skills', 'Problem Solving',
                'Client Management', 'Leadership', 'Analytical Skills'
            ]
        }
    }
};

// DOM Elements
const progressFill = document.getElementById('progressFill');
const sections = document.querySelectorAll('.section');
const steps = document.querySelectorAll('.step');
const professionCards = document.querySelectorAll('.profession-card');
const experienceCards = document.querySelectorAll('.experience-card');
const yearsInput = document.getElementById('yearsInput');

// Navigation Buttons
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const prevBtn2 = document.getElementById('prevBtn2');
const prevBtn3 = document.getElementById('prevBtn3');
const analyzeBtn = document.getElementById('analyzeBtn');
const retakeBtn = document.getElementById('retakeBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Profession Selection
    professionCards.forEach(card => {
        card.addEventListener('click', () => selectProfession(card));
    });

    // Experience Selection
    experienceCards.forEach(card => {
        card.addEventListener('click', () => selectExperience(card));
    });

    // Navigation
    nextBtn1.addEventListener('click', () => goToSection(2));
    nextBtn2.addEventListener('click', () => goToSection(3));
    prevBtn2.addEventListener('click', () => goToSection(1));
    prevBtn3.addEventListener('click', () => goToSection(2));
    analyzeBtn.addEventListener('click', analyzeSkills);
    retakeBtn.addEventListener('click', resetAssessment);
    downloadBtn.addEventListener('click', downloadReport);
}

// Profession Selection
function selectProfession(card) {
    professionCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    assessmentState.selectedProfession = card.dataset.profession;
    assessmentState.professionType = skillDatabase[assessmentState.selectedProfession].type;
    
    nextBtn1.disabled = false;
    
    // Load skills for next section
    loadSkills();
}

// Load Skills Based on Profession
function loadSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';
    
    const profession = skillDatabase[assessmentState.selectedProfession];
    
    // Technical Skills
    if (profession.required.technical.length > 0) {
        const techCategory = createSkillCategory('Technical Skills', profession.required.technical, 'code');
        skillsContainer.appendChild(techCategory);
    }
    
    // Management Skills
    if (profession.required.management.length > 0) {
        const mgmtCategory = createSkillCategory('Management Skills', profession.required.management, 'users');
        skillsContainer.appendChild(mgmtCategory);
    }
}

function createSkillCategory(title, skills, icon) {
    const category = document.createElement('div');
    category.className = 'skill-category';
    
    const header = document.createElement('h3');
    header.innerHTML = `<i class="fas fa-${icon}"></i> ${title}`;
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'skill-tags';
    
    // Icon and color mapping for skills
    const skillIcons = {
        // Programming Languages
        'Python': { icon: 'fab fa-python', color: '#3776AB' },
        'JavaScript': { icon: 'fab fa-js', color: '#F7DF1E' },
        'Java': { icon: 'fab fa-java', color: '#007396' },
        'C++': { icon: 'fas fa-code', color: '#00599C' },
        'R': { icon: 'fab fa-r-project', color: '#276DC3' },
        'Git': { icon: 'fab fa-git-alt', color: '#F05032' },
        
        // Data & Analytics
        'SQL': { icon: 'fas fa-database', color: '#4479A1' },
        'Excel': { icon: 'fas fa-file-excel', color: '#217346' },
        'Tableau': { icon: 'fas fa-chart-bar', color: '#E97627' },
        'Power BI': { icon: 'fas fa-chart-line', color: '#F2C811' },
        'Statistics': { icon: 'fas fa-chart-pie', color: '#667eea' },
        'Data Visualization': { icon: 'fas fa-chart-area', color: '#10B981' },
        'Data Cleaning': { icon: 'fas fa-broom', color: '#8B5CF6' },
        'Pandas': { icon: 'fas fa-table', color: '#150458' },
        'NumPy': { icon: 'fas fa-calculator', color: '#013243' },
        'Data Analysis': { icon: 'fas fa-chart-line', color: '#3B82F6' },
        
        // Web & APIs
        'REST APIs': { icon: 'fas fa-plug', color: '#61DAFB' },
        'HTML/CSS': { icon: 'fab fa-html5', color: '#E34F26' },
        'React': { icon: 'fab fa-react', color: '#61DAFB' },
        'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
        
        // AI/ML
        'Machine Learning': { icon: 'fas fa-brain', color: '#FF6F00' },
        'Deep Learning': { icon: 'fas fa-project-diagram', color: '#FF6F00' },
        'TensorFlow': { icon: 'fas fa-robot', color: '#FF6F00' },
        'PyTorch': { icon: 'fas fa-fire', color: '#EE4C2C' },
        'Neural Networks': { icon: 'fas fa-network-wired', color: '#8B5CF6' },
        'NLP': { icon: 'fas fa-language', color: '#10B981' },
        'Computer Vision': { icon: 'fas fa-eye', color: '#3B82F6' },
        'Linear Algebra': { icon: 'fas fa-square-root-alt', color: '#667eea' },
        
        // Cloud & DevOps
        'AWS': { icon: 'fab fa-aws', color: '#FF9900' },
        'Docker': { icon: 'fab fa-docker', color: '#2496ED' },
        'Kubernetes': { icon: 'fas fa-dharmachakra', color: '#326CE5' },
        'CI/CD': { icon: 'fas fa-sync-alt', color: '#10B981' },
        
        // General Technical
        'Data Structures': { icon: 'fas fa-sitemap', color: '#667eea' },
        'Algorithms': { icon: 'fas fa-project-diagram', color: '#8B5CF6' },
        'OOP': { icon: 'fas fa-cube', color: '#3B82F6' },
        'Testing': { icon: 'fas fa-vial', color: '#10B981' },
        'Debugging': { icon: 'fas fa-bug', color: '#EF4444' },
        'Version Control': { icon: 'fab fa-git-alt', color: '#F05032' },
        
        // Management Skills
        'Communication': { icon: 'fas fa-comments', color: '#10B981' },
        'Leadership': { icon: 'fas fa-user-tie', color: '#8B5CF6' },
        'Project Management': { icon: 'fas fa-tasks', color: '#3B82F6' },
        'Team Collaboration': { icon: 'fas fa-users', color: '#EC4899' },
        'Problem Solving': { icon: 'fas fa-lightbulb', color: '#F59E0B' },
        'Critical Thinking': { icon: 'fas fa-brain', color: '#667eea' },
        'Strategic Planning': { icon: 'fas fa-chess', color: '#8B5CF6' },
        'Stakeholder Management': { icon: 'fas fa-handshake', color: '#10B981' },
        'Business Acumen': { icon: 'fas fa-briefcase', color: '#3B82F6' },
        'Presentation Skills': { icon: 'fas fa-presentation', color: '#F59E0B' },
        'Agile/Scrum': { icon: 'fas fa-sync', color: '#10B981' },
        'Product Analytics': { icon: 'fas fa-chart-bar', color: '#667eea' },
        'A/B Testing': { icon: 'fas fa-flask', color: '#8B5CF6' },
        'Wireframing': { icon: 'fas fa-pencil-ruler', color: '#EC4899' },
        'User Research': { icon: 'fas fa-search', color: '#3B82F6' },
        'Market Analysis': { icon: 'fas fa-chart-pie', color: '#10B981' },
        'Business Intelligence': { icon: 'fas fa-lightbulb', color: '#F59E0B' },
        'Process Modeling': { icon: 'fas fa-stream', color: '#667eea' },
        'Requirements Gathering': { icon: 'fas fa-clipboard-list', color: '#3B82F6' },
        'Documentation': { icon: 'fas fa-file-alt', color: '#6B7280' },
        'Financial Modeling': { icon: 'fas fa-dollar-sign', color: '#10B981' },
        'Market Research': { icon: 'fas fa-search-dollar', color: '#8B5CF6' },
        'Strategy Frameworks': { icon: 'fas fa-sitemap', color: '#667eea' },
        'Change Management': { icon: 'fas fa-exchange-alt', color: '#EC4899' },
        'Risk Management': { icon: 'fas fa-shield-alt', color: '#EF4444' },
        'Negotiation': { icon: 'fas fa-handshake', color: '#10B981' }
    };
    
    skills.forEach(skill => {
        const tag = document.createElement('div');
        tag.className = 'skill-tag';
        
        // Get icon and color for skill, or use default
        const skillData = skillIcons[skill] || { icon: 'fas fa-check-circle', color: '#667eea' };
        
        tag.innerHTML = `<i class="${skillData.icon}" style="color: ${skillData.color}; margin-right: 0.5rem;"></i>${skill}`;
        tag.addEventListener('click', () => toggleSkill(tag, skill));
        tagsContainer.appendChild(tag);
    });
    
    category.appendChild(header);
    category.appendChild(tagsContainer);
    
    return category;
}

function toggleSkill(tag, skill) {
    tag.classList.toggle('selected');
    
    if (tag.classList.contains('selected')) {
        assessmentState.selectedSkills.push(skill);
    } else {
        assessmentState.selectedSkills = assessmentState.selectedSkills.filter(s => s !== skill);
    }
}

// Experience Selection
function selectExperience(card) {
    experienceCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    assessmentState.selectedExperience = card.dataset.experience;
    
    // Show years input for work experience
    if (assessmentState.selectedExperience === 'Work experience') {
        yearsInput.style.display = 'block';
    } else {
        yearsInput.style.display = 'none';
        assessmentState.yearsOfExperience = 0;
    }
    
    analyzeBtn.disabled = false;
}

// Navigation
function goToSection(sectionNumber) {
    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    document.getElementById(`section${sectionNumber}`).classList.add('active');
    
    // Update progress
    assessmentState.currentSection = sectionNumber;
    updateProgress();
}

function updateProgress() {
    const progress = (assessmentState.currentSection / 4) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update steps
    steps.forEach((step, index) => {
        if (index < assessmentState.currentSection) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Analysis
function analyzeSkills() {
    // Get years if applicable
    const yearsInputField = document.getElementById('yearsExperience');
    if (yearsInputField.value) {
        assessmentState.yearsOfExperience = parseInt(yearsInputField.value);
    }
    
    // Go to results section
    goToSection(4);
    
    // Show loading animation
    document.getElementById('loadingAnimation').style.display = 'flex';
    document.getElementById('resultsContent').style.display = 'none';
    
    // Simulate analysis delay
    setTimeout(() => {
        generateResults();
        document.getElementById('loadingAnimation').style.display = 'none';
        document.getElementById('resultsContent').style.display = 'block';
    }, 2500);
}

function generateResults() {
    const profession = skillDatabase[assessmentState.selectedProfession];
    const allRequiredSkills = [...profession.required.technical, ...profession.required.management];
    
    // Calculate coverage
    const matchedSkills = assessmentState.selectedSkills.filter(skill => 
        allRequiredSkills.includes(skill)
    );
    
    const coverage = Math.round((matchedSkills.length / allRequiredSkills.length) * 100);
    const gap = 100 - coverage;
    const missingSkills = allRequiredSkills.filter(skill => 
        !assessmentState.selectedSkills.includes(skill)
    );
    
    // Update summary cards
    animateCounter('skillCoverage', coverage, '%');
    animateCounter('skillGap', gap, '%');
    animateCounter('skillsToLearn', missingSkills.length, '');
    
    // Generate gaps list
    generateGapsList(missingSkills, profession);
    
    // Generate recommendations
    generateRecommendations(missingSkills, profession);
}

function animateCounter(elementId, target, suffix) {
    const element = document.getElementById(elementId);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current) + suffix;
        }
    }, 30);
}

function generateGapsList(missingSkills, profession) {
    const gapsList = document.getElementById('gapsList');
    gapsList.innerHTML = '';
    
    if (missingSkills.length === 0) {
        gapsList.innerHTML = '<p style="text-align: center; color: var(--success); font-weight: 600;">🎉 Excellent! You have all the required skills for this profession.</p>';
        return;
    }
    
    // Categorize gaps
    const technicalGaps = missingSkills.filter(skill => 
        profession.required.technical.includes(skill)
    );
    const managementGaps = missingSkills.filter(skill => 
        profession.required.management.includes(skill)
    );
    
    // Technical Gaps
    if (technicalGaps.length > 0) {
        technicalGaps.forEach((skill, index) => {
            const priority = index < 3 ? 'high' : index < 6 ? 'medium' : 'low';
            const gapItem = createGapItem(skill, 'Technical Skill', priority);
            gapsList.appendChild(gapItem);
        });
    }
    
    // Management Gaps
    if (managementGaps.length > 0) {
        managementGaps.forEach((skill, index) => {
            const priority = index < 2 ? 'high' : 'medium';
            const gapItem = createGapItem(skill, 'Management Skill', priority);
            gapsList.appendChild(gapItem);
        });
    }
}

function createGapItem(skill, type, priority) {
    const item = document.createElement('div');
    item.className = 'gap-item';
    
    const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1);
    
    item.innerHTML = `
        <div class="gap-header">
            <h4>${skill}</h4>
            <span class="priority-badge priority-${priority}">${priorityText} Priority</span>
        </div>
        <p>${type} - Essential for ${assessmentState.selectedProfession} role</p>
    `;
    
    return item;
}

function generateRecommendations(missingSkills, profession) {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    if (missingSkills.length === 0) {
        recommendationsList.innerHTML = '<p style="text-align: center; color: var(--success); font-weight: 600;">You\'re ready to apply for positions! Focus on building projects and gaining practical experience.</p>';
        return;
    }
    
    // Learning Path Recommendations
    const learningPaths = generateLearningPaths(missingSkills, profession);
    
    learningPaths.forEach(path => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        
        const skillsList = path.skills.map(skill => `<li>${skill}</li>`).join('');
        
        item.innerHTML = `
            <h4><i class="fas fa-lightbulb"></i> ${path.title}</h4>
            <ul>${skillsList}</ul>
        `;
        
        recommendationsList.appendChild(item);
    });
}

function generateLearningPaths(missingSkills, profession) {
    const paths = [];
    
    // Beginner Path
    const beginnerSkills = missingSkills.slice(0, 3);
    if (beginnerSkills.length > 0) {
        paths.push({
            title: 'Foundation Skills (Start Here)',
            skills: beginnerSkills.map(skill => `Learn ${skill} through online courses and tutorials`)
        });
    }
    
    // Intermediate Path
    const intermediateSkills = missingSkills.slice(3, 6);
    if (intermediateSkills.length > 0) {
        paths.push({
            title: 'Intermediate Development',
            skills: intermediateSkills.map(skill => `Build projects using ${skill}`)
        });
    }
    
    // Advanced Path
    const advancedSkills = missingSkills.slice(6);
    if (advancedSkills.length > 0) {
        paths.push({
            title: 'Advanced Specialization',
            skills: advancedSkills.map(skill => `Master ${skill} through real-world applications`)
        });
    }
    
    // General Recommendations
    paths.push({
        title: 'Practical Experience',
        skills: [
            'Work on 2-3 portfolio projects showcasing your skills',
            'Contribute to open-source projects',
            'Seek internships or freelance opportunities',
            'Network with professionals in the field'
        ]
    });
    
    return paths;
}

// Reset Assessment
function resetAssessment() {
    assessmentState.currentSection = 1;
    assessmentState.selectedProfession = null;
    assessmentState.selectedSkills = [];
    assessmentState.selectedExperience = null;
    assessmentState.yearsOfExperience = 0;
    
    professionCards.forEach(card => card.classList.remove('selected'));
    experienceCards.forEach(card => card.classList.remove('selected'));
    
    nextBtn1.disabled = true;
    analyzeBtn.disabled = true;
    
    goToSection(1);
}

// Download Report
function downloadReport() {
    const profession = assessmentState.selectedProfession;
    const coverage = document.getElementById('skillCoverage').textContent;
    const gap = document.getElementById('skillGap').textContent;
    const skillsToLearn = document.getElementById('skillsToLearn').textContent;
    
    const reportContent = `
SKILLBRIDGE AI - SKILL GAP ASSESSMENT REPORT
============================================

Target Profession: ${profession}
Assessment Date: ${new Date().toLocaleDateString()}

SUMMARY
-------
Skill Coverage: ${coverage}
Skill Gap: ${gap}
Skills to Learn: ${skillsToLearn}

SELECTED SKILLS
---------------
${assessmentState.selectedSkills.join(', ')}

EXPERIENCE LEVEL
----------------
${assessmentState.selectedExperience}
${assessmentState.yearsOfExperience > 0 ? `Years: ${assessmentState.yearsOfExperience}` : ''}

RECOMMENDATIONS
---------------
Focus on building the missing skills through:
- Online courses and certifications
- Hands-on projects
- Internships and practical experience
- Networking with industry professionals

Next Steps:
1. Start with high-priority skills
2. Build a portfolio of projects
3. Seek mentorship and guidance
4. Apply for relevant positions

Generated by SkillBridge AI
www.skillbridgeai.com
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillBridge_Assessment_${profession.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Report downloaded successfully!');
}

// Console Log
console.log('SkillBridge AI - Skill Gap Assessment Ready! 🎓');
