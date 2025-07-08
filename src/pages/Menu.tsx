import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CoffeeCard from "@/components/CoffeeCard";
import { apiService, Coffee } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "Classic", "Milk Based", "Specialty"];

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getCoffees();
        setCoffees(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load coffees';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoffees();
  }, [toast]);

  useEffect(() => {
    if (id && coffees.length > 0) {
      const fetchCoffeeDetail = async () => {
        try {
          const coffee = await apiService.getCoffeeById(parseInt(id));
          setSelectedCoffee(coffee);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load coffee details';
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive"
          });
          // Fallback to client-side filtering if API call fails
          const foundCoffee = coffees.find(c => c.id === parseInt(id));
          setSelectedCoffee(foundCoffee || null);
        }
      };

      fetchCoffeeDetail();
    }
  }, [id, coffees, toast]);

  const filteredMenu = filter === "All" 
    ? coffees 
    : coffees.filter(coffee => coffee.category === filter);

  const handleViewDetail = (coffeeId: number) => {
    navigate(`/menu/${coffeeId}`);
  };

  const handleBackToMenu = () => {
    navigate('/menu');
    setSelectedCoffee(null);
  };

  // Detail view for specific coffee
  if (selectedCoffee) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="outline" 
            onClick={handleBackToMenu}
            className="mb-8 border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
          >
            ← Kembali ke Menu
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm overflow-hidden">
              {selectedCoffee.image_url ? (
                <img 
                  src={selectedCoffee.image_url} 
                  alt={selectedCoffee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl">☕</span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {/* Placeholder: <?= $kopi['category'] ?> */}
                  {selectedCoffee.category}
                </Badge>
                <h1 className="font-heading text-4xl font-bold text-coffee-primary mb-4">
                  {/* Placeholder: <?= $kopi['name'] ?> */}
                  {selectedCoffee.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {/* Placeholder: <?= $kopi['description'] ?> */}
                  {selectedCoffee.description}
                </p>
              </div>

              <div className="space-y-4">
                {selectedCoffee.ingredients && selectedCoffee.ingredients.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-coffee-primary mb-2">Komposisi:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedCoffee.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCoffee.caffeine && (
                  <div>
                    <h3 className="font-semibold text-coffee-primary mb-2">Level Kafein:</h3>
                    <Badge variant={selectedCoffee.caffeine === 'High' ? 'destructive' : 'default'}>
                      {selectedCoffee.caffeine}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="text-3xl font-bold text-coffee-primary">
                  {/* Placeholder: Rp <?= number_format($kopi['price'], 0, ',', '.') ?> */}
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(selectedCoffee.price)}
                </div>
                <Button size="lg" className="bg-gradient-coffee shadow-coffee">
                  Pesan Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menu list view
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-coffee-primary mb-4">
            Menu Kopi Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jelajahi koleksi lengkap minuman kopi premium kami. 
            Setiap varian dibuat dengan biji kopi berkualitas tinggi dan cinta.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={filter === category 
                ? "bg-gradient-coffee shadow-coffee" 
                : "border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Coffee Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card border-border rounded-lg p-6 animate-pulse">
                <div className="aspect-square bg-coffee-light/30 rounded-lg mb-4"></div>
                <div className="h-4 bg-coffee-light/30 rounded mb-2"></div>
                <div className="h-3 bg-coffee-light/20 rounded mb-4"></div>
                <div className="h-6 bg-coffee-light/30 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Gagal memuat menu: {error}
            </p>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
            >
              Coba Lagi
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                id={coffee.id}
                name={coffee.name}
                description={coffee.description}
                price={coffee.price}
                image_url={coffee.image_url}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Tidak ada produk dalam kategori ini.
            </p>
            <Button 
              variant="outline"
              onClick={() => setFilter("All")}
              className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
            >
              Lihat Semua Menu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;