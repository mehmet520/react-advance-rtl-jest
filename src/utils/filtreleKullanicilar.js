export function filtreleKullanicilar(kullaniciListesi, arama) {
  const metin = arama.trim().toLowerCase();
  if (!metin) return kullaniciListesi;

  return kullaniciListesi.filter((kullanici) =>
    kullanici.ad.toLowerCase().includes(metin)
  );
}
