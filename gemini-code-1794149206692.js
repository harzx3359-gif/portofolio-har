// src/App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, FileCode, Mail, 
  Github, Linkedin, Twitter, ExternalLink, GraduationCap 
} from 'lucide-react';

// --- Komponen Background Luar Angkasa ---
const StarBackground = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px #2c67ed`
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-spaceBlue/10 via-spaceDark/80 to-spaceDark" />
    </div>
  );
};

// --- Komponen Efek Mengetik ---
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, Math.max(isDeleting ? 50 : 150, parseInt(Math.random() * 100)));
    
    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span className="text-spaceBlue font-mono text-2xl md:text-3xl font-bold">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

// --- Komponen Utama Portfolio ---
export default function App() {
  const [activeTab, setActiveTab] = useState('projects');
  
  const navItems = [
    { id: 'home', icon: <User size={18} />, label: 'Home' },
    { id: 'about', icon: <Briefcase size={18} />, label: 'About' },
    { id: 'portfolio', icon: <FileCode size={18} />, label: 'Portfolio' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-spaceDark font-sans selection:bg-spaceBlue selection:text-white">
      <StarBackground />

      {/* Navbar Melayang */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 md:gap-6 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-spaceBlue/30 shadow-[0_0_20px_rgba(44,103,237,0.3)] hover:shadow-[0_0_30px_rgba(44,103,237,0.5)] transition-shadow duration-300"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-2 text-gray-300 hover:text-white hover:text-shadow-[0_0_8px_#2c67ed] transition-all group p-2 md:p-0"
            >
              <span className="group-hover:text-spaceBlue transition-colors">{item.icon}</span>
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </motion.div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* Section 1: Hero */}
        <section id="home" className="min-h-[85vh] flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-spaceBlue/50 shadow-[0_0_40px_rgba(44,103,237,0.4)] overflow-hidden mb-8"
          >
            {/* Ganti dengan URL foto asli Anda */}
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=2c67ed" alt="Profile" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            John Doe
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-10"
          >
            <Typewriter words={['Junior Developer', 'Tech Enthusiast', 'Problem Solver']} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-gray-400 max-w-lg text-lg"
          >
            Membangun antarmuka modern dan pengalaman digital yang luar biasa dari luasnya imajinasi hingga baris kode.
          </motion.p>
        </section>

        {/* Section 2: About Me */}
        <section id="about" className="py-24 border-t border-white/5">
          <motion.h2 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3 drop-shadow-[0_0_10px_#2c67ed]"
          >
            <User className="text-spaceBlue" size={36} /> About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-[0_0_15px_rgba(44,103,237,0.1)]"
            >
              <h3 className="text-xl font-semibold mb-4 text-spaceBlue flex items-center gap-2">
                <GraduationCap /> Pendidikan
              </h3>
              <div className="border-l-2 border-spaceBlue/30 pl-4 space-y-6">
                <div>
                  <h4 className="font-medium text-lg">Universitas Teknologi</h4>
                  <p className="text-gray-400 text-sm">S1 Teknik Informatika (2020 - 2024)</p>
                  <p className="text-gray-500 mt-2">Fokus pada rekayasa perangkat lunak dan pengembangan web modern.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-10 mb-4 text-spaceBlue flex items-center gap-2">
                <Briefcase /> Pengalaman
              </h3>
              <div className="border-l-2 border-spaceBlue/30 pl-4 space-y-6">
                <div>
                  <h4 className="font-medium text-lg">Frontend Intern</h4>
                  <p className="text-gray-400 text-sm">TechCorp Nusantara (2023 - Sekarang)</p>
                  <p className="text-gray-500 mt-2">Membangun dashboard interaktif menggunakan React dan Tailwind CSS.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 content-start"
            >
              {[
                { label: 'Projects Done', value: '12+', icon: <FileCode /> },
                { label: 'Experience', value: '1 Year', icon: <Briefcase /> },
                { label: 'Certificates', value: '5+', icon: <GraduationCap /> },
                { label: 'Coffee Cups', value: '999+', icon: <User /> }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 border border-spaceBlue/20 rounded-xl p-6 flex flex-col items-center text-center hover:border-spaceBlue hover:shadow-[0_0_20px_rgba(44,103,237,0.2)] transition-all">
                  <div className="text-spaceBlue mb-3">{stat.icon}</div>
                  <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 3: Portfolio */}
        <section id="portfolio" className="py-24 border-t border-white/5">
          <motion.h2 
             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 flex items-center justify-center gap-3 drop-shadow-[0_0_10px_#2c67ed]"
          >
            <FileCode className="text-spaceBlue" size={36} /> Portfolio
          </motion.h2>

          {/* Sistem Tab */}
          <div className="flex justify-center gap-4 mb-12">
            {['projects', 'certificates', 'tech stack'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full capitalize font-medium transition-all ${
                  activeTab === tab 
                  ? 'bg-spaceBlue text-white shadow-[0_0_15px_rgba(44,103,237,0.6)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'projects' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-black/30 border border-white/10 rounded-xl overflow-hidden group hover:border-spaceBlue/50 transition-colors">
                      <div className="h-48 bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        {/* Ganti dengan gambar project asli */}
                        <img src={`https://picsum.photos/seed/${item * 10}/400/300`} alt="Project" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-6 relative z-20 -mt-8">
                        <h4 className="text-xl font-bold mb-2">Space Project {item}</h4>
                        <p className="text-gray-400 text-sm mb-4">Aplikasi pemantauan orbit satelit secara real-time menggunakan React dan API NASA.</p>
                        <div className="flex gap-3">
                          <a href="#" className="flex items-center gap-1 text-sm text-spaceBlue hover:text-white transition-colors"><Github size={16}/> Repo</a>
                          <a href="#" className="flex items-center gap-1 text-sm text-spaceBlue hover:text-white transition-colors"><ExternalLink size={16}/> Live</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {['React Mastery', 'Frontend Developer', 'UI/UX Principles'].map((cert, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-spaceBlue/30 transition-colors">
                      <GraduationCap className="text-spaceBlue" size={32} />
                      <div>
                        <h4 className="font-bold">{cert}</h4>
                        <p className="text-sm text-gray-400">Dicoding / Coursera • 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'tech stack' && (
                <div className="flex flex-wrap justify-center gap-4">
                  {['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'TypeScript', 'Node.js', 'Git', 'Figma'].map((tech) => (
                    <span key={tech} className="px-6 py-3 rounded-lg bg-black/50 border border-spaceBlue/20 text-gray-300 font-mono shadow-[0_0_10px_rgba(44,103,237,0.1)]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="py-24 border-t border-white/5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-spaceBlue/30 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(44,103,237,0.15)]"
          >
            <h2 className="text-3xl font-bold mb-2 text-center drop-shadow-[0_0_8px_#2c67ed]">Initiate Sequence</h2>
            <p className="text-gray-400 text-center mb-8">Kirim pesan dan mari buat sesuatu yang luar biasa bersama.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nama Anda" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-spaceBlue focus:shadow-[0_0_10px_rgba(44,103,237,0.3)] transition-all" />
                <input type="email" placeholder="Email Anda" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-spaceBlue focus:shadow-[0_0_10px_rgba(44,103,237,0.3)] transition-all" />
              </div>
              <textarea rows="4" placeholder="Pesan transmisi..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-spaceBlue focus:shadow-[0_0_10px_rgba(44,103,237,0.3)] transition-all"></textarea>
              <button className="w-full py-4 rounded-lg bg-spaceBlue text-white font-bold tracking-widest hover:bg-blue-600 hover:shadow-[0_0_20px_#2c67ed] transition-all">
                KIRIM PESAN
              </button>
            </form>

            <div className="mt-12 flex justify-center gap-6">
              {[
                { icon: <Github />, link: "#" },
                { icon: <Linkedin />, link: "#" },
                { icon: <Twitter />, link: "#" }
              ].map((social, i) => (
                <a key={i} href={social.link} className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-spaceBlue hover:shadow-[0_0_15px_#2c67ed] transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}