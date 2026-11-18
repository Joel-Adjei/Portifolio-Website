-- Seed the projects that previously lived in src/data/project-details.ts.
-- Run after the migration. Safe to re-run: rows are keyed by fixed UUIDs.
-- Images are served from public/projects/; replace them from the admin panel
-- if you want them stored in Supabase Storage instead.

insert into public.projects
  (id, title, description, long_description, category, type, date, client, image, images, technologies, github_url, live_url, behance_url, preview_url, video_url)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Staff Portal',
    'A full-stack Staff Portal solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.',
    $desc$This comprehensive e-commerce platform showcases modern web development practices with a focus on user experience and scalability. The frontend leverages React with TypeScript for type safety, while the backend uses Node.js with Express for robust API development. The application features real-time updates, secure payment processing through Stripe integration, and a comprehensive admin panel for inventory management.$desc$,
    'Full Stack Development',
    'development',
    '2024-01-15',
    'Personal Project',
    '/projects/staff-portal.png',
    array['/projects/staff-portal.png'],
    array['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    'https://github.com/Joel-Adjei/Staff-Portal',
    'https://staff-portal-eight.vercel.app/',
    null,
    null,
    null
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'STS Portfolio Website',
    'A responsive personal portfolio website designed to showcase academic achievements, technical skills, projects, and professional experience through a clean and modern user interface.',
    $desc$STS Portfolio Website is a modern, responsive personal website developed to establish a strong online presence while highlighting my skills, education, projects, and professional journey. The website features a clean layout, intuitive navigation, and visually engaging sections that effectively communicate my background and technical expertise.

Built using HTML5, CSS3, and JavaScript, the project focuses on responsive design, accessibility, and performance. It incorporates custom typography, optimized assets, and reusable design elements to provide a seamless browsing experience across desktop, tablet, and mobile devices.

This project demonstrates my proficiency in frontend web development fundamentals, responsive UI design, semantic HTML, and modern CSS techniques. It reflects my ability to transform design concepts into polished, user-friendly web experiences while maintaining clean and organized code.$desc$,
    'Portfolio Website',
    'development',
    '2025-01-01',
    'Personal Project',
    '/projects/sts-portfolio.png',
    array['/projects/sts-portfolio.png'],
    array['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX Design', 'Git', 'GitHub'],
    'https://github.com/Joel-Adjei/STS-clone',
    'https://sts-clone-ug.netlify.app/',
    null,
    null,
    null
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Gyasi Construction Portfolio',
    'A modern construction portfolio website showcasing Gyasi Construction''s completed projects, services, and expertise. Built with TypeScript and React for a responsive, interactive client experience.',
    $desc$This comprehensive construction portfolio platform highlights Gyasi Construction's diverse project portfolio with rich media showcasing, detailed project information, and client testimonials. The application features a responsive design that works seamlessly across all devices, integrated project filtering by category and technology, high-quality image galleries and video demonstrations of completed work, and direct links to live projects and associated repositories. The platform is built with TypeScript ensuring type safety, React for dynamic UI components, and modern styling with Tailwind CSS for a professional appearance.$desc$,
    'Web Development',
    'development',
    '2026-05-09',
    'Gyasi Construction',
    '/projects/gyasi-1.png',
    array['/projects/gyasi-1.png', '/projects/gyasi-2.png', '/projects/gyasi-3.png'],
    array['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    'https://github.com/Joel-Adjei/Gyasi_Construction_Client',
    'https://gyasiconstruction.netlify.app/',
    null,
    null,
    null
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Chat2Bot - AI Chat Application',
    'A modern AI-powered chatbot built with React, TypeScript, and OpenRouter, featuring real-time conversations, Markdown rendering, and a responsive user interface.',
    $desc$Chat2Bot is a modern web application that enables users to interact seamlessly with AI language models through the OpenRouter API. Built with React, TypeScript, and Vite, the application delivers a fast and responsive chat experience with a clean, intuitive interface.

The project leverages React Query for efficient API communication, Zustand for lightweight state management, Axios for HTTP requests, and Tailwind CSS for a modern responsive design. It also supports Markdown rendering for AI responses, providing a richer and more readable conversation experience.

The application was designed with scalability and maintainability in mind, following component-based architecture and modern frontend development best practices. This project demonstrates my ability to integrate third-party APIs, manage application state effectively, and build production-ready React applications using contemporary technologies.$desc$,
    'Artificial Intelligence',
    'development',
    '2025-07-01',
    'Personal Project',
    '/projects/chat2bot-1.png',
    array['/projects/chat2bot-1.png', '/projects/chat2bot-2.png'],
    array['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Query', 'Zustand', 'Axios', 'OpenRouter API', 'React Markdown', 'Radix UI'],
    'https://github.com/Joel-Adjei/Chat2bot',
    'https://chat2bot.vercel.app/',
    null,
    null,
    null
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Laundry Management System',
    'A full-stack laundry service management platform that streamlines online bookings, customer management, payment processing, and administrative operations through an intuitive web interface.',
    $desc$The Laundry Management System is a modern web application developed to simplify the day-to-day operations of a laundry business. Customers can conveniently schedule laundry pickups, submit service requests, and complete payments through a responsive and user-friendly interface.

The platform also includes a dedicated administrative dashboard where staff can manage bookings, monitor customers, track service requests, and oversee business operations from a centralized location. Built with React and Vite, the application emphasizes performance, maintainability, and scalability while providing a seamless user experience across desktop and mobile devices.

This project demonstrates my ability to design and develop business-oriented web applications with role-based interfaces, reusable React components, modern frontend architecture, and responsive UI design. It showcases practical problem-solving by digitizing traditional laundry service workflows into an efficient online management system.$desc$,
    'Business Management System',
    'development',
    '2025-01-01',
    'Academic Project',
    '/projects/laundry-1.png',
    array['/projects/laundry-1.png', '/projects/laundry-2.png', '/projects/laundry-3.png'],
    array['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'React Router', 'Axios', 'REST API', 'Responsive Design'],
    'https://github.com/Joel-Adjei/Laundry-website',
    'https://naemslaundry.vercel.app/',
    null,
    null,
    null
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'Hero Sections Collection',
    'A collection of modern, responsive hero section designs built with React and Tailwind CSS, showcasing clean UI, engaging layouts, and reusable landing page components.',
    $desc$Hero Sections Collection is a frontend UI project that features a variety of visually appealing hero sections designed for modern websites and landing pages. The project explores different layout styles, typography, call-to-action placements, animations, and branding elements while maintaining responsive behavior across devices.

Built with React and Vite, each hero section is developed as a reusable component, making it easy to integrate into future projects or customize for different industries such as SaaS, e-commerce, portfolios, startups, and digital agencies. The project focuses on creating aesthetically pleasing user interfaces while following modern frontend development practices and component-based architecture.

This project demonstrates my frontend development skills, attention to UI/UX design principles, responsive web design techniques, and ability to build reusable components that enhance user engagement and create impactful first impressions.$desc$,
    'UI/UX Design',
    'development',
    '2025-01-01',
    'Personal Project',
    '/projects/hero-sections-1.png',
    array['/projects/hero-sections-1.png', '/projects/hero-sections-2.png', '/projects/hero-sections-3.png', '/projects/hero-sections-4.png'],
    array['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'CSS3', 'Responsive Design', 'Component-Based Architecture'],
    'https://github.com/Joel-Adjei/Hero-Sections',
    'https://hero-sections-eight.vercel.app/',
    null,
    null,
    null
  )
on conflict (id) do nothing;
