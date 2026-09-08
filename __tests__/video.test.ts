import { detectVideoProvider, getVideoEmbedUrl } from "@/lib/video";

describe("video provider detection", () => {
  it("detects YouTube links", () => {
    expect(detectVideoProvider("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("youtube");
    expect(detectVideoProvider("https://youtu.be/dQw4w9WgXcQ")).toBe("youtube");
  });

  it("detects Vimeo links", () => {
    expect(detectVideoProvider("https://vimeo.com/76979871")).toBe("vimeo");
  });

  it("treats anything else as a direct file (CDN) link", () => {
    expect(detectVideoProvider("https://my-cdn.example.com/clips/highlight.mp4")).toBe("file");
  });
});

describe("getVideoEmbedUrl", () => {
  it("builds a YouTube embed URL from a watch link", () => {
    expect(getVideoEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("builds a Vimeo embed URL from a watch link", () => {
    expect(getVideoEmbedUrl("https://vimeo.com/76979871")).toBe(
      "https://player.vimeo.com/video/76979871"
    );
  });

  it("passes direct file links through unchanged", () => {
    const src = "https://my-cdn.example.com/clips/highlight.mp4";
    expect(getVideoEmbedUrl(src)).toBe(src);
  });
});
