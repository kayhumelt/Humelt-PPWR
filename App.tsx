import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Recycle, 
  Layers, 
  Box, 
  ScanBarcode,
  ArrowDown,
  Globe,
  Droplet
} from 'lucide-react';

// --- Components ---

const Noise = () => <div className="noise-overlay" />;

const Marquee = ({ text, speed = 20 }: { text: string; speed?: number }) => (
  <div className="relative flex overflow-hidden border-y border-charcoal/10 py-4 bg-stone/30 backdrop-blur-sm select-none">
    <div className="animate-marquee whitespace-nowrap flex gap-12 pr-12 items-center shrink-0">
      {Array(4).fill(null).map((_, i) => (
        <span key={i} className="text-sm font-mono uppercase tracking-widest text-charcoal/60 flex items-center gap-12">
          {text} <span className="w-2 h-2 rounded-full bg-acid"></span>
        </span>
      ))}
    </div>
    <div className="animate-marquee whitespace-nowrap flex gap-12 pr-12 items-center shrink-0">
      {Array(4).fill(null).map((_, i) => (
        <span key={i} className="text-sm font-mono uppercase tracking-widest text-charcoal/60 flex items-center gap-12">
          {text} <span className="w-2 h-2 rounded-full bg-acid"></span>
        </span>
      ))}
    </div>
    <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-cream to-transparent z-10" />
    <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-cream to-transparent z-10" />
  </div>
);

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ImageCard = ({ src, alt, caption, className = "" }: { src: string, alt: string, caption?: string, className?: string }) => (
  <div className={`relative overflow-hidden rounded-[2rem] group ${className}`}>
    <div className="absolute inset-0 bg-charcoal/5 z-10 transition-opacity group-hover:opacity-0" />
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
    />
    {caption && (
      <div className="absolute bottom-6 left-6 z-20 bg-cream/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono tracking-wider text-charcoal uppercase">
        {caption}
      </div>
    )}
  </div>
);

const Star = ({ cx, cy, size = 1 }: { cx: number; cy: number; size?: number }) => (
  <polygon
    points="0,-1 0.2245,-0.309 0.951,-0.309 0.363,0.118 0.588,0.809 0,0.382 -0.588,0.809 -0.363,0.118 -0.951,-0.309 -0.2245,-0.309"
    transform={`translate(${cx}, ${cy}) scale(${size})`}
    fill="#FFCC00"
  />
);

const EUFlag = () => (
  <div className="w-12 h-12 bg-[#003399] flex items-center justify-center shadow-sm select-none" aria-label="EU Flag - Compliance Ready">
    <svg viewBox="0 0 100 100" className="w-full h-full p-1">
      {Array.from({ length: 12 }).map((_, i) => {
        // 12 stars in a circle. Start at 12 o'clock (-90 degrees)
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const radius = 33;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return <Star key={i} cx={x} cy={y} size={4.5} />;
      })}
    </svg>
  </div>
);

// --- Main Application ---

export default function App() {
  return (
    <main className="relative min-h-screen bg-cream overflow-x-hidden selection:bg-royal selection:text-cream">
      <Noise />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:py-6 flex justify-between items-center bg-cream/90 backdrop-blur-md border-b border-charcoal/5 transition-all duration-300">
        <a href="#" className="font-serif text-3xl tracking-tighter text-charcoal hover:opacity-70 transition-opacity">
          humelt
        </a>

        <div className="hidden md:flex gap-8 items-center">
          {['Context', 'Services', 'Approach'].map((item) => (
             <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-sans font-medium hover:text-rust transition-colors">{item}</a>
          ))}
        </div>

        <EUFlag />
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col pt-32 pb-12 px-4 md:px-8">
        <div className="flex-grow flex flex-col items-center justify-center text-center max-w-6xl mx-auto relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-charcoal/10 bg-white/40 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-acid animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-charcoal/70">EU PPWR Readiness</span>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="font-serif text-[14vw] md:text-[8rem] leading-[0.85] tracking-tighter text-charcoal mb-12">
              Future Proof<br/>
              <span className="font-light italic text-gradient-brand">Your Packaging</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
             <p className="max-w-md font-sans text-lg md:text-xl text-charcoal/60 leading-relaxed mx-auto mb-12">
               A specialized design consultancy helping FMCG brands navigate the new circular economy regulations without losing their soul.
             </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => document.getElementById('context')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-14 h-14 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                <ArrowDown size={20} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Hero Visuals - Floating Abstract Cards */}
        <div className="hidden lg:block absolute top-1/2 left-10 -translate-y-1/2 w-64 aspect-[3/4] rotate-[-6deg] opacity-80 mix-blend-multiply pointer-events-none">
           <ImageCard src="https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=1000&auto=format&fit=crop" alt="Texture" className="shadow-2xl" />
        </div>
        <div className="hidden lg:block absolute top-1/2 right-10 -translate-y-1/2 w-64 aspect-[3/4] rotate-[6deg] opacity-80 mix-blend-multiply pointer-events-none">
           <ImageCard src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1000&auto=format&fit=crop" alt="Form" className="shadow-2xl" />
        </div>
      </header>

      <Marquee text="Design for Recycling • Minimization • Traceability • Reusability •" />

      {/* Context / Visual Grid */}
      <section id="context" className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Side */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <h2 className="font-serif text-5xl md:text-7xl mb-8 text-charcoal leading-none">
                The shift is<br/>
                <span className="text-royal italic">non-negotiable.</span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl font-sans text-charcoal/70 leading-relaxed">
                <p>
                  The EU’s Packaging and Packaging Waste Regulation (PPWR) isn't just a policy update; it's a fundamental reset of how we design, produce, and dispose of goods.
                </p>
                <p>
                  By 2030, all packaging must be recyclable by design. Grades D and E will be banned. The era of "wish-cycling" is over—now, data defines market access.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-charcoal/10 pt-8">
                <div>
                  <div className="font-serif text-4xl mb-2 text-charcoal">2030</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-charcoal/50">Compliance Deadline</div>
                </div>
                <div>
                  <div className="font-serif text-4xl mb-2 text-charcoal">100%</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-charcoal/50">Recyclable Portfolio</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Image Side */}
          <Reveal className="order-1 lg:order-2 h-[600px] w-full" delay={200}>
            <ImageCard 
               src="https://images.unsplash.com/photo-1595348020949-87cdfbb44174?q=80&w=2000&auto=format&fit=crop" 
               alt="Glass textures" 
               className="h-full w-full shadow-2xl"
               caption="Material Audit"
            />
          </Reveal>
        </div>
      </section>

      {/* Services - Horizontal Scroll */}
      <section id="services" className="py-24 bg-stone relative overflow-hidden">
        <div className="px-4 md:px-8 mb-16 flex justify-between items-end max-w-7xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-5xl md:text-6xl text-charcoal">Intervention</h2>
          </Reveal>
          <Reveal delay={100}>
             <p className="hidden md:block font-mono text-xs uppercase tracking-wider text-charcoal/50">Scroll to explore services</p>
          </Reveal>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-8 pb-12 no-scrollbar w-full">
          
          {/* Card 1 - White with Purple Accents */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[450px] flex flex-col">
            <div className="aspect-[4/3] mb-6 relative overflow-hidden rounded-[2rem] bg-white group hover:shadow-xl transition-shadow duration-500">
               <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" alt="Audit" />
               <div className="absolute top-6 right-6 w-10 h-10 bg-cream rounded-full flex items-center justify-center text-royal">
                 <ScanBarcode size={18} />
               </div>
            </div>
            <h3 className="font-serif text-3xl mb-3">Portfolio Audit</h3>
            <p className="font-sans text-charcoal/60 leading-relaxed mb-4">A complete SKU-by-SKU risk assessment against 2030 recyclability grades.</p>
            <ul className="space-y-2 mt-auto">
              <li className="text-xs font-mono uppercase tracking-wide text-royal flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-royal"></span> Risk Prioritization
              </li>
              <li className="text-xs font-mono uppercase tracking-wide text-royal flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-royal"></span> Timeline Strategy
              </li>
            </ul>
          </div>

          {/* Card 2 - Royal (Deep Purple) with White Text */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[450px] flex flex-col">
            <div className="aspect-[4/3] mb-6 relative overflow-hidden rounded-[2rem] bg-royal group hover:shadow-xl transition-shadow duration-500">
               <img src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" alt="Redesign" />
               <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center">
                 <Recycle size={18} />
               </div>
            </div>
            <h3 className="font-serif text-3xl mb-3">Circular Redesign</h3>
            <p className="font-sans text-charcoal/60 leading-relaxed mb-4">Structural and graphic redesign to migrate risky SKUs to compliant mono-materials.</p>
             <ul className="space-y-2 mt-auto">
              <li className="text-xs font-mono uppercase tracking-wide text-royal flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-royal"></span> Mono-material transition
              </li>
              <li className="text-xs font-mono uppercase tracking-wide text-royal flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-royal"></span> Weight Minimization
              </li>
            </ul>
          </div>

          {/* Card 3 - Acid (Lime) with Charcoal Text */}
          <div className="snap-center shrink-0 w-[85vw] md:w-[450px] flex flex-col">
            <div className="aspect-[4/3] mb-6 relative overflow-hidden rounded-[2rem] bg-acid group hover:shadow-xl transition-shadow duration-500">
               <img src="https://images.unsplash.com/photo-1621252179027-94459d27d3ee?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" alt="Strategy" />
               <div className="absolute top-6 right-6 w-10 h-10 bg-charcoal text-white rounded-full flex items-center justify-center">
                 <Box size={18} />
               </div>
            </div>
            <h3 className="font-serif text-3xl mb-3">System Architecture</h3>
            <p className="font-sans text-charcoal/60 leading-relaxed mb-4">Simplifying packaging lines to reduce complexity and supply chain vulnerability.</p>
             <ul className="space-y-2 mt-auto">
              <li className="text-xs font-mono uppercase tracking-wide text-rust flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> Complexity Reduction
              </li>
              <li className="text-xs font-mono uppercase tracking-wide text-rust flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rust"></span> Supplier Briefs
              </li>
            </ul>
          </div>

           {/* Card 4 - Placeholder */}
           <div className="snap-center shrink-0 w-[85vw] md:w-[450px] flex flex-col justify-center items-center bg-white rounded-[2rem] border border-charcoal/5">
              <div className="text-center p-8">
                <h3 className="font-serif text-3xl mb-2 text-charcoal/30">Custom Scope?</h3>
                <p className="font-sans text-charcoal/40 mb-6">Let's tailor an approach.</p>
                <button className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center text-charcoal/40 hover:bg-rust hover:text-white hover:border-transparent transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* Approach / Full Width Visual */}
      <section id="approach" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 bg-royal overflow-hidden">
          {/* Lilac Blob (A888E5) */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-lilac/30 rounded-full blur-[120px] mix-blend-screen animate-float" />
          
          {/* Major Brown Presence (Dark Walnut) - Top Right - creating the earthy tone */}
          <div className="absolute top-[10%] right-[-10%] w-[80vw] h-[80vw] bg-brown/90 rounded-full blur-[150px] mix-blend-overlay animate-float-delayed" />
          
          {/* Rust Blob (AE640D) - Kept for warmth */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-rust/50 rounded-full blur-[100px] mix-blend-screen animate-float" />
          
          {/* Another Brown/Bronze Blob for depth */}
          <div className="absolute bottom-[10%] left-[0%] w-[50vw] h-[50vw] bg-brown/60 rounded-full blur-[130px] mix-blend-hard-light animate-float-slow" />
          
           {/* Fine Gaussian Noise Texture (Lomo Style) */}
           <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                 backgroundSize: '200px 200px'
               }} 
          />
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <Reveal>
             <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
               <span className="font-mono text-xs uppercase tracking-widest">The Philosophy</span>
             </div>
             <h2 className="font-serif text-5xl md:text-8xl mb-8 leading-none">
               Constraint breeds<br/>Creativity.
             </h2>
             <p className="font-sans text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto text-balance">
               Regulation doesn’t have to mean boring. It’s an invitation to strip away the excess and design clearer, stronger, and more honest brands.
             </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-charcoal text-stone pt-24 pb-12 px-4 md:px-8 rounded-t-[3rem] -mt-12 relative z-20">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:items-end mb-24">
           <div className="max-w-2xl">
             <Reveal>
               <h2 className="font-serif text-[12vw] md:text-[7rem] leading-[0.8] mb-12 tracking-tighter">
                 Let's Talk <span className="text-gradient-brand italic">Future.</span>
               </h2>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button className="group flex items-center justify-between px-8 py-6 bg-stone text-charcoal rounded-full hover:bg-rust hover:text-white transition-all duration-300">
                   <span className="font-sans text-lg font-medium">Portfolio Audit</span>
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="group flex items-center justify-between px-8 py-6 bg-charcoal border border-stone/20 text-stone rounded-full hover:bg-stone hover:text-charcoal transition-all duration-300">
                   <span className="font-sans text-lg font-medium">Download Checklist</span>
                   <Globe className="group-hover:rotate-12 transition-transform" />
                 </button>
               </div>
             </Reveal>
           </div>

           <div className="space-y-8">
              <div className="flex gap-4">
                 {[Layers, Droplet, Recycle].map((Icon, i) => (
                   <div key={i} className="w-12 h-12 rounded-full border border-stone/20 flex items-center justify-center text-stone/50">
                     <Icon size={20} strokeWidth={1.5} />
                   </div>
                 ))}
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-stone/40 max-w-xs">
                Helping brands across Europe meet PPWR standards through design intelligence.
              </p>
           </div>
         </div>

         <div className="max-w-7xl mx-auto border-t border-stone/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone/30 font-mono text-xs uppercase tracking-wider">
           <span>© {new Date().getFullYear()} Humelt Design</span>
           <span>Gdansk — Berlin — Paris</span>
         </div>
      </footer>
    </main>
  );
}