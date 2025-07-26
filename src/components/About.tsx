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
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Uthra Job Centre is a reliable and experienced office providing end-to-end documentation services 
            for various legal transactions including MOD (Mortgage), Sale, and Settlement. We ensure hassle-free 
            and accurate processing of your documents.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-light to-secondary-light rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 bg-gradient-to-r from-primary-light via-background to-secondary-light shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
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