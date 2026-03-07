import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login page", () => {
  it("should render the login form", () => {
    render(
      <MemoryRouter>
        <Login refreshUser={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^sign in$/i })).toBeInTheDocument();
  });
});