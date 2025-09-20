import { Button } from "@/components/ui/Button";
import { MapPin, Star, Clock } from "lucide-react";
import heroImage from "@/assets/home/landing.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary-deep"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-playfair text-white text-4xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-white">Vans Cafe</span>
          </h1>
          <p className="text-sm md:text-2xl mb-8 text-warm-white/90 max-w-2xl mx-auto">
            Experience the finest coffee in Udaipur. Premium beans, exceptional ambiance,
            and unbeatable prices near Gulab Bagh.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-caramel" />
              <span>Near Gulab Bagh, Udaipur</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-caramel" />
              <span>Premium Quality Coffee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-caramel" />
              <span>Open 9 AM - 7 PM</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              variant="plain"
              className="border border-white text-white hover:text-white hover:bg-white/10"
            >
              View Our Menu
            </Button>
            <Button
              variant="plain"
              className="border border-white text-white hover:text-white hover:bg-white/10"
              onClick={() =>
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=24.5755247,73.6918862",
                    "_blank"
                  )
                }
            >
              Find Us
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute hidden sm:block bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;