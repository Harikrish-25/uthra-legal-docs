import { Building2, Phone, MapPin, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-lg sm:text-xl font-bold">Uthra Job Centre</h3>
            </div>
            <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              Your trusted partner for all legal documentation services including MOD, Sales, and Settlement processes.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm sm:text-base text-primary-foreground/80">
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                MOD (Mortgage) Documentation
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                Sales Documentation
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                Settlement Services
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2 text-sm sm:text-base text-primary-foreground/80">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2 justify-center sm:justify-start">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5" />
                <span>123 Main Road, Example City, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-primary-foreground/80">
            © {currentYear} Uthra Job Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;