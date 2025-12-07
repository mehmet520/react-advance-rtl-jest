import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { KullanicilarListesiSayfasi } from "../pages/KullanicilarListesiSayfasi";

function renderWithRouter(ui, { initialEntries = ["/kullanicilar"] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/kullanicilar" element={ui} />
        <Route path="/kullanicilar/:id" element={<div>Detay Sayfasi</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("KullaniciListesiSayfasi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });
  test(" listeyi gösterir ve arama yapar.", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, ad: "Ali" },
        { id: 2, ad: "Ayse" },
        { id: 3, ad: "Fatma" },
      ],
    });

    renderWithRouter(<KullanicilarListesiSayfasi />);

    // yükleniyor yazısını görmeliyiz
    expect(screen.getByText("Yukleniyor...")).toBeInTheDocument();

    // liste yüklendikten sonra kullanıcı adlarini görmeliyiz
    expect(await screen.findByText("Ali")).toBeInTheDocument();
    expect(screen.getByText("Ayse")).toBeInTheDocument();
    expect(screen.getByText("Fatma")).toBeInTheDocument();

    const aramaInput = screen.getByPlaceholderText("Ara");
    await user.type(aramaInput, "Ali");

    // filtre sonrasında sadece Ali kalmalı
    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.queryByText("Ayse")).toBeNull();
    expect(screen.queryByText("Fatma")).toBeNull();
  });

  test("detay butonu ile doğru sayfaya gider", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, ad: "Ali" }],
    });

    renderWithRouter(<KullanicilarListesiSayfasi />);

    // role is "button" in English
    const detayButon = await screen.findByRole("button", { name: "Detay" });
    await user.click(detayButon);

    // Router gerçekten / kullanıcılar/1'e gitti ve detay sayfası render edildi mi
    expect(screen.getByText("Detay Sayfasi")).toBeInTheDocument();
  });
});
