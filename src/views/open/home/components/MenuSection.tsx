import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllItems } from "@/services/ItemService";
import latteImage from "@/assets/home/latte-art.jpg"; // default image
import cappuccinoImage from "@/assets/home/cappuccino.jpg"; // default image

interface Item {
  _id: string;
  name: string;
  description?: string;
  price: number;
  formattedPrice?: string;
  category: {
    _id: string;
    name: string;
  };
  images?: string[];
  ratings?: { average: number; reviewsCount: number };
  isActive: boolean;
}

interface CategoryItems {
  [categoryName: string]: Item[];
}

const MenuSection = () => {
  const [categoryItems, setCategoryItems] = useState<CategoryItems>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllItems({ activeOnly: true });
        if (res.status === 1 && Array.isArray(res.items)) {
          const grouped: CategoryItems = {};
          res.items.forEach((item: Item) => {
            if (!item.isActive) return;
            const categoryName = item.category?.name || "Other";
            if (!grouped[categoryName]) grouped[categoryName] = [];
            grouped[categoryName].push(item);
          });
          setCategoryItems(grouped);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <section id="menu" className="py-10 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-dark mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully crafted coffee drinks and delicious food
            items, all at the best prices in Udaipur.
          </p>
        </div>

        {Object.entries(categoryItems).map(([categoryName, items]) => (
          <div key={categoryName} className="mb-16">
            <h3 className="font-playfair text-3xl font-bold text-coffee-medium mb-8 text-center">
              {categoryName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                // Use first image if exists, otherwise fallback to default
                const image =
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : categoryName.toLowerCase().includes("coffee")
                    ? latteImage
                    : cappuccinoImage;

                const isPopular = item.ratings && typeof item.ratings.average === "number" && item.ratings.average >= 3; // optional logic

                return (
                  <Card
                    key={item._id}
                    className="overflow-hidden shadow-warm hover:shadow-coffee transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      {isPopular && (
                        <Badge className="absolute bg-secondary top-3 right-3 text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg text-coffee-dark">
                          {item.name}
                        </h4>
                        <span className="text-xl font-bold text-coffee-medium">
                          {item.formattedPrice || `₹${item.price}`}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
