"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, HeadphonesIcon, Users } from "lucide-react";
import ProductCard from "./ProductCard";
import DemoModal from "./DemoModal";
import LeaveDemo from "./demos/LeaveDemo";
import TicketDemo from "./demos/TicketDemo";
import VentraDemo from "./demos/VentraDemo";

const products = [
  {
    id: "leave",
    title: "Leave System",
    tagline: "Effortless holiday management for modern teams",
    description:
      "Streamline how your employees request, approve, and track annual leave. Replace spreadsheets and email chains with a simple, auditable platform.",
    icon: CalendarDays,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    accentColor: "text-emerald-600",
    checkColor: "text-emerald-500",
    features: [
      "Custom approval workflows",
      "Real-time leave calendar",
      "UK bank holiday integration",
    ],
  },
  {
    id: "ticket",
    title: "Ticket System",
    tagline: "Resolve IT issues faster, frustrate your team less",
    description:
      "A clean, intuitive helpdesk for logging, triaging, and resolving IT support requests across your organisation.",
    icon: HeadphonesIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    accentColor: "text-blue-600",
    checkColor: "text-blue-500",
    features: [
      "Priority-based triage",
      "SLA tracking & alerts",
      "Smart KB deflection",
    ],
  },
  {
    id: "ventra",
    title: "Ventra",
    tagline: "Track visitors, staff, and assets in one place",
    description:
      "A modern visitor and staff management platform. Know exactly who is on-site at any moment with a fully digital sign-in experience.",
    icon: Users,
    iconBg: "bg-sotara-50",
    iconColor: "text-sotara-600",
    accentColor: "text-sotara-600",
    checkColor: "text-sotara-500",
    features: [
      "Digital sign-in kiosk",
      "Staff location awareness",
      "Audit trail & reporting",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const demoComponents: Record<string, React.ReactNode> = {
  leave: <LeaveDemo />,
  ticket: <TicketDemo />,
  ventra: <VentraDemo />,
};

const demoTitles: Record<string, string> = {
  leave: "Leave System — Interactive Demo",
  ticket: "Ticket System — Interactive Demo",
  ventra: "Ventra — Interactive Demo",
};

export default function Products() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <>
      <section id="products" className="bg-gray-50 py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-14">
            <p className="text-sotara-600 text-sm font-semibold tracking-widest uppercase">
              Our Platforms
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 tracking-tight">
              Everything your business needs
            </h2>
            <div className="w-16 h-1 bg-sotara-500 rounded-full mt-4" />
            <p className="text-gray-500 text-lg mt-5 max-w-xl leading-relaxed">
              Three focused SaaS products designed for UK businesses — each one
              built to simplify a critical part of your daily operations.
            </p>
          </div>

          {/* Cards grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.title} variants={cardVariants}>
                <ProductCard
                  {...product}
                  onDemo={() => setActiveDemo(product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo modals */}
      {activeDemo && (
        <DemoModal
          title={demoTitles[activeDemo]}
          onClose={() => setActiveDemo(null)}
        >
          {demoComponents[activeDemo]}
        </DemoModal>
      )}
    </>
  );
}
