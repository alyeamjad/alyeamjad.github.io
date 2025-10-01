// Neural Network Background using p5.js
let neuralNetwork;
let nodes = [];
let connections = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('neural-bg');
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: random(width),
            y: random(height),
            vx: random(-0.5, 0.5),
            vy: random(-0.5, 0.5),
            size: random(2, 4)
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let distance = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            if (distance < 150) {
                connections.push({
                    from: i,
                    to: j,
                    alpha: random(0.1, 0.3)
                });
            }
        }
    }
}

function draw() {
    clear();
    
    // Update and draw nodes
    for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        
        // Draw node
        fill(0, 212, 255, 150);
        noStroke();
        ellipse(node.x, node.y, node.size);
    }
    
    // Draw connections
    for (let conn of connections) {
        let from = nodes[conn.from];
        let to = nodes[conn.to];
        let distance = dist(from.x, from.y, to.x, to.y);
        
        if (distance < 150) {
            stroke(0, 212, 255, conn.alpha * 255 * (1 - distance / 150));
            strokeWeight(0.5);
            line(from.x, from.y, to.x, to.y);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Skills Radar Chart
document.addEventListener('DOMContentLoaded', function() {
    const skillsChart = echarts.init(document.getElementById('skills-chart'));
    
    const skillsData = {
        tooltip: {},
        radar: {
            indicator: [
                { name: 'Computer Vision', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'LLMs & NLP', max: 100 },
                { name: 'Data Science', max: 100 },
                { name: 'MLOps', max: 100 },
                { name: 'Research', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#e0e0e0',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: '#0f3460'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#0f3460'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 85, 88, 75, 92],
                name: 'Ali Amjad',
                areaStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                },
                lineStyle: {
                    color: '#00d4ff',
                    width: 2
                },
                itemStyle: {
                    color: '#00d4ff'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    skillsChart.setOption(skillsData);
    
    // Resize chart on window resize
    window.addEventListener('resize', function() {
        skillsChart.resize();
    });
    
    // Experience Timeline Interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    const experienceContent = document.getElementById('experience-content');
    
    const experienceData = {
        centaic: {
            title: 'Computer Vision Intern at CENTAIC-NASTP-Alpha',
            period: 'September 2024 - Present',
            details: [
                'Developing end-to-end computer vision pipelines for surveillance projects',
                'Generating synthetic datasets in Blender for model training',
                'Building real-time intruder alert systems with automated notifications',
                'Applying OCR techniques for license plate recognition',
                'Training and fine-tuning YOLO models for object detection',
                'Using GPU acceleration with CUDA for optimized performance'
            ]
        },
        utech: {
            title: 'Data Scientist at U Tech Innovative Solutions',
            period: 'March 2024 - July 2024',
            details: [
                'Conducted comprehensive Exploratory Data Analysis (EDA)',
                'Implemented machine learning models (Linear Regression, Random Forest, KMeans)',
                'Performed feature engineering and model optimization',
                'Created insightful visual reports for strategic decision-making',
                'Collaborated on data-driven business solutions'
            ]
        },
        comsens: {
            title: 'Research Assistant at ComSens Lab',
            period: 'June 2023 - January 2024',
            details: [
                'Explored deep learning architectures (CNNs, RNNs, LSTMs, Transformers)',
                'Contributed to heart disease detection research',
                'Gained experience with benchmark datasets and model evolution',
                'Used LaTeX for scientific writing and documentation',
                'Supported early-stage research efforts in medical AI'
            ]
        }
    };
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const experienceKey = this.getAttribute('data-experience');
            const data = experienceData[experienceKey];
            
            if (data) {
                experienceContent.innerHTML = `
                    <h4 class="text-lg font-semibold text-cyan-400 mb-2">${data.title}</h4>
                    <p class="text-gray-400 mb-4">${data.period}</p>
                    <ul class="space-y-2">
                        ${data.details.map(detail => `<li class="text-gray-300">• ${detail}</li>`).join('')}
                    </ul>
                `;
                
                // Animate the content
                anime({
                    targets: '#experience-content',
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.card-hover, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // // Text animation for hero section
    // anime.timeline({
    //     easing: 'easeOutExpo',
    //     duration: 1000
    // })
    // .add({
    //     targets: '.gradient-text',
    //     opacity: [0, 1],
    //     translateY: [50, 0],
    //     delay: anime.stagger(200)
    // })
    // .add({
    //     targets: '.floating',
    //     opacity: [0, 1],
    //     scale: [0.8, 1],
    //     duration: 1500
    // }, '-=500');
    
    // Skill badges hover effect
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        badge.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -10,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Navigation link hover effects
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                color: '#00d4ff',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                color: '#d1d5db',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.glow-effect').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Typing effect for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect after page load
    setTimeout(() => {
        const heroTitle = document.querySelector('h1');
        if (heroTitle) {
            const originalText = heroTitle.innerHTML;
            typeWriter(heroTitle, originalText, 50);
        }
    }, 1000);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on load
        // anime({
        //     targets: '.gradient-text',
        //     opacity: [0, 1],
        //     translateY: [30, 0],
        //     delay: anime.stagger(200),
        //     duration: 1000,
        //     easing: 'easeOutCubic'
        // });
        
        // anime({
        //     targets: '.floating',
        //     opacity: [0, 1],
        //     scale: [0.8, 1],
        //     duration: 1500,
        //     delay: 500,
        //     easing: 'easeOutCubic'
        // });
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(() => {
    if (typeof skillsChart !== 'undefined') {
        skillsChart.resize();
    }
}, 250);

window.addEventListener('resize', debouncedResize);
