import { useNavigate } from "react-router-dom";
import { useKullanicilar } from "../hooks/useKullanicilar";
import { filtreleKullanicilar } from "../utils/filtreleKullanicilar";
import { KullaniciSatiri } from "../components/KullaniciSatiri";
import { useState } from "react";

export function KullanicilarListesiSayfasi() {
  const [arama, setArama] = useState("");
  const navigate = useNavigate();

  const { kullaniciListesi, yukleniyor, hata } = useKullanicilar();

  const filtrelenmisListe = filtreleKullanicilar(kullaniciListesi, arama);
  function handleDetay(id) {
    console.log('/kullanicilar/${id} :>> ', `/kullanicilar/${id}`);
    navigate(`/kullanicilar/${id}`);
  }

  if (yukleniyor) {
    return <div>Yukleniyor...</div>;
  }

  if (hata) {
    return <div>{`Bir hata olustu: ${hata}`}</div>;
  }

  return (
    <div>
      <h1>Kullanicilar</h1>
      <input
        placeholder="Ara"
        value={arama}
        onChange={(e) => setArama(e.target.value)}
      />
      <ul>
        {filtrelenmisListe.map((kullanici) => (
          <KullaniciSatiri
            key={kullanici.ad}
            kullanici={kullanici}
            onDetay={handleDetay}
          />
        ))}
      </ul>
    </div>
  );
}
