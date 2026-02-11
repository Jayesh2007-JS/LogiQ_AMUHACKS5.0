// Global variables
let currentStep = 1;
const totalSteps = 4;
let formData = {
    skills: [],
    customSkills: [],
    age: null,
    academicYear: null,
    cgpa: null
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
});

function initializeForm() {
    updateProgress();
    updateNavigationButtons();
}

function setupEventListeners() {
    // Next button
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    
    // Previous button
    document.getElementById('prevBtn').addEventListener('click', prevStep);
    
    // Form submission
    document.getElementById('academicForm').addEventListener('submit', handleSubmit);
    
    // Retake button
    document.getElementById('retakeBtn').addEventListener('click', retakeAnalysis);
    
    // Skills selection
    document.querySelectorAll('input[name="skills"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSkillsCount);
    });
    
    // Custom skill input
    document.getElementById('addSkillBtn').addEventListener('click', addCustomSkill);
    document.getElementById('customSkillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomSkill();
        }
    });
    
    // Academic year change (for CGPA validation)
    document.getElementById('academicYear').addEventListener('change', handleAcademicYearChange);
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const percentage = (currentStep / totalSteps) * 100;
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Show/hide previous button
    prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    
    // Show/hide next/submit button
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            // Deactivate current step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
            
            // Move to next step
            currentStep++;
            
            // Activate next step
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            
            updateProgress();
            updateNavigationButtons();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Deactivate current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Move to previous step
        currentStep--;
        
        // Activate previous step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        
        updateProgress();
        updateNavigationButtons();
    }
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1: // Skills
            const selectedSkills = document.querySelectorAll('input[name="skills"]:checked').length;
            const customSkillsCount = formData.customSkills.length;
            const totalSkills = selectedSkills + customSkillsCount;
            
            if (totalSkills === 0) {
                alert('Please select at least one skill or add a custom skill to continue.');
                return false;
            }
            return true;
            
        case 2: // Age
            const ageInput = document.getElementById('age');
            const age = parseInt(ageInput.value);
            if (!ageInput.value || isNaN(age) || age < 17 || age > 30) {
                alert('Please enter a valid age between 17 and 30.');
                return false;
            }
            return true;
            
        case 3: // Academic Year
            const academicYear = document.getElementById('academicYear').value;
            if (!academicYear) {
                alert('Please select your current academic year.');
                return false;
            }
            return true;
            
        case 4: // CGPA (optional but validate if provided)
            const cgpaInput = document.getElementById('cgpa');
            const cgpaValue = cgpaInput.value;
            if (cgpaValue) {
                const cgpa = parseFloat(cgpaValue);
                if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
                    alert('Please enter a valid CGPA between 0 and 10.');
                    return false;
                }
            }
            return true;
    }
    
    return true;
}

function updateSkillsCount() {
    const predefinedCount = document.querySelectorAll('input[name="skills"]:checked').length;
    const customCount = formData.customSkills.length;
    const totalCount = predefinedCount + customCount;
    
    const countElement = document.getElementById('selectedCount');
    countElement.textContent = `${totalCount} skill${totalCount !== 1 ? 's' : ''} selected`;
    
    if (totalCount > 0) {
        countElement.style.color = '#667eea';
    } else {
        countElement.style.color = '#6b7280';
    }
}

function addCustomSkill() {
    const input = document.getElementById('customSkillInput');
    const skillName = input.value.trim();
    
    if (!skillName) {
        alert('Please enter a skill name');
        return;
    }
    
    // Check if skill already exists in custom skills
    const skillLower = skillName.toLowerCase();
    if (formData.customSkills.some(s => s.toLowerCase() === skillLower)) {
        alert('This skill has already been added');
        input.value = '';
        return;
    }
    
    // Check if skill exists in predefined skills
    const allPredefinedSkills = Array.from(document.querySelectorAll('input[name="skills"]')).map(cb => cb.value);
    if (allPredefinedSkills.some(s => s.toLowerCase() === skillLower)) {
        alert('This skill is already available in the predefined list. Please select it from above.');
        input.value = '';
        return;
    }
    
    // Check if it's too long
    if (skillName.length > 50) {
        alert('Skill name is too long (max 50 characters)');
        return;
    }
    
    // Add to custom skills array
    formData.customSkills.push(skillName);
    
    // Create and display the tag
    const container = document.getElementById('customSkillsContainer');
    const tag = document.createElement('div');
    tag.className = 'custom-skill-tag';
    
    // Escape HTML to prevent XSS
    const span = document.createElement('span');
    span.textContent = skillName;
    
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-skill';
    removeBtn.textContent = '×';
    removeBtn.setAttribute('data-skill', skillName);
    
    tag.appendChild(span);
    tag.appendChild(removeBtn);
    
    // Add remove functionality
    removeBtn.addEventListener('click', function() {
        removeCustomSkill(skillName, tag);
    });
    
    container.appendChild(tag);
    
    // Clear input
    input.value = '';
    
    // Update count
    updateSkillsCount();
}

function removeCustomSkill(skillName, tagElement) {
    // Remove from array
    const index = formData.customSkills.indexOf(skillName);
    if (index > -1) {
        formData.customSkills.splice(index, 1);
    }
    
    // Remove tag element with animation
    tagElement.style.opacity = '0';
    tagElement.style.transform = 'scale(0.8)';
    setTimeout(() => {
        tagElement.remove();
    }, 300);
    
    // Update count
    updateSkillsCount();
}

function handleAcademicYearChange() {
    const academicYear = document.getElementById('academicYear').value;
    const cgpaInput = document.getElementById('cgpa');
    const cgpaHelp = cgpaInput.nextElementSibling;
    
    if (academicYear === '1') {
        cgpaHelp.textContent = 'CGPA not required for 1st year students - will be ignored in analysis';
        cgpaInput.value = '';
        cgpaInput.disabled = true;
    } else {
        cgpaHelp.textContent = 'Optional - Leave blank if not applicable';
        cgpaInput.disabled = false;
    }
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Collect form data
    collectFormData();
    
    // Calculate score
    const analysisResults = analyzeProfile();
    
    // Display results
    displayResults(analysisResults);
}

function collectFormData() {
    // Predefined Skills
    const selectedSkills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
        .map(cb => cb.value);
    
    // Combine predefined and custom skills
    formData.skills = [...selectedSkills, ...formData.customSkills];
    
    // Age
    formData.age = parseInt(document.getElementById('age').value);
    
    // Academic Year
    formData.academicYear = parseInt(document.getElementById('academicYear').value);
    
    // CGPA
    const cgpaValue = document.getElementById('cgpa').value;
    formData.cgpa = cgpaValue ? parseFloat(cgpaValue) : null;
    
    // Ignore CGPA for 1st year students
    if (formData.academicYear === 1) {
        formData.cgpa = null;
    }
}

function analyzeProfile() {
    let score = 0;
    let feedback = {
        strengths: [],
        gaps: [],
        recommendations: [],
        level: ''
    };
    
    // Define skill categories
    const technicalSkills = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Data Structures & Algorithms', 
                             'Web Development', 'Database Management', 'Machine Learning / AI', 'Cloud Computing'];
    const managementSkills = ['Communication Skills', 'Leadership', 'Project Management', 
                              'Team Collaboration', 'Problem Solving', 'Time Management'];
    
    // Count skills by category
    const userTechnicalSkills = formData.skills.filter(skill => technicalSkills.includes(skill));
    const userManagementSkills = formData.skills.filter(skill => managementSkills.includes(skill));
    
    // Custom skills (not in predefined lists)
    const customSkills = formData.skills.filter(skill => 
        !technicalSkills.includes(skill) && !managementSkills.includes(skill)
    );
    
    // 1. Skills Score (50 points max)
    let skillsScore = 0;
    
    // Technical skills (30 points max)
    const techScore = Math.min((userTechnicalSkills.length / technicalSkills.length) * 30, 30);
    skillsScore += techScore;
    
    // Management skills (20 points max)
    const mgmtScore = Math.min((userManagementSkills.length / managementSkills.length) * 20, 20);
    skillsScore += mgmtScore;
    
    // Bonus for custom skills (up to 10 extra points)
    const customSkillBonus = Math.min(customSkills.length * 2, 10);
    skillsScore += customSkillBonus;
    
    score += Math.min(skillsScore, 50); // Cap at 50
    
    // Skills feedback
    if (userTechnicalSkills.length >= 5) {
        feedback.strengths.push('Strong technical foundation with diverse programming skills');
    } else if (userTechnicalSkills.length >= 3) {
        feedback.strengths.push('Good technical skills to build upon');
    }
    
    if (userManagementSkills.length >= 4) {
        feedback.strengths.push('Well-rounded management and soft skills');
    } else if (userManagementSkills.length >= 2) {
        feedback.strengths.push('Developing important management competencies');
    }
    
    if (customSkills.length > 0) {
        feedback.strengths.push(`Great initiative adding ${customSkills.length} additional skill${customSkills.length > 1 ? 's' : ''}: ${customSkills.slice(0, 3).join(', ')}${customSkills.length > 3 ? '...' : ''}`);
    }
    
    if (userTechnicalSkills.length < 3) {
        feedback.gaps.push('Limited technical skills - focus on learning core programming languages');
    }
    
    if (userManagementSkills.length < 2) {
        feedback.gaps.push('Need to develop soft skills - they are crucial for career success');
    }
    
    // 2. Academic Year Progression (25 points max)
    let yearScore = 0;
    switch(formData.academicYear) {
        case 1:
            yearScore = 10;
            feedback.strengths.push('Great that you\'re planning early in your academic journey');
            break;
        case 2:
            yearScore = 15;
            feedback.strengths.push('Good timing to build your career profile');
            break;
        case 3:
            yearScore = 20;
            feedback.strengths.push('Critical year for internships and skill development');
            break;
        case 4:
            yearScore = 25;
            feedback.strengths.push('Final year - focus on job readiness and placement preparation');
            break;
    }
    score += yearScore;
    
    // 3. CGPA Score (25 points max, if applicable)
    let cgpaScore = 0;
    if (formData.cgpa !== null && formData.academicYear > 1) {
        cgpaScore = (formData.cgpa / 10) * 25;
        score += cgpaScore;
        
        if (formData.cgpa >= 8.5) {
            feedback.strengths.push('Excellent academic performance - a strong differentiator');
        } else if (formData.cgpa >= 7.0) {
            feedback.strengths.push('Good academic standing');
        } else if (formData.cgpa < 6.0) {
            feedback.gaps.push('Academic performance could be improved - consider focused study strategies');
        }
    } else {
        // If CGPA not applicable, redistribute to skills (more weight on skills)
        const bonusSkillsScore = Math.min(skillsScore * 0.5, 25);
        score += bonusSkillsScore;
    }
    
    // Generate recommendations
    generateRecommendations(feedback, userTechnicalSkills, userManagementSkills, formData.academicYear);
    
    // Determine readiness level
    if (score >= 75) {
        feedback.level = 'industry-ready';
    } else if (score >= 50) {
        feedback.level = 'intermediate';
    } else {
        feedback.level = 'beginner';
    }
    
    return {
        score: Math.round(score),
        feedback: feedback
    };
}

function generateRecommendations(feedback, userTechSkills, userMgmtSkills, academicYear) {
    if (!userTechSkills.includes('Data Structures & Algorithms')) {
        feedback.recommendations.push('Data Structures & Algorithms - Essential for technical interviews');
    }
    
    if (!userTechSkills.includes('Python') && !userTechSkills.includes('JavaScript')) {
        feedback.recommendations.push('Python or JavaScript - Highly versatile and in-demand languages');
    }
    
    if (academicYear >= 3 && !userTechSkills.includes('Web Development')) {
        feedback.recommendations.push('Web Development - Build portfolio projects to showcase skills');
    }
    
    if (academicYear >= 3 && !userTechSkills.includes('Database Management')) {
        feedback.recommendations.push('Database Management - Critical for full-stack development roles');
    }
    
    if (!userMgmtSkills.includes('Communication Skills')) {
        feedback.recommendations.push('Communication Skills - Key for interviews and workplace success');
    }
    
    if (!userMgmtSkills.includes('Problem Solving')) {
        feedback.recommendations.push('Problem Solving - Practice coding challenges and case studies');
    }
    
    if (academicYear >= 2 && !userMgmtSkills.includes('Leadership')) {
        feedback.recommendations.push('Leadership - Take initiative in group projects and clubs');
    }
    
    // If few recommendations, add general ones
    if (feedback.recommendations.length < 3) {
        if (academicYear <= 2) {
            feedback.recommendations.push('Focus on building strong fundamentals in your core subjects');
        } else {
            feedback.recommendations.push('Work on real-world projects to apply your skills');
            feedback.recommendations.push('Participate in hackathons and coding competitions');
        }
    }
    
    // Ensure we don't have too many recommendations
    feedback.recommendations = feedback.recommendations.slice(0, 5);
}

function displayResults(results) {
    // Hide form, show results
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Animate score
    animateScore(results.score);
    
    // Set readiness level
    const levelElement = document.getElementById('readinessLevel');
    levelElement.textContent = getLevelText(results.feedback.level);
    levelElement.className = 'readiness-level ' + results.feedback.level;
    
    // Display feedback
    displayFeedback('strengthsFeedback', results.feedback.strengths);
    displayFeedback('gapsFeedback', results.feedback.gaps);
    displayFeedback('recommendationsFeedback', results.feedback.recommendations);
}

function animateScore(targetScore) {
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreCircle = document.getElementById('scoreCircle');
    
    // Reset circle before animation
    const circumference = 565.48;
    scoreCircle.style.strokeDashoffset = circumference;
    
    let currentScore = 0;
    const duration = 2000;
    const increment = targetScore / (duration / 16);
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        
        scoreNumber.textContent = Math.round(currentScore);
        
        // Update circle
        const offset = circumference - (currentScore / 100) * circumference;
        scoreCircle.style.strokeDashoffset = offset;
    }, 16);
}

function getLevelText(level) {
    switch(level) {
        case 'beginner':
            return 'Beginner - Building Foundation';
        case 'intermediate':
            return 'Intermediate - Growing Skills';
        case 'industry-ready':
            return 'Industry-Ready - Job Prepared';
        default:
            return 'Analyzing...';
    }
}

function displayFeedback(elementId, items) {
    const element = document.getElementById(elementId);
    
    if (items.length === 0) {
        element.innerHTML = '<p style="color: var(--text-secondary);">No specific items identified</p>';
        return;
    }
    
    const ul = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    
    element.innerHTML = '';
    element.appendChild(ul);
}

function retakeAnalysis() {
    // Reset form
    document.getElementById('academicForm').reset();
    currentStep = 1;
    formData = {
        skills: [],
        customSkills: [],
        age: null,
        academicYear: null,
        cgpa: null
    };
    
    // Clear custom skills display
    document.getElementById('customSkillsContainer').innerHTML = '';
    document.getElementById('customSkillInput').value = '';
    
    // Re-enable CGPA input in case it was disabled
    const cgpaInput = document.getElementById('cgpa');
    cgpaInput.disabled = false;
    
    // Reset UI
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    
    updateProgress();
    updateNavigationButtons();
    updateSkillsCount();
    
    // Show form, hide results
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}