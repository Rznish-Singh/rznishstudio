import { render, screen } from "@testing-library/react";
import { TextAnimate } from "@/components/text-animate";

describe("TextAnimate", () => {
  it("renders the full text content split into segments", () => {
    const { container } = render(<TextAnimate text="Hello world" by="word" />);
    expect(container.textContent).toBe("Hello world");
  });

  it("splits words and whitespace into separate spans", () => {
    const { container } = render(<TextAnimate text="Hello world" by="word" />);
    // "Hello", " ", "world" — the split-on-whitespace regex keeps the separator
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });
});
