import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CoffeeCardProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  onViewDetail?: (id: number) => void;
}

const CoffeeCard = ({ id, name, description, price, image, onViewDetail }: CoffeeCardProps) => {
  // Format price to Indonesian Rupiah
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <div className="aspect-square overflow-hidden bg-coffee-light">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-warm">
            <span className="text-4xl">☕</span>
          </div>
        )}
      </div>
      
      <CardHeader className="space-y-2">
        <CardTitle className="text-coffee-primary font-heading">
          {/* Placeholder for dynamic data: <?= $kopi['name'] ?> */}
          {name}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {/* Placeholder for dynamic data: <?= $kopi['description'] ?> */}
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-primary">
            {/* Placeholder for dynamic data: <?= number_format($kopi['price'], 0, ',', '.') ?> */}
            {formatPrice(price)}
          </span>
        </div>
        
        {onViewDetail && id && (
          <Button 
            onClick={() => onViewDetail(id)}
            className="w-full bg-gradient-coffee shadow-coffee hover:shadow-warm"
          >
            Lihat Detail
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CoffeeCard;