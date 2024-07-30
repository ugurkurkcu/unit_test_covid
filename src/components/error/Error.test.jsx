import { render } from "@testing-library/react";
import Error from "./index";
import userEvent from "@testing-library/user-event";

describe("Error component tests", () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();

  let comp;

  beforeEach(() => {
    comp = render(
      <Error message={"Failed with status code of 404"} retry={mockFn} />
    );
  });

  it("Renders true error message", () => {
    comp.getByText(/failed with/i);
  });

  it("Retry button works", async () => {
    const btn = comp.getByRole("button");
    await user.click(btn);

    expect(mockFn).toHaveBeenCalled();
  });
});
