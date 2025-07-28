import { Building2, Phone, MapPin, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-lg sm:text-xl font-bold">Uthra Job Centre</h3>
            </div>
            <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              Your trusted partner for all legal documentation services including
              MOD, Sales, and Settlement processes.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-sm sm:text-base text-primary-foreground/80">
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                MOD Documentation
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                MOD (Cancel) Documentation
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
                <span>+91 9790272078</span>
              </div>
              <div className="flex items-start gap-2 justify-center sm:justify-start">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5" />
                <span>Dr Moorthy Road, Kumbakonam, Tamil Nadu</span>
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