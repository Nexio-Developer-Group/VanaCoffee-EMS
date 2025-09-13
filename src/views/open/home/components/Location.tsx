import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";

const Location = () => {
  return (
    <section id="location" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-dark mb-4">
            Visit Us
          </h2>
          <p className="sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find us in the heart of Udaipur, conveniently located near the famous Gulab Bagh.
            We&apos;re easy to reach and always ready to serve you.
          </p>
        </div>

        {/* Info + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Location */}
            <Card className="shadow-warm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-caramel mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-coffee-dark mb-2">Our Location</h5>
                    <p className="text-muted-foreground">
                      Near Gulab Bagh, Udaipur, Rajasthan, India.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="shadow-warm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-caramel mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-coffee-dark mb-2">Opening Hours</h5>
                    <div className="space-y-1 text-muted-foreground">
                      <p>9:00 AM - 7:00 PM (Monday - Sunday)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="shadow-warm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-caramel mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-coffee-dark mb-2">Contact Us</h5>
                    <p className="text-muted-foreground mb-2">+91 7821864174</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                  className="bg-white hover:bg-primary-deep transition-colors text-primary-text border-primary-text hover:text-white hover:border-white flex items-center space-x-2"
                  aria-label="Get directions to Vana Coffee Cafe"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=24.57217517811864,73.69017057558877",
                    "_blank"
                  )
                }
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </Button>
              <Button
                className="bg-white hover:bg-primary-deep transition-colors text-primary-text border-primary-text hover:text-white hover:border-white flex items-center space-x-2"
                aria-label="Call Vana Coffee Cafe"
                onClick={() => window.open("tel:+917821864174")}
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </Button>
            </div>
          </div>

          {/* Map Embed */}
          <Card className="shadow-warm overflow-hidden">
  <CardContent className="p-0">
    <div className="relative aspect-[4/3] w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.493040933573!2d73.69017057558877!3d24.57217517811864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5ab8eb06ef9%3A0x9740323b2c786116!2sGulab%20Bagh!5e0!3m2!1sen!2sin!4v1757768134982!5m2!1sen!2sin"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
        <div className="text-center text-white px-4">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-caramel" />
          <h3 className="text-xl font-semibold mb-2">Vana Coffee Cafe</h3>
          <p className="text-warm-white/80">Near Gulab Bagh, Udaipur</p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

        </div>
      </div>
    </section>
  );
};

export default Location;
