import { useEffect, useState } from "react";
import { MenuSection } from "./components/MenuSection";
import heroImage from "@/assets/home/landing-BVR1dppl.jpg";
import Logo from "@/components/template/Logo";
import { getAllItemsNoLimit } from "@/services/ItemService";

interface Item {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  formattedPrice?: string;
  isActive: boolean;
}

interface CategoryItems {
  [categoryName: string]: Item[];
}

const Menu = () => {
  const [categoryItems, setCategoryItems] = useState<CategoryItems>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllItemsNoLimit();
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
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchItems();
  }, []);

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
          <Logo
            type="streamline"
            className="justify-center mx-auto"
            mode="dark"
            logoWidth={180}
          />
          <h1 className="text-5xl md:text-6xl text-white font-bold mb-4 tracking-tight">
            Café Menu
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 max-w-2xl mx-auto">
            Discover our carefully crafted selection of premium coffees,
            delicious food, and refreshing beverages
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <div className="px-4 py-16 space-y-12">
        {Object.entries(categoryItems).map(([categoryName, items]) => (
          <MenuSection
            key={categoryName}
            title={categoryName}
            items={items.map((i) => ({
              name: i.name,
              price: i.price,
              description: i.description,
              isPopular: false, // Optional: you can add logic for popular items if needed
            }))}
            category={categoryName.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
