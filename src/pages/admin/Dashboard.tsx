import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState("");
  const [stats, setStats] = useState({
    totalCoffees: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    
    if (!token) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu",
        variant: "destructive"
      });
      navigate('/admin/login');
      return;
    }

    setAdminUser(user || 'Admin');

    // Fetch dashboard stats (placeholder)
    // const fetchStats = async () => {
    //   const response = await fetch('/api/admin/stats', {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   });
    //   const data = await response.json();
    //   setStats(data);
    // };

    // Dummy data for demo
    setStats({
      totalCoffees: 25,
      totalOrders: 150,
      totalRevenue: 3750000,
      recentOrders: [
        { id: 1, customer: "John Doe", item: "Cappuccino", amount: 22000, time: "10:30" },
        { id: 2, customer: "Jane Smith", item: "Latte", amount: 25000, time: "10:15" },
        { id: 3, customer: "Bob Wilson", item: "Espresso", amount: 15000, time: "09:45" }
      ]
    });
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem admin"
    });
    navigate('/admin/login');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-coffee-primary text-coffee-cream shadow-coffee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-coffee-cream rounded-full flex items-center justify-center">
                <span className="text-coffee-primary font-bold text-sm">☕</span>
              </div>
              <div>
                <h1 className="font-heading text-xl font-bold">Caffè Lento Admin</h1>
                <p className="text-sm text-coffee-light">Panel Manajemen</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm">Selamat datang, {adminUser}</span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-coffee-cream text-coffee-cream hover:bg-coffee-cream hover:text-coffee-primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Produk Kopi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-primary">
                {stats.totalCoffees}
              </div>
              <p className="text-xs text-muted-foreground">
                Produk aktif di katalog
              </p>
            </CardContent>
          </Card>

          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-primary">
                {stats.totalOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                Pesanan bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pendapatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-coffee-primary">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Pendapatan bulan ini
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Management Actions */}
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-coffee-primary font-heading">
                Manajemen Produk
              </CardTitle>
              <CardDescription>
                Kelola katalog produk kopi Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-gradient-coffee shadow-coffee"
                onClick={() => navigate('/admin/products')}
              >
                Kelola Semua Produk
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                  onClick={() => navigate('/admin/products/coffees')}
                >
                  ☕ Minuman
                </Button>
                <Button 
                  variant="outline" 
                  className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                  onClick={() => navigate('/admin/products/foods')}
                >
                  🍽️ Makanan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-coffee-primary font-heading">
                Pesanan Terbaru
              </CardTitle>
              <CardDescription>
                Aktivitas pesanan terkini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentOrders.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-coffee-primary">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.item}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(order.amount)}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-coffee-primary font-heading">
                Navigasi Cepat
              </CardTitle>
              <CardDescription>
                Akses fitur-fitur utama admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                  onClick={() => navigate('/')}
                >
                  <span className="text-2xl mb-1">🏠</span>
                  <span className="text-sm">Website</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                  onClick={() => navigate('/admin/products')}
                >
                  <span className="text-2xl mb-1">☕</span>
                  <span className="text-sm">Produk</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                >
                  <span className="text-2xl mb-1">📊</span>
                  <span className="text-sm">Laporan</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream"
                >
                  <span className="text-2xl mb-1">⚙️</span>
                  <span className="text-sm">Pengaturan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;