import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trees, 
  MapPin, 
  Wind, 
  Droplets, 
  Sun, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: true }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Retreats', href: '#retreats' },
    { name: 'Experience', href: '#experience' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-700 py-6",
      isScrolled ? "bg-warmWhite/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <Trees className={cn("w-7 h-7", isScrolled ? "text-forestDeep" : "text-warmWhite")} />
          <span className={cn("text-xl font-serif font-bold tracking-tight", isScrolled ? "text-forestDeep" : "text-warmWhite")}>
            Pinehaven
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={cn(
                "text-xs uppercase tracking-widest font-semibold transition-colors hover:text-sage",
                isScrolled ? "text-forestDeep" : "text-warmWhite"
              )}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-forestDeep text-warmWhite px-7 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-forest transition-all">
            Book Your Stay
          </button>
        </div>

        <button className="md:hidden text-warmWhite" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="text-forestDeep" /> : <Menu className={isScrolled ? "text-forestDeep" : "text-warmWhite"} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-cream h-screen flex flex-col items-center justify-center gap-8 z-50 md:hidden"
          >
            <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-forestDeep">{link.name}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center bg-forestDeep">
      {/* Cinematic Hero Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          style={{ 
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)'
          }}
        >
          <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/forest_hero_bg_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating Decorative Blobs */}
      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-72 h-72 bg-sage/20 rounded-full blur-[100px] z-10"
      />
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-olive/20 rounded-full blur-[120px] z-10"
      />

      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sage uppercase tracking-[0.4em] text-xs font-bold mb-6 block"
        >
          Experience The Unspoiled Wild
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-5xl md:text-8xl text-warmWhite font-serif mb-10 leading-[1.05]"
        >
          Where Luxury <br />
          <span className="italic font-normal text-sage">Meets the Earth.</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <button className="bg-sage hover:bg-olive text-forestDeep px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all transform hover:scale-105">
            Book Your Retreat <ChevronRight size={18} />
          </button>
          <button className="text-warmWhite border border-warmWhite/20 hover:bg-warmWhite/10 backdrop-blur-sm px-10 py-5 rounded-full font-bold transition-all">
            Explore Experiences
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-warmWhite/40 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sage/60 to-transparent" />
      </motion.div>
    </section>
  );
};

const RetreatsSection = () => {
  const cabins = [
    {
      title: "The Glass A-Frame",
      desc: "Architectural masterpiece with 360-degree forest views.",
      price: "$450 / night",
      img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Creekside Sanctuary",
      desc: "A rhythmic flow of luxury beside the mountain waters.",
      price: "$380 / night",
      img: "https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Treehouse Loft",
      desc: "Live among the canopy in our most exclusive cabin.",
      price: "$520 / night",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="retreats" className="py-32 px-8 bg-warmWhite">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl text-forestDeep mb-8 leading-tight">Handcrafted <br />Sanctuaries</h2>
            <p className="text-mutedText text-lg leading-relaxed">
              Designed to disappear into the landscape, our retreats provide 
              modern luxury without disrupting the local ecosystem.
            </p>
          </div>
          <button className="group flex items-center gap-3 text-forestDeep font-bold uppercase tracking-widest text-xs border-b-2 border-sage pb-2 hover:text-sage transition-all">
            View All Stays <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          {cabins.map((cabin, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-8 bg-cream">
                <img 
                  src={cabin.img} 
                  alt={cabin.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute bottom-6 left-6 bg-warmWhite/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-forestDeep">
                  From {cabin.price}
                </div>
              </div>
              <h3 className="text-2xl text-forestDeep mb-3 font-serif italic">{cabin.title}</h3>
              <p className="text-mutedText text-sm mb-6 leading-relaxed">{cabin.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-forestDeep group-hover:text-sage transition-colors">
                Details & Availability <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Experiences = () => {
  const experiences = [
    { icon: Wind, title: "Breath & Vitality", desc: "Daily sunrise meditation and breathwork overlooking the valley." },
    { icon: Sun, title: "Solar Renewal", desc: "Off-grid wellness treatments utilizing geothermal energy." },
    { icon: Trees, title: "Wild Foraging", desc: "Identify and harvest local herbs with our resident botanist." }
  ];

  return (
    <section id="experience" className="py-32 px-8 bg-forestDeep relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp}>
            <span className="text-sage uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">The Pinehaven Way</span>
            <h2 className="text-4xl md:text-6xl text-warmWhite mb-10 leading-tight font-serif">
              A Rhythm <br />
              <span className="italic">Defined by Nature</span>
            </h2>
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex gap-8 p-8 rounded-3xl bg-warmWhite/5 hover:bg-warmWhite/10 border border-warmWhite/5 transition-all duration-500">
                  <div className="shrink-0 w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center text-sage">
                    <exp.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-warmWhite mb-2">{exp.title}</h4>
                    <p className="text-warmWhite/60 text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-[12px] border-warmWhite/5">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Spa experience" />
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-olive rounded-full flex flex-col items-center justify-center text-forestDeep text-center p-6 shadow-2xl rotate-12">
              <span className="text-xs font-black uppercase tracking-tighter">Organic Dining</span>
              <p className="text-[10px] mt-2 font-medium">Farm-to-table excellence</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Sustainability = () => {
  const stats = [
    { icon: Sun, title: "100% Solar Powered", val: "Complete energy independence." },
    { icon: Droplets, title: "Closed-Loop Water", val: "Advanced greywater filtration." },
    { icon: Trees, title: "Reforestation", val: "10 trees planted per booking." }
  ];

  return (
    <section id="sustainability" className="py-32 px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl text-forestDeep mb-6 font-serif italic">Our Earth First Promise</h2>
          <p className="text-mutedText">Luxury is not about excess; it is about harmony. We operate with a negative carbon footprint to ensure the forest thrives for generations.</p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="bg-warmWhite p-12 rounded-[40px] text-center border border-forestDeep/5 shadow-sm hover:shadow-xl transition-all duration-500">
              <item.icon className="mx-auto mb-8 text-olive" size={48} strokeWidth={1} />
              <h3 className="text-2xl text-forestDeep mb-4 font-serif">{item.title}</h3>
              <p className="text-mutedText text-sm leading-relaxed">{item.val}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-forestDeep text-warmWhite pt-32 pb-16 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-10">
            <Trees size={40} className="text-sage" />
            <span className="text-4xl font-serif font-bold tracking-tighter">Pinehaven</span>
          </div>
          <p className="text-warmWhite/50 max-w-sm mb-12 text-sm leading-loose">
            A boutique collection of eco-retreats designed for the conscious traveler. 
            Reconnect with the soil, the sky, and yourself.
          </p>
          <div className="flex gap-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <div key={i} className="w-12 h-12 rounded-full border border-warmWhite/10 flex items-center justify-center hover:bg-sage hover:text-forestDeep transition-all cursor-pointer">
                <Icon size={20} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-sage mb-10">Navigate</h4>
          <ul className="space-y-5 text-sm font-medium text-warmWhite/70">
            {['Accommodations', 'Wellness Spa', 'Sustainability', 'Journal', 'Contact'].map(link => (
              <li key={link}><a href="#" className="hover:text-warmWhite transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-sage mb-10">Stay Inspired</h4>
          <p className="text-xs text-warmWhite/40 mb-6 leading-relaxed">Join 5,000+ conscious explorers receiving our seasonal forest updates.</p>
          <div className="relative">
            <input type="text" placeholder="Email Address" className="w-full bg-warmWhite/5 border-b border-warmWhite/20 py-4 outline-none focus:border-sage transition-colors text-sm" />
            <ArrowRight className="absolute right-0 top-4 text-sage cursor-pointer" size={20} />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-warmWhite/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-warmWhite/30">
        <p>&copy; {new Date().getFullYear()} Pinehaven Eco Retreats. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-warmWhite transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-warmWhite transition-colors">Terms of Stay</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="selection:bg-sage selection:text-forestDeep">
      <Navbar />
      <Hero />
      <RetreatsSection />
      <Experiences />
      <Sustainability />
      <Footer />
    </main>
  );
}