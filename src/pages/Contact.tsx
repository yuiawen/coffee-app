import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder for form submission to CodeIgniter 4
    // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas pesan Anda. Kami akan segera menghubungi Anda kembali.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-coffee-primary mb-4">
            Hubungi Kami
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui berbagai cara di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-coffee-primary mb-6">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                <Card className="border-coffee-light/50 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">📍</div>
                      <div>
                        <h3 className="font-semibold text-coffee-primary mb-1">Alamat Toko</h3>
                        <p className="text-muted-foreground">
                          Jl. Kopi Raya No. 123<br />
                          Jakarta Selatan 12345<br />
                          Indonesia
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-light/50 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">📞</div>
                      <div>
                        <h3 className="font-semibold text-coffee-primary mb-1">Telepon</h3>
                        <p className="text-muted-foreground">
                          +62 21 1234 5678<br />
                          +62 812 3456 7890 (WhatsApp)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-light/50 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">✉️</div>
                      <div>
                        <h3 className="font-semibold text-coffee-primary mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          info@kopikita.com<br />
                          support@kopikita.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-light/50 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">🕒</div>
                      <div>
                        <h3 className="font-semibold text-coffee-primary mb-1">Jam Operasional</h3>
                        <div className="text-muted-foreground space-y-1">
                          <p>Senin - Jumat: 07:00 - 22:00</p>
                          <p>Sabtu - Minggu: 08:00 - 23:00</p>
                          <p>Online: 24/7</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-4">
                Ikuti Kami
              </h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                  📘 Facebook
                </Button>
                <Button variant="outline" size="sm" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                  📷 Instagram
                </Button>
                <Button variant="outline" size="sm" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                  🐦 Twitter
                </Button>
                <Button variant="outline" size="sm" className="border-coffee-primary text-coffee-primary hover:bg-coffee-primary hover:text-coffee-cream">
                  📺 YouTube
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-coffee-light/50 shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-coffee-primary">
                  Kirim Pesan
                </CardTitle>
                <CardDescription>
                  Isi form di bawah ini dan kami akan menghubungi Anda sesegera mungkin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-coffee-light focus:border-coffee-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">No. Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-coffee-light focus:border-coffee-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subjek *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-coffee-light focus:border-coffee-primary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border-coffee-light focus:border-coffee-primary"
                      placeholder="Tuliskan pesan Anda di sini..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-coffee shadow-coffee"
                  >
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-coffee-light/50 shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-coffee-primary">
                Lokasi Kami
              </CardTitle>
              <CardDescription>
                Temukan lokasi toko KopiKata di Jakarta Selatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-coffee-light/30 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-muted-foreground">
                  Peta interaktif akan ditampilkan di sini<br />
                  {/* Placeholder untuk Google Maps embed: */}
                  {/* <iframe src="..." className="w-full h-64 rounded-lg"></iframe> */}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;