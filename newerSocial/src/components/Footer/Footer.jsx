import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-blue-200 border-t-2 border-blue-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        
        {/* GRID LAYOUT FOR FULL RESPONSIVENESS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Logo + Copyright */}
          <div className="flex flex-col justify-between">
            <div className="mb-4 flex items-center">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-gray-600">
              &copy; 2025 NewerSocial. All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-blue-600">
              Company
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-700 text-gray-900" to="/features">Features</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/affiliate">Affiliate Program</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/press-kit">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-blue-600">
              Support
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-700 text-gray-900" to="/account">Account</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/help">Help</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/contact-us">Contact Us</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/customer-support">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase text-blue-600">
              Legals
            </h3>
            <ul className="space-y-3">
              <li><Link className="hover:text-blue-700 text-gray-900" to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link className="hover:text-blue-700 text-gray-900" to="/licensing">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Footer;
