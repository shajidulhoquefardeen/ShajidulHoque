"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import SectionWrapper from "@/components/shared/SectionWrapper";

const FAQ_DATA = [
  {
    question: "What services do you actually offer?",
    answer: "I wear a few different hats. In the digital space, I design and develop custom websites, craft brand identities, and create high-end UI/UX designs. On the industrial side, I leverage my chemistry background to do food research and product formulation. I also combine both worlds by designing premium, data-heavy presentations (PPTs) tailored specifically for corporate and industrial clients.",
  },
  {
    question: "Are your food formulations used in the real market?",
    answer: "Yes, absolutely. My product formulations are currently being adopted and produced by several prominent local companies across Bangladesh. I specialize in research and development for the dairy, beverage, and confectionery sectors, ensuring that everything I formulate meets rigorous quality control and market standards.",
  },
  {
    question: "Why hire a designer who is also a chemist?",
    answer: "It is a rare mix, but it gives me a unique edge. Chemistry taught me rigorous analytical thinking, structuring complex data, and quality control. Design taught me how to make that data beautiful, user-friendly, and marketable. Whether I am formulating a new beverage or building a web-based inventory management system, the core goal is the same: creating a flawless, scalable product.",
  },
  {
    question: "What kind of presentations (PPTs) do you design?",
    answer: "I design highly specialized, visually striking presentations that turn dense industrial or technical data into compelling narratives. Whether you need a startup pitch deck, a complex corporate report, or technical slides for R&D, I ensure your information is not just seen, but actually understood and remembered.",
  },
  {
    question: "How do we start working together?",
    answer: "It all starts with a simple conversation. Whether you need a brand new website, a UI/UX overhaul, a professional pitch deck, or consultation on a food formulation project, just drop me a message below. We will discuss your goals, timeline, and how we can float your ideas into existence.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        {/* ─── Headers ─── */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-black/50 border border-terminal-yellow/50">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-terminal-yellow">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight">
            Your Questions, <span className="text-terminal-yellow">Answered</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            From digital ecosystems to industrial food formulations, I build solutions that work. Here are a few common questions about my expertise and how we can collaborate.
          </p>
        </div>

        {/* ─── Accordion ─── */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-terminal-yellow/40 hover:shadow-[0_0_20px_rgba(229,162,32,0.1)]"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left group outline-none"
                >
                  <span className="text-white font-medium text-lg md:text-xl pr-8">
                    {item.question}
                  </span>
                  <div className="shrink-0 text-terminal-yellow transition-transform duration-300">
                    {isOpen ? (
                      <Minus size={24} weight="bold" />
                    ) : (
                      <Plus size={24} weight="bold" className="group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="w-full h-px bg-white/10 mb-4" />
                        <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
