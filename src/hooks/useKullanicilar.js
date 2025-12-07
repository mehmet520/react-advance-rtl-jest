import { useEffect, useState } from "react";
import fetchKullanicilar from "../api/kullaniciApi";

export function useKullanicilar() {
  const [kullaniciListesi, setKullaniciListesi] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    let iptalEdildi = false;
    async function yukle() {
      try {
        setYukleniyor(true);
        const data = await fetchKullanicilar();
        console.log('data :>> ', data);
        if (!iptalEdildi) {
          setKullaniciListesi(data);
        }
      } catch (err) {
        if (!iptalEdildi) {
          setHata(err);
        }
      } finally {
        if (!iptalEdildi) {
          setYukleniyor(false);
        }
      }
    }

    yukle();

    return () => {
      iptalEdildi = true;
    };
  }, []);

  return { kullaniciListesi, yukleniyor, hata };
}
