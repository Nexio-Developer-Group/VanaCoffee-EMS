import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MenuItemProps {
  name: string;
  price: number;
  description?: string;
  isPopular?: boolean;
  category: string;
}

export const MenuCard = ({ name, price, description, isPopular }: MenuItemProps) => {
  return (
    <Card className="group hover:shadow-warm transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h5 className="font-semibold text-card-primary group-hover:text-primary-deep transition-colors">
                {name}
              </h5>
              {isPopular && (
                <Badge variant="secondary" className="bg-secondary text-white border-0 text-xs">
                  Popular
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-primary leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">₹{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};