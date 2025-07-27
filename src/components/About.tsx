import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Award, Clock } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Building2,
      title: "Established Office",
      description: "Trusted service provider with years of experience"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Professional staff ensuring accurate documentation"
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Committed to excellence in all legal processes"
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Efficient handling of all your documentation needs"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-4">
            Uthra Job Centre is a reliable and experienced office providing end-to-end documentation services 
            for various legal transactions including MOD & MOD(Cancellation), Sale, and Settlement. We ensure hassle-free 
            and accurate processing of your documents.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary-light to-secondary-light rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 bg-gradient-to-r from-primary-light via-background to-secondary-light shadow-xl">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                To provide comprehensive, reliable, and efficient legal documentation services that simplify 
                complex processes for our clients while maintaining the highest standards of accuracy and professionalism.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;