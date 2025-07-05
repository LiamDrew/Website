// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    // Change hamburger to X when menu is open
    if (navLinks.classList.contains('active')) {
        menuToggle.innerHTML = '✕';
    } else {
        menuToggle.innerHTML = '☰';
    }
});

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
    }
});

// Smooth scrolling for navigation links (including footer links)
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

// Mobile menu toggle functionality
document.getElementById('menuToggle').addEventListener('click', function () {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// GitHub Repository Data Fetching
async function fetchGitHubRepoData(username, repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) {
            throw new Error('Repository not found or API limit exceeded');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        return null;
    }
}

// Update GitHub card with real data
async function updateGitHubCard(username, repoName) {
    const data = await fetchGitHubRepoData(username, repoName);
    if (data) {
        // Update stars
        const starsElement = document.getElementById('stars');
        if (starsElement) {
            starsElement.textContent = data.stargazers_count || 0;
        }
        
        // Update forks
        const forksElement = document.getElementById('forks');
        if (forksElement) {
            forksElement.textContent = data.forks_count || 0;
        }
        
        // Update description
        const descriptionElement = document.querySelector('.repo-description p');
        if (descriptionElement && data.description) {
            descriptionElement.textContent = data.description;
        }
        
        // Update languages (you might want to fetch this separately)
        // For now, we'll keep the static languages
    }
}

// Initialize GitHub card when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Replace 'yourusername' and 'website' with your actual GitHub username and repository name
    updateGitHubCard('yourusername', 'website');
});