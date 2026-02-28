import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Star, 
  Menu as MenuIcon, 
  X,
  Instagram,
  Facebook,
  Award,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

// --- Theme Constants ---
const COLORS = {
  emerald: '#0F2E2C',
  gold: '#C6A75E',
  cream: '#F5F1E8',
  black: '#0A0A0A'
};

const MENU_DATA = {
  appetizers: [
    { name: "Spanish Omelette", price: 130, desc: "Farm-fresh eggs with bell peppers and spring onions.", pairing: "Fresh Milk" },
    { name: "Kebab", price: 70, desc: "Spiced minced meat grilled to perfection.", pairing: "Delmonte Juice" },
    { name: "Samosa", price: 20, desc: "Traditional crisp pastry with savory filling.", pairing: "White Coffee" }
  ],
  mains: [
    { name: "Chicken Kuku Stew", price: 330, desc: "Traditional slow-simmered poultry in a rich aromatic broth.", pairing: "Delmonte Juice" },
    { name: "Ugali Samaki Fry", price: 300, desc: "Fresh lake fish, crisp-seared, served with traditional ugali.", pairing: "White Coffee" },
    { name: "Beef Stew", price: 170, desc: "Tender cubes of prime beef braised with garden vegetables.", pairing: "Fresh Milk" },
    { name: "Ugali Matumbo Fry", price: 150, desc: "Authentic tripe delicacies, seasoned and wok-fried.", pairing: "White Coffee" }
  ],
  staples: [
    { name: "Pilau Special", price: 150, desc: "Fragrant rice spiced with our signature blend.", pairing: "Delmonte Juice" },
    { name: "Managu Special", price: 150, desc: "Nutrient-rich traditional greens sautéed in cream.", pairing: "Fresh Milk" }
  ],
  beverages: [
    { name: "White Coffee", price: 40, desc: "Rich roasted beans with silky steamed milk." },
    { name: "Fresh Milk (500ml)", price: 70, desc: "Farm-to-table chilled refreshment." },
    { name: "Delmonte Juice", price: 200, desc: "Premium selection of fruit nectars." }
  ]
};

// --- Custom Hook for Reveal Animations ---
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, className: 'transition-all duration-1000 transform opacity-0 translate-y-10' };
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mains');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [pairing, setPairing] = useState(null);
  const [greeting, setGreeting] = useState("Your evening begins here.");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    // Time-Aware Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Your morning sanctuary awaits.");
    else if (hour < 18) setGreeting("A refined escape from the afternoon.");
    else setGreeting("Your evening to remember starts tonight.");

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const reveal1 = useReveal();
  const reveal2 = useReveal();
  const reveal3 = useReveal();

  return (
    <div className="min-h-screen font-sans selection:bg-[#C6A75E] selection:text-black bg-[#0A0A0A] text-[#F5F1E8] overflow-x-hidden">
      
      {/* --- Custom Cursor Ornament --- */}
      <div 
        className="hidden md:block fixed w-8 h-8 border border-[#C6A75E]/40 rounded-full pointer-events-none z-[100] transition-transform duration-300 ease-out mix-blend-difference"
        style={{ left: mousePos.x, top: mousePos.y, transform: `translate(-50%, -50%)` }}
      />

      {/* --- Atmospheric Controls --- */}
      <div className="fixed bottom-8 left-8 z-[60] flex items-center gap-4">
        <button 
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="w-12 h-12 rounded-full border border-[#C6A75E]/30 bg-black/50 backdrop-blur-md flex items-center justify-center text-[#C6A75E] hover:border-[#C6A75E] transition-all"
        >
          {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        {audioEnabled && (
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A75E] animate-pulse">Ambient Lounge Active</span>
        )}
      </div>

      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-4' : 'bg-transparent py-10'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-12 h-12 border border-[#C6A75E] flex items-center justify-center rotate-45 group-hover:bg-[#C6A75E] transition-all duration-700 group-hover:rotate-[225deg]">
              <span className="-rotate-45 font-serif text-[#C6A75E] group-hover:text-black font-bold transition-all group-hover:rotate-[135deg]">SS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.2em] uppercase leading-none">Southern Springs</span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-all">Refined Dining</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
            {['About', 'Cuisine', 'Experience', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="relative py-2 group overflow-hidden">
                <span className="block group-hover:-translate-y-full transition-transform duration-500">{item}</span>
                <span className="absolute top-full left-0 text-[#C6A75E] group-hover:-translate-y-full transition-transform duration-500">{item}</span>
              </button>
            ))}
            <button onClick={() => scrollTo('reserve')} className="bg-[#C6A75E] text-black px-8 py-3 rounded-full hover:shadow-[0_0_30px_rgba(198,167,94,0.5)] transition-all hover:scale-105 active:scale-95">
              Book a Table
            </button>
          </div>

          <button className="lg:hidden text-[#C6A75E]" onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* --- Hero Section (Atmospheric) --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Elements */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
          style={{ transform: `scale(1.1) translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black z-10"></div>
          {/* Featured Image: Gourmet Roasted Chicken */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-20 text-center max-w-5xl px-6">
          <div className="inline-flex items-center gap-4 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
            <Sparkles size={14} className="text-[#C6A75E] animate-pulse" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-bold">{greeting}</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-10 tracking-tight">
            Indulge in <br />
            <span className="italic text-[#C6A75E] relative inline-block">
              the art of taste.
              <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#C6A75E] scale-x-0 transition-transform origin-left duration-1000 delay-500 group-hover:scale-x-100"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#F5F1E8]/60 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Dividing the noise of the world from the intimacy of the plate. 
            A sanctuary where every detail is engineered for high-status indulgence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={() => scrollTo('reserve')} className="group bg-[#C6A75E] text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              Secure Your Table
            </button>
            <button onClick={() => scrollTo('cuisine')} className="text-[#F5F1E8] uppercase tracking-[0.4em] text-[10px] font-black group flex items-center gap-2">
              <span className="border-b border-transparent group-hover:border-[#C6A75E] transition-all">Explore the Cuisine</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A75E]">Only 3 Tables Remaining Tonight</span>
        </div>
      </section>

      {/* --- The Digital Sommelier (Interactive Pairing) --- */}
      <section id="cuisine" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div {...reveal1} className="text-center mb-24">
            <h2 className="text-6xl font-serif mb-8 italic">The Culinary Engine</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-12">
              {Object.keys(MENU_DATA).map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setActiveTab(cat); setPairing(null); }}
                  className={`px-6 py-2 rounded-full border transition-all text-[10px] uppercase tracking-widest font-bold ${activeTab === cat ? 'bg-[#C6A75E] border-[#C6A75E] text-black' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 grid md:grid-cols-1 gap-12">
              {MENU_DATA[activeTab].map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setPairing(item.pairing)}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-end p-8 border border-white/5 hover:border-[#C6A75E]/30 hover:bg-white/[0.02] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#C6A75E] group-hover:h-full transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-serif mb-3 group-hover:text-[#C6A75E] transition-colors">{item.name}</h3>
                    <p className="text-[#F5F1E8]/40 text-sm max-w-md font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 md:mt-0 relative z-10 text-right">
                    <span className="text-2xl font-serif text-[#C6A75E]">Ksh {item.price}</span>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-all mt-2">Discover Pairing</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pairing Sidebar */}
            <div className="lg:col-span-4 sticky top-32 h-fit bg-[#0F2E2C]/20 border border-[#C6A75E]/20 p-10 rounded-sm">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#C6A75E] mb-10 font-bold border-b border-[#C6A75E]/20 pb-4">Digital Sommelier</h4>
              {pairing ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Recommended Pairing:</p>
                  <h5 className="text-3xl font-serif mb-6">{pairing}</h5>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-8 italic">
                    "This pairing has been hand-selected by our staff to elevate the complex flavor profile of your choice."
                  </p>
                  <button onClick={() => scrollTo('reserve')} className="w-full py-4 border border-[#C6A75E] text-[#C6A75E] text-[10px] uppercase tracking-widest font-bold hover:bg-[#C6A75E] hover:text-black transition-all">
                    Add to Reservation
                  </button>
                </div>
              ) : (
                <div className="text-center py-20 opacity-20">
                  <Utensils className="mx-auto mb-4" size={32} />
                  <p className="text-xs uppercase tracking-[0.2em]">Hover over a dish to unlock recommendations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Immersive Experience Gallery --- */}
      <section id="experience" className="bg-black py-40">
        <div className="max-w-[1600px] mx-auto px-6">
          <div {...reveal2} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-serif max-w-2xl leading-[0.8] italic">An evening worth <span className="text-[#C6A75E] tracking-tighter not-italic">dressing for.</span></h2>
            <p className="text-white/40 text-sm max-w-sm uppercase tracking-widest leading-loose">
              Luxury rule: People buy the vibe. Our sanctuary is curated for those who understand that intimacy is the ultimate status symbol.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="group relative h-[800px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110" 
                alt="Gourmet Chicken and Fries" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-16">
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                  <h3 className="text-5xl font-serif mb-4">The Kuku Signature</h3>
                  <p className="text-white/60 tracking-widest text-xs uppercase">Flame-grilled perfection with artisanal hand-cut fries</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[800px] overflow-hidden md:mt-40">
              <img 
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover grayscale transition-all duration-[2000ms] group-hover:grayscale-0 group-hover:scale-110" 
                alt="Plating" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-16">
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                  <h3 className="text-5xl font-serif mb-4">Artisanal Craft</h3>
                  <p className="text-white/60 tracking-widest text-xs uppercase">Where every plate is a curated masterpiece</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- High-Status Reservation Zone --- */}
      <section id="reserve" className="py-40 px-6 bg-white/[0.02]">
        <div {...reveal3} className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 bg-black border border-[#C6A75E]/30 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="p-16 flex flex-col justify-center border-r border-[#C6A75E]/10">
              <Award className="text-[#C6A75E] mb-8" size={48} />
              <h2 className="text-5xl font-serif mb-6 leading-tight">Your Table is <br /><span className="italic text-[#C6A75E]">a limited asset.</span></h2>
              <p className="text-white/40 font-light leading-relaxed mb-8">
                Due to our focus on artisanal preparation and intimate service, we operate on a strictly limited nightly seating schedule.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs tracking-widest font-bold">
                  <div className="w-1 h-1 bg-[#C6A75E] rounded-full"></div>
                  DRESS CODE: REFINED CASUAL
                </div>
                <div className="flex items-center gap-4 text-xs tracking-widest font-bold">
                  <div className="w-1 h-1 bg-[#C6A75E] rounded-full"></div>
                  VALET PARKING AVAILABLE
                </div>
              </div>
            </div>

            <div className="p-16 bg-[#0F2E2C]/10">
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="grid gap-8">
                  <div className="relative group">
                    <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#C6A75E] transition-all peer" placeholder=" " />
                    <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-white/30 transition-all peer-focus:-top-4 peer-focus:text-[#C6A75E] peer-[:not(:placeholder-shown)]:-top-4">Name for Reservation</label>
                  </div>
                  <div className="relative group">
                    <select className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#C6A75E] transition-all text-white appearance-none">
                      <option className="bg-black">2 People</option>
                      <option className="bg-black">4 People</option>
                      <option className="bg-black">6+ (Private Event)</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#C6A75E]">Table For</label>
                  </div>
                </div>
                <button className="w-full bg-[#C6A75E] text-black font-black py-6 uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-all shadow-xl group flex items-center justify-center gap-4">
                  Confirm Booking
                  <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
              <p className="mt-8 text-center text-[9px] uppercase tracking-[0.4em] text-white/20 leading-loose">
                Reservations are held for 15 minutes past scheduled time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer (Timeless) --- */}
      <footer id="contact" className="py-20 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif uppercase tracking-widest mb-4">Southern Springs</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Noble Hotel Junction, Eldoret</p>
          </div>
          
          <div className="flex gap-12">
            <Instagram size={20} className="text-white/30 hover:text-[#C6A75E] cursor-pointer transition-colors" />
            <Facebook size={20} className="text-white/30 hover:text-[#C6A75E] cursor-pointer transition-colors" />
          </div>

          <div className="text-[10px] uppercase tracking-[0.6em] text-[#C6A75E] italic">
            Where Elegance Lives.
          </div>
        </div>
        <div className="mt-20 text-center text-[9px] tracking-[0.8em] text-white/10 uppercase">
          © 2026 Southern Springs Restaurant Digital Presence
        </div>
      </footer>

    </div>
  );
};

export default App;