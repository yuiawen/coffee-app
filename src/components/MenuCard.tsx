import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MenuCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  type: 'coffee' | 'food';
  onViewDetail?: (id: number, type: 'coffee' | 'food') => void;
}

const MenuCard = ({ id, name, description, price, image_url, type, onViewDetail }: MenuCardProps) => {
  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border-border h-fit">
      <div className="aspect-[4/3] overflow-hidden bg-coffee-light">
        {image_url ? (
          <img 
            src={image_url} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-warm">
            <span className="text-3xl">{type === 'coffee' ? '☕' : '🍽️'}</span>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-heading text-coffee-primary line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-coffee-primary">
            {formatPrice(price)}
          </span>
        </div>
        
        <div className="flex gap-2">
          {onViewDetail && id && (
            <Button 
              onClick={() => onViewDetail(id, type)}
              variant="outline"
              size="sm"
              className="flex-1 border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
            >
              Detail
            </Button>
          )}
          <Button 
            size="sm"
            className="flex-1 bg-gradient-coffee shadow-coffee hover:shadow-warm"
          >
            Tambah
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;