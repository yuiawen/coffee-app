import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CoffeeCard from "@/components/CoffeeCard";

// Dummy data - akan diganti dengan API calls ke CodeIgniter 4
const coffeeMenu = [
  {
    id: 1,
    name: "Espresso",
    description: "Kopi hitam pekat dengan cita rasa yang kuat dan aromatis. Dibuat dari biji kopi pilihan yang disangrai sempurna.",
    price: 15000,
    category: "Classic",
    ingredients: ["Espresso shot", "Hot water"],
    caffeine: "High"
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Perpaduan espresso dengan steamed milk yang creamy dan foam susu yang lembut. Cocok untuk pecinta kopi dengan tekstur halus.",
    price: 22000,
    category: "Milk Based",
    ingredients: ["Espresso shot", "Steamed milk", "Milk foam"],
    caffeine: "Medium"
  },
  {
    id: 3,
    name: "Latte",
    description: "Espresso dengan susu panas yang lembut dan foam tipis. Rasa kopi yang balance dengan kelembutan susu.",
    price: 25000,
    category: "Milk Based",
    ingredients: ["Espresso shot", "Steamed milk", "Light foam"],
    caffeine: "Medium"
  },
  {
    id: 4,
    name: "Americano",
    description: "Espresso yang dicampur dengan air panas. Memberikan rasa kopi yang kuat namun tidak terlalu pekat.",
    price: 18000,
    category: "Classic",
    ingredients: ["Espresso shot", "Hot water"],
    caffeine: "High"
  },
  {
    id: 5,
    name: "Mocha",
    description: "Kombinasi espresso, susu, dan cokelat yang menghasilkan rasa manis dan creamy. Perfect untuk pecinta cokelat.",
    price: 28000,
    category: "Specialty",
    ingredients: ["Espresso shot", "Steamed milk", "Chocolate syrup", "Whipped cream"],
    caffeine: "Medium"
  },
  {
    id: 6,
    name: "Macchiato",
    description: "Espresso dengan sedikit susu foam di atasnya. Memberikan kontras rasa yang unik antara pahit dan creamy.",
    price: 20000,
    category: "Classic",
    ingredients: ["Espresso shot", "Milk foam"],
    caffeine: "High"
  }
];

const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedCoffee, setSelectedCoffee] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Classic", "Milk Based", "Specialty"];

  useEffect(() => {
    if (id) {
      // Placeholder for API call: const coffee = await fetch(`/api/coffees/${id}`)
      const coffee = coffeeMenu.find(c => c.id === parseInt(id));
      setSelectedCoffee(coffee);
    }
  }, [id]);

  const filteredMenu = filter === "All" 
    ? coffeeMenu 
    : coffeeMenu.filter(coffee => coffee.category === filter);

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
            <div className="aspect-square bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <span className="text-8xl">☕</span>
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
                <div>
                  <h3 className="font-semibold text-coffee-primary mb-2">Komposisi:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {/* Placeholder: <?php foreach($kopi['ingredients'] as $ingredient): ?> */}
                    {selectedCoffee.ingredients.map((ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                    {/* Placeholder: <?php endforeach; ?> */}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-coffee-primary mb-2">Level Kafein:</h3>
                  <Badge variant={selectedCoffee.caffeine === 'High' ? 'destructive' : 'default'}>
                    {/* Placeholder: <?= $kopi['caffeine'] ?> */}
                    {selectedCoffee.caffeine}
                  </Badge>
                </div>
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
        {/* Placeholder for dynamic data: <?php foreach($coffees as $kopi): ?> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMenu.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              id={coffee.id}
              name={coffee.name}
              description={coffee.description}
              price={coffee.price}
              onViewDetail={handleViewDetail}
            />
          ))}
        </div>
        {/* End placeholder: <?php endforeach; ?> */}

        {filteredMenu.length === 0 && (
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