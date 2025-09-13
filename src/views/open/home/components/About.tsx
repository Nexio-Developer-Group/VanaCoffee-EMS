import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Award, Users } from "lucide-react";
import cafeInteriorImage from "@/assets/home/cafe-interior.jpg";

const About = () => {
  const features = [
    {
      icon: <Coffee className="h-8 w-8 text-caramel" />,
      title: "Premium Coffee",
      description: "We source the finest coffee beans to ensure every cup is exceptional"
    },
    {
      icon: <Heart className="h-8 w-8 text-caramel" />,
      title: "Cozy Ambiance",
      description: "A warm, welcoming atmosphere perfect for work, study, or relaxation"
    },
    {
      icon: <Award className="h-8 w-8 text-caramel" />,
      title: "Best Prices",
      description: "Enjoy premium quality at the most competitive prices in Udaipur"
    },
    {
      icon: <Users className="h-8 w-8 text-caramel" />,
      title: "Friendly Service",
      description: "Our passionate team is dedicated to making your visit memorable"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="font-playfair text-primary-deep text-4xl md:text-5xl font-bold text-coffee-dark mb-6">
              About Vana Coffee
            </h2>
            <p className="sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              Located in the heart of Udaipur near the beautiful Gulab Bagh, Vana Coffee Cafe 
              is your destination for exceptional coffee experiences. We&apos;ve created a space where 
              quality meets affordability, and every cup tells a story of passion and craftsmanship.
            </p>
            <p className="sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is simple: to serve the best coffee in Udaipur while providing an 
              atmosphere that feels like home. Whether you&apos;re catching up with friends, working 
              on your laptop, or simply enjoying a quiet moment, Vana Coffee is here for you.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-warm hover:shadow-coffee transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center text-primary-deep mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-coffee-dark text-primary-deep mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="animate-scale-in">
            <div className="relative">
              <img 
                src={cafeInteriorImage} 
                alt="Vana Coffee Cafe Interior"
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-coffee"
              />
              <div className="absolute inset-0 bg-gradient-coffee opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;