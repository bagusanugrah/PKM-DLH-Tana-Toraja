export interface SiteConfig {
  namaDinas: string;
  singkatan: string;
  pemerintah: string;
  alamat: string;
  jamLayanan: string;
  telepon: string;
  email: string;
  whatsapp: string;
  whatsappFormatted: string;
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  koordinatKantor: {
    lat: number;
    lng: number;
  };
  mapsEmbedUrl: string;
}

export const siteConfig: SiteConfig = {
  namaDinas: 'Dinas Lingkungan Hidup Kabupaten Tana Toraja',
  singkatan: 'DLH Tana Toraja',
  pemerintah: 'Pemerintah Kabupaten Tana Toraja',
  alamat: 'Jl. Pongtiku No. 120, Pantan, Kec. Makale, Kabupaten Tana Toraja, Sulawesi Selatan 91811',
  jamLayanan: 'Senin–Jumat, 08.00–16.00 WITA',
  telepon: '(0423) 22212',
  email: 'dlh@tanatorajakab.go.id',
  whatsapp: '6281234567890',
  whatsappFormatted: '0812-3456-7890',
  social: {
    facebook: 'https://facebook.com/dlh.tanatoraja',
    instagram: 'https://instagram.com/dlh_tanatoraja',
    youtube: 'https://youtube.com/@dlhtanatoraja',
  },
  koordinatKantor: {
    lat: -3.1032,
    lng: 119.8517,
  },
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.883737339799!2d119.849121!3d-3.1032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93e506e8b7c7db%3A0x6b801452fb382890!2sMakale%2C%20Tana%20Toraja!5e0!3m2!1sid!2sid!4v1700000000000',
};
