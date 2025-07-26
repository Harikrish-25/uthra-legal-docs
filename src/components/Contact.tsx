import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-primary-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Contact <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Get in touch with us for all your legal documentation needs. We're here to help you with professional and reliable service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Get In Touch</h3>
            
            <Card className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-light rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Phone Number</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-light rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Office Address</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">123 Main Road, Example City, Tamil Nadu</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-light rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Business Hours</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 sm:pt-6">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = 'tel:+919876543210'}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <Card className="border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-muted/30 flex items-center justify-center relative overflow-hidden rounded-b-lg">
                  {/* Placeholder for Google Maps - Replace with actual embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.1876519751643!2d77.0266!3d10.3553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIxJzE5LjEiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-b-lg"
                    title="Uthra Job Centre Location"
                  ></iframe>
                  
                  {/* Overlay with office details */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Uthra Job Centre</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">123 Main Road, Example City, Tamil Nadu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;