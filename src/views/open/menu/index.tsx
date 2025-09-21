import { MenuSection } from "./components/MenuSection";
import heroImage from "@/assets/home/landing-BVR1dppl.jpg";
import Logo from '@/components/template/Logo'

const Menu = () => {
  const signatureCoffees = [
    { 
      name: "Cappuccino", 
      price: 70, 
      description: "Rich espresso with steamed milk and foam", 
      isPopular: true 
    },
    { 
      name: "Café Latte", 
      price: 80, 
      description: "Smooth espresso with steamed milk", 
      isPopular: true 
    },
    { 
      name: "Café Mocha", 
      price: 100, 
      description: "Coffee with chocolate and steamed milk" 
    },
    { 
      name: "Vanilla Cappuccino", 
      price: 120, 
      description: "Classic cappuccino with vanilla flavor" 
    },
    { 
      name: "Hazelnut Latte", 
      price: 120, 
      description: "Rich latte with hazelnut syrup" 
    },
  ];

  const garlicBread = [
    { name: "Cheesy Garlic Bread", price: 110 },
    { name: "Stuffed Cheese Garlic Bread", price: 150 },
  ];

  const pasta = [
    { name: "Arrabita Penne Pasta", price: 120 },
    { name: "Alfredo Penne Pasta", price: 140 },
    { name: "Mac & Cheese Baked Pasta", price: 175 },
  ];

  const maggi = [
    { name: "Veg Maggi", price: 79 },
    { name: "Cheese Maggi", price: 99 },
    { name: "Chilli Garlic Maggi", price: 110 },
    { name: "Tandoori Maggi", price: 120 },
    { name: "Peri Peri Cheese Maggi", price: 120 },
  ];

  const burgers = [
    { name: "Aloo Tikki Burger", price: 69 },
    { name: "Classic Veggie Burger", price: 79 },
    { name: "Peri Peri Cheese Burger", price: 99 },
  ];

  const shakes = [
    { name: "Vanilla Shake", price: 80 },
    { name: "Chocolate Shake", price: 99 },
    { name: "Strawberry Shake", price: 99 },
    { name: "Kitkat Shake", price: 120 },
    { name: "Oreo Shake", price: 120 },
    { name: "Brownie Shake", price: 130 },
    { name: "Nutella Shake", price: 150 },
  ];

  const otherBeverages = [
    { name: "Water Bottle", price: 20 },
    { name: "Cold Drink 250ml", price: 30 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
         <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary-deep"></div>
        <div className="relative z-10 text-center text-white px-4">
            <Logo type="streamline" className="justify-center mx-auto"  mode="dark" logoWidth={180} />
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-4 tracking-tight">
            Café Menu
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto">
            Discover our carefully crafted selection of premium coffees, delicious food, and refreshing beverages
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <div className="px-4 py-16">
        <MenuSection title="Signature Coffees" items={signatureCoffees} category="coffee" />
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div>
            <MenuSection title="Garlic Bread" items={garlicBread} category="food" />
          </div>
          <div>
            <MenuSection title="Burgers" items={burgers} category="food" />
          </div>
        </div>

        <MenuSection title="Pasta" items={pasta} category="food" />
        <MenuSection title="Maggi" items={maggi} category="food" />
        <MenuSection title="Shakes & Beverages" items={shakes} category="beverages" />
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <MenuSection title="Other Beverages" items={otherBeverages} category="beverages" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;