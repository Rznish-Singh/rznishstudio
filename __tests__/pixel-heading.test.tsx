import { render, screen } from "@testing-library/react";
import { PixelHeading } from "@/components/pixel-heading";

describe("PixelHeading", () => {
  it("renders every character of the given text as its own span", () => {
    render(<PixelHeading>HI</PixelHeading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.querySelectorAll("span")).toHaveLength(2);
  });

  it("renders a static prefix outside the animated characters", () => {
    render(<PixelHeading prefix="Shadcn,">expanded</PixelHeading>);
    expect(screen.getByText("Shadcn,")).toBeInTheDocument();
  });

  it("renders as the requested heading level", () => {
    render(<PixelHeading as="h3">Hi</PixelHeading>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });
});
