"use client";

import { ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div>
            <span className="text-white text-2xl font-extrabold tracking-tight">
              SOTARA
            </span>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering UK businesses with modern SaaS platforms — simple,
              scalable, and built for the way you work.
            </p>
            <p className="mt-5 text-xs text-gray-500">
              Registered in England and Wales
            </p>
            <p className="text-xs text-gray-500">
              Companies House No: [XXXXXXXX]
            </p>
            <p className="text-xs text-gray-500">VAT No: [GB XXXXXXXXX]</p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-white transition-colors duration-200"
                >
                  Our Platforms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@sotara.co.uk"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <Mail size={15} className="text-sotara-500" />
                  hello@sotara.co.uk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-200"
                >
                  <ExternalLink size={15} className="text-sotara-500" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2026 SOTARA Ltd. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">United Kingdom</p>
        </div>
      </div>
    </footer>
  );
}
