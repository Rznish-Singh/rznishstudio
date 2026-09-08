import * as React from "react";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { Sparkles } from "lucide-react";

function AiSummary({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-8 flex gap-3 rounded-lg border border-signal/40 bg-signal/10 p-5">
      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
      <div>
        <p className="mb-1 font-sans text-xs font-bold uppercase tracking-widest text-signal">AI Summary</p>
        <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

function MdxImage({ src, alt = "" }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  return (
    <span className="relative my-6 block aspect-video w-full overflow-hidden rounded-lg">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 720px, 100vw" />
    </span>
  );
}

const components = { AiSummary, img: MdxImage };

export function MdxContent(props: Omit<MDXRemoteProps, "components">) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-signal prose-a:no-underline hover:prose-a:underline">
      <MDXRemote {...props} components={components} />
    </div>
  );
}
