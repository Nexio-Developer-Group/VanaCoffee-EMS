import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import latteImage from "@/assets/home/latte-art.jpg";
import cappuccinoImage from "@/assets/home/cappuccino.jpg";

const MenuSection = () => {
  const coffeeItems = [
    {
      name: "Cappuccino",
      price: "₹70",
      description: "Rich espresso with steamed milk and foam",
      image: cappuccinoImage,
      popular: true
    },
    {
      name: "Café Latte",
      price: "₹80",
      description: "Smooth espresso with steamed milk",
      image: latteImage,
      popular: true
    },
    {
      name: "Café Mocha",
      price: "₹100",
      description: "Coffee with chocolate and steamed milk",
      image: latteImage,
    },
    {
      name: "Vanilla Cappuccino",
      price: "₹120",
      description: "Classic cappuccino with vanilla flavor",
      image: cappuccinoImage,
    },
    {
      name: "Hazelnut Latte",
      price: "₹120",
      description: "Rich latte with hazelnut syrup",
      image: latteImage,
    }
  ];

  const foodItems = [
    {
      category: "Garlic Bread",
      items: [
        { name: "Cheesy Garlic Bread", price: "₹110" },
        { name: "Stuffed Cheese Garlic Bread", price: "₹150" }
      ]
    },
    {
      category: "Pasta",
      items: [
        { name: "Arrabita Penne Pasta", price: "₹120" },
        { name: "Alfredo Penne Pasta", price: "₹140" },
        { name: "Mac & Cheese Baked Pasta", price: "₹175" }
      ]
    },
    {
      category: "Maggi",
      items: [
        { name: "Veg Maggi", price: "₹79" },
        { name: "Cheese Maggi", price: "₹99" },
        { name: "Chilli Garlic Maggi", price: "₹110" },
        { name: "Tandoori Maggi", price: "₹120" },
        { name: "Peri Peri Cheese Maggi", price: "₹120" }
      ]
    },
    {
      category: "Burgers",
      items: [
        { name: "Aloo Tikki Burger", price: "₹69" },
        { name: "Classic Veggie Burger", price: "₹79" },
        { name: "Peri Peri Cheese Burger", price: "₹99" }
      ]
    }
  ];

  const shakes = [
    { name: "Vanilla", price: "₹80" },
    { name: "Chocolate", price: "₹99" },
    { name: "Strawberry", price: "₹99" },
    { name: "Kitkat", price: "₹120" },
    { name: "Oreo", price: "₹120" },
    { name: "Brownie", price: "₹130" },
    { name: "Nutella", price: "₹150" }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-dark mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted coffee drinks and delicious food items, 
            all at the best prices in Udaipur.
          </p>
        </div>

        {/* Coffee Highlights */}
        <div className="mb-16">
          <h3 className="font-playfair text-3xl font-bold text-coffee-medium mb-8 text-center">
            Signature Coffees
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffeeItems.map((item, index) => (
              <Card key={index} className="overflow-hidden shadow-warm hover:shadow-coffee transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.popular && (
                    <Badge className="absolute top-3 right-3 bg-caramel text-coffee-dark">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-coffee-dark">{item.name}</h4>
                    <span className="text-xl font-bold text-coffee-medium">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Food Menu */}
        <div className="mb-16">
          <h3 className="font-playfair text-3xl font-bold text-coffee-medium mb-8 text-center">
            Food Menu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {foodItems.map((category, index) => (
              <Card key={index} className="shadow-warm">
                <CardContent className="p-6">
                  <h4 className="font-playfair text-2xl font-bold text-coffee-dark mb-4 border-b-2 border-caramel pb-2">
                    {category.category}
                  </h4>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-semibold text-coffee-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Shakes */}
        <div>
          <h3 className="font-playfair text-3xl font-bold text-coffee-medium mb-8 text-center">
            Shakes & Beverages
          </h3>
          <Card className="shadow-warm max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shakes.map((shake, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-foreground">{shake.name} Shake</span>
                    <span className="font-semibold text-coffee-medium">{shake.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <h5 className="font-semibold text-coffee-dark mb-2">Other Beverages</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Water Bottle</span>
                    <span className="font-semibold text-coffee-medium">₹20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Cold Drink 250ml</span>
                    <span className="font-semibold text-coffee-medium">₹30</span>
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

export default MenuSection;