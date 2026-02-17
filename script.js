document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const daySchedules = document.querySelectorAll('.day-schedule');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and schedules
            tabBtns.forEach(b => b.classList.remove('active'));
            daySchedules.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding schedule
            const dayId = btn.getAttribute('data-day');
            const targetSchedule = document.getElementById(dayId);
            if (targetSchedule) {
                targetSchedule.classList.add('active');
            }
        });
    });

    // Sticky Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth scrolling for anchor links (if not supported by CSS natively in all browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80; // height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Registration Form Logic
    window.checkOtherStatus = function (select) {
        const otherInput = document.getElementById('statusOther');
        if (select.value === 'Other') {
            otherInput.style.display = 'block';
            otherInput.required = true;
        } else {
            otherInput.style.display = 'none';
            otherInput.required = false;
            otherInput.value = '';
        }
    };

    window.toggleThesis = function (show) {
        const thesisDetails = document.getElementById('thesis-details');

        if (show) {
            thesisDetails.style.display = 'block';
            document.getElementById('thesisTitle').required = true;
            document.getElementById('thesisAbstract').required = true;
        } else {
            thesisDetails.style.display = 'none';
            document.getElementById('thesisTitle').required = false;
            document.getElementById('thesisAbstract').required = false;
        }
    };

    // Form Submission using EmailJS
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = document.getElementById('submit-btn');
            const message = document.getElementById('form-message');

            // Basic validation for checkbox groups if needed
            const daysChecked = document.querySelectorAll('input[name="days"]:checked').length;
            if (daysChecked === 0) {
                alert('Please select at least one day of attendance.');
                return;
            }

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // IMPORTANT: You must setup EmailJS (https://www.emailjs.com/)
            // 1. Create an account
            // 2. Create a service (e.g., Gmail) -> Get Service ID
            // 3. Create an email template -> Get Template ID
            //     Template should map parameters like {{fullName}}, {{email}}, {{status}}, etc.
            // 4. Get Public Key from Account > General

            // Replace these placeholders with your actual EmailJS credentials
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            // Send the form
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.textContent = 'Registration Submitted!';
                    btn.style.backgroundColor = '#10B981'; // Success Green
                    btn.style.borderColor = '#10B981';
                    message.style.display = 'block';
                    message.style.color = '#10B981';
                    message.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your registration has been sent successfully.';
                    registrationForm.reset();
                    // Reset hidden sections
                    document.getElementById('thesis-details').style.display = 'none';
                    document.getElementById('statusOther').style.display = 'none';
                }, (err) => {
                    btn.textContent = 'Submit Registration';
                    btn.disabled = false;
                    message.style.display = 'block';
                    message.style.color = '#EF4444'; // Error Red
                    message.textContent = 'Failed to send. Please check the EmailJS configuration (Service ID/Template ID).';
                    console.error('EmailJS Error:', err);
                    alert('Error: ' + JSON.stringify(err));
                });
        });
    }

});
