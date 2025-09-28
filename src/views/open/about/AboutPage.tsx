import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Award, Users } from "lucide-react";
import cafeInteriorImage from "@/assets/home/cafe-interior.jpg";
import heroImage from "@/assets/home/landing.jpg";

const AboutPage = () => {
  const features = [
    {
      icon: <Coffee className="h-8 w-8 text-caramel" />,
      title: "Premium Coffee",
      description:
        "We source the finest beans to ensure every cup is crafted to perfection.",
    },
    {
      icon: <Heart className="h-8 w-8 text-caramel" />,
      title: "Cozy Ambiance",
      description:
        "A warm, welcoming atmosphere perfect for work, study, or relaxation.",
    },
    {
      icon: <Award className="h-8 w-8 text-caramel" />,
      title: "Best Prices",
      description:
        "Enjoy specialty coffee without breaking the bank — quality meets value.",
    },
    {
      icon: <Users className="h-8 w-8 text-caramel" />,
      title: "Friendly Service",
      description:
        "Our passionate team is dedicated to making every visit memorable.",
    },
  ];

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <section style={{ backgroundImage: `url(${heroImage})` }} className="relative py-24 text-center text-white bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-deep/70" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-playfair text-white text-5xl md:text-6xl font-bold mb-6">
            About Vans Cafe
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-warm-white/80">
            More than just coffee — we&apos;re a place where stories brew, 
            friendships grow, and every sip feels like home.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-dark mb-6">
            Our Story
          </h2>
          <p className="sm:text-lg text-muted-foreground mb-6 leading-relaxed">
            Located in the heart of Udaipur near the beautiful Gulab Bagh,
            Vans Cafe is a passion project built around the love for coffee
            and community. From the very beginning, our goal has been to
            create a space that blends comfort, quality, and affordability.
          </p>
          <p className="sm:text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re catching up with friends, working on your next
            idea, or just seeking a peaceful escape — Vans Cafe is designed
            to be your go-to spot in the city.
          </p>
        </div>

        {/* Image */}
        <div className="relative animate-scale-in">
          <img
            src={cafeInteriorImage}
            alt="Inside Vans Cafe"
            className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-coffee"
          />
          <div className="absolute inset-0 bg-gradient-coffee opacity-20 rounded-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-warm-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-coffee-dark mb-10">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-warm hover:shadow-coffee transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-coffee-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-coffee-dark mb-6">
          Our Mission
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground sm:text-lg leading-relaxed">
          At Vans Cafe, our mission is simple: to serve the best coffee in
          Udaipur while providing a space that feels like home. Every cup
          tells a story of craftsmanship, passion, and community. We want
          you to feel welcome, inspired, and refreshed with every visit.
        </p>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-gradient-warm text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Come Experience Vans Cafe
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-warm-white/90">
            Whether you&apos;re here for the perfect brew or a cozy
            atmosphere, we can&apos;t wait to welcome you to our cafe near
            Gulab Bagh.
          </p>
            <button className="bg-white text-primary-text px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-deep hover:text-white transition-all"
                onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=24.5755247,73.6918862",
                "_blank"
              )
            }
            >
              Visit Us
            </button>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
