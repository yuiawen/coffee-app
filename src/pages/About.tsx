const About = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-coffee-primary mb-4">
            Tentang Caffè Lento
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perjalanan kami dalam menghadirkan pengalaman kopi terbaik untuk Indonesia
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-coffee-primary mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  KopiKata dimulai dari kecintaan mendalam terhadap kopi Indonesia. 
                  Sejak 2020, kami berkomitmen untuk mengangkat cita rasa kopi nusantara 
                  ke level yang lebih tinggi dengan tetap mempertahankan keaslian dan 
                  karakteristik unik setiap daerah.
                </p>
                <p>
                  Kami bekerja sama langsung dengan petani kopi lokal dari berbagai 
                  daerah di Indonesia, mulai dari Aceh, Sumatera, Jawa, hingga Papua. 
                  Setiap biji kopi dipilih dengan teliti untuk memastikan kualitas 
                  terbaik sampai ke cangkir Anda.
                </p>
                <p>
                  Dengan perpaduan teknik traditional roasting dan teknologi modern, 
                  kami menciptakan profil rasa yang konsisten namun tetap mempertahankan 
                  karakter asli setiap varietas kopi Indonesia.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-warm rounded-2xl p-8 shadow-warm">
                <div className="text-center space-y-8">
                  <div className="text-6xl">☕</div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-coffee-primary mb-2">
                      Visi Kami
                    </h3>
                    <p className="text-muted-foreground">
                      Menjadi brand kopi Indonesia yang dikenal secara global dengan 
                      tetap menjunjung tinggi nilai-nilai lokal dan kualitas premium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-coffee-primary mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-muted-foreground">
              Prinsip yang mendasari setiap langkah perjalanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-xl border border-border shadow-card">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-3">
                Berkelanjutan
              </h3>
              <p className="text-muted-foreground">
                Kami berkomitmen pada praktik perkebunan yang ramah lingkungan 
                dan mendukung kesejahteraan petani kopi lokal.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border shadow-card">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-3">
                Kualitas Premium
              </h3>
              <p className="text-muted-foreground">
                Setiap tahap produksi, dari pemilihan biji hingga penyajian, 
                dilakukan dengan standar kualitas tertinggi.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl border border-border shadow-card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-3">
                Komunitas
              </h3>
              <p className="text-muted-foreground">
                Kami membangun hubungan yang kuat dengan komunitas pecinta kopi 
                dan menciptakan ruang untuk berbagi pengalaman.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 bg-coffee-light/30 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-coffee-primary mb-4">
              Pencapaian Kami
            </h2>
            <p className="text-lg text-muted-foreground">
              Angka-angka yang menunjukkan dedikasi kami terhadap kualitas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-coffee-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Varian Kopi Premium</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coffee-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Pelanggan Puas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coffee-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Partner Petani</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coffee-primary mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Rating Pelanggan</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-coffee-primary mb-4">
              Tim Kami
            </h2>
            <p className="text-lg text-muted-foreground">
              Orang-orang di balik cita rasa istimewa KopiKata
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-2">
                Budi Santoso
              </h3>
              <p className="text-muted-foreground mb-2">Founder & CEO</p>
              <p className="text-sm text-muted-foreground">
                Memiliki pengalaman 15+ tahun di industri kopi Indonesia
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🔬</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-2">
                Sari Dewi
              </h3>
              <p className="text-muted-foreground mb-2">Head of Quality</p>
              <p className="text-sm text-muted-foreground">
                Expert dalam coffee cupping dan quality control
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🍳</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-coffee-primary mb-2">
                Ahmad Rizki
              </h3>
              <p className="text-muted-foreground mb-2">Master Roaster</p>
              <p className="text-sm text-muted-foreground">
                Certified roaster dengan keahlian traditional dan modern
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;