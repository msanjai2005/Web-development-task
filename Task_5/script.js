document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
            // Animate hero elements after loading
            document.querySelector('.hero-title').classList.add('visible');
            document.querySelector('.hero-subtitle').classList.add('visible');
            document.querySelector('.cta-button').classList.add('visible');
        }, 500);
    }, 1500);

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Change icon
        const icon = themeToggle.querySelector('i');
        if (document.body.getAttribute('data-theme') === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll animation
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.2
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initialize scroll animation
    handleScrollAnimation();

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    };
    
    // Only animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });

    // Dynamic article loading
    const articlesContainer = document.getElementById('articles-container');
    const loadMoreBtn = document.getElementById('load-more');
    let currentPage = 1;
    const articlesPerPage = 6;
    let allArticles = [];

    // Sample article data (in a real app, this would come from an API)
    const sampleArticles = [
        {
            id: 1,
            title: "Mastering CSS Grid Layout in 2023",
            excerpt: "Learn how to create complex layouts with CSS Grid, the most powerful layout system available in CSS.",
            category: "CSS",
            date: "May 15, 2023",
            author: "Jane Smith",
            authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
        },
        {
            id: 2,
            title: "JavaScript ES2023 Features You Should Know",
            excerpt: "Explore the latest JavaScript features that will make your code cleaner and more efficient.",
            category: "JavaScript",
            date: "June 2, 2023",
            author: "John Doe",
            authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            title: "Building Accessible Web Applications",
            excerpt: "A comprehensive guide to making your web applications accessible to all users.",
            category: "Accessibility",
            date: "June 10, 2023",
            author: "Alex Johnson",
            authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 4,
            title: "The Future of React: What's Coming in 2024",
            excerpt: "Get a sneak peek at the upcoming features and changes in the React ecosystem.",
            category: "React",
            date: "July 5, 2023",
            author: "Mike Chen",
            authorAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 5,
            title: "Optimizing Web Performance: Advanced Techniques",
            excerpt: "Take your website's performance to the next level with these advanced optimization strategies.",
            category: "Performance",
            date: "July 12, 2023",
            author: "Sarah Williams",
            authorAvatar: "https://randomuser.me/api/portraits/women/25.jpg",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 6,
            title: "TypeScript Best Practices for Large Projects",
            excerpt: "Learn how to structure and maintain large TypeScript codebases effectively.",
            category: "TypeScript",
            date: "July 20, 2023",
            author: "David Kim",
            authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 7,
            title: "CSS Animations That Will Impress Your Users",
            excerpt: "Create stunning animations using only CSS to enhance your user experience.",
            category: "CSS",
            date: "August 1, 2023",
            author: "Emily Davis",
            authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 8,
            title: "Building a Full-Stack App with Next.js",
            excerpt: "A step-by-step guide to creating a complete application with Next.js and MongoDB.",
            category: "Next.js",
            date: "August 8, 2023",
            author: "Robert Taylor",
            authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 9,
            title: "State Management in 2023: Beyond Redux",
            excerpt: "Explore modern state management solutions that might replace Redux in your projects.",
            category: "State Management",
            date: "August 15, 2023",
            author: "Lisa Wong",
            authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
            image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 10,
            title: "Web Components: The Future of Frontend?",
            excerpt: "Are Web Components finally ready to revolutionize frontend development? Let's find out.",
            category: "Web Components",
            date: "August 22, 2023",
            author: "Tom Wilson",
            authorAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 11,
            title: "Advanced Git Techniques for Teams",
            excerpt: "Master Git workflows that will make your team collaboration seamless and efficient.",
            category: "Git",
            date: "September 5, 2023",
            author: "Maria Garcia",
            authorAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
            image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 12,
            title: "The Complete Guide to CSS Variables",
            excerpt: "Harness the power of CSS custom properties to create dynamic and maintainable styles.",
            category: "CSS",
            date: "September 12, 2023",
            author: "James Brown",
            authorAvatar: "https://randomuser.me/api/portraits/men/53.jpg",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
        }
    ];

    // Function to create article card HTML
    function createArticleCard(article) {
        return `
            <article class="article-card">
                <div class="article-image-container">
                    <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy">
                </div>
                <div class="article-content">
                    <span class="article-category">${article.category}</span>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span class="article-date">${article.date}</span>
                        <span class="article-author">
                            <img src="${article.authorAvatar}" alt="${article.author}" class="author-avatar">
                            ${article.author}
                        </span>
                    </div>
                </div>
            </article>
        `;
    }

    // Function to load articles
    // Function to load articles
function loadArticles(page) {
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToLoad = sampleArticles.slice(startIndex, endIndex);
    
    if (articlesToLoad.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    articlesToLoad.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = createArticleCard(article);
        
        // Make sure we have a valid element before proceeding
        if (articleElement.firstElementChild) {
            const cardElement = articleElement.firstElementChild;
            articlesContainer.appendChild(cardElement);
            
            // Add to allArticles array
            allArticles.push(cardElement);
            
            // Observe the article for scroll animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(cardElement);
        }
    });
    
    // Hide load more button if we've loaded all articles
    if (endIndex >= sampleArticles.length) {
        loadMoreBtn.style.display = 'none';
    }
}// Function to load articles
function loadArticles(page) {
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToLoad = sampleArticles.slice(startIndex, endIndex);
    
    if (articlesToLoad.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    articlesToLoad.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = createArticleCard(article);
        
        // Make sure we have a valid element before proceeding
        if (articleElement.firstElementChild) {
            const cardElement = articleElement.firstElementChild;
            articlesContainer.appendChild(cardElement);
            
            // Add to allArticles array
            allArticles.push(cardElement);
            
            // Observe the article for scroll animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(cardElement);
        }
    });
    
    // Hide load more button if we've loaded all articles
    if (endIndex >= sampleArticles.length) {
        loadMoreBtn.style.display = 'none';
    }
}

    // Initial load
    loadArticles(currentPage);

    // Load more articles on button click
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadArticles(currentPage);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});