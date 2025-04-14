import { generateHTML } from "../../utils/htmlTemplate";
import { getDeployStyles } from "../../utils/deployStyles";
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const data = req.body;
    const vercelToken = process.env.VERCEL_TOKEN;
    
    if (!vercelToken) {
      throw new Error("VERCEL_TOKEN environment variable is not set");
    }

    const projectName = "launchify"; // Use a fixed project name

    // Create Next.js project structure
    const files = [
      {
        file: "package.json",
        data: Buffer.from(JSON.stringify({
          name: projectName,
          version: "0.1.0",
          private: true,
          scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start"
          },
          dependencies: {
            next: "^14.0.0",
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            "framer-motion": "^10.16.4",
            "react-icons": "^4.11.0",
            "lucide-react": "^0.294.0",
            "tailwindcss": "^3.0.0",
            "autoprefixer": "^10.0.0",
            "postcss": "^8.0.0"
          }
        })).toString("base64"),
        encoding: "base64"
      },
      {
        file: "pages/_app.js",
        data: Buffer.from(`
          import '../styles/globals.css';
          
          export default function App({ Component, pageProps }) {
            return <Component {...pageProps} />;
          }
        `).toString("base64"),
        encoding: "base64"
      },
      {
        file: "pages/index.js",
        data: Buffer.from(`
          import Head from 'next/head';
          import LandingPage from '../components/landing/LandingPage';
          
          export default function Home({ title, description, theme, features, logo, socialLinks, ctaText, ctaLink }) {
            return (
              <>
                <Head>
                  <title>{title}</title>
                  <meta name="description" content={description} />
                  <link rel="icon" href="/favicon.ico" />
                  <style dangerouslySetInnerHTML={{ __html: \`${getDeployStyles(data.theme)}\` }} />
                </Head>
                <LandingPage 
                  form={{
                    title,
                    description,
                    features,
                    theme,
                    logo,
                    ctaText,
                    ctaLink,
                    twitter: socialLinks.twitter,
                    linkedin: socialLinks.linkedin,
                    github: socialLinks.github
                  }}
                />
              </>
            );
          }

          export async function getStaticProps() {
            return {
              props: {
                title: '${data.title.replace(/'/g, "\\'")}',
                description: '${data.description.replace(/'/g, "\\'")}',
                theme: '${data.theme}',
                features: ${JSON.stringify(data.features)},
                logo: '${data.logo?.replace(/'/g, "\\'") || ''}',
                ctaText: '${data.ctaText?.replace(/'/g, "\\'") || ''}',
                ctaLink: '${data.ctaLink?.replace(/'/g, "\\'") || ''}',
                socialLinks: {
                  twitter: '${data.socialLinks?.twitter?.replace(/'/g, "\\'") || ''}',
                  linkedin: '${data.socialLinks?.linkedin?.replace(/'/g, "\\'") || ''}',
                  github: '${data.socialLinks?.github?.replace(/'/g, "\\'") || ''}'
                }
              }
            };
          }
        `).toString("base64"),
        encoding: "base64"
      },
      {
        file: "next.config.js",
        data: Buffer.from(`
          /** @type {import('next').NextConfig} */
          const nextConfig = {
            reactStrictMode: true,
            swcMinify: true
          }
          
          module.exports = nextConfig
        `).toString("base64"),
        encoding: "base64"
      },
      {
        file: "tailwind.config.js",
        data: Buffer.from(`
          module.exports = {
            content: [
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./components/**/*.{js,ts,jsx,tsx}",
              "./lib/**/*.{js,ts}",
            ],
            darkMode: 'class',
            theme: {
              extend: {
                fontFamily: {
                  inter: ['"Inter"', "sans-serif"],
                  mono: ['"JetBrains Mono"', "monospace"],
                  lobster: ['"Lobster"', "cursive"],
                },
              },
            },
            plugins: [],
          };
        `).toString("base64"),
        encoding: "base64"
      },
      {
        file: "postcss.config.js",
        data: Buffer.from(`
          module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
        `).toString("base64"),
        encoding: "base64"
      },
      {
        file: "styles/globals.css",
        data: Buffer.from(`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
        `).toString("base64"),
        encoding: "base64"
      }
    ];

    // Add component files from the preview directory
    const componentsDir = path.join(process.cwd(), 'components', 'landing');
    console.log('Components directory:', componentsDir);
    
    if (!fs.existsSync(componentsDir)) {
      throw new Error(`Components directory not found: ${componentsDir}`);
    }

    const componentFiles = fs.readdirSync(componentsDir);
    console.log('Component files:', componentFiles);
    
    // Add the index.js file first
    files.push({
      file: "components/landing/index.js",
      data: Buffer.from(`
        import Header from '../Header';
        import Hero from './Hero';
        import Features from './Features';
        import Footer from './Footer';
        
        export { Header, Hero, Features, Footer };
      `).toString("base64"),
      encoding: "base64"
    });
    
    for (const file of componentFiles) {
      if (file.endsWith('.js')) {
        const filePath = path.join(componentsDir, file);
        console.log('Reading file:', filePath);
        
        if (!fs.existsSync(filePath)) {
          console.warn(`File not found: ${filePath}`);
          continue;
        }
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          files.push({
            file: `components/landing/${file}`,
            data: Buffer.from(content).toString("base64"),
            encoding: "base64"
          });
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          continue;
        }
      }
    }

    // Add root components
    const rootComponentsDir = path.join(process.cwd(), 'components');
    console.log('Root components directory:', rootComponentsDir);
    
    if (!fs.existsSync(rootComponentsDir)) {
      throw new Error(`Root components directory not found: ${rootComponentsDir}`);
    }

    const rootComponentFiles = fs.readdirSync(rootComponentsDir);
    console.log('Root component files:', rootComponentFiles);
    
    for (const file of rootComponentFiles) {
      if (file.endsWith('.js') && file !== 'index.js') {
        const filePath = path.join(rootComponentsDir, file);
        console.log('Reading file:', filePath);
        
        if (!fs.existsSync(filePath)) {
          console.warn(`File not found: ${filePath}`);
          continue;
        }
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          files.push({
            file: `components/${file}`,
            data: Buffer.from(content).toString("base64"),
            encoding: "base64"
          });
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          continue;
        }
      }
    }

    // Add utils files
    const utilsDir = path.join(process.cwd(), 'utils');
    console.log('Utils directory:', utilsDir);
    
    if (!fs.existsSync(utilsDir)) {
      throw new Error(`Utils directory not found: ${utilsDir}`);
    }

    const utilsFiles = fs.readdirSync(utilsDir);
    console.log('Utils files:', utilsFiles);
    
    for (const file of utilsFiles) {
      if (file.endsWith('.js')) {
        const filePath = path.join(utilsDir, file);
        console.log('Reading file:', filePath);
        
        if (!fs.existsSync(filePath)) {
          console.warn(`File not found: ${filePath}`);
          continue;
        }
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          files.push({
            file: `utils/${file}`,
            data: Buffer.from(content).toString("base64"),
            encoding: "base64"
          });
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          continue;
        }
      }
    }

    // First, check if project exists
    console.log("Checking if project exists...");
    const projectCheckResponse = await fetch(`https://api.vercel.com/v9/projects/${projectName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
    });

    let projectJson;
    if (projectCheckResponse.status === 404) {
      // Project doesn't exist, create it
      console.log("Project not found, creating...");
      const projectResponse = await fetch("https://api.vercel.com/v9/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${vercelToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          framework: "nextjs",
          gitRepository: {
            type: "github",
            repo: "launchify",
            owner: "launchify"
          }
        }),
      });

      projectJson = await projectResponse.json();
      console.log("Project creation response:", projectJson);

      if (!projectResponse.ok) {
        throw new Error(projectJson.error?.message || "Failed to create project");
      }
    } else {
      // Project exists, get its details
      projectJson = await projectCheckResponse.json();
      console.log("Project exists:", projectJson);
    }

    // Then, create the deployment
    console.log("Creating deployment...");
    const deployResponse = await fetch(`https://api.vercel.com/v13/deployments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        files,
        target: "production",
        project: projectName,
        projectSettings: {
          framework: "nextjs",
          buildCommand: "npm run build",
          outputDirectory: ".next",
          installCommand: "npm install",
          rootDirectory: null
        }
      }),
    });

    const deployJson = await deployResponse.json();
    console.log("Deployment response:", deployJson);

    if (!deployResponse.ok) {
      throw new Error(deployJson.error?.message || "Deployment failed");
    }

    if (!deployJson.url) {
      throw new Error("Deployment URL not found in response");
    }

    return res.status(200).json({ url: `https://${deployJson.url}` });
  } catch (error) {
    console.error("Deployment Error:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to deploy",
      details: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}
