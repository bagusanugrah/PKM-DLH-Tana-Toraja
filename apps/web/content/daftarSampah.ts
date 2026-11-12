export interface SampahItem {
  nama: string;
  kategori: 'Organik' | 'Anorganik' | 'B3';
  saran: string;
  alias?: string[];
}

export const daftarSampah: SampahItem[] = [
  { nama: 'Sisa nasi dan lauk', kategori: 'Organik', saran: 'Jadikan kompos tanaman atau pakan ternak warga.', alias: ['makanan', 'nasi', 'ikan', 'daging'] },
  { nama: 'Sisa sayuran mentah/masak', kategori: 'Organik', saran: 'Cacah dan masukkan ke lubang biopori atau wadah kompos.', alias: ['sayur', 'bayam', 'kangkung', 'sawi'] },
  { nama: 'Kulit buah-buahan', kategori: 'Organik', saran: 'Kumpulkan untuk dijadikan ekoenzim atau kompos alami.', alias: ['kulit jeruk', 'kulit pisang', 'buah'] },
  { nama: 'Daun dan ranting pekarangan', kategori: 'Organik', saran: 'Kumpulkan sebagai mulsa tanah atau bahan kering kompos.', alias: ['daun kering', 'ranting', 'rumput'] },
  { nama: 'Ampas kopi dan teh celup', kategori: 'Organik', saran: 'Bisa langsung ditabur di media tanah sebagai penyubur.', alias: ['kopi', 'teh'] },
  { nama: 'Cangkang telur', kategori: 'Organik', saran: 'Remas hingga halus, campurkan ke media tanam sebagai sumber kalsium.', alias: ['telur', 'kulit telur'] },
  { nama: 'Tulang dan duri ikan', kategori: 'Organik', saran: 'Buang ke wadah organik tertutup rapat agar tidak memancing hewan.', alias: ['tulang ayam', 'duri'] },
  { nama: 'Botol plastik minuman', kategori: 'Anorganik', saran: 'Kosongkan isi, bilas, pipihkan, lalu setorkan ke bank sampah.', alias: ['aqua', 'le minerale', 'botol air', 'plastik pet'] },
  { nama: 'Gelas dan cup plastik', kategori: 'Anorganik', saran: 'Bilas bersih dan tumpuk rapi untuk disetor ke bank sampah.', alias: ['cup pop ice', 'gelas kopi', 'gelas aqua'] },
  { nama: 'Kantong kresek plastik', kategori: 'Anorganik', saran: 'Kumpulkan dan pakai ulang sebagai wadah belanja sebelum dibuang.', alias: ['kresek', 'tas plastik'] },
  { nama: 'Kardus dan boks karton', kategori: 'Anorganik', saran: 'Buka lipatan agar pipih, jaga tetap kering, lalu setorkan ke bank sampah.', alias: ['dus', 'kotak karton', 'kardus mie'] },
  { nama: 'Kertas HVS dan buku bekas', kategori: 'Anorganik', saran: 'Pisahkan dari kotoran atau air, ikat rapi untuk didaur ulang.', alias: ['kertas koran', 'majalah', 'kertas'] },
  { nama: 'Kaleng minuman dan susu', kategori: 'Anorganik', saran: 'Cuci sisa isi, pipihkan jika memungkinkan, dan kumpulkan.', alias: ['kaleng soda', 'kaleng biskuit', 'susu kaleng'] },
  { nama: 'Botol kaca / beling', kategori: 'Anorganik', saran: 'Bilas bersih; simpan dengan hati-hati agar tidak pecah.', alias: ['botol sirup', 'botol kecap', 'kaca'] },
  { nama: 'Pecahan kaca dan piring', kategori: 'Anorganik', saran: 'Bungkus rapat dengan kertas koran/kardus tebal dan beri tanda sebelum dibuang.', alias: ['beling', 'piring pecah'] },
  { nama: 'Styrofoam wadah makanan', kategori: 'Anorganik', saran: 'Kumpulkan terpisah; kurangi pemakaian wadah sekali pakai.', alias: ['gabus', 'wadah styrofoam'] },
  { nama: 'Sedotan dan sendok plastik', kategori: 'Anorganik', saran: 'Kumpulkan bersama sampah plastik lainnya.', alias: ['sedotan', 'garpu plastik'] },
  { nama: 'Kain perca dan pakaian bekas', kategori: 'Anorganik', saran: 'Pakaian layak pakai dapat disumbangkan; perca dapat dijadikan lap atau keset.', alias: ['baju bekas', 'kain'] },
  { nama: 'Baterai bekas remote/mainan', kategori: 'B3', saran: 'Jangan buang ke tempat sampah umum. Simpan di toples terpisah dan tanyakan DLH.', alias: ['baterai abc', 'baterai jam', 'batu baterai'] },
  { nama: 'Lampu neon dan bohlam LED rusak', kategori: 'B3', saran: 'Bungkus dengan wadah aslinya agar tabung gas/raksa tidak pecah terhirup.', alias: ['lampu philips', 'neon', 'bohlam'] },
  { nama: 'Obat kedaluwarsa / sirup bekas', kategori: 'B3', saran: 'Jangan dibuang ke saluran air atau tanah bebas; serahkan ke faskes/DLH.', alias: ['obat rusak', 'tablet bekas', 'sirup'] },
  { nama: 'Kaleng cat dan sisa tiner', kategori: 'B3', saran: 'Tutup rapat kaleng, jangan buang ke selokan atau sungai.', alias: ['cat tembok', 'thinner', 'pilox'] },
  { nama: 'Kemasan pestisida dan racun rumput', kategori: 'B3', saran: 'Sangat beracun. Jangan gunakan ulang wadahnya; hubungi petugas DLH/PPL pertanian.', alias: ['gramoxone', 'racun serangga', 'insektisida'] },
  { nama: 'Oli bekas mesin kendaraan', kategori: 'B3', saran: 'Tampung dalam jeriken tertutup; serahkan ke bengkel resmi berizin atau DLH.', alias: ['oli motor', 'oli mobil', 'pelumas'] },
  { nama: 'Aki bekas motor/mobil', kategori: 'B3', saran: 'Mengandung asam sulfat dan timbal. Jual ke penampung aki resmi atau serahkan ke DLH.', alias: ['accu', 'aki basah', 'aki kering'] },
  { nama: 'Termometer raksa yang pecah', kategori: 'B3', saran: 'Bahaya uap raksa! Jangan sentuh tangan kosong; evakuasi ruangan dan hubungi DLH.', alias: ['raksa', 'termometer air raksa'] },
];
