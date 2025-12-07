export function KullaniciSatiri({ kullanici, onDetay }) {
    console.log('kullanici.ad :>> ', kullanici.ad);
  return (
    <li>
      <span>{kullanici.ad} </span>
      <button onClick={() => onDetay(kullanici.ad)}>Detay</button>
    </li>
  );
}
