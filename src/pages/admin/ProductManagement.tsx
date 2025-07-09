import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiService, Coffee, Food } from "@/services/api";
import { Plus, Edit3, Trash2 } from "lucide-react";

type ProductType = 'coffees' | 'foods';

const ProductManagement = () => {
  const navigate = useNavigate();
  const { type, action, id } = useParams();
  const { toast } = useToast();
  
  const [activeType, setActiveType] = useState<ProductType>((type as ProductType) || 'coffees');
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Coffee | Food | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Category options
  const coffeeCategories = ["Classic", "Milk Based", "Specialty", "Cold Brew"];
  const foodCategories = ["Pastries", "Sandwiches", "Rice Bowl", "Heavy Meals"];

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

    // Load data
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        const [coffeesData, foodsData] = await Promise.all([
          apiService.getCoffees(),
          apiService.getFoods()
        ]);
        setCoffees(coffeesData);
        setFoods(foodsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data produk",
          variant: "destructive"
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: activeType === 'coffees' ? coffeeCategories[0] : foodCategories[0],
      image: null
    });
    setEditingItem(null);
  };

  const handleEdit = (item: Coffee | Food) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: 'category' in item ? item.category || "" : "",
      image: null
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    setFormData(prev => ({
      ...prev,
      category: activeType === 'coffees' ? coffeeCategories[0] : foodCategories[0]
    }));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      formDataObj.append('price', formData.price);
      if (formData.category) {
        formDataObj.append('category', formData.category);
      }
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }

      if (editingItem) {
        // Update existing item
        if (activeType === 'coffees') {
          await apiService.updateCoffee(editingItem.id, formDataObj);
          const updatedCoffees = await apiService.getCoffees();
          setCoffees(updatedCoffees);
        } else {
          await apiService.updateFood(editingItem.id, formDataObj);
          const updatedFoods = await apiService.getFoods();
          setFoods(updatedFoods);
        }
        
        toast({
          title: "Produk Diperbarui",
          description: `${formData.name} berhasil diperbarui`
        });
      } else {
        // Create new item
        if (activeType === 'coffees') {
          await apiService.createCoffee(formDataObj);
          const updatedCoffees = await apiService.getCoffees();
          setCoffees(updatedCoffees);
        } else {
          await apiService.createFood(formDataObj);
          const updatedFoods = await apiService.getFoods();
          setFoods(updatedFoods);
        }
        
        toast({
          title: "Produk Ditambahkan",
          description: `${formData.name} berhasil ditambahkan ke katalog`
        });
      }

      setIsDialogOpen(false);
      resetForm();
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

  const handleDelete = async (item: Coffee | Food) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${item.name}?`)) return;

    try {
      if (activeType === 'coffees') {
        await apiService.deleteCoffee(item.id);
        setCoffees(prev => prev.filter(coffee => coffee.id !== item.id));
      } else {
        await apiService.deleteFood(item.id);
        setFoods(prev => prev.filter(food => food.id !== item.id));
      }
      
      toast({
        title: "Produk Dihapus",
        description: `${item.name} berhasil dihapus dari katalog`
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

  const currentItems = activeType === 'coffees' ? coffees : foods;
  const currentCategories = activeType === 'coffees' ? coffeeCategories : foodCategories;

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
              <h1 className="font-heading text-xl font-bold">
                Manajemen Produk
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-coffee-cream text-coffee-primary hover:bg-coffee-light shadow-warm"
                  onClick={handleAdd}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Produk
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Edit Produk' : `Tambah ${activeType === 'coffees' ? 'Minuman' : 'Makanan'} Baru`}
                  </DialogTitle>
                  <DialogDescription>
                    {editingItem 
                      ? 'Perbarui informasi produk di bawah ini.'
                      : `Isi form di bawah untuk menambahkan ${activeType === 'coffees' ? 'minuman' : 'makanan'} baru.`
                    }
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Produk *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      required
                      placeholder={activeType === 'coffees' ? 'Contoh: Cappuccino Premium' : 'Contoh: Sandwich Club'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                      required
                      rows={3}
                      placeholder="Deskripsikan produk dengan menarik..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Harga (Rp) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                        required
                        min="0"
                        placeholder="25000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image">Gambar Produk</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData(prev => ({...prev, image: e.target.files?.[0] || null}))}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex-1 bg-gradient-coffee shadow-coffee"
                    >
                      {isLoading ? 'Menyimpan...' : (editingItem ? 'Perbarui' : 'Tambah')}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={activeType === 'coffees' ? 'default' : 'ghost'}
              onClick={() => setActiveType('coffees')}
              className={activeType === 'coffees' ? 'bg-gradient-coffee shadow-coffee' : ''}
            >
              ☕ Minuman ({coffees.length})
            </Button>
            <Button
              variant={activeType === 'foods' ? 'default' : 'ghost'}
              onClick={() => setActiveType('foods')}
              className={activeType === 'foods' ? 'bg-gradient-coffee shadow-coffee' : ''}
            >
              🍽️ Makanan ({foods.length})
            </Button>
          </div>
        </div>

        <Card className="border-coffee-light/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-coffee-primary font-heading flex items-center justify-between">
              Daftar {activeType === 'coffees' ? 'Minuman' : 'Makanan'}
              <Badge variant="secondary" className="ml-2">
                {currentItems.length} produk
              </Badge>
            </CardTitle>
            <CardDescription>
              Kelola semua {activeType === 'coffees' ? 'minuman' : 'makanan'} dalam katalog Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingData ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Memuat data produk...</p>
              </div>
            ) : currentItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Belum ada {activeType === 'coffees' ? 'minuman' : 'makanan'} dalam katalog
                </p>
                <Button 
                  className="bg-gradient-coffee shadow-coffee"
                  onClick={handleAdd}
                >
                  Tambah {activeType === 'coffees' ? 'Minuman' : 'Makanan'} Pertama
                </Button>
              </div>
            ) : (
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
                  {currentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-coffee-primary">
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {item.description.length > 50 
                              ? item.description.substring(0, 50) + '...'
                              : item.description
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {'category' in item ? item.category : 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;