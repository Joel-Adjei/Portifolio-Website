import {
  chatApp2,
  gyasiConstruction,
  heroWeb,
  laundryWeb,
  stsClone,
} from "@/assets/assets";
import projImg from "../assets/project-7.png";

interface Project {
  id: number | string;
  title: string;
  description: string;
  longDescription: string;
  image: any;
  images?: any[];
  videoUrl?: string;
  technologies: string[];
  date: string;
  client: string;
  category: string;
  type: "development" | "design";
  githubUrl?: string;
  liveUrl?: string;
  behanceUrl?: string;
  previewUrl?: string;
}

export const projectDetails: Project[] = [
  {
    id: "staff-platform",
    title: "Staff Portal",
    description:
      "A full-stack Staff Portal solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.",
    longDescription:
      "This comprehensive e-commerce platform showcases modern web development practices with a focus on user experience and scalability. The frontend leverages React with TypeScript for type safety, while the backend uses Node.js with Express for robust API development. The application features real-time updates, secure payment processing through Stripe integration, and a comprehensive admin panel for inventory management.",
    image: projImg,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    githubUrl: "https://github.com/Joel-Adjei/Staff-Portal",
    liveUrl: "https://staff-portal-eight.vercel.app/",
    date: "2024-01-15",
    client: "Personal Project",
    category: "Full Stack Development",
    type: "development",
  },
  {
    id: "sts-portfolio",

    title: "STS Portfolio Website",

    description:
      "A responsive personal portfolio website designed to showcase academic achievements, technical skills, projects, and professional experience through a clean and modern user interface.",

    longDescription:
      "STS Portfolio Website is a modern, responsive personal website developed to establish a strong online presence while highlighting my skills, education, projects, and professional journey. The website features a clean layout, intuitive navigation, and visually engaging sections that effectively communicate my background and technical expertise.\n\nBuilt using HTML5, CSS3, and JavaScript, the project focuses on responsive design, accessibility, and performance. It incorporates custom typography, optimized assets, and reusable design elements to provide a seamless browsing experience across desktop, tablet, and mobile devices.\n\nThis project demonstrates my proficiency in frontend web development fundamentals, responsive UI design, semantic HTML, and modern CSS techniques. It reflects my ability to transform design concepts into polished, user-friendly web experiences while maintaining clean and organized code.",

    image: stsClone.sts_img1,

    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "UI/UX Design",
      "Git",
      "GitHub",
    ],

    date: "2025",

    client: "Personal Project",

    category: "Portfolio Website",

    type: "development",

    githubUrl: "https://github.com/Joel-Adjei/STS-clone",

    liveUrl: "https://sts-clone-ug.netlify.app/",
  },
  {
    id: "gyasi-construction-portfolio",
    title: "Gyasi Construction Portfolio",
    description:
      "A modern construction portfolio website showcasing Gyasi Construction's completed projects, services, and expertise. Built with TypeScript and React for a responsive, interactive client experience.",
    longDescription:
      "This comprehensive construction portfolio platform highlights Gyasi Construction's diverse project portfolio with rich media showcasing, detailed project information, and client testimonials. The application features a responsive design that works seamlessly across all devices, integrated project filtering by category and technology, high-quality image galleries and video demonstrations of completed work, and direct links to live projects and associated repositories. The platform is built with TypeScript ensuring type safety, React for dynamic UI components, and modern styling with Tailwind CSS for a professional appearance.",
    image: gyasiConstruction.gyasi_img1,
    images: [
      gyasiConstruction.gyasi_img1,
      gyasiConstruction.gyasi_img2,
      gyasiConstruction.gyasi_img3,
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
    githubUrl: "https://github.com/Joel-Adjei/Gyasi_Construction_Client",
    liveUrl: "https://gyasiconstruction.netlify.app/",
    date: "2026-05-09",
    client: "Gyasi Construction",
    category: "Web Development",
    type: "development",
  },
  {
    id: "chat2bot",
    title: "Chat2Bot - AI Chat Application",
    description:
      "A modern AI-powered chatbot built with React, TypeScript, and OpenRouter, featuring real-time conversations, Markdown rendering, and a responsive user interface.",

    longDescription:
      "Chat2Bot is a modern web application that enables users to interact seamlessly with AI language models through the OpenRouter API. Built with React, TypeScript, and Vite, the application delivers a fast and responsive chat experience with a clean, intuitive interface.\n\nThe project leverages React Query for efficient API communication, Zustand for lightweight state management, Axios for HTTP requests, and Tailwind CSS for a modern responsive design. It also supports Markdown rendering for AI responses, providing a richer and more readable conversation experience.\n\nThe application was designed with scalability and maintainability in mind, following component-based architecture and modern frontend development best practices. This project demonstrates my ability to integrate third-party APIs, manage application state effectively, and build production-ready React applications using contemporary technologies.",

    image: chatApp2.chat2_img1,
    images: [chatApp2.chat2_img1, chatApp2.chat2_img2],

    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Query",
      "Zustand",
      "Axios",
      "OpenRouter API",
      "React Markdown",
      "Radix UI",
    ],

    date: "July 2025",

    client: "Personal Project",

    category: "Artificial Intelligence",

    type: "development",

    githubUrl: "https://github.com/Joel-Adjei/Chat2bot",

    liveUrl: "https://chat2bot.vercel.app/",
  },
  {
    id: "laundry-management-system",

    title: "Laundry Management System",

    description:
      "A full-stack laundry service management platform that streamlines online bookings, customer management, payment processing, and administrative operations through an intuitive web interface.",

    longDescription:
      "The Laundry Management System is a modern web application developed to simplify the day-to-day operations of a laundry business. Customers can conveniently schedule laundry pickups, submit service requests, and complete payments through a responsive and user-friendly interface.\n\nThe platform also includes a dedicated administrative dashboard where staff can manage bookings, monitor customers, track service requests, and oversee business operations from a centralized location. Built with React and Vite, the application emphasizes performance, maintainability, and scalability while providing a seamless user experience across desktop and mobile devices.\n\nThis project demonstrates my ability to design and develop business-oriented web applications with role-based interfaces, reusable React components, modern frontend architecture, and responsive UI design. It showcases practical problem-solving by digitizing traditional laundry service workflows into an efficient online management system.",

    image: laundryWeb.laundry_img1,
    images: [
      laundryWeb.laundry_img1,
      laundryWeb.laundry_img2,
      laundryWeb.laundry_img3,
    ],

    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "REST API",
      "Responsive Design",
    ],

    date: "2025",

    client: "Academic Project",

    category: "Business Management System",

    type: "development",

    githubUrl: "https://github.com/Joel-Adjei/Laundry-website",

    liveUrl: "https://naemslaundry.vercel.app/",
  },
  {
    id: "hero-sections",

    title: "Hero Sections Collection",

    description:
      "A collection of modern, responsive hero section designs built with React and Tailwind CSS, showcasing clean UI, engaging layouts, and reusable landing page components.",

    longDescription:
      "Hero Sections Collection is a frontend UI project that features a variety of visually appealing hero sections designed for modern websites and landing pages. The project explores different layout styles, typography, call-to-action placements, animations, and branding elements while maintaining responsive behavior across devices.\n\nBuilt with React and Vite, each hero section is developed as a reusable component, making it easy to integrate into future projects or customize for different industries such as SaaS, e-commerce, portfolios, startups, and digital agencies. The project focuses on creating aesthetically pleasing user interfaces while following modern frontend development practices and component-based architecture.\n\nThis project demonstrates my frontend development skills, attention to UI/UX design principles, responsive web design techniques, and ability to build reusable components that enhance user engagement and create impactful first impressions.",

    image: heroWeb.hero_img1,
    images: [
      heroWeb.hero_img1,
      heroWeb.hero_img2,
      heroWeb.hero_img3,
      heroWeb.hero_img4,
    ],

    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "CSS3",
      "Responsive Design",
      "Component-Based Architecture",
    ],

    date: "2025",

    client: "Personal Project",

    category: "UI/UX Design",

    type: "development",

    githubUrl: "https://github.com/Joel-Adjei/Hero-Sections",

    liveUrl: "https://hero-sections-eight.vercel.app/",
  },
];
