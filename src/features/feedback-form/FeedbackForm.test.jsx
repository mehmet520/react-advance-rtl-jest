/* global jest, expect, test, describe */
import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("subscription is disabled if score is lower than five, and there is no feedback", () => {
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: "4" } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute("disabled");
  });

  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score:/i);
    fireEvent.change(rangeInput, { target: { value: score } });

    const textArea = screen.getByRole("textbox", { name: /comment/i });
    fireEvent.change(textArea, { target: { value: comment } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    // const rangeInput = screen.getByRole("slider");
    // fireEvent.change(rangeInput, { target: { value: "9" } });
    // console.log("handleSubmit.mock.calls :>> ", handleSubmit.mock.calls);

    const rangeInput = screen.getByRole("slider", { name: /score:/i });
    fireEvent.change(rangeInput, { target: { value: "9" } });

    const submitButton=screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });

  test("jest.fn() kaç kez çağrıldığını kaydeder", () => {
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    const comment = "Mehmet";

    const textArea = screen.getByLabelText(/comments:/i);
    // const textArea = screen.getByRole("textbox", { id: /Commentt/i });
    fireEvent.change(textArea, { target: { value: comment } });

    const rangeInput = screen.getByRole("slider", { name: /score:/i });
    fireEvent.change(rangeInput, { target: { value: "10" } });

    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);

    console.log("handleSubmit.mock.calls :>> ", handleSubmit.mock.calls);
    expect(handleSubmit).toHaveBeenCalledWith({
      score: "10",
      comment: comment,
    });

    // expect(handleSubmit).toHaveBeenCalledWith({score:10, comment:'MehmeT'})

    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(2);
  });

  const fn = jest.fn();

  fn("a");
  fn("b", 42);
  fn({ user: "Mert" });

  test("jest.fn() her çağrıyı kaydeder", () => {
    expect(fn).toHaveBeenCalledTimes(3);
    expect(fn).toHaveBeenCalledWith("a");
    expect(fn).toHaveBeenCalledWith("b", 42);
    expect(fn).toHaveBeenCalledWith({ user: "Mert" });
  });
});
