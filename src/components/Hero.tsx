import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Uthra
                </span>
                <br />
                Job Centre
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Your Trusted Partner for Legal Document Services
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-1 sm:gap-2 bg-primary-light px-3 sm:px-4 py-2 rounded-full">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">MOD Services</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-secondary-light px-3 sm:px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                <span className="text-xs sm:text-sm font-medium text-secondary">Sales & Settlement</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-accent-light px-3 sm:px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent-foreground" />
                <span className="text-xs sm:text-sm font-medium text-accent-foreground">Quick Processing</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                onClick={scrollToAbout}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More
                <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Professional legal documentation services"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg animate-pulse">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg animate-pulse delay-300">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;