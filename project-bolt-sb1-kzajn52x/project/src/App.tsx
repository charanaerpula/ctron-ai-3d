import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader2, Check } from 'lucide-react';

function BackgroundDots() {
  const dots = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`
    }
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dots.map(dot => (
        <div key={dot.id} className="dot" style={dot.style} />
      ))}
    </div>
  );
}

function CubeLogo() {
  return (
    <div className="cube-wrapper floating">
      <div className="cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
}

function HologramCube() {
  return (
    <div className="hologram-cube-wrapper">
      <div className="hologram-cube">
        <div className="hologram-face hologram-front"></div>
        <div className="hologram-face hologram-back"></div>
        <div className="hologram-face hologram-right"></div>
        <div className="hologram-face hologram-left"></div>
        <div className="hologram-face hologram-top"></div>
        <div className="hologram-face hologram-bottom"></div>
      </div>
    </div>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-black/90 border border-cyan-500/30 p-6 rounded-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2
        }}
        className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Check className="w-10 h-10 text-black" />
      </motion.div>
      <h3 className="text-xl font-semibold text-cyan-400 mb-2">Message Sent!</h3>
      <p className="text-cyan-300/80">We will contact you back soon.</p>
    </motion.div>
  );
}

function App() {
  const [stage, setStage] = useState<'connecting' | 'error'>('connecting');
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('error');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && email.trim()) {
      setSubmitted(true);
      setMessage('');
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundDots />
      <HologramCube />
      <div className="relative w-full max-w-2xl">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg blur-xl pulsing" />
        
        <div className="relative bg-black/80 p-8 rounded-lg border border-cyan-500/30 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center mb-2"
          >
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                rotateY: { duration: 1.2 }
              }}
            >
              <CubeLogo />
            </motion.div>
            <div className="ml-4">
              <div className="flex items-center gap-4">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-audiowide text-4xl text-white"
                >
                  C-tron 3D AI
                </motion.h1>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-audiowide text-sm text-white/70"
                >
                  prototype by charan
                </motion.span>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-cyan-300 mt-1"
              >
                GEN AI FOR 3D
              </motion.p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {stage === 'connecting' ? (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-cyan-400" />
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl"
                >
                  Connecting to server...
                </motion.p>
                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl text-red-500 mb-4"
                >
                  Unable to Connect to Server
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-400 mb-6"
                >
                  Our servers are currently under maintenance. Our team is working diligently to restore services.
                </motion.p>
                
                {!showContactForm ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContactForm(true)}
                    className="bg-cyan-500 text-black px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-cyan-400 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Developers
                  </motion.button>
                ) : submitted ? (
                  <SuccessMessage />
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full bg-gray-900 border border-cyan-500/30 rounded-lg p-4 text-cyan-50 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        required
                        className="w-full bg-gray-900 border border-cyan-500/30 rounded-lg p-4 text-cyan-50 focus:outline-none focus:border-cyan-500 transition-colors"
                        rows={4}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-cyan-500 text-black px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-cyan-400 transition-colors"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;