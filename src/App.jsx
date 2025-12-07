import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KullanicilarListesiSayfasi } from "./pages/KullanicilarListesiSayfasi";
import { KullaniciDetaySayfasi } from "./pages/KullaniciDetaySayfasi";
import AnaSayfa from "./pages/AnaSayfa";
import FormKontrolu from "./pages/FormKontrolu";

function App() {
  return (
    <BrowserRouter>
      Mehmet Yilmaz
      <Routes>
        <Route path="/" element={<AnaSayfa />} />
        <Route path="/formlar" element={<FormKontrolu />} />
        <Route path="/kullanicilar" element={<KullanicilarListesiSayfasi />} />
        <Route path="/kullanicilar/:id" element={<KullaniciDetaySayfasi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
