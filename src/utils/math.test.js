import Topla from "./math";
import { screen, render } from "@testing-library/react";
import { test } from "@jest/globals";

test("toplam sayiyi 5 olarak gosterir", () => {
  render(<Topla />);
  expect(screen.getByText("Toplam: 5")).toBeInTheDocument();
});
