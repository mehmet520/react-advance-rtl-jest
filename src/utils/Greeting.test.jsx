import { screen, render } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

test("kullanci adini girip mesaja basınca selamlama mesajı görüntülenir", async () => {
  render(<Greeting />);
  const input = screen.getByPlaceholderText("Your Name");
  const button = screen.getByText("Greet");

  await userEvent.type(input, "Mehmet");
  await userEvent.click(button);

  expect(await screen.findByText("Hello, Mehmet!")).toBeInTheDocument();
});
