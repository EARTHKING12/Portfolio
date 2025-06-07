const express = require('express');
const router = express.Router();

// Personal data from resume
const personalData = {
    name: "Pruthviraj Rathod",
    title: "Software Developer",
    phone: "9822569318",
    email: "pruthvirajrathod645@gmail.com",
    profile: "Motivated and hardworking BE student with a strong foundation in programming and a passion for software development. Skilled in problem-solving, data structures, and algorithms. Seeking a Software Developer role to contribute to innovative software solutions.",
    skills: {
        programming: ["Java", "Python", "C", "C++"],
        other: ["Effective Communication", "Teamwork", "Good Thinking", "Problem Solving", "Digital Marketing"]
    },
    education: [
        {
            degree: "BE (Computer Engineering)",
            institution: "Shree Chanakya Education Society's Indira College of Engineering and Management, Pune",
            percentage: ""
        },
        {
            degree: "Diploma (Computer Technology)",
            institution: "Government Polytechnic, Beed",
            percentage: "82.46%"
        },
        {
            degree: "SSC",
            institution: "New English School, Doddi",
            percentage: "84.40%"
        }
    ],
    experience: [
        {
            position: "Java Programming Intern - CODE ALPHA (May 2025 – June 2025)",
            responsibilities: [
                "Gained hands-on experience in Java programming and backend development, contributing to real-world projects.",
                "Collaborated with senior developers to implement innovative solutions using cutting-edge technologies in a dynamic environment at CODE ALPHA."
            ]
        },
        {
            position: "Internship – Amb\'s Corp Pvt. Ltd. (1 month)",
            responsibilities: [
                "Gained experience in Python programming and IoT.",
                "Developed basic projects using Python, improving data-driven application skills."
            ]
        }
    ],
    projects: [
        {
            title: "Desktop Assistant",
            description: "Developed a Python-based virtual assistant for task automation using voice commands.",
            category: "other",
            technologies: ["Python", "Speech Recognition", "AI"],
            image: "/images/desktop-assistant.jpg",
            github: "https://github.com/pruthvirajr/desktop-assistant",
            demo: ""
        }
    ]
};

router.get('/', (req, res) => {
    res.render('index', { page: 'about', data: personalData });
});

router.get('/about', (req, res) => {
    res.render('index', { page: 'about', data: personalData });
});

router.get('/resume', (req, res) => {
    res.render('index', { page: 'resume', data: personalData });
});

router.get('/projects', (req, res) => {
    res.render('index', { page: 'projects', data: personalData });
});

router.get('/contact', (req, res) => {
    res.render('index', { page: 'contact', data: personalData });
});

module.exports = router;
