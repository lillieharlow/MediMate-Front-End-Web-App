import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../../src/components/header/Header";
import { renderWithoutRoutes } from "../testUtils";

describe("Shared component tests for Header elements", () => {
  it("Header shows title text, no menu when user not logged in", () => {
    renderWithoutRoutes(<Header />);

    expect(screen.getByTestId("app-header-title")).toBeInTheDocument();
    expect(
      screen.queryByTestId("app-header-menu-icon"),
    ).not.toBeInTheDocument();
  });

  it("Header shows menu button when user logged in", () => {
    // Create a fake token so the app sees logged in user
    const payload = { userId: "1", userType: "patient" };
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
      "base64",
    );
    const fakeToken = `header.${base64Payload}.signature`;
    localStorage.setItem("token", JSON.stringify(fakeToken));

    renderWithoutRoutes(<Header />);

    expect(screen.getByTestId("app-header-menu-icon")).toBeInTheDocument();

    // cleanup token
    localStorage.removeItem("token");
  });
});
