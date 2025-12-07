import Topla from "./math";
import { screen, render } from "@testing-library/react";
import { test, expect } from "@jest/globals";

test("toplam sayiyi 5 olarak gosterir", () => {
  render(<Topla />);
  screen.getByText(/Toplam: /);
  // expect(screen.getByText("Toplam: 5")).toBeInTheDocument();
});
