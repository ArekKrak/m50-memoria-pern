import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

describe("Dashboard page", () => {
  it("should render the notes heading", () => {
    render(
      <MemoryRouter>
        <Dashboard user={null} refreshUser={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/your notes/i)).toBeInTheDocument();
  });
});