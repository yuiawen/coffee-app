import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MenuCard from "@/components/MenuCard";
import { apiService, Coffee, Food } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Menu = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { toast } = useToast();
  
  const [selectedItem, setSelectedItem] = useState<Coffee | Food | null>(null);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [activeTab, setActiveTab] = useState<'drinks' | 'foods'>('drinks');
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const drinkCategories = ["All", "Classic", "Milk Based", "Specialty"];
  const foodCategories = ["All", "Pastries", "Sandwiches", "Rice Bowl", "Heavy Meals"];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [coffeesData, foodsData] = await Promise.all([
          apiService.getCoffees(),
          apiService.getFoods()
        ]);
        setCoffees(coffeesData);
        setFoods(foodsData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load menu items';
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

    fetchMenuItems();
  }, [toast]);

  useEffect(() => {
    if (type && id && (coffees.length > 0 || foods.length > 0)) {
      const fetchItemDetail = async () => {
        try {
          if (type === 'coffee') {
            const coffee = await apiService.getCoffeeById(parseInt(id));
            setSelectedItem(coffee);
          } else if (type === 'food') {
            const food = await apiService.getFoodById(parseInt(id));
            setSelectedItem(food);
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load item details';
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive"
          });
          // Fallback to client-side filtering if API call fails
          if (type === 'coffee') {
            const foundCoffee = coffees.find(c => c.id === parseInt(id));
            setSelectedItem(foundCoffee || null);
          } else if (type === 'food') {
            const foundFood = foods.find(f => f.id === parseInt(id));
            setSelectedItem(foundFood || null);
          }
        }
      };

      fetchItemDetail();
    }
  }, [type, id, coffees, foods, toast]);

  const filteredDrinks = filter === "All" 
    ? coffees 
    : coffees.filter(coffee => coffee.category === filter);
    
  const filteredFoods = filter === "All" 
    ? foods 
    : foods.filter(food => food.category === filter);

  const handleViewDetail = (itemId: number, itemType: 'coffee' | 'food') => {
    navigate(`/menu/${itemType}/${itemId}`);
  };

  const handleBackToMenu = () => {
    navigate('/menu');
    setSelectedItem(null);
  };

  // Detail view for specific item
  if (selectedItem) {
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
              {selectedItem.image_url ? (
                <img 
                  src={selectedItem.image_url} 
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl">{type === 'coffee' ? '☕' : '🍽️'}</span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                {'category' in selectedItem && (
                  <Badge variant="secondary" className="mb-4">
                    {selectedItem.category}
                  </Badge>
                )}
                <h1 className="font-heading text-4xl font-bold text-coffee-primary mb-4">
                  {selectedItem.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {selectedItem.description}
                </p>
              </div>

              <div className="space-y-4">
                {'ingredients' in selectedItem && selectedItem.ingredients && selectedItem.ingredients.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-coffee-primary mb-2">Komposisi:</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedItem.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {'caffeine' in selectedItem && selectedItem.caffeine && (
                  <div>
                    <h3 className="font-semibold text-coffee-primary mb-2">Level Kafein:</h3>
                    <Badge variant={selectedItem.caffeine === 'High' ? 'destructive' : 'default'}>
                      {selectedItem.caffeine}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="text-3xl font-bold text-coffee-primary">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(selectedItem.price)}
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
            Menu Lengkap Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Jelajahi koleksi lengkap minuman dan makanan premium kami. 
            Setiap sajian dibuat dengan bahan berkualitas tinggi dan penuh dedikasi.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === 'drinks' ? 'default' : 'ghost'}
              onClick={() => {
                setActiveTab('drinks');
                setFilter('All');
              }}
              className={activeTab === 'drinks' ? 'bg-gradient-coffee shadow-coffee' : ''}
            >
              ☕ Minuman
            </Button>
            <Button
              variant={activeTab === 'foods' ? 'default' : 'ghost'}
              onClick={() => {
                setActiveTab('foods');
                setFilter('All');
              }}
              className={activeTab === 'foods' ? 'bg-gradient-coffee shadow-coffee' : ''}
            >
              🍽️ Makanan
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(activeTab === 'drinks' ? drinkCategories : foodCategories).map((category) => (
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

        {/* Menu Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTab === 'drinks' 
              ? filteredDrinks.map((coffee) => (
                  <MenuCard
                    key={`coffee-${coffee.id}`}
                    id={coffee.id}
                    name={coffee.name}
                    description={coffee.description}
                    price={coffee.price}
                    image_url={coffee.image_url}
                    type="coffee"
                    onViewDetail={handleViewDetail}
                  />
                ))
              : filteredFoods.map((food) => (
                  <MenuCard
                    key={`food-${food.id}`}
                    id={food.id}
                    name={food.name}
                    description={food.description}
                    price={food.price}
                    image_url={food.image_url}
                    type="food"
                    onViewDetail={handleViewDetail}
                  />
                ))
            }
          </div>
        )}

        {!isLoading && !error && 
         ((activeTab === 'drinks' && filteredDrinks.length === 0) ||
          (activeTab === 'foods' && filteredFoods.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              Tidak ada {activeTab === 'drinks' ? 'minuman' : 'makanan'} dalam kategori ini.
            </p>
            <Button 
              variant="outline"
              onClick={() => setFilter("All")}
              className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
            >
              Lihat Semua {activeTab === 'drinks' ? 'Minuman' : 'Makanan'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;