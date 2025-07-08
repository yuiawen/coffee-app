import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiService, Coffee } from "@/services/api";

const CoffeeManagement = () => {
  const navigate = useNavigate();
  const { action, id } = useParams();
  const { toast } = useToast();
  
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Classic",
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Check admin authentication
    if (!apiService.isAuthenticated()) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login sebagai admin",
        variant: "destructive"
      });
      navigate('/admin/login');
      return;
    }

    // Load coffees data
    const fetchCoffees = async () => {
      try {
        setIsLoadingData(true);
        const data = await apiService.getCoffees();
        setCoffees(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data kopi",
          variant: "destructive"
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchCoffees();
  }, [navigate, toast]);

  useEffect(() => {
    // Load coffee data for editing
    if (action === 'edit' && id && coffees.length > 0) {
      const coffee = coffees.find(c => c.id === parseInt(id));
      if (coffee) {
        setFormData({
          name: coffee.name,
          description: coffee.description,
          price: coffee.price.toString(),
          category: coffee.category || "Classic",
          image: null
        });
      }
    }
  }, [action, id, coffees]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (action === 'add') {
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('description', formData.description);
        formDataObj.append('price', formData.price);
        if (formData.image) {
          formDataObj.append('image', formData.image);
        }

        await apiService.createCoffee(formDataObj);
        
        toast({
          title: "Produk Ditambahkan",
          description: `${formData.name} berhasil ditambahkan ke katalog`
        });
      } else if (action === 'edit' && id) {
        await apiService.updateCoffee(parseInt(id), {
          name: formData.name,
          description: formData.description,
          price: parseInt(formData.price),
          category: formData.category
        });

        toast({
          title: "Produk Diperbarui",
          description: `${formData.name} berhasil diperbarui`
        });
      }

      navigate('/admin/coffees');
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (coffeeId: number, coffeeName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${coffeeName}?`)) return;

    try {
      await apiService.deleteCoffee(coffeeId);
      setCoffees(prev => prev.filter(coffee => coffee.id !== coffeeId));
      
      toast({
        title: "Produk Dihapus",
        description: `${coffeeName} berhasil dihapus dari katalog`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus produk",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Add/Edit Form View
  if (action === 'add' || action === 'edit') {
    return (
      <div className="min-h-screen bg-background">
        {/* Admin Header */}
        <header className="bg-coffee-primary text-coffee-cream shadow-coffee">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-coffee-cream hover:text-coffee-light hover:bg-coffee-cream/10"
                  onClick={() => navigate('/admin/coffees')}
                >
                  ← Kembali
                </Button>
                <h1 className="font-heading text-xl font-bold">
                  {action === 'add' ? 'Tambah Produk' : 'Edit Produk'}
                </h1>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary"
                onClick={() => navigate('/admin/dashboard')}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-coffee-primary font-heading">
                {action === 'add' ? 'Tambah Produk Kopi Baru' : 'Edit Produk Kopi'}
              </CardTitle>
              <CardDescription>
                {action === 'add' 
                  ? 'Isi form di bawah untuk menambahkan produk baru ke katalog'
                  : 'Perbarui informasi produk kopi'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nama Produk *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Cappuccino Premium"
                    className="border-coffee-light focus:border-coffee-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Deskripsikan produk kopi Anda dengan menarik..."
                    className="border-coffee-light focus:border-coffee-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Harga (Rp) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="25000"
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 border border-coffee-light rounded-md focus:border-coffee-primary focus:outline-none"
                    >
                      <option value="Classic">Classic</option>
                      <option value="Milk Based">Milk Based</option>
                      <option value="Specialty">Specialty</option>
                      <option value="Cold Brew">Cold Brew</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Gambar Produk</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({...prev, image: e.target.files?.[0] || null}))}
                    className="border-coffee-light focus:border-coffee-primary"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 bg-gradient-coffee shadow-coffee"
                  >
                    {isLoading ? 'Menyimpan...' : (action === 'add' ? 'Tambah Produk' : 'Perbarui Produk')}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin/coffees')}
                    className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Coffee List View
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-coffee-primary text-coffee-cream shadow-coffee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-coffee-cream hover:text-coffee-light hover:bg-coffee-cream/10"
                onClick={() => navigate('/admin/dashboard')}
              >
                ← Dashboard
              </Button>
              <h1 className="font-heading text-xl font-bold">Manajemen Produk Kopi</h1>
            </div>
            <Button 
              className="bg-coffee-cream text-coffee-primary hover:bg-coffee-light shadow-warm"
              onClick={() => navigate('/admin/coffees/add')}
            >
              + Tambah Produk
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-coffee-light/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-coffee-primary font-heading">
              Daftar Produk Kopi
            </CardTitle>
            <CardDescription>
              Kelola semua produk kopi dalam katalog Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for PHP loop: <?php foreach($coffees as $kopi): ?> */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coffees.map((coffee) => (
                  <TableRow key={coffee.id}>
                    <TableCell>{coffee.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-coffee-primary">
                          {/* Placeholder: <?= $kopi['name'] ?> */}
                          {coffee.name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {/* Placeholder: <?= substr($kopi['description'], 0, 50) ?>... */}
                          {coffee.description.length > 50 
                            ? coffee.description.substring(0, 50) + '...'
                            : coffee.description
                          }
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {/* Placeholder: <?= $kopi['category'] ?> */}
                        {coffee.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {/* Placeholder: Rp <?= number_format($kopi['price'], 0, ',', '.') ?> */}
                      {formatCurrency(coffee.price)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {/* Placeholder: <?= date('d/m/Y', strtotime($kopi['created_at'])) ?> */}
                      {new Date(coffee.created_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                          onClick={() => navigate(`/admin/coffees/edit/${coffee.id}`)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(coffee.id, coffee.name)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* End placeholder: <?php endforeach; ?> */}

            {coffees.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Belum ada produk dalam katalog</p>
                <Button 
                  className="bg-gradient-coffee shadow-coffee"
                  onClick={() => navigate('/admin/coffees/add')}
                >
                  Tambah Produk Pertama
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoffeeManagement;