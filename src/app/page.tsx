'use client';

import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaBrain, FaCode, FaEnvelopeOpenText } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Keyframes for blinking and scaling animation
const blink = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 12px 2px #00ff6a, 0 0 0 2px #1a2b1e;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    box-shadow: 0 0 24px 6px #00ff6a, 0 0 0 2px #1a2b1e;
    transform: scale(0.7);
  }
`;

// Keyframes for animated flowing gradient
const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BG = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Satoshi', 'Inter', sans-serif;
`;

const HeroWrap = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 44px;
  padding: 0 32px;
  @media (max-width: 600px) {
    padding: 0 16px;
    gap: 28px;
  }
`;

const Badge = styled(motion.div)`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  opacity: 0.7;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    font-size: 0.82rem;
    margin-bottom: 4px;
  }
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 12px 0;
  line-height: 1.08;
  letter-spacing: -2px;
  @media (max-width: 600px) {
    font-size: 2.1rem;
    margin-bottom: 8px;
  }
`;

const GradientName = styled.span`
  background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientFlow} 7s ease-in-out infinite;
`;

const Divider = styled.div`
  width: 48px;
  height: 2px;
  background: #222;
  margin: 18px 0 18px 0;
  @media (max-width: 600px) {
    width: 32px;
    margin: 12px 0;
  }
`;

const ContactBlock = styled(motion.div)`
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 8px;
  a { color: #fff; text-decoration: none; border-bottom: 1px solid #222; transition: border 0.2s; }
  a:hover { border-bottom: 1px solid #fff; }
  @media (max-width: 600px) {
    font-size: 0.98rem;
    line-height: 1.5;
  }
`;

const Section = styled.section`
  padding: 120px 0;
  background: #000;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 64px;
  letter-spacing: -1px;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const ProjectCard = styled(motion.a)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
    box-shadow: 0 0 32px 8px rgba(0, 212, 255, 0.4), 0 0 64px 16px rgba(9, 9, 121, 0.3), 0 0 96px 24px rgba(2, 0, 36, 0.2);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1);
    background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 0.1;
  }

  /* Ensure content is above the gradient/glow */
  > * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    border-color: transparent;
    transform: scale(1.045);
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  transition: color 0.2s;
`;

const ProjectDescription = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  /* No transition for instant effect */
  ${ProjectCard}:hover & {
    color: #fff;
  }
`;

const ProjectLink = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #222;
`;

const ExperienceSection = styled(Section)`
  background: #000;
`;

const ExperienceGrid = styled.div`
  display: grid;
  gap: 48px;
  margin-top: 48px;
`;

const ExperienceCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  padding: 32px;
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #fff;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CompanyName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #999;
  margin: 0;
`;

const Role = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const Duration = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 4px;
`;

const ExperienceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Description = styled.p`
  color: #999;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TechTag = styled.span`
  background: #222;
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const SkillsSection = styled(Section)`
  background: #000;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const SkillCategory = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #fff;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const TechChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TechChip = styled(motion.span)`
  background: #222;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #333;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(151deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(0, 212, 255, 1) 100%);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 0 32px 8px rgba(0, 212, 255, 0.4), 0 0 64px 16px rgba(9, 9, 121, 0.3), 0 0 96px 24px rgba(2, 0, 36, 0.2);
  }
`;

const ContactCardSection = styled(Section)`
  background: #000;
  padding: 80px 0;
  @media (max-width: 700px) {
    padding: 36px 0;
  }
`;

const ContactCard = styled(motion.div)`
  background: #111;
  border: 1.5px solid #222;
  border-radius: 28px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 2px 32px 0 rgba(0,0,0,0.10);
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
  @media (max-width: 700px) {
    border-radius: 18px;
  }
`;

const ContactLeft = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px 48px;
  @media (max-width: 900px) {
    padding: 48px 32px;
  }
  @media (max-width: 700px) {
    padding: 28px 14px;
  }
`;

const ContactHand = styled.div`
  font-size: 2.2rem;
  margin-bottom: 18px;
`;

const ContactHeading = styled.h2`
  font-size: 2.6rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 18px 0;
  line-height: 1.15;
`;

const ContactSub = styled.p`
  color: #bbb;
  font-size: 1.25rem;
  margin: 0 0 36px 0;
  line-height: 1.6;
`;

const ContactActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
`;

const ContactBtn = styled(motion.a)`
  background: #111;
  color: #fff;
  border: 1.5px solid #fff;
  border-radius: 14px;
  padding: 16px 36px;
  font-size: 1.15rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #000;
  }
`;

const ContactRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  min-height: 320px;
  @media (max-width: 900px) {
    min-height: 180px;
    padding: 32px 0;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BigIcon = styled(FaEnvelopeOpenText)`
  font-size: 13vw;
  min-font-size: 180px;
  color: #fff;
  opacity: 0.85;
  transform: rotate(-18deg);
  filter: drop-shadow(0 2px 16px #000);
  @media (max-width: 900px) {
    font-size: 32vw;
  }
`;

// ...existing code...

// Add styled component for the green glowing dot and status
const StatusWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  @media (max-width: 600px) {
    gap: 8px;
    margin-top: 6px;
  }
`;

const GreenDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #00ff6a;
  box-shadow: 0 0 12px 2px #00ff6a, 0 0 0 2px #1a2b1e;
  display: inline-block;
  animation: ${blink} 1.6s infinite cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, box-shadow, transform;
`;

const StatusText = styled.span`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

const GradientTitle = styled.span`
  background: linear-gradient(90deg, #4f8cff, #a259ff, #ff6a88, #ff99ac);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
const CertificationsSection = styled(Section)`
  background: #000;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const CertificationCard = styled(motion.div)`
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border 0.2s;
  &:hover {
    border: 1px solid #fff;
  }
`;

const CertificationTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
`;

const CertificationOrg = styled.span`
  color: #a259ff;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const CertificationDate = styled.span`
  color: #999;
  font-size: 0.95rem;
  margin-bottom: 8px;
`;

const CertificationLink = styled.a`
  color: #4f8cff;
  font-size: 0.95rem;
  text-decoration: underline;
  margin-top: 8px;
  &:hover {
    color: #a259ff;
  }
`;


export default function Home() {
  const badgeTitles = [    
    'Full Stack Developer',
    'Building AI-Powered Products',
    'Python (Flask/Django) | React | AWS & CI/CD',
  ];
  const [badgeIdx, setBadgeIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Experience points as arrays for bullet points and line breaks
  const experiencePointsAccenture = [
    "Developed scalable backend RESTful APIs using Python and C#, accelerating feature delivery by 25%.",
    "Designed and implemented CI/CD pipelines using Jenkins and GitHub Actions to automate testing and deployment workflows for web applications.",
    "Deployed containerized microservices on Azure using Docker, improving application portability and managing infrastructure-as-code.",
    "Built automation tools and engineering dashboards in React and CSS3, reducing manual workload by 20%.",
    "Wrote comprehensive unit and integration tests, achieving 85% test coverage for critical components.",
    "Implemented security best practices for web applications, including input validation and authentication/authorization mechanisms.",
    "Collaborated in an Agile team using Git for version control, participating in code reviews to maintain high standards of code quality.",
    "Troubleshot and optimized legacy code, improving website performance and reducing bug rates by 30%."
  ];

  const certifications = [
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn Learning Path",
    org: "Microsoft",
    date: "Issued Sep 2025",
    link: "https://www.linkedin.com/learning/certificates/1162ab7db5fce3e725c526de3701dd4a154c813dd1607299ce9752a85b0a8629?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B9rVCQlzCSOCJHBsJM9Nn1A%3D%3D",
  },
  {
    title: "Cisco CCNA (200-301) Cert Prep: 1 Network Fundamentals and Access",
    org: "LinkedIn",
    date: "Issued Sep 2025",
    link: "https://www.linkedin.com/learning/certificates/3d7c986027a3d234976610648a8026c1bf27d083021bd78f98f3091fc4044742?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B9rVCQlzCSOCJHBsJM9Nn1A%3D%3D",
  },
  {
    title: "SQL (Advanced)",
    org: "HackerRank",
    date: "Issued Aug 2025",
    link: "https://www.hackerrank.com/certificates/3964177b2cb9",
  },
  {
    title: "Walmart Advanced Software Engineering Virtual Experience Program",
    org: "Forage",
    date: "Issued Aug 2025",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_GPMvFoGKZtbXnPs8s_1755313314144_completion_certificate.pdf",
  },
  {
    title: "Technical Interview Preparation",
    org: "CodePath",
    date: "Issued May 2025",
    link: "https://github.com/ptotakura2023/CodePath_Certificate.git",
  },
  {
    title: "Python Programming",
    org: "HackerRank",
    date: "Issued Jul 2021",
    link: "https://www.hackerrank.com/certificates/c0bd2a4b49b0",
  },
  {
    title: "Problem Solving",
    org: "HackerRank",
    date: "Issued Jul 2021",
    link: "https://www.hackerrank.com/certificates/55a173b62f25",
  },
];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(() => {
        setBadgeIdx((prev) => (prev + 1) % badgeTitles.length);
      }, 2200);
      return () => clearInterval(interval);
    }
  }, [isMounted, badgeTitles.length]);

  return (
    <>
      <BG>
        <HeroWrap>
          <AnimatePresence mode="wait">
            <Badge
              key={badgeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {isMounted ? badgeTitles[badgeIdx] : badgeTitles[0]}
            </Badge>
          </AnimatePresence>
          <Name
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
          >
            <GradientName>Pranay Babu Totakura</GradientName>
          </Name>
          <Divider />
          <ContactBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            Austin, TX, United States<br />
            <a href="mailto:pranay.thotakura@gmail.com">pranay.thotakura@gmail.com</a> &nbsp;<br />
            <a href="https://www.linkedin.com/in/pranay-babu-totakura" target="_blank" rel="noopener noreferrer">linkedin.com/in/pranay-babu-totakura</a> &nbsp;|&nbsp; <a href="https://github.com/ptotakura2023" target="_blank" rel="noopener noreferrer">https://github.com/ptotakura2023</a>
          </ContactBlock>
          <StatusWrap>
            <GreenDot />
            <StatusText>Available for work</StatusText>
          </StatusWrap>
        </HeroWrap>
      </BG>
      
      <Section>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Latest Work</GradientTitle>
          </SectionTitle>
          
          <ProjectGrid>
            <ProjectCard
              href="https://github.com/ptotakura2023/distributed-ingestion-system"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>Distributed-ingestion-system</ProjectTitle>
              <ProjectDescription>
                An end-to-end data pipeline using Python, Flask, and AWS S3 to manage high-volume, concurrent file uploads. Containerized with Docker and monitored with Prometheus, this system improved data ingestion reliability by 80%.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>



            <ProjectCard
              href="https://github.com/ptotakura2023/Pranay_Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>Professional Portfolio Website</ProjectTitle>
              <ProjectDescription>
                A high-performance personal portfolio built with Next.js, React, and Framer Motion. By leveraging static site generation and reusable UI components, this application achieved a 98+ Google Lighthouse score and ensured millisecond load times with 100% uptime.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>


            <ProjectCard
              href="https://github.com/ptotakura2023/COT_6930_GenAI_project"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <ProjectTitle>StudyPal: A GenAI-Powered StudyBot</ProjectTitle>
              <ProjectDescription>
                A generative AI study assistant for Discord built with Python, LangChain, and OpenAI GPT-4. By engineering a memory-aware routing system, this bot resolved over 1,200 academic queries with more than 90% accuracy and boosted student productivity by 35%.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>


            <ProjectCard
              href="https://github.com/ptotakura2023/portfolio-analytics-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ProjectTitle>portfolio-analytics-dashboard</ProjectTitle>
              <ProjectDescription>
                A full-stack analytics platform using React, Node.js, and Python to visualize real-time user engagement. Containerized with Docker, this tool increased data insight granularity by 65% and boosted user engagement by 60%.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>

            <ProjectCard
              href="https://github.com/ptotakura2023/AI-Content-Optimizer-cms"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>AI Content Optimizer-CMS</ProjectTitle>
              <ProjectDescription>
                A full-stack AI content optimizer built with React, TypeScript, Node.js, and the Google Gemini API. By engineering automated SEO asset generation and robust CI/CD pipelines, this solution reduced manual editorial workloads by over 40% and cut deployment times by 95%.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>

            <ProjectCard
              href="https://github.com/ptotakura2023/Closest-Pair-Algorithm-Analysis"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>Algorithmic Performance Analysis: Closest Pair of Points</ProjectTitle>
              <ProjectDescription>
                A computational geometry performance analysis built with Python to solve the Closest Pair of Points problem. By benchmarking a divide-and-conquer strategy (O(n log n)) against brute force, this project validated theoretical efficiency and demonstrated superior scalability across datasets exceeding 50,000 points.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>


            <ProjectCard
              href="https://github.com/CEN5035-Fall2023-SE/cen5035-se-final-project-se-final-project-group10"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ProjectTitle>TA Hub: TA Management Portal at North University&apos;s Computer Science Department</ProjectTitle>
              <ProjectDescription>
                An award-winning TA management portal architected with Java, Spring Boot, and React.js. By automating the entire lifecycle across four role-based portals, this solution reduced administrative workload by 60% and accelerated the assignment process by over 75%.
              </ProjectDescription>
              <ProjectLink>
                View Project <FaArrowRight />
              </ProjectLink>
            </ProjectCard>

            
          </ProjectGrid>
        </Container>
      </Section>

      <ExperienceSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Work Experience</GradientTitle>
          </SectionTitle>
          
          <ExperienceGrid>
            <ExperienceCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <ExperienceHeader>
                <CompanyName>Accenture</CompanyName>
                <Role>Software Engineer - FullStack & Devops</Role>
                <Duration>Jul 2022 - Jul 2023</Duration>
              </ExperienceHeader>
              <ExperienceContent>
                <Description as="ul">
                  {experiencePointsAccenture.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: 8, lineHeight: 1.7 }}>
                      {point}
                    </li>
                  ))}
                </Description>
                <TechStack>
                  <TechTag>Python</TechTag>
                  <TechTag>C#</TechTag>
                  <TechTag>React</TechTag>
                  <TechTag>REST APIs</TechTag>
                  <TechTag>CI/CD</TechTag>
                  <TechTag>Jenkins</TechTag>
                  <TechTag>Docker</TechTag>
                  <TechTag>Microsoft Azure</TechTag>
                  <TechTag>Git</TechTag>
                  <TechTag>Agile</TechTag>
                </TechStack>
              </ExperienceContent>
            </ExperienceCard>
          </ExperienceGrid>
        </Container>
      </ExperienceSection>

      <SkillsSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientTitle>Skills & Technologies</GradientTitle>
          </SectionTitle>
          
          <SkillsGrid>
            <SkillCategory
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <CategoryHeader>
                <CategoryIcon><FaBrain /></CategoryIcon>
                <CategoryTitle>Core Skills</CategoryTitle>
              </CategoryHeader>
              <TechChips>
                <TechChip>Full-Stack Development</TechChip>
                <TechChip>Data Engineering & Pipelines</TechChip>
                <TechChip>Cloud & DevOps (AWS/Azure)</TechChip>
                <TechChip>Distributed Systems</TechChip>
                <TechChip>System Design & Architecture</TechChip>
                <TechChip>Deep Learning</TechChip>
                <TechChip>Data Analysis</TechChip>
                <TechChip>Generative AI</TechChip>
                <TechChip>Machine Learning</TechChip>
                <TechChip>RAG (Retrieval-Augmented Generation)</TechChip>
                <TechChip>Prompt Engineering</TechChip>
                <TechChip>Agentic AI</TechChip>
                <TechChip>Software Development Lifecycle</TechChip>
                <TechChip>Agile Methodologies</TechChip>
                <TechChip>Collaboration & Teamwork</TechChip>
                <TechChip>Open Source Contributions</TechChip>

                
              </TechChips>
            </SkillCategory>

            <SkillCategory
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CategoryHeader>
                <CategoryIcon><FaCode /></CategoryIcon>
                <CategoryTitle>Technologies</CategoryTitle>
              </CategoryHeader>
              <TechChips>
              <TechChip>Python</TechChip>
              <TechChip>Java</TechChip>
              <TechChip>JavaScript</TechChip>
              <TechChip>TypeScript</TechChip>
              <TechChip>React</TechChip>
              <TechChip>Node.js</TechChip>
              <TechChip>Flask</TechChip>
              <TechChip>REST API</TechChip>
              <TechChip>SQL</TechChip>
              <TechChip>NoSQL</TechChip>
              <TechChip>PostgreSQL</TechChip>
              <TechChip>MongoDB</TechChip>
              <TechChip>AWS</TechChip>
              <TechChip>Azure</TechChip>
              <TechChip>GCP</TechChip>
              <TechChip>Docker</TechChip>
              <TechChip>CI/CD</TechChip>
              <TechChip>Git</TechChip>
              <TechChip>Terraform</TechChip>
              <TechChip>Prometheus</TechChip>
              <TechChip>Grafana</TechChip>
              <TechChip>Jenkins</TechChip>
              <TechChip>GitHub Actions</TechChip>
              <TechChip>Agile</TechChip>
              <TechChip>Microservices</TechChip>
              <TechChip>GraphQL</TechChip>
              <TechChip>Generative AI</TechChip>
              <TechChip>LLM</TechChip>
              <TechChip>LangChain</TechChip>
              <TechChip>OpenAI</TechChip>
              <TechChip>PyTorch</TechChip>
              <TechChip>TensorFlow</TechChip>
              <TechChip>NumPy</TechChip>  
              <TechChip>Pandas</TechChip>
              <TechChip>Scikit-learn</TechChip>
              </TechChips>
            </SkillCategory>
          </SkillsGrid>
        </Container>
      </SkillsSection>


  <CertificationsSection>
  <Container>
    <SectionTitle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GradientTitle>Certifications</GradientTitle>
    </SectionTitle>
    <CertificationsGrid>
      {certifications.map((cert, idx) => (
        <CertificationCard
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 * idx }}
        >
          <CertificationTitle>{cert.title}</CertificationTitle>
          <CertificationOrg>{cert.org}</CertificationOrg>
          <CertificationDate>{cert.date}</CertificationDate>
          <CertificationLink href={cert.link} target="_blank" rel="noopener noreferrer">
            View Credential
          </CertificationLink>
        </CertificationCard>
      ))}
    </CertificationsGrid>
  </Container>
</CertificationsSection>



      <ContactCardSection>
        <ContactCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ContactLeft>
            <ContactHand>👋</ContactHand>
            <ContactHeading>Let&apos;s Work Together?</ContactHeading>
            <ContactSub>
              You&apos;re just one step away from your next great teammate. I&apos;m open to work and eager to get started!
            </ContactSub>
            <ContactActions>
              <ContactBtn
                href="mailto:pranay.thotakura@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </ContactBtn>
            </ContactActions>
          </ContactLeft>
          <ContactRight>
            <BigIcon />
          </ContactRight>
        </ContactCard>
      </ContactCardSection>
    </>
  );
}
