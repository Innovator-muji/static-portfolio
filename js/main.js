document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Active link highlighting on scroll
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Handle Contact Form Submission (Static mailto)
    const contactForm = document.getElementById('static-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Build the mailto link with the correct email
            const mailtoLink = `mailto:parveshdevops19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\n\nMessage:\n" + message)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
        });
    }

    // Reveal Phone Number Logic
    const phoneBtn = document.getElementById('reveal-phone-btn');
    const phoneText = document.getElementById('phone-text');
    
    if (phoneBtn && phoneText) {
        phoneBtn.addEventListener('click', (e) => {
            if (phoneBtn.getAttribute('href') === 'javascript:void(0)') {
                e.preventDefault(); // Prevent default link behavior on first click
                phoneText.textContent = '+91-9952513323';
                phoneBtn.setAttribute('href', 'tel:+919952513323');
                
                // Add a quick pop animation
                phoneBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    phoneBtn.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }

    // Blog Modal Logic
    const blogData = {
        k8s: {
            title: "Zero-Downtime Deployments in Kubernetes",
            date: "Jan 20, 2025",
            content: `
                <p>In the modern DevOps era, users expect services to be available 24/7. Even during updates, we cannot afford downtime. Kubernetes provides built-in mechanisms like <strong>Rolling Updates</strong> to handle this effortlessly.</p>
                <h2>1. Rolling Updates</h2>
                <p>By default, Kubernetes updates deployments by spinning up new Pods and gradually terminating old ones. This ensures that at least some percentage of your application is always serving traffic.</p>
                <h2>2. Health Probes</h2>
                <p>To truly achieve zero-downtime, you must use <strong>Liveness</strong> and <strong>Readiness</strong> probes. Readiness probes tell Kubernetes when a Pod is actually ready to receive traffic, preventing requests from hitting a starting application.</p>
                <h2>3. Termination Grace Period</h2>
                <p>Setting a proper <code>terminationGracePeriodSeconds</code> allows your application to finish processing active requests before the Pod is killed, ensuring a smooth handoff.</p>
            `
        },
        terraform: {
            title: "Terraform Best Practices for Scale",
            date: "Jan 12, 2025",
            content: `
                <p>Infrastructure as Code (IaC) is the foundation of DevOps. As your environment grows, your Terraform code must be structured for maintainability and collaboration.</p>
                <h2>1. Use Modules</h2>
                <p>Don't repeat yourself. Wrap common patterns (like VPCs or ECS clusters) into reusable modules. This ensures consistency across dev, staging, and production environments.</p>
                <h2>2. Remote State Management</h2>
                <p>Always store your state file in a remote backend like <strong>S3 with DynamoDB locking</strong>. This prevents state corruption when multiple engineers are running Terraform simultaneously.</p>
                <h2>3. Terraform Workspaces</h2>
                <p>Leverage workspaces or separate state files for different environments to isolate changes and reduce the "blast radius" of a potential misconfiguration.</p>
            `
        },
        security: {
            title: "AWS Security: Hardening your VPC",
            date: "Dec 28, 2024",
            content: `
                <p>Security is not an afterthought; it's a core DevOps pillar (DevSecOps). Protecting your cloud infrastructure starts with a "Defense in Depth" strategy.</p>
                <h2>1. IAM Least Privilege</h2>
                <p>Only grant the permissions necessary for a task. Use IAM roles for EC2 instances and Lambda functions instead of long-lived access keys.</p>
                <h2>2. Network Isolation</h2>
                <p>Keep your databases and application servers in <strong>Private Subnets</strong>. Use NAT Gateways for outbound internet access and strictly control inbound traffic via Security Groups and NACLs.</p>
                <h2>3. Encryption Everywhere</h2>
                <p>Enable encryption at rest for S3 buckets and EBS volumes using AWS KMS. Ensure all data in transit is protected via TLS/SSL.</p>
            `
        },
        monitoring: {
            title: "Full-Stack Observability with Prometheus",
            date: "Dec 15, 2024",
            content: `
                <p>You cannot improve what you cannot measure. Observability goes beyond simple monitoring—it's about understanding the internal state of your system.</p>
                <h2>1. The Gold Standard: Prometheus</h2>
                <p>Prometheus has become the industry standard for metrics collection. Its pull-based model and powerful PromQL query language allow for deep insights into your infrastructure.</p>
                <h2>2. Visualization with Grafana</h2>
                <p>Connect Prometheus to Grafana to build high-level dashboards. A good dashboard should highlight "The Four Golden Signals": Latency, Traffic, Errors, and Saturation.</p>
                <h2>3. Proactive Alerting</h2>
                <p>Use Alertmanager to send critical alerts to Slack or PagerDuty. The goal is to catch issues (like high CPU or memory leaks) before your customers notice them.</p>
            `
        }
    };

    const blogModal = document.getElementById('blogModal');
    const blogCards = document.querySelectorAll('.blog-card');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalBody = document.getElementById('modalBody');

    if (blogCards.length > 0) {
        blogCards.forEach(card => {
            card.addEventListener('click', () => {
                const blogKey = card.getAttribute('data-blog');
                const data = blogData[blogKey];
                
                if (data) {
                    modalTitle.textContent = data.title;
                    modalDate.textContent = data.date;
                    modalBody.innerHTML = data.content;
                    blogModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            blogModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
