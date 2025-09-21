import { MenuCard } from "./MenuCard";

interface MenuItem {
  name: string;
  price: number;
  description?: string;
  isPopular?: boolean;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  category: string;
}

export const MenuSection = ({ title, items, category }: MenuSectionProps) => {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-primary flex-1"></div>
        <h2 className="text-2xl font-bold text-primary bg-primary bg-clip-text px-4">
          {title}
        </h2>
        <div className="h-px bg-primary flex-1"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            name={item.name}
            price={item.price}
            description={item.description}
            isPopular={item.isPopular}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};