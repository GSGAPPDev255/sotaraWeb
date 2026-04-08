"use client";

import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";

interface ProductCardProps {
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  features: string[];
  accentColor: string;
}

export default function ProductCard({
  title,
  tagline,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  features,
  accentColor,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col"
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
        <Icon size={26} className={iconColor} />
      </div>

      {/* Title & tagline */}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className={`text-sm font-medium mt-1 ${accentColor}`}>{tagline}</p>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-3 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="mt-5 space-y-2 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 size={15} className="text-sotara-500 mt-0.5 shrink-0" />
            <span className="text-sm text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-7 pt-5 border-t border-gray-100">
        <a
          href="#"
          className="text-sm font-semibold text-sotara-600 hover:text-sotara-700 transition-colors duration-200 inline-flex items-center gap-1 group"
        >
          Learn more
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>
    </motion.div>
  );
}
