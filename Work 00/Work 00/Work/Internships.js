// Global variables
let userSkills = [];
let userProfile = {
    proficiency: 'beginner',
    domain: 'technical',
    interestedTech: '',
    classification: null
};

// Project Database - Organized by level and domain
const projectDatabase = {
    beginner: {
        technical: [
            {
                title: 'Personal Portfolio Website',
                objective: 'Build a responsive portfolio to showcase your projects and skills',
                skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
                learnings: ['Web fundamentals', 'Responsive design', 'Flexbox/Grid', 'Version control', 'GitHub Pages deployment'],
                time: '1-2 weeks',
                portfolioValue: 'Essential for job applications - your online resume'
            },
            {
                title: 'Todo List with Local Storage',
                objective: 'Task management app that persists data in browser',
                skills: ['JavaScript', 'HTML', 'CSS', 'Local Storage'],
                learnings: ['DOM manipulation', 'Event handling', 'CRUD operations', 'Data persistence', 'Array methods'],
                time: '1 week',
                portfolioValue: 'Demonstrates core JavaScript skills and state management'
            },
            {
                title: 'Weather Dashboard',
                objective: 'Display real-time weather using a public API',
                skills: ['JavaScript', 'API', 'HTML', 'CSS'],
                learnings: ['API integration', 'Async/await', 'Fetch API', 'Error handling', 'JSON parsing'],
                time: '1-2 weeks',
                portfolioValue: 'Shows API understanding - critical for modern web development'
            },
            {
                title: 'Scientific Calculator',
                objective: 'Build a calculator with scientific functions',
                skills: ['JavaScript', 'HTML', 'CSS'],
                learnings: ['Math operations', 'Event listeners', 'State management', 'UI/UX design', 'Input validation'],
                time: '3-5 days',
                portfolioValue: 'Clean UI and logic demonstrate attention to detail'
            },
            {
                title: 'Responsive Landing Page',
                objective: 'Create a modern landing page for a fictional product',
                skills: ['HTML', 'CSS', 'Responsive Design'],
                learnings: ['Mobile-first design', 'CSS Grid', 'Animations', 'Typography', 'Color theory'],
                time: '4-6 days',
                portfolioValue: 'Frontend fundamentals - shows design sensibility'
            },
            {
                title: 'Quiz Application',
                objective: 'Interactive quiz with score tracking and timer',
                skills: ['JavaScript', 'HTML', 'CSS'],
                learnings: ['Dynamic content', 'Timer functions', 'Score calculation', 'Conditional rendering', 'User feedback'],
                time: '1 week',
                portfolioValue: 'Interactive features show programming logic skills'
            },
            {
                title: 'Expense Tracker',
                objective: 'Track income and expenses with visual summary',
                skills: ['JavaScript', 'HTML', 'CSS', 'Chart.js'],
                learnings: ['Data manipulation', 'Chart visualization', 'Form handling', 'Calculation logic', 'Local storage'],
                time: '1-2 weeks',
                portfolioValue: 'Real-world utility - demonstrates practical problem solving'
            },
            {
                title: 'Recipe Search App',
                objective: 'Search and display recipes using a food API',
                skills: ['JavaScript', 'API', 'HTML', 'CSS'],
                learnings: ['API integration', 'Search functionality', 'Dynamic rendering', 'Card layouts', 'Filtering'],
                time: '1 week',
                portfolioValue: 'API skills with good UI - attractive portfolio piece'
            },
            {
                title: 'Countdown Timer / Pomodoro',
                objective: 'Productivity timer with notifications',
                skills: ['JavaScript', 'HTML', 'CSS'],
                learnings: ['setInterval/setTimeout', 'Browser notifications', 'Audio API', 'Time calculations', 'State persistence'],
                time: '3-5 days',
                portfolioValue: 'Shows understanding of browser APIs and user experience'
            },
            {
                title: 'GitHub Profile Finder',
                objective: 'Search GitHub users and display their repos',
                skills: ['JavaScript', 'GitHub API', 'HTML', 'CSS'],
                learnings: ['REST API', 'Profile rendering', 'Error states', 'Loading states', 'API rate limits'],
                time: '4-6 days',
                portfolioValue: 'GitHub API familiarity - relevant for developer roles'
            }
        ],
        management: [
            {
                title: 'Team Project Planner',
                objective: 'Create comprehensive project plan with timeline and resources',
                skills: ['Project Management', 'Excel/Sheets', 'Planning'],
                learnings: ['Task breakdown (WBS)', 'Gantt charts', 'Resource allocation', 'Critical path', 'Milestone tracking'],
                time: '1 week',
                portfolioValue: 'Shows planning ability - essential for PM roles'
            },
            {
                title: 'Event Management Blueprint',
                objective: 'Plan and execute a college/community event end-to-end',
                skills: ['Planning', 'Coordination', 'Documentation'],
                learnings: ['Stakeholder management', 'Budget planning', 'Risk assessment', 'Timeline creation', 'Post-event analysis'],
                time: '2 weeks',
                portfolioValue: 'Real-world execution - demonstrates delivery capability'
            },
            {
                title: 'Process Improvement Proposal',
                objective: 'Identify and redesign an inefficient campus/local process',
                skills: ['Analysis', 'Problem Solving', 'Documentation'],
                learnings: ['Process mapping', 'Root cause analysis', 'Solution design', 'Before/after metrics', 'Presentation'],
                time: '1-2 weeks',
                portfolioValue: 'Shows analytical thinking and impact-driven mindset'
            },
            {
                title: 'Student Organization Dashboard',
                objective: 'Design tracking system for club activities and member engagement',
                skills: ['Organization', 'Data Tracking', 'Communication'],
                learnings: ['KPI definition', 'Metrics tracking', 'Member management', 'Activity planning', 'Reporting'],
                time: '1 week',
                portfolioValue: 'Demonstrates organizational and analytical skills'
            },
            {
                title: 'Workshop Series Coordination',
                objective: 'Plan and organize 3-5 educational workshops',
                skills: ['Coordination', 'Communication', 'Planning'],
                learnings: ['Speaker coordination', 'Agenda creation', 'Logistics planning', 'Feedback collection', 'Iteration'],
                time: '2-3 weeks',
                portfolioValue: 'Shows leadership and execution in education context'
            },
            {
                title: 'Survey & Insights Report',
                objective: 'Design survey, collect data, analyze and present findings',
                skills: ['Research', 'Analysis', 'Presentation'],
                learnings: ['Survey design', 'Data collection', 'Statistical analysis', 'Insight generation', 'Visual presentation'],
                time: '1-2 weeks',
                portfolioValue: 'Research and analysis skills - valuable for consulting'
            },
            {
                title: 'Volunteer Program Framework',
                objective: 'Create structure for managing volunteer activities',
                skills: ['Program Design', 'Coordination', 'Documentation'],
                learnings: ['Program structure', 'Volunteer onboarding', 'Task assignment', 'Impact measurement', 'Recognition system'],
                time: '1 week',
                portfolioValue: 'Social impact + organizational design skills'
            },
            {
                title: 'Meeting Minutes & Documentation System',
                objective: 'Establish system for team meeting documentation and follow-up',
                skills: ['Documentation', 'Communication', 'Organization'],
                learnings: ['Note-taking', 'Action item tracking', 'Meeting structure', 'Follow-up process', 'Template creation'],
                time: '3-5 days',
                portfolioValue: 'Professional communication - overlooked but critical skill'
            }
        ],
        hybrid: [
            {
                title: 'Digital Feedback Platform',
                objective: 'Build survey tool with analytics dashboard',
                skills: ['Forms', 'Data Analysis', 'Visualization', 'HTML'],
                learnings: ['Form design', 'Data validation', 'Basic charts', 'User feedback loop', 'Reporting'],
                time: '2 weeks',
                portfolioValue: 'Combines tech + analysis - shows hybrid capability'
            },
            {
                title: 'Club/Organization Website',
                objective: 'Create website with event calendar and member portal',
                skills: ['HTML', 'CSS', 'JavaScript', 'Content Planning'],
                learnings: ['Client requirements', 'Content structure', 'Event display', 'Responsive design', 'User needs'],
                time: '2-3 weeks',
                portfolioValue: 'Real client work - demonstrates full project lifecycle'
            },
            {
                title: 'Student Resource Hub',
                objective: 'Centralized portal for academic resources and links',
                skills: ['Web Development', 'Information Architecture', 'Organization'],
                learnings: ['Content organization', 'Search functionality', 'User experience', 'Resource categorization', 'Maintenance'],
                time: '1-2 weeks',
                portfolioValue: 'User-centric design with technical implementation'
            },
            {
                title: 'Time Tracking & Productivity Analyzer',
                objective: 'Track daily activities and generate productivity insights',
                skills: ['JavaScript', 'Data Analysis', 'Visualization'],
                learnings: ['Time logging', 'Data aggregation', 'Pattern analysis', 'Insight generation', 'Self-tracking'],
                time: '2 weeks',
                portfolioValue: 'Personal productivity + data skills - relatable project'
            },
            {
                title: 'Competition Management System',
                objective: 'Organize hackathon/event with registration and judging',
                skills: ['Web Forms', 'Database Basics', 'Coordination'],
                learnings: ['Registration flow', 'Data management', 'Scheduling', 'Judging criteria', 'Results display'],
                time: '2-3 weeks',
                portfolioValue: 'Event tech + operations - demonstrates scale thinking'
            },
            {
                title: 'Study Group Coordinator',
                objective: 'Platform to organize study sessions and track attendance',
                skills: ['Scheduling', 'Web Development', 'Communication'],
                learnings: ['Group coordination', 'Calendar integration', 'Reminder system', 'Attendance tracking', 'Feedback'],
                time: '1-2 weeks',
                portfolioValue: 'Solves real student problem - practical impact'
            },
            {
                title: 'Campus News Aggregator',
                objective: 'Collect and display news from multiple college sources',
                skills: ['Web Scraping Basics', 'Content Display', 'Organization'],
                learnings: ['Data collection', 'Content parsing', 'Update scheduling', 'Clean display', 'Categorization'],
                time: '1-2 weeks',
                portfolioValue: 'Technical + editorial judgment - unique combination'
            }
        ]
    },
    
    intermediate: {
        technical: [
            {
                title: 'Full-Stack Blog Platform',
                objective: 'Multi-user blogging system with rich text editor and comments',
                skills: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT'],
                learnings: ['RESTful API design', 'JWT authentication', 'Database modeling', 'CRUD with relations', 'File uploads', 'Deployment on Heroku/Railway'],
                time: '3-4 weeks',
                portfolioValue: 'Complete CRUD application - proves full-stack capability',
                deployment: 'Deploy on Railway or Render with MongoDB Atlas'
            },
            {
                title: 'E-commerce Product Catalog',
                objective: 'Shopping site with product listing, cart, and checkout flow',
                skills: ['React', 'Context API', 'Stripe API', 'Node.js'],
                learnings: ['State management at scale', 'Shopping cart logic', 'Payment integration basics', 'Product filtering', 'Order management', 'Deployment'],
                time: '3-4 weeks',
                portfolioValue: 'E-commerce experience - highly valued by employers',
                deployment: 'Frontend on Vercel, Backend on Railway'
            },
            {
                title: 'Real-time Chat Application',
                objective: 'Messaging app with rooms, typing indicators, and message history',
                skills: ['Socket.io', 'Node.js', 'React', 'MongoDB'],
                learnings: ['WebSocket fundamentals', 'Real-time communication', 'Room management', 'Message persistence', 'Online status', 'Event handling'],
                time: '2-3 weeks',
                portfolioValue: 'Real-time systems - advanced technical skill',
                deployment: 'Deploy on Render with WebSocket support'
            },
            {
                title: 'Task Management Board (Trello Clone)',
                objective: 'Kanban board with drag-drop, teams, and task assignment',
                skills: ['React', 'Drag-and-Drop', 'Backend API', 'PostgreSQL'],
                learnings: ['Complex state management', 'Drag-and-drop UI', 'Team collaboration features', 'User permissions', 'Real-time updates'],
                time: '3-4 weeks',
                portfolioValue: 'Complex UI interactions - shows frontend mastery',
                deployment: 'Vercel + Supabase or Railway'
            },
            {
                title: 'Social Media Dashboard',
                objective: 'Analytics dashboard pulling data from Twitter/Instagram APIs',
                skills: ['Python', 'Flask', 'OAuth', 'Data Visualization'],
                learnings: ['OAuth 2.0 flow', 'API rate limiting', 'Data aggregation', 'Chart.js/D3.js', 'Caching strategies'],
                time: '3 weeks',
                portfolioValue: 'API integration + data viz - valuable analytics skill',
                deployment: 'Python Anywhere or Railway'
            },
            {
                title: 'Job Board Platform',
                objective: 'Post jobs, apply with resume, employer dashboard',
                skills: ['Full-Stack', 'Authentication', 'File Uploads', 'Email'],
                learnings: ['Multi-role auth', 'Resume parsing', 'Application workflow', 'Email notifications', 'Search and filters'],
                time: '4 weeks',
                portfolioValue: 'Marketplace platform - demonstrates business logic',
                deployment: 'Full-stack deployment with email service'
            },
            {
                title: 'Expense Tracker with Analytics',
                objective: 'Track expenses with categories, budgets, and visual reports',
                skills: ['React', 'Node.js', 'Charts', 'Database'],
                learnings: ['Financial calculations', 'Budget tracking', 'Category management', 'Monthly reports', 'Export to CSV'],
                time: '2-3 weeks',
                portfolioValue: 'Practical finance tool - shows problem-solving',
                deployment: 'Vercel + MongoDB Atlas'
            },
            {
                title: 'Recipe Sharing Community',
                objective: 'Post recipes, rate, comment, save favorites',
                skills: ['Full-Stack', 'Image Upload', 'Social Features'],
                learnings: ['User-generated content', 'Image handling', 'Rating systems', 'Comments/likes', 'User profiles'],
                time: '3 weeks',
                portfolioValue: 'Social platform features - content-driven app',
                deployment: 'Cloudinary for images, standard deployment'
            },
            {
                title: 'URL Shortener Service',
                objective: 'Shorten URLs with analytics, custom aliases, QR codes',
                skills: ['Backend', 'Database', 'Analytics', 'APIs'],
                learnings: ['Hash generation', 'Redirect logic', 'Click analytics', 'QR generation', 'Rate limiting', 'API design'],
                time: '2 weeks',
                portfolioValue: 'Service-oriented architecture - clean API design',
                deployment: 'Backend deployment with Redis caching'
            },
            {
                title: 'Fitness Tracker with Goals',
                objective: 'Log workouts, track progress, set goals, view charts',
                skills: ['Mobile-First Web', 'Charts', 'PWA', 'Database'],
                learnings: ['Progressive Web App', 'Offline functionality', 'Goal tracking', 'Progress visualization', 'Habit streaks'],
                time: '3 weeks',
                portfolioValue: 'PWA + health tech - trending domain',
                deployment: 'PWA deployment on Netlify/Vercel'
            }
        ],
        management: [
            {
                title: 'Product Launch Strategy',
                objective: 'End-to-end go-to-market plan for hypothetical SaaS product',
                skills: ['Strategy', 'Market Research', 'Planning', 'Presentation'],
                learnings: ['Market analysis', 'Competitive positioning', 'Launch timeline', 'Success metrics (KPIs)', 'Pricing strategy', 'Channel selection'],
                time: '3 weeks',
                portfolioValue: 'Product thinking - essential for PM roles'
            },
            {
                title: 'Agile Sprint Simulation',
                objective: 'Run 2-week sprint with user stories, daily standups, retrospective',
                skills: ['Agile', 'Jira/Trello', 'Team Coordination'],
                learnings: ['Sprint planning', 'Story pointing', 'Velocity tracking', 'Burndown charts', 'Retrospective facilitation', 'Blocker resolution'],
                time: '2-3 weeks',
                portfolioValue: 'Agile experience - industry standard methodology'
            },
            {
                title: 'Business Process Optimization',
                objective: 'Map current process, identify bottlenecks, propose improvements',
                skills: ['Process Mapping', 'Analysis', 'Documentation', 'Metrics'],
                learnings: ['As-is vs To-be mapping', 'Bottleneck identification', 'Efficiency metrics', 'ROI calculation', 'Change management', 'Stakeholder buy-in'],
                time: '2-3 weeks',
                portfolioValue: 'Operations consulting - valuable for MBA/consulting'
            },
            {
                title: 'Cross-Functional Project Plan',
                objective: 'Coordinate project across design, engineering, marketing teams',
                skills: ['Coordination', 'Communication', 'Dependencies', 'Timeline'],
                learnings: ['Dependency mapping', 'Resource allocation', 'Risk mitigation', 'Meeting facilitation', 'Status reporting', 'Conflict resolution'],
                time: '2-3 weeks',
                portfolioValue: 'Multi-team coordination - key leadership skill'
            },
            {
                title: 'Customer Feedback Analysis',
                objective: 'Collect feedback, analyze patterns, create action plan',
                skills: ['Research', 'Analysis', 'Insight Generation', 'Presentation'],
                learnings: ['Survey design', 'Interview techniques', 'Sentiment analysis', 'Theme identification', 'Prioritization framework', 'Action planning'],
                time: '2 weeks',
                portfolioValue: 'Customer empathy - critical for product roles'
            },
            {
                title: 'OKR Framework Design',
                objective: 'Create Objectives and Key Results for team/project',
                skills: ['Goal Setting', 'Metrics', 'Alignment', 'Tracking'],
                learnings: ['OKR methodology', 'Measurable outcomes', 'Ambitious goals', 'Quarterly planning', 'Progress tracking', 'Review process'],
                time: '1-2 weeks',
                portfolioValue: 'Strategic planning - shows goal-oriented thinking'
            },
            {
                title: 'Stakeholder Management Plan',
                objective: 'Identify stakeholders, map influence, create engagement strategy',
                skills: ['Analysis', 'Communication', 'Strategy', 'Influence'],
                learnings: ['Stakeholder identification', 'Power-interest grid', 'Communication plans', 'Expectation management', 'Buy-in strategies'],
                time: '1-2 weeks',
                portfolioValue: 'Political savvy - underrated career skill'
            },
            {
                title: 'Team Onboarding Program',
                objective: 'Design comprehensive onboarding for new team members',
                skills: ['Program Design', 'Documentation', 'Training', 'Measurement'],
                learnings: ['Onboarding structure', 'Documentation creation', 'Training materials', 'Buddy system', '30-60-90 day plans', 'Success metrics'],
                time: '2 weeks',
                portfolioValue: 'People operations - shows care for team development'
            }
        ],
        hybrid: [
            {
                title: 'Analytics Dashboard Platform',
                objective: 'Build dashboard tracking product KPIs with insights',
                skills: ['React', 'Backend API', 'Data Visualization', 'Analytics'],
                learnings: ['KPI definition', 'Data pipeline design', 'Chart libraries', 'Real-time data', 'Insight generation', 'User segmentation'],
                time: '3-4 weeks',
                portfolioValue: 'Data-driven product - shows technical + business thinking',
                deployment: 'Full-stack with scheduled data updates'
            },
            {
                title: 'Automated Report Generator',
                objective: 'System generating weekly business reports with email delivery',
                skills: ['Python', 'Automation', 'Data Processing', 'Email'],
                learnings: ['Data aggregation', 'Report templates', 'Scheduling (cron)', 'Email automation', 'PDF generation', 'Error handling'],
                time: '2-3 weeks',
                portfolioValue: 'Automation + reporting - saves business time',
                deployment: 'Server with cron jobs or cloud functions'
            },
            {
                title: 'Customer Support Ticketing System',
                objective: 'Ticket management with assignment, priorities, and SLA tracking',
                skills: ['Full-Stack', 'Workflow Design', 'Notifications'],
                learnings: ['Ticket lifecycle', 'Assignment logic', 'Priority management', 'SLA monitoring', 'Status workflows', 'Email notifications'],
                time: '3-4 weeks',
                portfolioValue: 'Operations tool - demonstrates process understanding',
                deployment: 'Cloud deployment with email service'
            },
            {
                title: 'Content Management System',
                objective: 'Custom CMS with roles, content workflow, and publishing',
                skills: ['Backend', 'Auth', 'Content Structure', 'UI'],
                learnings: ['Role-based access', 'Content versioning', 'Draft/publish workflow', 'Media management', 'SEO basics', 'API for frontend'],
                time: '3-4 weeks',
                portfolioValue: 'Enterprise feature - complex permissions and workflows',
                deployment: 'Full-stack with file storage (S3 or similar)'
            },
            {
                title: 'Event Registration & Management',
                objective: 'Handle event registration, payments, check-ins, certificates',
                skills: ['Full-Stack', 'Payment', 'Email', 'QR Codes'],
                learnings: ['Registration flow', 'Payment integration', 'Confirmation emails', 'QR code generation', 'Check-in system', 'Certificate generation'],
                time: '3 weeks',
                portfolioValue: 'Event tech - practical business application',
                deployment: 'Production deployment with payment gateway'
            },
            {
                title: 'Inventory Management System',
                objective: 'Track products, stock levels, reorder alerts, supplier management',
                skills: ['Database Design', 'Business Logic', 'Reporting'],
                learnings: ['Inventory tracking', 'Stock calculations', 'Reorder points', 'Supplier management', 'Purchase orders', 'Stock reports'],
                time: '3 weeks',
                portfolioValue: 'Business operations - real SMB need',
                deployment: 'Web deployment with data backups'
            },
            {
                title: 'Learning Management System (LMS)',
                objective: 'Course platform with videos, quizzes, progress tracking',
                skills: ['Full-Stack', 'Video', 'Assessment', 'Progress'],
                learnings: ['Course structure', 'Video hosting/streaming', 'Quiz engine', 'Progress tracking', 'Certificates', 'User analytics'],
                time: '4 weeks',
                portfolioValue: 'EdTech - growing industry with social impact',
                deployment: 'Cloud deployment with video CDN'
            }
        ]
    },
    
    advanced: {
        technical: [
            {
                title: 'Microservices E-commerce Backend',
                objective: 'Separate services for products, orders, payments, notifications',
                skills: ['Docker', 'Kubernetes', 'API Gateway', 'Message Queue'],
                learnings: ['Service separation', 'Container orchestration', 'Inter-service communication', 'API gateway pattern', 'Service discovery', 'Distributed transactions'],
                time: '5-6 weeks',
                portfolioValue: 'Microservices architecture - senior engineer skill',
                architecture: 'Docker Compose locally, Kubernetes for production',
                security: 'JWT between services, API rate limiting, input validation'
            },
            {
                title: 'Real-time Collaboration Platform',
                objective: 'Google Docs-like editor with real-time multi-user editing',
                skills: ['WebSocket', 'OT/CRDT', 'React', 'Redis'],
                learnings: ['Operational Transformation', 'Conflict resolution', 'Presence indicators', 'Cursor syncing', 'Version history', 'Performance optimization'],
                time: '6 weeks',
                portfolioValue: 'Complex real-time systems - advanced technical challenge',
                architecture: 'WebSocket server with Redis pub/sub',
                testing: 'Unit tests, integration tests, load testing'
            },
            {
                title: 'Machine Learning Pipeline',
                objective: 'Train, deploy, and serve ML model with monitoring',
                skills: ['Python', 'TensorFlow/PyTorch', 'FastAPI', 'MLOps'],
                learnings: ['Model training', 'Feature engineering', 'Model serving', 'A/B testing', 'Model monitoring', 'Retraining pipeline', 'Performance metrics'],
                time: '5-6 weeks',
                portfolioValue: 'ML deployment - rare end-to-end skill',
                architecture: 'Training pipeline, inference API, monitoring dashboard',
                deployment: 'Docker container on cloud with GPU support'
            },
            {
                title: 'Video Streaming Platform',
                objective: 'Upload, transcode, stream videos with adaptive bitrate',
                skills: ['FFmpeg', 'HLS/DASH', 'CDN', 'Object Storage'],
                learnings: ['Video transcoding', 'Adaptive streaming', 'CDN integration', 'Thumbnail generation', 'Progress tracking', 'DRM basics'],
                time: '5-6 weeks',
                portfolioValue: 'Media streaming - specialized high-value skill',
                architecture: 'Upload service, transcoding workers, CDN delivery',
                performance: 'Chunked uploads, background processing, CDN caching'
            },
            {
                title: 'GraphQL API with Subscriptions',
                objective: 'Flexible API supporting queries, mutations, real-time subscriptions',
                skills: ['GraphQL', 'Apollo', 'WebSocket', 'Database'],
                learnings: ['Schema design', 'Resolver optimization', 'N+1 problem', 'DataLoader pattern', 'Subscriptions', 'Authentication/authorization'],
                time: '4-5 weeks',
                portfolioValue: 'Modern API patterns - shows architecture knowledge',
                architecture: 'GraphQL server with subscription support',
                performance: 'Query optimization, caching, DataLoader batching'
            },
            {
                title: 'Distributed Job Queue System',
                objective: 'Background job processing with retries, scheduling, monitoring',
                skills: ['Redis/RabbitMQ', 'Workers', 'Monitoring', 'Scaling'],
                learnings: ['Queue management', 'Worker pools', 'Retry strategies', 'Dead letter queues', 'Job prioritization', 'Horizontal scaling'],
                time: '4 weeks',
                portfolioValue: 'Distributed systems - infrastructure engineering',
                architecture: 'Message broker, worker nodes, monitoring dashboard',
                testing: 'Load testing, failure scenarios, recovery testing'
            },
            {
                title: 'Progressive Web App (PWA) with Offline Support',
                objective: 'Full-featured app working offline with background sync',
                skills: ['Service Workers', 'IndexedDB', 'Push Notifications', 'React'],
                learnings: ['Offline-first architecture', 'Cache strategies', 'Background sync', 'Push notifications', 'App manifest', 'Install prompts'],
                time: '4 weeks',
                portfolioValue: 'PWA expertise - mobile-first future',
                architecture: 'Service worker caching, offline queue, sync on reconnect',
                performance: 'Lighthouse score 95+, install size optimization'
            },
            {
                title: 'API Rate Limiter & Analytics',
                objective: 'Middleware tracking API usage with rate limiting and analytics',
                skills: ['Redis', 'Middleware', 'Analytics', 'Token Bucket'],
                learnings: ['Rate limiting algorithms', 'Sliding window', 'Token bucket', 'Usage analytics', 'Quota management', 'Billing integration'],
                time: '3-4 weeks',
                portfolioValue: 'Infrastructure component - API platform skill',
                architecture: 'Redis-based rate limiter, analytics pipeline',
                performance: 'Low latency (<5ms), handle millions of requests'
            },
            {
                title: 'Search Engine with Autocomplete',
                objective: 'Full-text search with autocomplete, filters, faceted search',
                skills: ['Elasticsearch', 'Trie', 'React', 'Backend'],
                learnings: ['Inverted index', 'Relevance scoring', 'Autocomplete algorithms', 'Fuzzy matching', 'Faceted search', 'Search analytics'],
                time: '4-5 weeks',
                portfolioValue: 'Search infrastructure - critical for many products',
                architecture: 'Elasticsearch cluster, autocomplete service, UI',
                performance: 'Sub-100ms query response, real-time indexing'
            },
            {
                title: 'OAuth 2.0 Authorization Server',
                objective: 'Complete OAuth implementation with multiple grant types',
                skills: ['OAuth 2.0', 'Security', 'Tokens', 'Backend'],
                learnings: ['Authorization code flow', 'Refresh tokens', 'Scope management', 'Client registration', 'PKCE', 'Security best practices'],
                time: '4-5 weeks',
                portfolioValue: 'Security infrastructure - specialized expertise',
                architecture: 'Auth server, token validation, client management',
                security: 'HTTPS only, token encryption, rate limiting, audit logs'
            }
        ],
        management: [
            {
                title: 'Digital Transformation Roadmap',
                objective: 'Plan organization-wide shift to digital processes',
                skills: ['Strategy', 'Change Management', 'Technology Assessment'],
                learnings: ['Current state assessment', 'Vision creation', 'Technology selection', 'Phased rollout plan', 'Change management strategy', 'ROI modeling'],
                time: '4-5 weeks',
                portfolioValue: 'Executive-level thinking - shows strategic capability'
            },
            {
                title: 'Product Roadmap (12-Month)',
                objective: 'Strategic product vision with quarterly milestones and dependencies',
                skills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management'],
                learnings: ['Vision articulation', 'Theme-based planning', 'Feature prioritization (RICE)', 'Dependency mapping', 'Resource planning', 'Communication strategy'],
                time: '3-4 weeks',
                portfolioValue: 'Product leadership - critical for senior PM roles'
            },
            {
                title: 'Operational Excellence Initiative',
                objective: 'Implement lean/six sigma improvements across operations',
                skills: ['Operations', 'Process Design', 'Lean/Six Sigma', 'Metrics'],
                learnings: ['Value stream mapping', 'Waste identification', 'Kaizen events', 'Process standardization', 'Continuous improvement', 'Metrics dashboards'],
                time: '4-5 weeks',
                portfolioValue: 'Operations consulting - high-value skill for efficiency roles'
            },
            {
                title: 'Risk Management Framework',
                objective: 'Identify, assess, and mitigate enterprise risks',
                skills: ['Risk Assessment', 'Analysis', 'Mitigation Planning'],
                learnings: ['Risk identification', 'Impact/probability matrix', 'Mitigation strategies', 'Risk monitoring', 'Contingency planning', 'Board reporting'],
                time: '3 weeks',
                portfolioValue: 'Enterprise risk - essential for senior management'
            },
            {
                title: 'Team Performance System',
                objective: 'Design performance review process with goals and feedback',
                skills: ['HR', 'Performance Management', 'Goal Setting'],
                learnings: ['Performance frameworks', '360 feedback', 'Goal cascading', 'Review calibration', 'Development plans', 'Compensation linkage'],
                time: '3 weeks',
                portfolioValue: 'People management - critical leadership skill'
            },
            {
                title: 'Go-to-Market Strategy (B2B)',
                objective: 'Complete GTM plan for enterprise software product',
                skills: ['Strategy', 'Sales', 'Marketing', 'Partnerships'],
                learnings: ['ICP definition', 'Sales motion design', 'Marketing funnel', 'Partnership strategy', 'Pricing strategy', 'Launch metrics'],
                time: '4 weeks',
                portfolioValue: 'Revenue strategy - crucial for growth roles'
            },
            {
                title: 'Crisis Management Plan',
                objective: 'Develop response framework for business continuity',
                skills: ['Crisis Management', 'Business Continuity', 'Communication'],
                learnings: ['Scenario planning', 'Response protocols', 'Communication plans', 'Recovery procedures', 'Team roles', 'Testing/drills'],
                time: '2-3 weeks',
                portfolioValue: 'Business resilience - increasingly important skill'
            },
            {
                title: 'Data Governance Program',
                objective: 'Establish policies for data quality, security, and compliance',
                skills: ['Governance', 'Compliance', 'Data Management'],
                learnings: ['Data policies', 'Quality standards', 'Access controls', 'Compliance frameworks', 'Stewardship model', 'Audit processes'],
                time: '3-4 weeks',
                portfolioValue: 'Data strategy - critical in data-driven orgs'
            }
        ],
        hybrid: [
            {
                title: 'Analytics Platform',
                objective: 'Build a complete analytics solution with dashboards and insights',
                skills: ['Full-Stack', 'Data Engineering', 'Product'],
                learnings: ['Data pipeline', 'ETL processes', 'User tracking', 'Insight generation'],
                time: '5-6 weeks'
            },
            {
                title: 'DevOps Automation Suite',
                objective: 'Create CI/CD pipelines and deployment automation',
                skills: ['DevOps', 'Cloud', 'Automation', 'Process'],
                learnings: ['Pipeline design', 'Infrastructure as code', 'Monitoring', 'Incident response'],
                time: '4-5 weeks'
            }
        ]
    },
    
    expert: {
        technical: [
            {
                title: 'Distributed System with High Availability',
                objective: 'Build a fault-tolerant system handling millions of requests',
                skills: ['System Design', 'Cloud', 'Kubernetes', 'Databases'],
                learnings: ['Load balancing', 'Failover strategies', 'Data replication', 'Monitoring & alerting', 'Cost optimization'],
                time: '6-8 weeks'
            },
            {
                title: 'Real-time Analytics Engine',
                objective: 'Process and analyze streaming data at scale',
                skills: ['Stream Processing', 'Big Data', 'Cloud'],
                learnings: ['Apache Kafka', 'Real-time aggregation', 'Time-series databases', 'Horizontal scaling'],
                time: '6-8 weeks'
            },
            {
                title: 'Open Source Framework',
                objective: 'Create and publish a reusable library or framework',
                skills: ['Software Architecture', 'Documentation', 'Community'],
                learnings: ['API design', 'Backward compatibility', 'Testing strategy', 'Community building', 'Semantic versioning'],
                time: '8-12 weeks'
            },
            {
                title: 'AI-Powered Recommendation System',
                objective: 'Build production-ready personalization engine',
                skills: ['ML', 'Big Data', 'Cloud', 'APIs'],
                learnings: ['Collaborative filtering', 'Model serving', 'A/B testing', 'Feature stores', 'Performance at scale'],
                time: '6-10 weeks'
            }
        ],
        management: [
            {
                title: 'Digital Transformation Initiative',
                objective: 'Lead a complete digital transformation for an organization',
                skills: ['Strategy', 'Change Management', 'Technology', 'Leadership'],
                learnings: ['Vision creation', 'Executive alignment', 'Budget management', 'ROI tracking', 'Culture transformation'],
                time: '8-12 weeks'
            },
            {
                title: 'Market Entry Strategy',
                objective: 'Develop comprehensive plan for entering a new market',
                skills: ['Strategy', 'Market Research', 'Business Planning'],
                learnings: ['Market sizing', 'Competitive analysis', 'Go-to-market plan', 'Financial projections', 'Risk mitigation'],
                time: '6-8 weeks'
            },
            {
                title: 'Organizational Restructuring Plan',
                objective: 'Design and implement team reorganization for efficiency',
                skills: ['Org Design', 'HR', 'Change Management'],
                learnings: ['Team topology', 'Talent assessment', 'Communication strategy', 'Transition planning'],
                time: '6-8 weeks'
            }
        ],
        hybrid: [
            {
                title: 'Enterprise Platform',
                objective: 'Build multi-tenant SaaS platform with admin controls',
                skills: ['Architecture', 'Product', 'Business', 'Technical'],
                learnings: ['Multi-tenancy', 'Billing systems', 'Admin dashboards', 'Security compliance', 'Scalability'],
                time: '10-12 weeks'
            },
            {
                title: 'Data-Driven Product',
                objective: 'Create product with integrated analytics and insights',
                skills: ['Product', 'Data Science', 'Engineering', 'Growth'],
                learnings: ['Product metrics', 'Experimentation', 'User segmentation', 'Growth loops', 'Monetization'],
                time: '8-10 weeks'
            }
        ]
    }
};

// Internship roles database
const internshipRoles = {
    technical: [
        {
            title: 'Software Development Intern',
            requirements: ['Programming', 'Data Structures', 'Git'],
            minSkills: 3,
            description: 'Build features and fix bugs in production systems'
        },
        {
            title: 'Frontend Development Intern',
            requirements: ['HTML', 'CSS', 'JavaScript', 'React/Vue'],
            minSkills: 3,
            description: 'Create user interfaces and improve user experience'
        },
        {
            title: 'Backend Development Intern',
            requirements: ['Python/Node.js', 'Databases', 'APIs'],
            minSkills: 3,
            description: 'Develop server-side logic and database operations'
        },
        {
            title: 'Data Analyst Intern',
            requirements: ['Python/SQL', 'Excel', 'Data Visualization'],
            minSkills: 3,
            description: 'Analyze data and create insights for business decisions'
        },
        {
            title: 'ML/AI Intern',
            requirements: ['Python', 'Machine Learning', 'Statistics'],
            minSkills: 3,
            description: 'Build and train models for prediction and automation'
        },
        {
            title: 'DevOps Intern',
            requirements: ['Linux', 'Docker', 'CI/CD', 'Cloud'],
            minSkills: 3,
            description: 'Automate deployment and maintain infrastructure'
        }
    ],
    management: [
        {
            title: 'Product Management Intern',
            requirements: ['Communication', 'Analysis', 'Planning'],
            minSkills: 2,
            description: 'Define features and coordinate with engineering teams'
        },
        {
            title: 'Project Coordinator Intern',
            requirements: ['Organization', 'Communication', 'Tools'],
            minSkills: 2,
            description: 'Track project progress and facilitate team coordination'
        },
        {
            title: 'Business Analyst Intern',
            requirements: ['Analysis', 'Excel', 'Communication'],
            minSkills: 2,
            description: 'Gather requirements and document business processes'
        },
        {
            title: 'Operations Intern',
            requirements: ['Process Design', 'Data Analysis', 'Problem Solving'],
            minSkills: 2,
            description: 'Optimize processes and improve operational efficiency'
        },
        {
            title: 'Strategy Intern',
            requirements: ['Research', 'Analysis', 'Presentation'],
            minSkills: 2,
            description: 'Support strategic initiatives and market research'
        }
    ],
    hybrid: [
        {
            title: 'Product Analyst Intern',
            requirements: ['SQL', 'Analytics', 'Product Thinking'],
            minSkills: 3,
            description: 'Bridge product and data to drive decisions'
        },
        {
            title: 'Technical Program Manager Intern',
            requirements: ['Technical Knowledge', 'Project Management', 'Communication'],
            minSkills: 3,
            description: 'Manage technical projects across multiple teams'
        },
        {
            title: 'Growth Intern',
            requirements: ['Analytics', 'Marketing', 'Experimentation'],
            minSkills: 2,
            description: 'Run experiments and optimize user acquisition'
        },
        {
            title: 'Solutions Engineering Intern',
            requirements: ['Technical Skills', 'Customer Communication', 'Problem Solving'],
            minSkills: 3,
            description: 'Help customers implement technical solutions'
        }
    ]
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Add skill button
    document.getElementById('addSkillBtn').addEventListener('click', addSkill);
    
    // Skill input - Enter key
    document.getElementById('skillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    });
    
    // Quick add skill buttons
    document.querySelectorAll('.skill-quick-add').forEach(btn => {
        btn.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            addSkillFromButton(skill);
        });
    });
    
    // Generate button
    document.getElementById('generateBtn').addEventListener('click', generateRecommendations);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetForm);
}

function addSkill() {
    const input = document.getElementById('skillInput');
    const skillName = input.value.trim();
    
    if (!skillName) {
        alert('Please enter a skill');
        return;
    }
    
    if (userSkills.includes(skillName)) {
        alert('This skill is already added');
        input.value = '';
        return;
    }
    
    userSkills.push(skillName);
    displaySkill(skillName);
    input.value = '';
}

function addSkillFromButton(skillName) {
    if (userSkills.includes(skillName)) {
        return;
    }
    
    userSkills.push(skillName);
    displaySkill(skillName);
}

function displaySkill(skillName) {
    const container = document.getElementById('selectedSkills');
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    
    // Icon and color mapping for skills
    const skillIcons = {
        'Python': { icon: 'fab fa-python', color: '#3776AB' },
        'JavaScript': { icon: 'fab fa-js', color: '#F7DF1E' },
        'Java': { icon: 'fab fa-java', color: '#007396' },
        'C++': { icon: 'fas fa-code', color: '#00599C' },
        'C': { icon: 'fas fa-code', color: '#A8B9CC' },
        'React': { icon: 'fab fa-react', color: '#61DAFB' },
        'Node.js': { icon: 'fab fa-node-js', color: '#339933' },
        'SQL': { icon: 'fas fa-database', color: '#4479A1' },
        'HTML': { icon: 'fab fa-html5', color: '#E34F26' },
        'CSS': { icon: 'fab fa-css3-alt', color: '#1572B6' },
        'Git': { icon: 'fab fa-git-alt', color: '#F05032' },
        'Docker': { icon: 'fab fa-docker', color: '#2496ED' },
        'AWS': { icon: 'fab fa-aws', color: '#FF9900' },
        'Machine Learning': { icon: 'fas fa-brain', color: '#FF6F00' },
        'Data Analysis': { icon: 'fas fa-chart-bar', color: '#10B981' },
        'Cloud Computing': { icon: 'fas fa-cloud', color: '#FF9900' },
        'DevOps': { icon: 'fas fa-infinity', color: '#326CE5' },
        'Leadership': { icon: 'fas fa-user-tie', color: '#8B5CF6' },
        'Project Management': { icon: 'fas fa-tasks', color: '#667eea' },
        'Communication': { icon: 'fas fa-comments', color: '#10B981' },
        'Team Collaboration': { icon: 'fas fa-users', color: '#EC4899' },
        'Problem Solving': { icon: 'fas fa-lightbulb', color: '#F59E0B' },
        'Time Management': { icon: 'fas fa-clock', color: '#EF4444' },
        'UI/UX Design': { icon: 'fas fa-palette', color: '#EC4899' },
        'Database Management': { icon: 'fas fa-database', color: '#4479A1' },
        'Web Development': { icon: 'fas fa-globe', color: '#61DAFB' },
        'API': { icon: 'fas fa-plug', color: '#61DAFB' },
        'Testing': { icon: 'fas fa-vial', color: '#10B981' },
        'Agile': { icon: 'fas fa-sync', color: '#10B981' },
        'Scrum': { icon: 'fas fa-sync-alt', color: '#667eea' }
    };
    
    const iconData = skillIcons[skillName] || { icon: 'fas fa-check-circle', color: '#667eea' };
    
    tag.innerHTML = `
        <span><i class="${iconData.icon}" style="color: ${iconData.color}; margin-right: 0.5rem;"></i>${skillName}</span>
        <span class="remove-skill" data-skill="${skillName}">×</span>
    `;
    
    tag.querySelector('.remove-skill').addEventListener('click', function() {
        removeSkill(skillName, tag);
    });
    
    container.appendChild(tag);
}

function removeSkill(skillName, tagElement) {
    const index = userSkills.indexOf(skillName);
    if (index > -1) {
        userSkills.splice(index, 1);
    }
    
    tagElement.style.opacity = '0';
    tagElement.style.transform = 'scale(0.8)';
    setTimeout(() => {
        tagElement.remove();
    }, 300);
}

function generateRecommendations() {
    if (userSkills.length === 0) {
        alert('Please add at least one skill');
        return;
    }
    
    // Collect user profile
    userProfile.proficiency = document.querySelector('input[name="proficiency"]:checked').value;
    userProfile.domain = document.querySelector('input[name="domain"]:checked').value;
    userProfile.interestedTech = document.getElementById('interestedTech').value;
    
    // Classify user
    classifyUser();
    
    // Generate projects
    generateProjects();
    
    // Analyze internship readiness
    analyzeInternshipReadiness();
    
    // Show results
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function classifyUser() {
    const skillCount = userSkills.length;
    const proficiency = userProfile.proficiency;
    
    let classification = {
        level: '',
        icon: '',
        title: '',
        description: ''
    };
    
    if (proficiency === 'beginner' || skillCount < 3) {
        classification = {
            level: 'beginner',
            icon: '🌱',
            title: 'Beginner - Building Foundation',
            description: 'Focus on fundamentals and completing simple projects to build confidence'
        };
    } else if (proficiency === 'intermediate' || skillCount < 6) {
        classification = {
            level: 'growing',
            icon: '🚀',
            title: 'Growing Practitioner',
            description: 'Ready for real-world projects with APIs and databases'
        };
    } else if (proficiency === 'advanced' || skillCount < 10) {
        classification = {
            level: 'ready',
            icon: '⭐',
            title: 'Industry Ready',
            description: 'Capable of building production-grade projects and contributing to teams'
        };
    } else {
        classification = {
            level: 'expert',
            icon: '🏆',
            title: 'Advanced Builder',
            description: 'Ready for complex systems and leadership roles'
        };
    }
    
    userProfile.classification = classification;
    
    // Display classification
    document.getElementById('classificationIcon').textContent = classification.icon;
    document.getElementById('classificationTitle').textContent = classification.title;
    document.getElementById('classificationDesc').textContent = classification.description;
}

function generateProjects() {
    const domain = userProfile.domain;
    
    // Generate projects for each level
    generateProjectLevel('beginner', domain);
    generateProjectLevel('intermediate', domain);
    generateProjectLevel('advanced', domain);
    generateProjectLevel('expert', domain);
}

function generateProjectLevel(level, domain) {
    const projects = projectDatabase[level][domain] || projectDatabase[level]['hybrid'];
    const gridId = level + 'ProjectsGrid';
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    
    // Show all projects for the level (7-10 projects each)
    projects.forEach(project => {
        const card = createProjectCard(project, level);
        grid.appendChild(card);
    });
}

function createProjectCard(project, level) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const skillsHTML = project.skills.map(skill => 
        `<span class="skill-pill">${skill}</span>`
    ).join('');
    
    const learningsHTML = project.learnings.map(learning => 
        `<li>${learning}</li>`
    ).join('');
    
    // Build extra details HTML if they exist
    let extraDetailsHTML = '';
    if (project.deployment || project.architecture || project.security || project.performance || project.testing) {
        const extraItems = [];
        if (project.deployment) extraItems.push(`<div class="project-extra-item"><strong>Deployment:</strong> ${project.deployment}</div>`);
        if (project.architecture) extraItems.push(`<div class="project-extra-item"><strong>Architecture:</strong> ${project.architecture}</div>`);
        if (project.security) extraItems.push(`<div class="project-extra-item"><strong>Security:</strong> ${project.security}</div>`);
        if (project.performance) extraItems.push(`<div class="project-extra-item"><strong>Performance:</strong> ${project.performance}</div>`);
        if (project.testing) extraItems.push(`<div class="project-extra-item"><strong>Testing:</strong> ${project.testing}</div>`);
        
        extraDetailsHTML = `<div class="project-extra">${extraItems.join('')}</div>`;
    }
    
    // Portfolio value
    const portfolioHTML = project.portfolioValue ? 
        `<div class="portfolio-value"><strong>Portfolio Value:</strong> ${project.portfolioValue}</div>` : '';
    
    card.innerHTML = `
        <div class="project-header">
            <h4 class="project-title">${project.title}</h4>
            <span class="project-time">⏱️ ${project.time}</span>
        </div>
        <p class="project-objective">${project.objective}</p>
        <div class="project-skills">${skillsHTML}</div>
        <div class="project-details">
            <div class="project-learn">
                <h4>What You'll Learn:</h4>
                <ul>${learningsHTML}</ul>
            </div>
            ${extraDetailsHTML}
            ${portfolioHTML}
            <div class="project-actions">
                <button class="btn-action">Add to Portfolio Plan</button>
                <button class="btn-action">Mark In Progress</button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn-action')) {
            this.classList.toggle('expanded');
        }
    });
    
    return card;
}

function analyzeInternshipReadiness() {
    const skillCount = userSkills.length;
    const proficiency = userProfile.proficiency;
    const domain = userProfile.domain;
    
    // Calculate readiness score
    let score = 0;
    
    // Skill count contribution (50%)
    score += Math.min((skillCount / 8) * 50, 50);
    
    // Proficiency contribution (30%)
    if (proficiency === 'advanced') score += 30;
    else if (proficiency === 'intermediate') score += 20;
    else score += 10;
    
    // Domain clarity (20%)
    if (domain !== 'hybrid') score += 20;
    else score += 15;
    
    score = Math.round(score);
    
    // Animate score
    animateReadinessScore(score);
    
    // Determine status
    let status = '';
    let statusClass = '';
    
    if (score >= 75) {
        status = '✅ Ready to Apply';
        statusClass = 'ready';
    } else if (score >= 50) {
        status = '⚠️ 1-2 Skills Away';
        statusClass = 'almost';
    } else {
        status = '📚 Build More First';
        statusClass = 'build-more';
    }
    
    const statusElement = document.getElementById('readinessStatus');
    statusElement.textContent = status;
    statusElement.className = 'readiness-status ' + statusClass;
    
    // Generate suitable roles
    generateInternshipRoles(domain, score);
    
    // Generate gap analysis
    generateGapAnalysis(score);
    
    // Generate preparation strategy
    generatePreparationStrategy(score);
}

function animateReadinessScore(targetScore) {
    const scoreElement = document.getElementById('readinessScore');
    const circle = document.getElementById('readinessCircle');
    
    let currentScore = 0;
    const duration = 2000;
    const increment = targetScore / (duration / 16);
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        
        scoreElement.textContent = Math.round(currentScore);
        
        // Update circle
        const circumference = 502.65;
        const offset = circumference - (currentScore / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }, 16);
}

function generateInternshipRoles(domain, score) {
    const roles = internshipRoles[domain] || internshipRoles['hybrid'];
    const grid = document.getElementById('internshipRolesGrid');
    grid.innerHTML = '';
    
    roles.forEach(role => {
        const matchedSkills = role.requirements.filter(req => 
            userSkills.some(skill => skill.toLowerCase().includes(req.toLowerCase()))
        ).length;
        
        const confidence = matchedSkills >= role.minSkills ? 'high' : 
                          matchedSkills >= role.minSkills - 1 ? 'medium' : 'low';
        
        const card = document.createElement('div');
        card.className = 'role-card';
        card.innerHTML = `
            <h4 class="role-title">${role.title}</h4>
            <div class="role-requirements">
                <h4>Required Skills:</h4>
                <ul>
                    ${role.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 12px 0;">${role.description}</p>
            <span class="confidence-badge ${confidence}">
                ${confidence === 'high' ? 'Strong Match' : confidence === 'medium' ? 'Good Match' : 'Build Skills'}
            </span>
        `;
        
        grid.appendChild(card);
    });
}

function generateGapAnalysis(score) {
    const gaps = [];
    
    if (score < 50) {
        gaps.push('Add 2-3 more relevant technical skills to your profile');
        gaps.push('Complete at least 2 beginner projects to build foundation');
        gaps.push('Create a GitHub profile and start version controlling your code');
        gaps.push('Timeline: 4-6 weeks of focused learning');
    } else if (score < 75) {
        gaps.push('Complete 1-2 intermediate projects with API integration');
        gaps.push('Build a portfolio website showcasing your work');
        gaps.push('Contribute to one open-source project or collaborate with peers');
        gaps.push('Timeline: 2-3 weeks before applications');
    } else {
        gaps.push('Polish your existing projects with proper documentation');
        gaps.push('Prepare for technical interviews (DSA, system design basics)');
        gaps.push('Update resume with quantifiable project achievements');
        gaps.push('Timeline: Ready to apply now! Keep building while applying');
    }
    
    const content = document.getElementById('gapContent');
    const ul = document.createElement('ul');
    gaps.forEach(gap => {
        const li = document.createElement('li');
        li.textContent = gap;
        ul.appendChild(li);
    });
    
    content.innerHTML = '';
    content.appendChild(ul);
}

function generatePreparationStrategy(score) {
    const strategies = [
        {
            icon: '📄',
            title: 'Resume Focus',
            text: score >= 75 ? 
                'Highlight your 2-3 best projects with metrics. Emphasize technologies used and impact created.' :
                'List your skills and projects. Focus on learning outcomes and technologies used.'
        },
        {
            icon: '💼',
            title: 'Portfolio Requirements',
            text: score >= 75 ?
                'Ensure live demos, clean code on GitHub, and detailed README files for each project.' :
                'Create a simple portfolio site. Add at least 2-3 projects with descriptions.'
        },
        {
            icon: '🎯',
            title: 'Suggested Next Project',
            text: score >= 75 ?
                'Build an advanced project that demonstrates system design or solves a real problem at scale.' :
                score >= 50 ?
                'Create an intermediate project with database and API integration.' :
                'Start with a beginner project using your strongest skill.'
        },
        {
            icon: '🤝',
            title: 'Networking Direction',
            text: 'Connect with professionals on LinkedIn. Share your projects. Engage with tech communities and attend virtual meetups.'
        }
    ];
    
    const grid = document.getElementById('strategyGrid');
    grid.innerHTML = '';
    
    strategies.forEach(strategy => {
        const item = document.createElement('div');
        item.className = 'strategy-item';
        item.innerHTML = `
            <h4>${strategy.icon} ${strategy.title}</h4>
            <p>${strategy.text}</p>
        `;
        grid.appendChild(item);
    });
}

function resetForm() {
    userSkills = [];
    userProfile = {
        proficiency: 'beginner',
        domain: 'technical',
        interestedTech: '',
        classification: null
    };
    
    document.getElementById('selectedSkills').innerHTML = '';
    document.getElementById('skillInput').value = '';
    document.getElementById('interestedTech').value = '';
    document.querySelector('input[name="proficiency"][value="beginner"]').checked = true;
    document.querySelector('input[name="domain"][value="technical"]').checked = true;
    
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}