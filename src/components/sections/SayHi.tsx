"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  Phone,
  Clock,
  PaperPlaneTilt,
  CheckCircle,
  CircleNotch,
  CaretDown,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { CONTACT_INFO } from "@/lib/constants";

export default function SayHi() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl section-heading mb-12">
          Say Hi
        </h2>

        {/* ─── Contact card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl border border-space-border-highlight/30 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* ─── Left — Info ─── */}
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Let&apos;s Start a<br />
                  Conversation
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md mb-8">
                  Whether you&apos;re looking to build a new digital frontier with AI or
                  discuss the precision of industrial R&D, my signal is always
                  open. Let&apos;s bridge the gap between imagination and execution.
                </p>

                {/* Contact details */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                      <EnvelopeSimple size={18} weight="regular" className="text-terminal-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Email</p>
                      <p className="text-sm text-white/80">{CONTACT_INFO.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                      <Phone size={18} weight="regular" className="text-terminal-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Phone</p>
                      <p className="text-sm text-white/80">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                      <Clock size={18} weight="regular" className="text-terminal-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-mono uppercase tracking-wider">Response Time</p>
                      <p className="text-sm text-white/80">{CONTACT_INFO.responseTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm font-mono text-white/50 hover:text-white/70 transition-colors">
                    <CaretDown
                      size={14}
                      weight="bold"
                      className="transition-transform group-open:rotate-180"
                    />
                    What to Expect
                  </summary>
                  <ul className="mt-4 space-y-2 text-sm text-white/40 pl-6">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-yellow mt-1">•</span>
                      Free consultation to understand your needs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-yellow mt-1">•</span>
                      Detailed project proposal within 48 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-yellow mt-1">•</span>
                      Regular updates throughout development
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-yellow mt-1">•</span>
                      Ongoing support and maintenance included
                    </li>
                  </ul>
                </details>
              </div>
            </div>

            {/* ─── Right — Form ─── */}
            <div className="p-8 sm:p-10 lg:p-12 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-terminal-yellow/50 focus:ring-terminal-yellow/20 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.example"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-terminal-yellow/50 focus:ring-terminal-yellow/20 rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2"
                  >
                    Project Details
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell me about your automation needs, current challenges, and project goals..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-terminal-yellow/50 focus:ring-terminal-yellow/20 rounded-lg resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formState === "sending" || formState === "sent"}
                  className={`w-full h-12 rounded-xl font-mono text-sm font-semibold transition-all duration-300 ${
                    formState === "sent"
                      ? "bg-terminal-green text-space-black"
                      : formState === "error"
                      ? "bg-red-500 text-white"
                      : "bg-terminal-yellow text-space-black hover:bg-terminal-amber hover:shadow-lg hover:shadow-terminal-yellow/20"
                  }`}
                >
                  {formState === "sending" && (
                    <>
                      <CircleNotch size={18} weight="bold" className="animate-spin mr-2" />
                      Sending...
                    </>
                  )}
                  {formState === "sent" && (
                    <>
                      <CheckCircle size={18} weight="fill" className="mr-2" />
                      Message Sent!
                    </>
                  )}
                  {formState === "error" && "Failed — Try Again"}
                  {formState === "idle" && (
                    <>
                      Send Message
                      <PaperPlaneTilt size={18} weight="fill" className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
