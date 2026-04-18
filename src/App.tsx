/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { 
  ArrowRight, 
  Brain, 
  Dna, 
  Leaf, 
  Zap, 
  ChevronRight,
  Globe,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const springConfig = { stiffness: 100, damping: 20 };
  const followerX = useSpring(mousePos.x, springConfig);
  const followerY = useSpring(mousePos.y, springConfig);

  useEffect(() => {
    followerX.set(mousePos.x);
    followerY.set(mousePos.y);
  }, [mousePos, followerX, followerY]);

  return (
    <div className="relative overflow-x-hidden selection:bg-brand-accent selection:text-white">
      {/* Decorative Overlays */}
      <div className="border-frame" />
      <div className="border-overlay" />

      {/* Custom Cursor */}
      <div 
        className="cursor" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <motion.div 
        className="cursor-follower" 
        style={{ left: followerX, top: followerY }}
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-4 left-4 right-4 z-[110] flex items-center justify-between px-10 py-6 transition-all border-b border-brand-black ${
          isScrolled ? "bg-brand-off-white/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#" className="text-2xl font-black tracking-tighter text-brand-black no-underline uppercase">
          A.S. Capital<span className="text-brand-accent">.</span>
        </a>
        
        <ul className="hidden md:flex gap-10 list-none">
          {["Philosophy", "Focus", "Portfolio", "Team", "Insights"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a 
          href="#contact" 
          className="text-[12px] tracking-[1px] uppercase text-brand-black font-bold border border-brand-black px-6 py-2 no-underline transition-all hover:bg-brand-black hover:text-brand-off-white"
        >
          Connect
        </a>
      </nav>

      {/* Main Grid Wrapper */}
      <div className="pt-24 px-4">
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] grid grid-cols-[80px_1fr_300px] border-b border-brand-black">
          <div className="border-r border-brand-black flex items-center justify-center">
            <div className="[writing-mode:vertical-rl] rotate-180 text-[11px] uppercase tracking-[4px] opacity-50 font-bold whitespace-nowrap">
              ESTABLISHED MMXXIV
            </div>
          </div>
          
          <div className="px-15 flex flex-col justify-center relative bg-white/40">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="section-tag"
            >
              Venture Capital
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="section-title"
            >
              Backing<br/>
              <span>Founders</span><br/>
              Who Change<br/>
              The World
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-lg font-normal leading-[1.4] text-brand-grey max-w-sm"
            >
              A.S. Capital is a multidisciplinary studio dedicated to the art of subtraction in venture building.
            </motion.p>
          </div>

          <div className="border-l border-brand-black p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] uppercase tracking-[2px] opacity-60 mb-6 font-bold">Key Stats</h3>
              <div className="space-y-8">
                <Stat value="$2.4B" label="AUM" />
                <Stat value="140+" label="Portfolio" />
                <Stat value="18+" label="Unicorns" />
              </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold opacity-40 mt-auto"
            >
              Scroll to explore <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </section>

        {/* Ticker */}
        <div className="border-b border-brand-black overflow-hidden py-10 bg-brand-accent text-white">
          <div className="flex gap-20 animate-ticker whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {["Series A & B", "Deep Tech", "Climate Innovation", "AI & ML", "Fintech", "Healthcare", "SaaS"].map((text) => (
                  <span key={text} className="text-4xl font-black uppercase tracking-tighter flex items-center gap-20">
                    {text} <span className="text-brand-black opacity-20">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <section id="philosophy" className="grid grid-cols-[80px_1fr_300px] border-b border-brand-black min-h-[70vh]">
          <div className="border-r border-brand-black"></div>
          <div className="p-15 flex flex-col justify-center">
            <div className="section-tag">Philosophy</div>
            <h2 className="section-title leading-none">
              Patient<br/>
              <span>Capital.</span><br/>
              Conviction.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-10">
              <p className="text-lg leading-relaxed text-brand-grey">
                We believe the most important companies are built with clarity of purpose. 
                Our role is to amplify ambition through strategic depth and conviction.
              </p>
              <p className="text-lg leading-relaxed text-brand-grey">
                We don't optimize for logos. We optimize for outcomes that reshape industries 
                and create lasting planetary value.
              </p>
            </div>
          </div>
          <div className="border-l border-brand-black p-10 flex flex-col justify-center">
            <blockquote className="text-sm font-bold uppercase tracking-tight leading-tight text-brand-black">
              "Simple as it needs to be, but no simpler."
            </blockquote>
          </div>
        </section>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 border-b border-brand-black">
          <Pillar num="01" title="Conviction First" body="Concentrated positions in companies we truly believe in." />
          <Pillar num="02" title="Founder-Centric" body="Founders retain control. We are a resource, never a constraint." />
          <Pillar num="03" title="Long Horizon" body="We hold for the full arc of value creation." />
        </div>

        {/* Focus Areas */}
        <section id="focus" className="border-b border-brand-black">
          <div className="grid grid-cols-[80px_1fr] border-b border-brand-black">
            <div className="border-r border-brand-black flex items-center justify-center">
              <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase font-bold opacity-30">Areas of Focus</div>
            </div>
            <div className="p-15 flex justify-between items-end">
              <h2 className="section-title">Where We<br/><span>Invest</span></h2>
              <p className="max-w-[400px] text-sm text-brand-grey leading-relaxed">
                Focus on sectors where technology creates durable competitive advantages 
                and category-defining outcomes.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-4">
            <FocusCard icon={<Brain />} title="AI" body="Applied AI and infrastructure for the next era." />
            <FocusCard icon={<Leaf />} title="Climate" body="Sustainable industry at planetary scale." />
            <FocusCard icon={<Dna />} title="Bio" body="Precision medicine and longevity science." />
            <FocusCard icon={<Zap />} title="Deep Tech" body="Quantum, robotics, and space systems." />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="border-b border-brand-black">
          <div className="p-15 flex justify-between items-center border-b border-brand-black">
            <h2 className="section-title">Featured<br/><span>Works</span></h2>
            <a href="#" className="btn-filled bg-brand-black text-brand-off-white px-10 py-4 uppercase font-bold text-xs tracking-widest hover:bg-brand-accent transition-colors">
              Full Portfolio
            </a>
          </div>
          <div className="grid md:grid-cols-3">
            <PortfolioItem name="Axiom AI" sector="Enterprise AI" highlight="2024" />
            <PortfolioItem name="Verdant" sector="Climate Tech" highlight="2023" />
            <PortfolioItem name="Helix" sector="Bio Tech" highlight="2023" />
            <PortfolioItem name="Orbis" sector="Space Tech" highlight="2022" />
            <PortfolioItem name="Cascade" sector="Fintech" highlight="2022" />
            <PortfolioItem name="Nova" sector="EdTech" highlight="2021" />
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="border-b border-brand-black">
          <div className="p-15 text-center border-b border-brand-black">
            <h2 className="section-title max-w-5xl mx-auto">People Who<br/><span>Build</span> & Back</h2>
          </div>
          <div className="grid md:grid-cols-4">
            <TeamCard name="Arjun Mehta" role="Managing Partner" bio="Operator-turned-investor scaling global platforms." />
            <TeamCard name="Sophia Liang" role="GP, Deep Tech" bio="PhD MIT, building the future of intelligence." />
            <TeamCard name="Marcus Cole" role="GP, Growth" bio="Scaling consumer platforms with relentless speed." />
            <TeamCard name="Priya Nair" role="Partner, Climate" bio="Driving sustainability at the largest scales." />
          </div>
        </section>

        {/* CTA & Footer */}
        <section id="contact" className="grid grid-cols-[80px_1fr_300px] border-b border-brand-black bg-brand-black text-brand-off-white py-20">
          <div className="border-r border-white/20"></div>
          <div className="px-15 text-left">
            <h2 className="text-8xl font-black uppercase tracking-tighter leading-none mb-10">
              Build<br/>The <span className="text-brand-accent">Future.</span>
            </h2>
            <a href="mailto:founders@as-capital.vc" className="text-4xl font-extralight tracking-tight hover:text-brand-accent transition-colors">
              founders@as-capital.vc →
            </a>
          </div>
          <div className="border-l border-white/20 p-10 flex flex-col justify-end">
            <p className="text-xs uppercase tracking-[4px] font-bold opacity-40">Accepting Q4 2024 Pitches</p>
          </div>
        </section>

        <footer className="grid grid-cols-[80px_1fr_300px] h-32 items-center">
          <div className="border-r border-brand-black h-full"></div>
          <div className="px-10 text-[11px] italic text-brand-grey">
            Design should be as simple as it needs to be, but no simpler.
          </div>
          <div className="border-l border-brand-black h-full flex flex-col justify-center px-10">
            <span className="text-[9px] uppercase opacity-40">Based in</span>
            <span className="text-sm font-bold">New York, NY</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-grid-line pb-2">
      <span className="text-[9px] uppercase tracking-widest opacity-60">{label}</span>
      <span className="text-2xl font-black">{value}</span>
    </div>
  );
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="p-10 border-r border-brand-black last:border-r-0 hover:bg-brand-accent hover:text-white transition-colors group cursor-none">
      <div className="text-5xl font-black tracking-tighter mb-4 opacity-20 group-hover:opacity-100">{num}</div>
      <div className="text-xs uppercase tracking-[2.5px] font-black mb-3">{title}</div>
      <div className="text-sm leading-relaxed opacity-70 group-hover:opacity-100">{body}</div>
    </div>
  );
}

function FocusCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="p-10 border-r border-brand-black last:border-r-0 hover:bg-brand-accent/5 transition-colors group">
      <div className="mb-6 w-8 h-8 text-brand-accent group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-xs uppercase tracking-[2px] font-black mb-3">{title}</div>
      <p className="text-xs text-brand-grey leading-relaxed">{body}</p>
    </div>
  );
}

function PortfolioItem({ name, sector, highlight }: { name: string; sector: string; highlight: string }) {
  return (
    <div className="p-10 border-r border-b border-brand-black last:border-r-0 hover:bg-brand-black hover:text-white transition-all group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-black tracking-tighter uppercase">{name}</h3>
        <span className="text-[10px] font-bold opacity-30">{highlight}</span>
      </div>
      <div className="text-[10px] uppercase tracking-widest opacity-50">{sector}</div>
    </div>
  );
}

function TeamCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="p-10 border-r border-brand-black last:border-r-0 hover:bg-brand-accent hover:text-white transition-colors group">
      <div className="text-xs font-black uppercase tracking-[2px] mb-1">{name}</div>
      <div className="text-[9px] uppercase tracking-widest text-brand-accent group-hover:text-white mb-6 font-bold">{role}</div>
      <p className="text-xs leading-relaxed opacity-70">{bio}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-[10px] tracking-[2px] uppercase font-bold mb-6 opacity-40">{title}</div>
      <ul className="list-none space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-xs text-brand-black hover:text-brand-accent font-medium">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
