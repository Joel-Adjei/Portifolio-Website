import projImg from "../assets/project-7.png";

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: any;
    technologies: string[];
    date: string;
    client: string;
    category: string;
    type: 'development' | 'design';
    githubUrl?: string;
    liveUrl?: string;
    behanceUrl?: string;
    previewUrl?: string;
}


export const projectDetails: Record<string, Project> = {
    "1": {
        id: 1,
        title: "Staff Portal",
        description: "A full-stack Staff Portal solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard.",
        longDescription: "This comprehensive e-commerce platform showcases modern web development practices with a focus on user experience and scalability. The frontend leverages React with TypeScript for type safety, while the backend uses Node.js with Express for robust API development. The application features real-time updates, secure payment processing through Stripe integration, and a comprehensive admin panel for inventory management.",
        image: projImg,
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Stripe"],
        githubUrl: "https://github.com/joeladjei/ecommerce-platform",
        liveUrl: "https://ecommerce-demo.example.com",
        date: "2024-01-15",
        client: "Personal Project",
        category: "Full Stack Development",
        type: "development"
    },
    "6": {
        id: 6,
        title: "Brand Identity Design",
        description: "Complete brand identity package including logo design, color palette, typography, and brand guidelines for a modern tech startup.",
        longDescription: "This comprehensive brand identity project involved creating a cohesive visual language for a technology startup. The process included extensive research, concept development, and iteration to create a memorable and scalable brand system. The final deliverables included logo variations, color palettes, typography guidelines, and a complete brand manual.",
        image: "/placeholder.svg",
        technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
        behanceUrl: "https://behance.net/joeladjei/brand-identity",
        previewUrl: "https://brand-preview.example.com",
        date: "2024-02-20",
        client: "TechStart Inc.",
        category: "Brand Identity & Graphic Design",
        type: "design"
    }
};
