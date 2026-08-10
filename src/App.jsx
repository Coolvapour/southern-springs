import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Calendar, 
  Users, 
  Wine,
  Instagram,
  Facebook,
  Award
} from 'lucide-react';

// --- Expanded Menu Data ---
const MENU_DATA = {
  appetizers: [
    { name: "Spanish Omelette", price: 130, desc: "Farm-fresh eggs with bell peppers and spring onions.", pairing: "Fresh Milk" },
    { name: "Kebab", price: 70, desc: "Spiced minced meat grilled with aromatic herbs.", pairing: "Delmonte Juice" },
    { name: "Samosa", price: 20, desc: "Crisp golden pastry with savory spiced filling.", pairing: "White Coffee" },
    { name: "Boiled Egg", price: 30, desc: "Farm-fresh, perfectly timed.", pairing: "Black Tea" },
    { name: "Smokie", price: 40, desc: "Classic street-style smoked sausage.", pairing: "Soda" }
  ],
  mains: [
    { name: "Chicken Kuku Stew", price: 330, desc: "Traditional slow-simmered poultry in a rich aromatic broth.", pairing: "Pineapple Juice" },
    { name: "Ugali Samaki Fry", price: 300, desc: "Fresh lake fish, crisp-seared, served with traditional ugali.", pairing: "Lemon Tea" },
    { name: "Beef Stew", price: 170, desc: "Tender cubes of prime beef braised with garden vegetables.", pairing: "Fresh Milk" },
    { name: "Ugali Matumbo Fry", price: 150, desc: "Authentic tripe delicacies, seasoned and wok-fried.", pairing: "White Coffee" },
    { name: "Githeri Special", price: 120, desc: "Corn and bean medley slow-cooked to perfection.", pairing: "Bone Soup" },
    { name: "Nyama Choma Portion", price: 450, desc: "Flame-grilled goat meat seasoned with sea salt.", pairing: "Kachumbari & Soda" }
  ],
  staples: [
    { name: "Pilau Special", price: 150, desc: "Fragrant rice spiced with our signature coastal blend.", pairing: "Delmonte Juice" },
    { name: "Managu Special", price: 150, desc: "Nutrient-rich traditional greens sautéed in cream.", pairing: "Fresh Milk" },
    { name: "Chapati (2pcs)", price: 60, desc: "Hand-rolled, flaky layered flatbread.", pairing: "Beef Stew" },
    { name: "Mokimo", price: 140, desc: "Mashed potatoes, maize, and pumpkin leaves.", pairing: "Stew" }
  ],
  beverages: [
    { name: "White Coffee", price: 40, desc: "Rich roasted beans with silky steamed milk." },
    { name: "Fresh Milk (500ml)", price: 70, desc: "Farm-to-table chilled refreshment." },
    { name: "Delmonte Juice", price: 200, desc: "Premium selection of fruit nectars." },
    { name: "Bone Soup (Cup)", price: 50, desc: "Rich, collagen-heavy nutrient broth." },
    { name: "African Tea", price: 60, desc: "Strong tea brewed with milk and ginger." }
  ]
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('mains');
  const [pairing, setPairing] = useState(null);
  const [partySize, setPartySize] = useState("2");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    }, 2000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1E8] font-sans selection:bg-[#C6A75E] selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="w-12 h-12 relative">
              <img 
                src="/logo.png" 
                alt="Elim Springs Springs Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-10 h-10 border border-[#C6A75E] flex items-center justify-center rotate-45 group-hover:bg-[#C6A75E] transition-all duration-500"><span class="-rotate-45 font-serif text-[#C6A75E] group-hover:text-black font-bold text-xs">SR</span></div>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif tracking-widest uppercase leading-none">Elim Springs</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#C6A75E]">Hotel & Excellence</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <button onClick={() => scrollTo('menu')} className="hover:text-[#C6A75E] transition-colors">Menu</button>
            <button onClick={() => scrollTo('reserve')} className="hover:text-[#C6A75E] transition-colors">Reservations</button>
            <button onClick={() => scrollTo('location')} className="hover:text-[#C6A75E] transition-colors">Find Us</button>
            <button onClick={() => scrollTo('reserve')} className="bg-[#C6A75E] text-black px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-lg shadow-[#C6A75E]/10">
              Book Table
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover scale-105"
            alt="Elim Springs Springs Gourmet"
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
            <Sparkles size={14} className="text-[#C6A75E]" />
            <span className="uppercase tracking-[0.3em] text-[9px] font-bold">Revisiting Culinary Tradition</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[1.1]">
            Exceptional Taste. <br />
            <span className="italic text-[#C6A75E]">Refined Comfort.</span>
          </h1>
          <p className="text-lg text-white/60 mb-12 max-w-xl mx-auto font-light">
            Located at the iconic Noble Hotel Junction, Elim Springs Hotel is Eldoret's premier destination for artisanal Kenyan cuisine.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => scrollTo('reserve')} className="bg-[#C6A75E] text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
              Make a Reservation
            </button>
            <button onClick={() => scrollTo('menu')} className="border border-white/20 backdrop-blur-sm px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
              View Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Menu & Pairing */}
      <section id="menu" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif mb-4 italic">The Culinary Engine</h2>
            <p className="text-[#C6A75E] tracking-[0.3em] uppercase text-[10px] font-bold">Hand-Picked Selections</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="flex gap-6 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                {Object.keys(MENU_DATA).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => { setActiveTab(cat); setPairing(null); }}
                    className={`whitespace-nowrap px-8 py-3 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === cat ? 'bg-[#C6A75E] border-[#C6A75E] text-black' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {MENU_DATA[activeTab].map((item, idx) => (
                  <div 
                    key={idx}
                    onMouseEnter={() => setPairing(item)}
                    className="group p-8 border border-white/5 bg-white/[0.01] hover:border-[#C6A75E]/30 transition-all cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-2xl font-serif mb-2 group-hover:text-[#C6A75E] transition-colors">{item.name}</h3>
                      <p className="text-white/40 text-sm font-light italic">{item.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-serif text-[#C6A75E]">Ksh {item.price}</span>
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-all mt-2">
                        View Pairing <ChevronRight size={10} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-[#0F2E2C]/20 border border-[#C6A75E]/20 p-8 rounded-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A75E]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#C6A75E] mb-8 font-bold flex items-center gap-2">
                  <Wine size={14} /> Pairing Advice
                </h4>
                
                {pairing ? (
                  <div className="animate-in fade-in slide-in-from-right-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Enhance your {pairing.name}:</p>
                    <h5 className="text-3xl font-serif mb-6 text-[#C6A75E]">{pairing.pairing || "House Blend Coffee"}</h5>
                    <div className="space-y-4 mb-8">
                      <div className="flex gap-4 items-start">
                        <div className="w-1 h-1 bg-[#C6A75E] rounded-full mt-2"></div>
                        <p className="text-xs text-white/60 leading-relaxed italic">"The flavor profile here balances the aromatics of this dish perfectly."</p>
                      </div>
                    </div>
                    <button onClick={() => scrollTo('reserve')} className="w-full py-4 border border-[#C6A75E] text-[#C6A75E] text-[10px] uppercase tracking-widest font-bold hover:bg-[#C6A75E] hover:text-black transition-all">
                      Add to Table
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-20 opacity-20">
                    <Utensils className="mx-auto mb-4" size={32} />
                    <p className="text-[10px] uppercase tracking-[0.2em]">Select a dish to see sommelier notes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Gallery */}
      <section className="bg-black py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="relative group overflow-hidden h-[600px]">
            <img src="https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Kenyan Chicken" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-12">
              <div>
                <h3 className="text-4xl font-serif mb-2 italic">The Springs Kuku</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#C6A75E]">Flame-Grilled & Farm-Fresh</p>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden h-[600px] md:mt-24">
            <img src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Traditional Fries" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-12">
              <div>
                <h3 className="text-4xl font-serif mb-2 italic">Golden Cuts</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#C6A75E]">Hand-sliced Highland Potatoes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-32 px-6 bg-[#0F2E2C]/5">
        <div className="max-w-5xl mx-auto bg-black border border-[#C6A75E]/20 overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-16 border-r border-[#C6A75E]/10">
              <Award className="text-[#C6A75E] mb-8" size={40} />
              <h2 className="text-4xl font-serif mb-6 italic leading-tight">Secure Your <br />Springs Experience</h2>
              <p className="text-white/40 text-sm mb-8 leading-relaxed">
                Join us at the heart of Elim Springs. We recommend booking 24 hours in advance for groups larger than four.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                  <Clock className="text-[#C6A75E]" size={14} /> Open Daily: 7:00 AM — 10:00 PM
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                  <Users className="text-[#C6A75E]" size={14} /> Private Dining Available
                </div>
              </div>
            </div>

            <div className="p-12 md:p-16">
              {bookingSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-[#C6A75E] rounded-full flex items-center justify-center mb-6">
                    <Star className="text-black" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif mb-2 italic">Table Reserved</h3>
                  <p className="text-white/40 text-xs uppercase tracking-widest">A confirmation has been prepared for you.</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-8">
                  <div className="grid gap-8">
                    <div className="relative group">
                      <input type="text" required className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#C6A75E] transition-all peer" placeholder=" " />
                      <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest text-white/30 transition-all peer-focus:-top-4 peer-focus:text-[#C6A75E] peer-[:not(:placeholder-shown)]:-top-4">Name</label>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="relative">
                        <select value={partySize} onChange={(e) => setPartySize(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#C6A75E] appearance-none cursor-pointer">
                          {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n} className="bg-black">{n} Guests</option>)}
                        </select>
                        <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#C6A75E]">Party Size</label>
                      </div>
                      <div className="relative">
                        <input type="date" required className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#C6A75E]" />
                        <label className="absolute left-0 -top-4 text-[10px] uppercase tracking-widest text-[#C6A75E]">Date</label>
                      </div>
                    </div>
                  </div>
                  <button disabled={isBooking} className="w-full bg-[#C6A75E] text-black font-black py-5 uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3">
                    {isBooking ? "Confirming..." : "Complete Reservation"}
                    <ChevronRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Maps Section */}
      <section id="location" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-5xl font-serif mb-8 italic">Find Our Sanctuary</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C6A75E]/30 flex items-center justify-center group-hover:bg-[#C6A75E] transition-all">
                    <MapPin className="text-[#C6A75E] group-hover:text-black transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C6A75E] mb-2">Location</h4>
                    <p className="text-white/60 font-light leading-relaxed">South Rift Jetlink Motors, Noble Hotel Junction, Eldoret-Nakuru Hwy, Eldoret.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#C6A75E]/30 flex items-center justify-center group-hover:bg-[#C6A75E] transition-all">
                    <Phone className="text-[#C6A75E] group-hover:text-black transition-colors" size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C6A75E] mb-2">Inquiries</h4>
                    <p className="text-white/60 font-light leading-relaxed">+254 722 286 280</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 h-[450px] w-full border border-[#C6A75E]/20 p-2 bg-white/5 rounded-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d703.1411845246081!2d35.29632609055586!3d0.5081798000000025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1781018dc81a20a9%3A0xa4085f0ef036da26!2sSOUTHRIFT%20JETLINK%20MOTORS!5e1!3m2!1sen!2ske!4v1772291528168!5m2!1sen!2ske" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.8) invert(0.92) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-0 hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif uppercase tracking-widest mb-4">Elim Springs</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Noble Hotel Junction • Eldoret, Kenya</p>
          </div>
          
          <div className="flex gap-8">
            <Instagram size={18} className="text-white/30 hover:text-[#C6A75E] cursor-pointer" />
            <Facebook size={18} className="text-white/30 hover:text-[#C6A75E] cursor-pointer" />
          </div>

          <div className="text-[10px] tracking-[0.6em] text-[#C6A75E] font-bold">
            TIMELESS EXCELLENCE.
          </div>
        </div>
        <div className="mt-20 text-center text-[9px] tracking-[0.8em] text-white/10 uppercase">
          © 2026 Elim Springs Hotel & Resort
        </div>
      </footer>
    </div>
  );
};

export default App;
