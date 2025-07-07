import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

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
    
    try {
      // Placeholder for API call to CodeIgniter 4
      // const response = await fetch('http://localhost:8080/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData)
      // });
      
      // Simulate successful login
      if (loginData.username && loginData.password) {
        // Store token in localStorage (placeholder)
        // localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_token', 'dummy_token_for_demo');
        localStorage.setItem('admin_user', loginData.username);
        
        toast({
          title: "Login Berhasil!",
          description: `Selamat datang, ${loginData.username}`,
        });
        
        navigate('/admin/dashboard');
      } else {
        throw new Error('Username dan password harus diisi');
      }
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Password tidak cocok",
        variant: "destructive"
      });
      return;
    }

    try {
      // Placeholder for API call to CodeIgniter 4
      // const response = await fetch('http://localhost:8080/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username: registerData.username,
      //     password: registerData.password
      //   })
      // });

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
    } catch (error) {
      toast({
        title: "Registrasi Gagal",
        description: "Terjadi kesalahan saat membuat akun",
        variant: "destructive"
      });
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
                    className="w-full bg-gradient-coffee shadow-coffee"
                  >
                    Login
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
                    className="w-full bg-gradient-coffee shadow-coffee"
                  >
                    Register
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