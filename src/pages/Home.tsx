import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CoffeeCard from "@/components/CoffeeCard";
import heroImage from "@/assets/hero-coffee.jpg";

// Dummy data - akan diganti dengan data dari API CodeIgniter 4
const featuredCoffees = [
  {
    id: 1,
    name: "Espresso",
    description: "Kopi hitam pekat dengan cita rasa yang kuat dan aromatis",
    price: 15000
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Perpaduan espresso dengan steamed milk yang creamy",
    price: 22000
  },
  {
    id: 3,
    name: "Latte",
    description: "Espresso dengan susu panas yang lembut dan foam tipis",
    price: 25000
  },
  {
    id: 4,
    name: "Americano",
    description: "Espresso yang dicampur dengan air panas",
    price: 18000
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleViewDetail = (id: number) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-primary/80 to-coffee-secondary/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Temukan Cita Rasa
            <span className="block text-coffee-cream">Kopi Terbaik</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-coffee-cream/90 animate-fade-in">
            Nikmati pengalaman kopi yang tak terlupakan dengan koleksi premium kami.
            Setiap tegukan menghadirkan kelezatan yang sempurna untuk hari Anda.
          </p>
          <div className="space-x-4 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-coffee-cream text-coffee-primary hover:bg-coffee-light shadow-warm"
              onClick={() => navigate('/menu')}
            >
              Jelajahi Menu
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary"
              onClick={() => navigate('/about')}
            >
              Tentang Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-coffee-primary mb-4">
              Menu Favorit Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Koleksi kopi pilihan yang paling disukai pelanggan kami. 
              Setiap varian dipilih khusus untuk memberikan pengalaman rasa yang istimewa.
            </p>
          </div>

          {/* Products Grid */}
          {/* Placeholder for dynamic data loop: <?php foreach($featured_coffees as $kopi): ?> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredCoffees.map((coffee) => (
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

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-coffee shadow-coffee"
              onClick={() => navigate('/menu')}
            >
              Lihat Semua Menu
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-coffee-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-coffee-primary mb-6">
                Cerita Di Balik KopiKata
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sejak 2020, kami telah berkomitmen menghadirkan kopi berkualitas tinggi 
                dari petani lokal Indonesia. Setiap biji kopi dipilih dengan teliti untuk 
                memastikan cita rasa yang konsisten dan memuaskan.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Dengan perpaduan tradisi dan inovasi, kami menciptakan pengalaman kopi 
                yang autentik namun tetap modern, cocok untuk semua kalangan.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                onClick={() => navigate('/about')}
              >
                Baca Selengkapnya
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-warm rounded-2xl p-8 shadow-warm">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-coffee-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Varian Kopi</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-coffee-primary mb-2">10K+</div>
                    <div className="text-sm text-muted-foreground">Pelanggan Puas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-coffee-primary mb-2">4.8</div>
                    <div className="text-sm text-muted-foreground">Rating Bintang</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-coffee-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Layanan Online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;