
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Database, 
  Palette, 
  Network, 
  BrainCircuit, 
  ChevronRight,
  Download,
  Terminal,
  Cpu,
  Globe,
  MessageSquare,
  Send,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from './src/components/ChatBot';
import { CONTACT_INFO, SKILLS, MATRIX_SKILLS, EXPERIENCES, PROJECTS, EDUCATION } from './src/constants';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          DR13.DEV
        </span>
        <div className="hidden md:flex gap-14 text-lg font-medium text-slate-200">
          {['Accueil', 'Compétences', 'Expérience', 'Projets'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors text-xl">
              {item}
            </a>
          ))}
        </div>
        <a 
          href="#contact"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-base font-bold transition-all transform hover:scale-105"
        >
          Contactez-moi
        </a>
      </div>
    </nav>
  );
};

// Fixed SectionTitle by making children optional in the type definition to resolve TS errors in JSX
const SectionTitle = ({ children, subtitle }: { children?: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-white mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mt-4" />
  </div>
);

const App = () => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setMessage('');

    try {
      // IMPORTANT : Remplacez ces valeurs par les vôtres depuis EmailJS Dashboard
      const result = await emailjs.sendForm(
        'service_abdoul123',      // À remplacer
        'template_tevzl1j',     // À remplacer
        e.currentTarget,
        '0es-DpgVSQ9i78kiq'       // À remplacer
      );
      
      console.log('SUCCESS!', result.text);
      setMessage('✅ Message envoyé avec succès !');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log('FAILED...', error);
      setMessage('❌ Erreur lors de l\'envoi. Réessayez.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.2),transparent_70%)]" />
        <div className="container mx-auto px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
              Disponible pour de nouvelles opportunités
            </span>
            <div className="mb-6">
              <img 
                src="/projects/dra_cv.jpg" 
                alt="Photo de profil"
                className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full mx-auto border-4 border-blue-500/30 object-cover"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              {CONTACT_INFO.name.split(' ').map((word, i) => (
                <span key={i} className={i >= 2 ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Je suis spécialisé dans le <span className="text-white font-semibold">Développement Web, Full-Stack & Mobile</span>. De l'abstraction au concret, 
              Je conçois des solutions innovantes alliant performance et expérience utilisateur.
            </p>
            <div className="flex flex-wrap justify-center gap-5 mb-10">
              <div className="flex gap-4 mb-4 md:mb-0">
                <a href={CONTACT_INFO.github} target="_blank" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all text-slate-400 hover:text-blue-400">
                  <Github className="w-6 h-6" />
                </a>
                <a href={CONTACT_INFO.linkedin} target="_blank" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all text-slate-400 hover:text-blue-400">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <a href="#projets" className="px-8 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
                Voir mes projets
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Animated background element */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Matrix Skills Section */}
      <section className="py-16 bg-slate-900/30 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-2xl font-bold text-white mb-8 leading-tight">
                 Lien entre la logique et le monde 
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-12">
                <p>
                  Passionné par le lien entre les bases théoriques et leur application concrète, 
                  je construis mon profil sur une double compétence : les mathématiques appliquées 
                  et l’ingénierie logicielle
                  {/* Mon parcours commence à l'intersection de la théorie mathématique et de l'ingénierie logicielle pratique. 
                  Je ne me contente pas de créer des applications ; je connais des systèmes qui apprennent, 
                  s'adaptent et résolvent des problèmes réels. */}
                </p>
                <p>
                  {/* Qu'il s'agisse de déployer un réseau de neurones convolutionnels pour la vision par ordinateur 
                  ou d'optimiser une plateforme, j'apporte une approche ciblée sur les données à chaque ligne de code. */}
                  Qu’il s’agisse de développer une API robuste en Python,
                   de concevoir une interface fluide avec React ou d’intégrer des solutions d’IA, 
                  j’apporte une approche structurée et orientée données à chaque projet.
                </p>
                <p>Actuellement en recherche de stage académique,
                   je suis motivé à l'idée de mettre cette rigueur au
                    service d'une équipe tout en finalisant mon projet de fin d'études.</p>
              </div>
              
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">1+ An</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Expérience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2 ">10+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Projets Réalisés</div>
                </div>
              </div>
            </motion.div>

            {/* Right Matrix Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[80px]" />
              <div className="text-center mb-10">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Matrice des compétences</span>
              </div>
              
              
              <div className="space-y-6">
                {MATRIX_SKILLS.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-slate-500">{skill.level} %</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* En cours d'apprentissage Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Technologies et domaines que je développe actuellement pour enrichir mon expertise.">
            En cours d'apprentissage
          </SectionTitle>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Modèles de langage (LLM)</h3>
                    <span className="text-emerald-400 font-bold">30 %</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "30%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">IA générative</h3>
                    <span className="text-emerald-400 font-bold">35 %</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "35%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Apprentissage profond (Deep Learning)</h3>
                    <span className="text-emerald-400 font-bold">40 %</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="compétences" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Une maîtrise technique polyvalente pour répondre à tous les besoins numériques.">
            Compétences Techniques
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon === "Code2" && <Code2 className="w-6 h-6" />}
                  {skill.icon === "Globe" && <Globe className="w-6 h-6" />}
                  {skill.icon === "Smartphone" && <Smartphone className="w-6 h-6" />}
                  {skill.icon === "BrainCircuit" && <BrainCircuit className="w-6 h-6" />}
                  {skill.icon === "Palette" && <Palette className="w-6 h-6" />}
                  {skill.icon === "Network" && <Network className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="expérience" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Mon parcours professionnel en entreprise.">
            Expérience Professionnelle
          </SectionTitle>
          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-blue-500/30 pb-4"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-400 font-medium">
                      {exp.period}
                    </span>
                    <p className="text-slate-500 text-sm mt-2 flex items-center justify-end gap-1">
                      <MapPin className="w-4 h-4" /> {exp.location}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Réalisation en Entreprise */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Aperçu concret du projet développé lors de mon stage professionnel.">
            Réalisation en Entreprise
          </SectionTitle>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 md:p-8 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application de Gestion des Présences</h3>
                    <p className="text-slate-400 mb-4">IDT | Société Ivoirienne de Télédiffusion - Juin 2024 à Mars 2025</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">Laravel</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">MySQL</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">PHP</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden">
                <img 
                  src="/projects/idt-presence.png" 
                  alt="Dashboard de gestion des présences IDT" 
                  className="w-full h-auto object-contain bg-slate-800/50 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 md:p-8 bg-slate-900/50">
                <h4 className="text-lg font-bold text-white mb-4">Fonctionnalités clés développées :</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2 text-slate-300">
                    <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Tableau de bord en temps réel</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion des employés et stagiaires</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Suivi de présence et congés</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Historique et rapports détaillés</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Sélection de projets académiques et personnels innovants.">
            Projets Réalisés
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group flex flex-col"
              >
                <div className="h-80 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {idx % 2 === 0 ? <Terminal className="w-16 h-16 text-blue-500/20" /> : <Cpu className="w-16 h-16 text-emerald-500/20" />}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-6 flex gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                    {/* En savoir plus <ChevronRight className="w-4 h-4" /> */}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Info */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <SectionTitle>Formation</SectionTitle>
            <div className="space-y-8">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="group">
                  <span className="text-sm font-bold text-blue-500 mb-2 block">{edu.period}</span>
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{edu.degree}</h4>
                  <p className="text-slate-400 font-medium">{edu.school}</p>
                  <p className="text-slate-500 text-sm">{edu.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Personal */}
          <div className="space-y-12">
            <div>
              <SectionTitle>Mes Atouts</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Excellente qualité relationnelle", "Dynamique & Réactif", "Autonome dans l'action", "Capacité d'adaptation"].map(trait => (
                  <div key={trait} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-slate-300 font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* WhatsApp & Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* WhatsApp QR Card */}
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-slate-400 text-sm mb-4">Scannez pour discuter</p>
                  <div className="bg-white p-2 rounded-xl mb-4 shadow-xl">
                    <img src="/projects/whatsapp-qr.png" alt="WhatsApp QR" className="w-28 h-28 object-contain" />
                  </div>
                  <a href="https://wa.me/2250787838980" target="_blank" className="text-green-500 font-bold hover:underline flex items-center gap-2">
                    07 87 83 89 80 <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Info Card */}
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Autre numéro</p>
                      <p className="text-white font-medium">05 94 10 65 76</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Localisation</p>
                      <p className="text-white font-medium">{CONTACT_INFO.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email Direct</p>
                      <p className="text-white text-sm font-medium break-all">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 opacity-10 group-hover:scale-110 transition-transform">
                   <Mail className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Send className="w-6 h-6" /> Contactez-moi directement
                  </h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 ml-1">NOM</label>
                        <input 
                          type="text" 
                          name="user_name"
                          placeholder="Votre nom" 
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-white/70 ml-1">EMAIL</label>
                        <input 
                          type="email" 
                          name="user_email"
                          placeholder="Votre email" 
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-white/70 ml-1">MESSAGE</label>
                      <textarea 
                        name="message"
                        placeholder="Comment puis-je vous aider ?" 
                        rows={3}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none transition-all"
                        required
                      ></textarea>
                    </div>
                    {message && (
                      <div className="text-center text-sm font-bold">
                        {message}
                      </div>
                    )}
                    <button 
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-white text-blue-700 font-extrabold rounded-xl hover:bg-blue-50 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              DR13.DEV
            </span>
            <p className="text-slate-500 text-sm mt-2">© 2025 OUATTARA ABDOUL DRAMANE. Tous droits réservés.</p>
          </div>
          <div className="flex gap-6">
            <a href={CONTACT_INFO.github} className="text-slate-400 hover:text-white transition-colors"><Github /></a>
            <a href={CONTACT_INFO.linkedin} className="text-slate-400 hover:text-white transition-colors"><Linkedin /></a>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

// --- Render ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
