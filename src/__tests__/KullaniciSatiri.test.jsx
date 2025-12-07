import { render, screen } from "@testing-library/react";
import { KullaniciSatiri } from "../components/KullaniciSatiri";
import { jest, test, expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";

// Birim Test 2: KullaniciSatiri (küçük bileşen + click)
test(" detay butonuna basınca onDetay doğru id ile çağrılır", async () => {
  const user = userEvent.setup();

  const sahteKullanici = { id: 42, ad: "Osman" };
  const onDetayMock = jest.fn();

  render(
    <ul>
      <KullaniciSatiri kullanici={sahteKullanici} onDetay={onDetayMock} />
    </ul>
  );

  const button = screen.getByRole('button', {name:'Detay'})
  await user.click(button)
  expect(onDetayMock).toHaveBeenCalledWith('Osman')
});
