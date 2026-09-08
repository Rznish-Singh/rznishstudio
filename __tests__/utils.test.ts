import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges class names and removes duplicates via tailwind-merge", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("drops falsy values", () => {
    expect(cn("block", false && "hidden", undefined, "text-sm")).toBe("block text-sm");
  });
});
