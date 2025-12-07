import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import Hello from "./Hello";

test("ekrana doğru ismi yazdırıyor", () => {
  render(<Hello name="Mert" />);
  expect(screen.getByText("Hello, Mert!")).toBeInTheDocument();
});
