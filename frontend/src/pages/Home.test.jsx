import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home page", () => {
  it("should render the welcome text", () => {
    render(<Home />);

    expect(screen.getByText(/welcome to memoria/i)).toBeInTheDocument();
    expect(screen.getByText(/your personal knowledge base/i)).toBeInTheDocument();
  });
});