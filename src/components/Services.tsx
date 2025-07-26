import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Home, Handshake, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "MOD (Mortgage)",
      icon: FileText,
      color: "primary",
      requirements: [
        "Aadhar card – loaner",
        "Aadhar card – 2 witnesses",
        "Previous document",
        "Online patta"
      ]
    },
    {
      title: "Sales",
      icon: Home,
      color: "secondary",
      requirements: [
        "Aadhar card – giver",
        "Aadhar card – getter",
        "Aadhar card – 2 witnesses",
        "GPS photo",
        "Previous document",
        "Online patta"
      ]
    },
    {
      title: "Settlement",
      icon: Handshake,
      color: "accent",
      requirements: [
        "Aadhar card – giver",
        "Aadhar card – getter",
        "Aadhar card – 2 witnesses",
        "GPS photo",
        "Previous document",
        "Online patta"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-light',
          text: 'text-primary',
          border: 'border-primary/20',
          badge: 'bg-primary text-primary-foreground'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-light',
          text: 'text-secondary',
          border: 'border-secondary/20',
          badge: 'bg-secondary text-secondary-foreground'
        };
      case 'accent':
        return {
          bg: 'bg-accent-light',
          text: 'text-accent-foreground',
          border: 'border-accent/30',
          badge: 'bg-accent text-accent-foreground'
        };
      default:
        return {
          bg: 'bg-primary-light',
          text: 'text-primary',
          border: 'border-primary/20',
          badge: 'bg-primary text-primary-foreground'
        };
    }
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Registration <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Requirements</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            We handle various types of legal documentation. Here are the required documents for each service category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);
            
            return (
              <Card 
                key={index} 
                className={`border-2 ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm`}
              >
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 ${colors.bg} rounded-3xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                  <Badge className={`${colors.badge} w-fit mx-auto text-xs sm:text-sm`}>
                    Required Documents
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-2 sm:space-y-3">
                  {service.requirements.map((requirement, reqIndex) => (
                    <div 
                      key={reqIndex}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                    >
                      <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <span className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                        {requirement}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-primary-light via-background to-secondary-light">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">Important Note</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Please ensure all documents are original and valid. Our team will verify each document 
                before processing to ensure compliance with legal requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;