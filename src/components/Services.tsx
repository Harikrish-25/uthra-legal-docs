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
    <section id="services" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Registration <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Requirements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We handle various types of legal documentation. Here are the required documents for each service category.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colors = getColorClasses(service.color);
            
            return (
              <Card 
                key={index} 
                className={`border-2 ${colors.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-4 ${colors.bg} rounded-3xl flex items-center justify-center`}>
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                  <Badge className={`${colors.badge} w-fit mx-auto`}>
                    Required Documents
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {service.requirements.map((requirement, reqIndex) => (
                    <div 
                      key={reqIndex}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                    >
                      <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm font-medium text-foreground leading-relaxed">
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
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-primary-light via-background to-secondary-light">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Important Note</h3>
              <p className="text-muted-foreground leading-relaxed">
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