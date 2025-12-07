import { useParams, useNavigate } from "react-router-dom";
import { useKullanicilar } from "../hooks/useKullanicilar";

export function KullaniciDetaySayfasi() {
  const { id } = useParams();
  console.log('id :>> ', id);
  const navigate = useNavigate();
  const { kullaniciListesi, yukleniyor, hata } = useKullanicilar();

  if (yukleniyor) {
    return <div>Yukleniyor...</div>;
  }

  if (hata) {
    return <div>{`Bir hata olustu: ${hata.message ?? String(hata)}`}</div>;
  }

  const kullanici = kullaniciListesi.find((kullanici) => kullanici.ad === id);
console.log('kullanici :>> ', kullanici);
  if (!kullanici) {
    return (
      <div>
        <h1>Kullanici bulunamadi</h1>
        <p>{id} adina sahip bir kullanici yok.</p>
        <button onClick={() => navigate("/kullanicilar")}>
          Listeye geri don
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Kullanici Detayi</h1>
      <p>
        <strong>Ad:</strong> {kullanici.ad}
      </p>
      {kullanici.email && (
        <p>
          <strong>Email:</strong> {kullanici.email}
        </p>
      )}
      {kullanici.rol && (
        <p>
          <strong>Rol:</strong> {kullanici.rol}
        </p>
      )}
      <button onClick={() => navigate("/kullanicilar")}>
        Listeye geri don
      </button>
    </div>
  );
}
