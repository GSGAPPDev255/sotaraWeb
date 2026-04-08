"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ShieldCheck } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(99,102,241,0.10) 0%, transparent 65%), radial-gradient(ellipse at 30% 70%, rgba(20,184,166,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Decorative dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6366f1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-sotara-50 text-sotara-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-sotara-100">
            <ShieldCheck size={13} />
            Trusted by UK businesses
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08]"
        >
          Smarter operations,{" "}
          <span className="text-sotara-600">simply delivered.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          SOTARA provides modern SaaS platforms that help UK businesses manage
          leave, IT support, and visitor tracking — all in one place, without
          the complexity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#products"
            className="inline-flex items-center bg-sotara-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-sotara-700 transition-colors duration-200 shadow-lg shadow-sotara-600/20"
          >
            Explore Our Platforms
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl text-base font-semibold hover:border-sotara-300 hover:text-sotara-600 hover:bg-sotara-50 transition-all duration-200"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium"
        >
          <span>✓ No long-term contracts</span>
          <span className="hidden sm:inline text-gray-200">|</span>
          <span>✓ UK-based support</span>
          <span className="hidden sm:inline text-gray-200">|</span>
          <span>✓ GDPR compliant</span>
          <span className="hidden sm:inline text-gray-200">|</span>
          <span>✓ Onboarding in days</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#products"
        aria-label="Scroll to products"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-sotara-500 transition-colors duration-200"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
