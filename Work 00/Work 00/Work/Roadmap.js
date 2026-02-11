// Personalized Learning Roadmap - JavaScript

// Data
const professions = [
    'Software Developer', 'Data Analyst', 'AI/ML Engineer', 'Web Developer',
    'Cybersecurity Analyst', 'Product Manager', 'Project Manager',
    'Business Analyst', 'Operations Manager', 'Management Consultant'
];

const skills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL',
    'Machine Learning', 'Data Analysis', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Project Management', 'Leadership', 'Communication'
];

// State
const roadmapState = {
    selectedPath: null,
    pathType: null, // 'profession', 'skill', 'custom'
    currentLevel: null,
    weeklyTime: null,
    targetTimeline: null,
    experienceLevel: null,
    currentStep: 1,
    completedTasks: new Set(),
    roadmapData: null
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSelections();
    setupEventListeners();
});

// Initialize Selection Grids
function initializeSelections() {
    const professionGrid = document.getElementById('professionGrid');
    const skillGrid = document.getElementById('skillGrid');
    
    // Icon and color mapping for professions
    const professionIcons = {
        'Software Developer': { icon: 'fas fa-laptop-code', color: '#3B82F6' },
        'Data Analyst': { icon: 'fas fa-chart-line', color: '#10B981' },
        'AI/ML Engineer': { icon: 'fas fa-brain', color: '#FF6F00' },
        'Web Developer': { icon: 'fas fa-globe', color: '#61DAFB' },
        'Cybersecurity Analyst': { icon: 'fas fa-shield-alt', color: '#EF4444' },
        'Product Manager': { icon: 'fas fa-box', color: '#8B5CF6' },
        'Project Manager': { icon: 'fas fa-tasks', color: '#667eea' },
        'Business Analyst': { icon: 'fas fa-chart-pie', color: '#F59E0B' },
        'Operations Manager': { icon: 'fas fa-cogs', color: '#6B7280' },
        'Management Consultant': { icon: 'fas fa-user-tie', color: '#EC4899' }
    };
    
    // Icon and color mapping for skills
    const skillIcons = {
        'JavaScript': { icon: 'fab fa-js', color: '#F7DF1E' },
        'Python': { icon: 'fab fa-python', color: '#3776AB' },
        'Java': { icon: 'fab fa-java', color: '#007396' },
        'React': { icon: 'fab fa-react', color: '#61DAFB' },
        'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
        'SQL': { icon: 'fas fa-database', color: '#4479A1' },
        'Machine Learning': { icon: 'fas fa-brain', color: '#FF6F00' },
        'Data Analysis': { icon: 'fas fa-chart-bar', color: '#10B981' },
        'Cloud Computing': { icon: 'fas fa-cloud', color: '#FF9900' },
        'DevOps': { icon: 'fas fa-infinity', color: '#326CE5' },
        'UI/UX Design': { icon: 'fas fa-palette', color: '#EC4899' },
        'Project Management': { icon: 'fas fa-tasks', color: '#667eea' },
        'Leadership': { icon: 'fas fa-user-tie', color: '#8B5CF6' },
        'Communication': { icon: 'fas fa-comments', color: '#10B981' }
    };
    
    professions.forEach(profession => {
        const item = document.createElement('div');
        item.className = 'selection-item';
        const iconData = professionIcons[profession] || { icon: 'fas fa-briefcase', color: '#667eea' };
        item.innerHTML = `<i class="${iconData.icon}" style="color: ${iconData.color}; margin-right: 0.5rem;"></i>${profession}`;
        item.dataset.value = profession;
        item.dataset.type = 'profession';
        item.addEventListener('click', () => selectPath(item));
        professionGrid.appendChild(item);
    });
    
    skills.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'selection-item';
        const iconData = skillIcons[skill] || { icon: 'fas fa-code', color: '#667eea' };
        item.innerHTML = `<i class="${iconData.icon}" style="color: ${iconData.color}; margin-right: 0.5rem;"></i>${skill}`;
        item.dataset.value = skill;
        item.dataset.type = 'skill';
        item.addEventListener('click', () => selectPath(item));
        skillGrid.appendChild(item);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('nextToPersonalize').addEventListener('click', () => goToStep(2));
    document.getElementById('backToSelection').addEventListener('click', () => goToStep(1));
    document.getElementById('generateRoadmap').addEventListener('click', generateRoadmap);
    
    // Personalization Options
    setupOptionButtons('levelOptions', 'currentLevel');
    setupOptionButtons('timeOptions', 'weeklyTime');
    setupOptionButtons('timelineOptions', 'targetTimeline');
    setupOptionButtons('experienceOptions', 'experienceLevel');
    
    // Roadmap Actions
    document.getElementById('saveRoadmap').addEventListener('click', saveRoadmap);
    document.getElementById('modifyRoadmap').addEventListener('click', () => goToStep(2));
    document.getElementById('regenerateRoadmap').addEventListener('click', regenerateRoadmap);
    document.getElementById('startOver').addEventListener('click', () => {
        resetState();
        goToStep(1);
    });
    document.getElementById('downloadRoadmap').addEventListener('click', downloadRoadmap);
    
    // Custom Buttons
    document.getElementById('createOwnBtn').addEventListener('click', () => {
        alert('Custom roadmap builder coming soon!');
    });
    document.getElementById('skillBlendBtn').addEventListener('click', () => {
        alert('Skill blend feature coming soon!');
    });
}

// Select Path
function selectPath(item) {
    // Remove previous selections
    document.querySelectorAll('.selection-item').forEach(el => el.classList.remove('selected'));
    
    // Select current
    item.classList.add('selected');
    roadmapState.selectedPath = item.dataset.value;
    roadmapState.pathType = item.dataset.type;
    
    // Enable next button
    document.getElementById('nextToPersonalize').disabled = false;
}

// Setup Option Buttons
function setupOptionButtons(containerId, stateKey) {
    const container = document.getElementById(containerId);
    const buttons = container.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            roadmapState[stateKey] = btn.dataset.value;
            checkPersonalizationComplete();
        });
    });
}

// Check if personalization is complete
function checkPersonalizationComplete() {
    const isComplete = roadmapState.currentLevel &&
                      roadmapState.weeklyTime &&
                      roadmapState.targetTimeline &&
                      roadmapState.experienceLevel;
    
    document.getElementById('generateRoadmap').disabled = !isComplete;
}

// Navigate Steps
function goToStep(step) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // Show target section
    document.getElementById(`section${step}`).classList.add('active');
    
    // Update step indicator
    document.querySelectorAll('.step').forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 < step) {
            s.classList.add('completed');
        } else if (index + 1 === step) {
            s.classList.add('active');
        }
    });
    
    roadmapState.currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generate Roadmap
function generateRoadmap() {
    // Show loading
    const btn = document.getElementById('generateRoadmap');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        roadmapState.roadmapData = createRoadmapData();
        renderRoadmap();
        goToStep(3);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

// Create Roadmap Data
function createRoadmapData() {
    const { selectedPath, pathType, currentLevel, weeklyTime, targetTimeline } = roadmapState;
    
    // Calculate duration multipliers
    const levelMultiplier = currentLevel === 'beginner' ? 1.2 : currentLevel === 'intermediate' ? 1 : 0.8;
    const timeMultiplier = weeklyTime === '<5' ? 1.5 : weeklyTime === '5-10' ? 1 : 0.8;
    
    const baseDuration = parseInt(targetTimeline);
    const adjustedDuration = Math.round(baseDuration * levelMultiplier * timeMultiplier);
    
    // Create phases
    const phases = [];
    
    // Phase 1: Foundations
    phases.push({
        id: 1,
        title: 'Phase 1: Foundations',
        badge: 'Beginner',
        duration: Math.ceil(adjustedDuration * 0.3),
        difficulty: 'Easy',
        description: 'Build strong fundamentals and core concepts',
        goals: generateGoals(selectedPath, 'foundation', currentLevel),
        tools: getRecommendedTools(selectedPath, 'foundation'),
        projects: getProjectIdeas(selectedPath, 'foundation')
    });
    
    // Phase 2: Applied Practice
    phases.push({
        id: 2,
        title: 'Phase 2: Applied Practice',
        badge: 'Intermediate',
        duration: Math.ceil(adjustedDuration * 0.3),
        difficulty: 'Medium',
        description: 'Hands-on projects and real-world application',
        goals: generateGoals(selectedPath, 'practice', currentLevel),
        tools: getRecommendedTools(selectedPath, 'practice'),
        projects: getProjectIdeas(selectedPath, 'practice')
    });
    
    // Phase 3: Advanced Concepts
    if (currentLevel !== 'beginner' || adjustedDuration >= 6) {
        phases.push({
            id: 3,
            title: 'Phase 3: Advanced Concepts',
            badge: 'Advanced',
            duration: Math.ceil(adjustedDuration * 0.25),
            difficulty: 'Hard',
            description: 'Deep dive into optimization, architecture, and scaling',
            goals: generateGoals(selectedPath, 'advanced', currentLevel),
            tools: getRecommendedTools(selectedPath, 'advanced'),
            projects: getProjectIdeas(selectedPath, 'advanced')
        });
    }
    
    // Phase 4: Industry Readiness
    phases.push({
        id: 4,
        title: 'Phase 4: Industry Readiness',
        badge: 'Professional',
        duration: Math.ceil(adjustedDuration * 0.15),
        difficulty: 'Expert',
        description: 'Portfolio building, interview prep, and career launch',
        goals: generateGoals(selectedPath, 'industry', currentLevel),
        tools: getRecommendedTools(selectedPath, 'industry'),
        projects: getProjectIdeas(selectedPath, 'industry')
    });
    
    return {
        title: `${selectedPath} Learning Roadmap`,
        subtitle: `Personalized ${adjustedDuration}-month journey from ${currentLevel} to industry-ready professional`,
        totalDuration: adjustedDuration,
        phases: phases
    };
}

// Generate Goals based on path and phase
function generateGoals(path, phase, level) {
    const goals = {
        foundation: [
            `Master core ${path} fundamentals`,
            'Set up development environment and tools',
            'Complete beginner tutorials and documentation',
            'Build 2-3 simple practice projects',
            'Join relevant online communities'
        ],
        practice: [
            `Build 3-5 intermediate ${path} projects`,
            'Contribute to open-source projects',
            'Learn industry best practices',
            'Master debugging and problem-solving',
            'Create a GitHub portfolio'
        ],
        advanced: [
            `Deep dive into ${path} architecture patterns`,
            'Optimize performance and scalability',
            'Learn advanced frameworks and tools',
            'Build complex real-world applications',
            'Study system design principles'
        ],
        industry: [
            'Build impressive portfolio projects',
            'Prepare for technical interviews',
            'Polish resume and LinkedIn profile',
            'Practice coding challenges daily',
            'Network with industry professionals',
            'Apply to relevant positions'
        ]
    };
    
    return goals[phase] || [];
}

// Get Recommended Tools
function getRecommendedTools(path, phase) {
    const toolMap = {
        foundation: ['VS Code', 'Git', 'GitHub', 'Documentation'],
        practice: ['Testing Frameworks', 'CI/CD Tools', 'Code Review Tools'],
        advanced: ['Performance Tools', 'Architecture Tools', 'Cloud Platforms'],
        industry: ['Portfolio Sites', 'Interview Prep Platforms', 'Networking Tools']
    };
    
    return toolMap[phase] || [];
}

// Get Project Ideas
function getProjectIdeas(path, phase) {
    const projectMap = {
        foundation: ['Todo App', 'Calculator', 'Simple Website'],
        practice: ['E-commerce Site', 'Blog Platform', 'API Integration'],
        advanced: ['Full-Stack Application', 'Microservices', 'Scalable System'],
        industry: ['Capstone Project', 'Open Source Contribution', 'Portfolio Website']
    };
    
    return projectMap[phase] || [];
}

// Render Roadmap
function renderRoadmap() {
    const data = roadmapState.roadmapData;
    
    // Update header
    document.getElementById('roadmapTitle').textContent = data.title;
    document.getElementById('roadmapSubtitle').textContent = data.subtitle;
    
    // Update stats
    document.getElementById('totalDuration').textContent = `${data.totalDuration} months`;
    const totalTasks = data.phases.reduce((sum, phase) => sum + phase.goals.length, 0);
    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completionRate').textContent = '0%';
    document.getElementById('readinessScore').textContent = '0%';
    
    // Render phases
    const timeline = document.getElementById('roadmapTimeline');
    timeline.innerHTML = '';
    
    data.phases.forEach((phase, index) => {
        const phaseCard = createPhaseCard(phase, index);
        timeline.appendChild(phaseCard);
    });
}

// Create Phase Card
function createPhaseCard(phase, index) {
    const card = document.createElement('div');
    card.className = 'phase-card';
    card.dataset.phaseId = phase.id;
    
    card.innerHTML = `
        <div class="phase-header">
            <div class="phase-info">
                <h3>
                    ${phase.title}
                    <span class="phase-badge">${phase.badge}</span>
                </h3>
                <div class="phase-meta">
                    <span><i class="fas fa-clock"></i> ${phase.duration} months</span>
                    <span><i class="fas fa-signal"></i> ${phase.difficulty}</span>
                    <span><i class="fas fa-tasks"></i> ${phase.goals.length} tasks</span>
                </div>
            </div>
            <i class="fas fa-chevron-down phase-toggle"></i>
        </div>
        <div class="phase-content">
            <div class="phase-body">
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${phase.description}</p>
                
                <div class="learning-goals">
                    <h4><i class="fas fa-bullseye"></i> Learning Goals</h4>
                    ${phase.goals.map((goal, idx) => `
                        <div class="goal-item">
                            <div class="goal-checkbox" data-phase="${phase.id}" data-goal="${idx}"></div>
                            <div class="goal-text">${goal}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="resources">
                    <h5><i class="fas fa-tools"></i> Recommended Tools</h5>
                    <div class="resource-tags">
                        ${phase.tools.map(tool => `<span class="resource-tag">${tool}</span>`).join('')}
                    </div>
                </div>
                
                <div class="resources" style="margin-top: 1rem;">
                    <h5><i class="fas fa-project-diagram"></i> Project Ideas</h5>
                    <div class="resource-tags">
                        ${phase.projects.map(project => `<span class="resource-tag">${project}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add toggle functionality
    const header = card.querySelector('.phase-header');
    header.addEventListener('click', () => togglePhase(card));
    
    // Add checkbox functionality
    const checkboxes = card.querySelectorAll('.goal-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleGoal(checkbox);
        });
    });
    
    // Expand first phase by default
    if (index === 0) {
        setTimeout(() => togglePhase(card), 100);
    }
    
    return card;
}

// Toggle Phase
function togglePhase(card) {
    card.classList.toggle('expanded');
}

// Toggle Goal
function toggleGoal(checkbox) {
    const phaseId = checkbox.dataset.phase;
    const goalId = checkbox.dataset.goal;
    const taskId = `${phaseId}-${goalId}`;
    
    checkbox.classList.toggle('checked');
    const goalText = checkbox.nextElementSibling;
    goalText.classList.toggle('completed');
    
    if (checkbox.classList.contains('checked')) {
        roadmapState.completedTasks.add(taskId);
    } else {
        roadmapState.completedTasks.delete(taskId);
    }
    
    updateProgress();
}

// Update Progress
function updateProgress() {
    const data = roadmapState.roadmapData;
    const totalTasks = data.phases.reduce((sum, phase) => sum + phase.goals.length, 0);
    const completedCount = roadmapState.completedTasks.size;
    const completionRate = Math.round((completedCount / totalTasks) * 100);
    
    // Update completion rate
    document.getElementById('completionRate').textContent = `${completionRate}%`;
    document.getElementById('progressPercentage').textContent = `${completionRate}%`;
    document.getElementById('progressBarFill').style.width = `${completionRate}%`;
    
    // Update readiness score (weighted by phase)
    const readinessScore = Math.min(100, Math.round(completionRate * 1.2));
    document.getElementById('readinessScore').textContent = `${readinessScore}%`;
    
    // Mark phases as completed
    data.phases.forEach(phase => {
        const phaseGoals = phase.goals.length;
        const phaseCompleted = Array.from(roadmapState.completedTasks)
            .filter(task => task.startsWith(`${phase.id}-`)).length;
        
        const phaseCard = document.querySelector(`[data-phase-id="${phase.id}"]`);
        if (phaseCompleted === phaseGoals) {
            phaseCard.classList.add('completed');
        } else {
            phaseCard.classList.remove('completed');
        }
    });
}

// Save Roadmap
function saveRoadmap() {
    const data = {
        ...roadmapState,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('skillbridge_roadmap', JSON.stringify(data));
    alert('Roadmap saved successfully!');
}

// Regenerate Roadmap
function regenerateRoadmap() {
    if (confirm('This will generate a new roadmap with the same settings. Continue?')) {
        roadmapState.completedTasks.clear();
        generateRoadmap();
    }
}

// Download Roadmap
function downloadRoadmap() {
    const data = roadmapState.roadmapData;
    let content = `SKILLBRIDGE AI - PERSONALIZED LEARNING ROADMAP\n`;
    content += `==============================================\n\n`;
    content += `${data.title}\n`;
    content += `${data.subtitle}\n\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Total Duration: ${data.totalDuration} months\n`;
    content += `Current Level: ${roadmapState.currentLevel}\n`;
    content += `Weekly Time: ${roadmapState.weeklyTime} hours\n\n`;
    
    data.phases.forEach((phase, index) => {
        content += `\n${phase.title}\n`;
        content += `${'='.repeat(phase.title.length)}\n`;
        content += `Duration: ${phase.duration} months | Difficulty: ${phase.difficulty}\n`;
        content += `${phase.description}\n\n`;
        
        content += `Learning Goals:\n`;
        phase.goals.forEach((goal, idx) => {
            const taskId = `${phase.id}-${idx}`;
            const completed = roadmapState.completedTasks.has(taskId) ? '[✓]' : '[ ]';
            content += `${completed} ${goal}\n`;
        });
        
        content += `\nRecommended Tools: ${phase.tools.join(', ')}\n`;
        content += `Project Ideas: ${phase.projects.join(', ')}\n`;
    });
    
    content += `\n\nGenerated by SkillBridge AI\nwww.skillbridgeai.com\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillBridge_Roadmap_${roadmapState.selectedPath.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Roadmap downloaded successfully!');
}

// Reset State
function resetState() {
    roadmapState.selectedPath = null;
    roadmapState.pathType = null;
    roadmapState.currentLevel = null;
    roadmapState.weeklyTime = null;
    roadmapState.targetTimeline = null;
    roadmapState.experienceLevel = null;
    roadmapState.completedTasks.clear();
    roadmapState.roadmapData = null;
    
    // Clear selections
    document.querySelectorAll('.selection-item').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.option-btn').forEach(el => el.classList.remove('selected'));
    
    // Disable buttons
    document.getElementById('nextToPersonalize').disabled = true;
    document.getElementById('generateRoadmap').disabled = true;
}

console.log('SkillBridge AI - Personalized Learning Roadmap Ready! 🚀');
