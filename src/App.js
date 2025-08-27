import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Linkedin, MapPin, Calendar, Award, Code, Database, Globe, ChevronDown, Download, ArrowRight, ExternalLink, Building, GraduationCap, Briefcase, User, FileText, Target, Eye, MousePointer } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    'Computer Science Student',
    'AI/ML Enthusiast', 
    'Data Engineer',
    'Problem Solver'
  ];

  useEffect(() => {
    setIsLoaded(true);

    // Typing animation effect
    let currentText = '';
    let currentIndex = 0;
    let isDeleting = false;
    
    const typeWriter = () => {
      const currentRole = roles[currentIndex];
      
      if (isDeleting) {
        currentText = currentRole.substring(0, currentText.length - 1);
      } else {
        currentText = currentRole.substring(0, currentText.length + 1);
      }
      
      setTypedText(currentText);
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && currentText === currentRole) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next word
      }
      
      setTimeout(typeWriter, typeSpeed);
    };
    
    setTimeout(typeWriter, 1000);

    // Scroll-based section detection
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'certifications'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = {
    languages: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'C++', level: 75 },
      { name: 'C', level: 70 }
    ],
    tools: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'AWS/GCP', level: 75 },
      { name: 'Tableau', level: 80 },
      { name: 'Power BI', level: 75 },
      { name: 'Excel', level: 85 }
    ],
    frameworks: [
      { name: 'React', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Spring Boot', level: 70 },
      { name: 'TensorFlow', level: 80 },
      { name: 'Pandas', level: 85 },
      { name: 'Scikit-learn', level: 85 }
    ]
  };

  const projects = [
    {
      title: 'Nutricart Recipe Maker',
      description: 'Cross-platform mobile application analyzing ingredients and generating personalized recipes using AI.',
      tech: ['Expo', 'Node.js', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
      date: 'July 2025',
      achievements: [
        'Enhanced user engagement by 40%',
        'Reduced food waste by 30%',
        'Improved query performance by 35%',
        'Delivered responsive design with 40% better usability'
      ],
      category: 'Mobile Development',
      status: 'Completed'
    },
    {
      title: 'Heart Disease Prediction System',
      description: 'Machine learning model for early heart disease diagnosis using clinical data and advanced algorithms.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
      date: 'June 2025',
      achievements: [
        'Achieved 92% prediction accuracy',
        'Improved model performance by 15%',
        'Implemented comprehensive data preprocessing',
        'Delivered robust model with 85% test accuracy'
      ],
      category: 'Machine Learning',
      status: 'Completed'
    },
    {
      title: 'Data Engineering Pipeline',
      description: 'End-to-end ETL pipeline processing NYC taxi data with scalable architecture and real-time analytics.',
      tech: ['Python', 'SQL', 'Mage AI', 'Google Cloud Platform', 'BigQuery'],
      date: 'May 2025',
      achievements: [
        'Processed 10,000+ records with 30% improved throughput',
        'Reduced query execution time by 40%',
        'Built dimensional data model for analytics',
        'Created interactive dashboards for insights'
      ],
      category: 'Data Engineering',
      status: 'Completed'
    }
  ];

  const certifications = [
    {
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University',
      date: '2025',
      category: 'Cloud & AI'
    },
    {
      title: 'Google Cloud Computing Foundations Certificate',
      issuer: 'Google Cloud',
      date: '2025',
      category: 'Cloud Computing'
    },
    {
      title: 'Artificial Intelligence and Machine Learning Training Course',
      issuer: 'Onwingspan',
      date: '2024',
      category: 'AI & ML'
    },
    {
      title: 'Associate Data Analyst in SQL',
      issuer: 'DataCamp',
      date: '2024',
      category: 'Data Analysis'
    },
    {
      title: 'Exploratory Data Analysis',
      issuer: 'DataCamp',
      date: '2024',
      category: 'Data Science'
    }
  ];

  const ProgressBar = ({ percentage, isHovered }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-2 rounded-full transition-all duration-1000 ease-out ${
          isHovered ? 'bg-blue-600' : 'bg-gray-800'
        }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );

  // Professional Navigation
  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-gray-900 cursor-pointer hover:text-blue-600 transition-colors" 
               onClick={() => scrollToSection('hero')}>
            Saiashok Karadi
          </div>
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeSection === item.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => window.location.href = 'mailto:saiashok103@gmail.com'}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center mb-12">
              <div className="mb-4">
                <h2 className="text-lg text-blue-600 font-medium mb-2">Hello, I'm</h2>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 leading-tight">
                  Saiashok Karadi
                </h1>
                <div className="text-2xl text-gray-600 h-8 flex justify-center items-center">
                  <span>{typedText}</span>
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Passionate about artificial intelligence, machine learning, and data engineering. 
                Building innovative solutions that drive business value and technological advancement.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                  onClick={() => window.location.href = 'mailto:saiashok103@gmail.com'}
                  className="group flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg"
                >
                  <Mail size={18} className="group-hover:animate-bounce" />
                  <span>Get in Touch</span>
                </button>
                <button className="group flex items-center gap-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 px-8 py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105 hover:shadow-md">
                  <Download size={18} className="group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/in/Saiashok', '_blank')}
                  className="group flex items-center gap-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 px-8 py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105 hover:shadow-md"
                >
                  <Linkedin size={18} className="group-hover:animate-bounce" />
                  <span>LinkedIn</span>
                </button>
              </div>
              
              {/* Scroll indicator */}
              <div className="animate-bounce mt-16">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">About Me</h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-gray-700" size={24} />
                <h3 className="text-2xl font-semibold text-gray-900">Education</h3>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Bachelor of Technology</h4>
                      <p className="text-gray-600">Computer Science and Engineering</p>
                      <p className="text-gray-500 text-sm">Bangalore Institute of Technology</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">CGPA: 7.5</span>
                      <p className="text-gray-500 text-sm mt-1">2022 – Present</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Class XII, CBSE</h4>
                      <p className="text-gray-500 text-sm">Narayana PU Bangalore South</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">88.67%</span>
                      <p className="text-gray-500 text-sm mt-1">2021 – 2022</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Class X, ICSE</h4>
                      <p className="text-gray-500 text-sm">The Bishop's School Pune</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm group-hover:bg-blue-50 group-hover:text-blue-700 transition-all">82.1%</span>
                      <p className="text-gray-500 text-sm mt-1">2013 – 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-8">
                <User className="text-gray-700" size={24} />
                <h3 className="text-2xl font-semibold text-gray-900">Contact Information</h3>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8 hover:shadow-lg transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <MapPin className="text-gray-500 group-hover:text-blue-500 transition-colors" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Location</p>
                      <p className="text-gray-600 text-sm">Classic Paradise, Begur, Bangalore, Karnataka - 560068</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                       onClick={() => window.location.href = 'tel:+916301955884'}>
                    <Phone className="text-gray-500 group-hover:text-blue-500 transition-colors" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Phone</p>
                      <p className="text-gray-600 text-sm">+91 6301955884</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                       onClick={() => window.location.href = 'mailto:saiashok103@gmail.com'}>
                    <Mail className="text-gray-500 group-hover:text-blue-500 transition-colors" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Email</p>
                      <p className="text-gray-600 text-sm">saiashok103@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                       onClick={() => window.open('https://linkedin.com/in/Saiashok', '_blank')}>
                    <Linkedin className="text-gray-500 group-hover:text-blue-500 transition-colors" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">LinkedIn</p>
                      <p className="text-gray-600 text-sm">linkedin.com/in/Saiashok</p>
                    </div>
                    <ExternalLink className="text-gray-400 group-hover:text-blue-500 ml-auto transition-colors" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Core Coursework</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  {[
                    'Data Structures', 'Operating Systems', 'Computer Networks', 'Database Management',
                    'Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Web Development'
                  ].map((course, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Briefcase className="text-gray-700" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Professional Experience</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center hover:bg-gray-100 transition-colors duration-300">
            <Target className="text-gray-400 mx-auto mb-4 hover:text-blue-500 transition-colors duration-300" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seeking Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Currently pursuing Bachelor's degree while actively seeking internship and entry-level opportunities 
              in AI/ML, Data Engineering, and Software Development.
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer">
                Available for Internships
              </span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer">
                Open to Remote Work
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Code className="text-gray-700" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Programming Languages', items: skills.languages, icon: Code },
              { title: 'Tools & Platforms', items: skills.tools, icon: Database },
              { title: 'Frameworks & Libraries', items: skills.frameworks, icon: Globe }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="text-gray-700 group-hover:text-blue-600 transition-colors" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex}
                         onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                         onMouseLeave={() => setHoveredSkill(null)}
                         className="cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium transition-colors ${
                          hoveredSkill === `${index}-${skillIndex}` ? 'text-blue-600' : 'text-gray-700'
                        }`}>{skill.name}</span>
                        <span className={`text-xs transition-colors ${
                          hoveredSkill === `${index}-${skillIndex}` ? 'text-blue-500' : 'text-gray-500'
                        }`}>{skill.level}%</span>
                      </div>
                      <ProgressBar 
                        percentage={skill.level} 
                        isHovered={hoveredSkill === `${index}-${skillIndex}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-16">
            <FileText className="text-gray-700" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          </div>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div key={index} 
                   onMouseEnter={() => setHoveredProject(index)}
                   onMouseLeave={() => setHoveredProject(null)}
                   className={`bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer transform ${
                     hoveredProject === index ? 'scale-[1.02] shadow-xl' : ''
                   }`}>
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-semibold transition-colors ${
                        hoveredProject === index ? 'text-blue-600' : 'text-gray-900'
                      }`}>{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        hoveredProject === index 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                      {hoveredProject === index && (
                        <Eye className="text-blue-500 animate-pulse" size={16} />
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm transition-colors ${
                      hoveredProject === index ? 'text-blue-600' : 'text-gray-500'
                    }`}>{project.category}</span>
                    <p className="text-sm text-gray-400">{project.date}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className={`font-medium mb-3 transition-colors ${
                    hoveredProject === index ? 'text-blue-600' : 'text-gray-900'
                  }`}>Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        hoveredProject === index
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className={`font-medium mb-3 transition-colors ${
                    hoveredProject === index ? 'text-blue-600' : 'text-gray-900'
                  }`}>Key Achievements</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start gap-2 group">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all ${
                          hoveredProject === index ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                        <span className={`text-sm transition-colors ${
                          hoveredProject === index ? 'text-gray-700' : 'text-gray-600'
                        }`}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Award className="text-gray-700" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Certifications</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg transition-all ${
                    'group-hover:bg-blue-100'
                  }`}>
                    <Award className={`transition-colors ${
                      'text-gray-600 group-hover:text-blue-600'
                    }`} size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{cert.title}</h4>
                    <p className="text-sm text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">{cert.issuer}</p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded text-xs transition-all ${
                        'bg-gray-100 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-700'
                      }`}>
                        {cert.category}
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors">{cert.date}</span>
                    </div>
                  </div>
                  <ExternalLink className="text-gray-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Let's Work Together</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm actively seeking opportunities to apply my skills in AI, machine learning, and data engineering. 
            Let's connect and discuss how I can contribute to your team.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => window.location.href = 'mailto:saiashok103@gmail.com'}
              className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg"
            >
              <Mail size={18} className="group-hover:animate-bounce" />
              <span>Email Me</span>
            </button>
            <button 
              onClick={() => window.location.href = 'tel:+916301955884'}
              className="group flex items-center gap-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 px-6 py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105 hover:shadow-md"
            >
              <Phone size={18} className="group-hover:animate-bounce" />
              <span>Call</span>
            </button>
            <button 
              onClick={() => window.open('https://linkedin.com/in/Saiashok', '_blank')}
              className="group flex items-center gap-2 border border-gray-300 hover:border-blue-400 hover:text-blue-600 px-6 py-3 rounded-lg transition-all duration-200 font-medium hover:scale-105 hover:shadow-md"
            >
              <Linkedin size={18} className="group-hover:animate-bounce" />
              <span>LinkedIn</span>
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-2 mb-4">
            <MousePointer className="text-gray-300" size={16} />
            <p className="text-sm text-gray-500">
              © 2025 Saiashok Karadi. All rights reserved.
            </p>
          </div>
          
          {/* Back to top button */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium group"
          >
            <span>Back to top</span>
            <ArrowRight className="rotate-[-90deg] group-hover:animate-bounce" size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;