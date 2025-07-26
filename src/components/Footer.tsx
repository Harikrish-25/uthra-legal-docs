import { Building2, Phone, MapPin, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8" />
              <h3 className="text-xl font-bold">Uthra Job Centre</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted partner for all legal documentation services including MOD, Sales, and Settlement processes.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                MOD (Mortgage) Documentation
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Sales Documentation
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Settlement Services
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Main Road, Example City, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">
            © {currentYear} Uthra Job Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;