import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Phone, Navigation, Coffee } from "lucide-react";
import heroImage from "@/assets/home/landing.jpg";

const LocationPage = () => {
  return (
    <main className="bg-gradient-warm min-h-screen">
      {/* Hero Section */}
      <section style={{ backgroundImage: `url(${heroImage})` }} className="relative py-24 text-center text-white bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-deep/70" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-playfair text-white text-5xl md:text-6xl font-bold mb-6">
            Visit Vans Cafe
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-warm-white/80">
            Your cozy escape in the heart of Udaipur — near Gulab Bagh.
            Fresh brews, warm vibes, and the perfect hangout spot await you.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Location */}
          <Card className="shadow-warm">
            <CardContent className="p-6">
              <MapPin className="h-10 w-10 text-caramel mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-coffee-dark mb-2">
                Our Location
              </h3>
              <p className="text-muted-foreground">
                Near Gulab Bagh, Udaipur, Rajasthan, India.
              </p>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card className="shadow-warm">
            <CardContent className="p-6">
              <Clock className="h-10 w-10 text-caramel mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-coffee-dark mb-2">
                Opening Hours
              </h3>
              <p className="text-muted-foreground">
                9:00 AM - 10:30 PM <br />
                Monday - Sunday
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-warm">
            <CardContent className="p-6">
              <Phone className="h-10 w-10 text-caramel mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-coffee-dark mb-2">
                Contact Us
              </h3>
              <p className="text-muted-foreground">+91 88756 40905</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Button
            className="bg-white hover:bg-primary-deep transition-colors text-primary-text border-primary-text hover:text-white hover:border-white flex items-center space-x-2"
            aria-label="Get directions to Vans Cafe"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=24.5755247,73.6918862",
                "_blank"
              )
            }
          >
            <Navigation className="h-5 w-5" />
            <span>Get Directions</span>
          </Button>

          <Button
            className="bg-white hover:bg-primary-deep transition-colors text-primary-text border-primary-text hover:text-white hover:border-white flex items-center space-x-2"
            aria-label="Call Vans Cafe"
            onClick={() => window.open("tel:+918875640905")}
          >
            <Phone className="h-5 w-5" />
            <span>Call Now</span>
          </Button>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-coffee-dark mb-6">
            Why Visit Vans Cafe?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            From artisanal coffee to cozy seating, Vans Cafe is designed to
            give you a memorable experience. Whether you&apos;re working,
            catching up with friends, or simply enjoying a quiet moment —
            we&apos;ve got the perfect space for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-warm">
              <CardContent className="p-6">
                <Coffee className="h-10 w-10 text-caramel mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Specialty Coffee</h4>
                <p className="text-muted-foreground">
                  Freshly brewed blends sourced from the finest beans.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-warm">
              <CardContent className="p-6">
                <MapPin className="h-10 w-10 text-caramel mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Central Location</h4>
                <p className="text-muted-foreground">
                  Just steps away from Udaipur&apos;s iconic Gulab Bagh.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-warm">
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-caramel mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Open Everyday</h4>
                <p className="text-muted-foreground">
                  Drop by anytime — we&apos;re open from morning to night.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="shadow-warm overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d357.6501011622895!2d73.69188618599709!3d24.575524746290846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1758383987420!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <div className="text-center text-white px-4">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-red-600" />
                    <h3 className="text-2xl font-semibold mb-2">Vans Cafe</h3>
                    <p className="text-black text-sm mb-4 font-semibold">
                      Near Gulab Bagh, Udaipur
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default LocationPage;
