import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await apiService.login(loginData.username, loginData.password);
      
      if (result.success) {
        localStorage.setItem('admin_user', loginData.username);
        
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${loginData.username}`,
        });
        
        navigate('/admin/dashboard');
      } else {
        throw new Error(result.message || 'Login gagal');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Username atau password salah';
      toast({
        title: "Login Gagal",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password tidak cocok",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await apiService.register(registerData.username, registerData.password);
      
      if (result.success) {
        toast({
          title: "Registrasi Berhasil!",
          description: "Akun admin telah dibuat. Silakan login.",
        });

        // Reset form
        setRegisterData({
          username: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        throw new Error(result.message || 'Registrasi gagal');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat akun';
      toast({
        title: "Registrasi Gagal",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-coffee flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-coffee-cream rounded-full flex items-center justify-center">
              <span className="text-coffee-primary font-bold text-lg">☕</span>
            </div>
            <span className="font-heading text-2xl font-bold text-coffee-cream">
              KopiKata Admin
            </span>
          </div>
          <p className="text-coffee-cream/80">
            Panel Admin untuk Manajemen Katalog Kopi
          </p>
        </div>

        <Card className="border-coffee-light/20 shadow-coffee bg-card/95 backdrop-blur">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-coffee-primary">Login Admin</CardTitle>
                <CardDescription>
                  Masuk ke panel admin untuk mengelola katalog kopi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      name="username"
                      type="text"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      placeholder="Masukkan username"
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Masukkan password"
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-coffee shadow-coffee"
                  >
                    {isLoading ? 'Memproses...' : 'Login'}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-coffee-primary">Register Admin</CardTitle>
                <CardDescription>
                  Buat akun admin baru untuk mengelola sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      name="username"
                      type="text"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      placeholder="Pilih username"
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="Buat password"
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="Ulangi password"
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-coffee shadow-coffee"
                  >
                    {isLoading ? 'Memproses...' : 'Register'}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            className="text-coffee-cream hover:text-coffee-light hover:bg-coffee-cream/10"
            onClick={() => navigate('/')}
          >
            ← Kembali ke Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;