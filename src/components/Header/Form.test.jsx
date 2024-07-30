import { render } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

it("Navigates to detail page when form is submitted", async () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();
  const { getByRole, getByPlaceholderText } = render(
    <Form handleSubmit={mockFn} />
  );

  const input = getByPlaceholderText(/search by/i);
  await user.type(input, "Turkey");

  const btn = getByRole("button");
  await user.click(btn);

  expect(mockFn).toHaveBeenCalled();
});
