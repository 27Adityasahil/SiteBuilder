import type { Page } from "@/lib/types/builder"

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  defaultPageId: string;
  pages: Page[];
}

export const templatesData: Template[] = [
  {
    id: "saas-landing",
    name: "SaaS Landing Page",
    description: "A conversion-optimized landing page with a hero section, features grid, and footer.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    defaultPageId: "home",
    pages: [
      {
        id: "home",
        name: "Home",
        path: "/",
        tree: {
          id: "root",
          type: "Page",
          name: "Page",
          props: {
            style: { minHeight: "100vh", backgroundColor: "#ffffff" }
          },
          children: [
            {
              id: "navbar-1",
              type: "Navbar",
              name: "Navbar",
              props: { style: {} },
              children: []
            },
            {
              id: "hero-section",
              type: "Section",
              name: "Hero Section",
              props: {
                style: { padding: "120px 20px", textAlign: "center", backgroundColor: "#f8fafc" }
              },
              children: [
                {
                  id: "hero-h1",
                  type: "Heading",
                  name: "Main Heading",
                  props: {
                    level: "h1",
                    text: "Build Faster, Scale Better",
                    style: { fontSize: "48px", fontWeight: "bold", marginBottom: "20px", color: "#0f172a" }
                  },
                  children: []
                },
                {
                  id: "hero-p",
                  type: "Paragraph",
                  name: "Hero Text",
                  props: {
                    text: "The ultimate tool for modern developers to design, build, and deploy React applications visually.",
                    style: { fontSize: "20px", color: "#64748b", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }
                  },
                  children: []
                },
                {
                  id: "hero-button",
                  type: "Button",
                  name: "CTA Button",
                  props: {
                    text: "Get Started for Free",
                    href: "/register",
                    style: { padding: "16px 32px", fontSize: "18px", backgroundColor: "#3b82f6", color: "white", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }
                  },
                  children: []
                }
              ]
            },
            {
              id: "footer-1",
              type: "Footer",
              name: "Footer",
              props: { style: {} },
              children: []
            }
          ]
        }
      }
    ]
  },
  {
    id: "portfolio-minimal",
    name: "Minimal Portfolio",
    description: "A clean, minimalist portfolio template to showcase your work and case studies.",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    defaultPageId: "home",
    pages: [
      {
        id: "home",
        name: "Home",
        path: "/",
        tree: {
          id: "root",
          type: "Page",
          name: "Page",
          props: {
            style: { minHeight: "100vh", backgroundColor: "#121212", color: "#ffffff" }
          },
          children: [
            {
              id: "port-nav",
              type: "Navbar",
              name: "Navbar",
              props: { style: { backgroundColor: "#121212", borderBottom: "1px solid #333", color: "white" } },
              children: []
            },
            {
              id: "port-hero",
              type: "Section",
              name: "Intro Section",
              props: { style: { padding: "150px 40px", maxWidth: "800px", margin: "0 auto" } },
              children: [
                {
                  id: "port-h1",
                  type: "Heading",
                  name: "Greeting",
                  props: { level: "h1", text: "Hi, I'm Alex.", style: { fontSize: "64px", fontWeight: "bold", marginBottom: "24px" } },
                  children: []
                },
                {
                  id: "port-p",
                  type: "Paragraph",
                  name: "Bio",
                  props: { text: "I'm a product designer and developer based in San Francisco. I craft beautiful digital experiences.", style: { fontSize: "24px", color: "#a1a1aa", lineHeight: "1.5" } },
                  children: []
                }
              ]
            }
          ]
        }
      }
    ]
  }
];
