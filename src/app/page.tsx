import Link from "next/link";

import { PixelHeading } from "@/components/pixel-heading";
import { TextAnimate } from "@/components/text-animate";
import { Marquee } from "@/components/marquee";
import { ProjectCard } from "@/components/project-card";
import { SmartImage } from "@/components/smart-image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { concertArtists, featuredPress, heroBackground, projectCategories } from "@/lib/projects";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 2);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={heroBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-16 pt-20 sm:pt-28">
          <PixelHeading
            as="h1"
            mode="multi"
            autoPlay
            cycleInterval={180}
            className="text-5xl leading-[0.95] sm:text-7xl lg:text-8xl"
          >
            RZNISH STUDIO
          </PixelHeading>
          <TextAnimate
            text="Concert, travel, and studio photography — based in India. Not a talent-management arm."
            type="blurInUp"
            by="word"
            as="p"
            className="max-w-xl text-lg text-muted-foreground"
          />
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild>
              <Link href="/projects/concerts">See the work</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Book a shoot</Link>
            </Button>
          </div>
        </div>
      </section>

      <Marquee text="404 PROJECTS" />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {concertArtists.map((artist) => (
              <CarouselItem key={artist.slug} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
                <ProjectCard item={artist} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <Marquee text="404 STORIES" reverse />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <PixelHeading as="h2" mode="random" className="text-3xl sm:text-4xl">
            LATEST STORIES
          </PixelHeading>
          <Link href="/blog" className="text-sm font-bold uppercase tracking-wide text-signal hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} className="border-border/60 bg-card">
              <CardContent className="p-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {new Date(post.frontmatter.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {post.readingTime}
                </p>
                <h3 className="mb-2 text-xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-signal">
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{post.frontmatter.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Marquee text="404 STUDIO" />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <PixelHeading as="h2" mode="wave" className="text-3xl sm:text-4xl">
            FEATURED IN
          </PixelHeading>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredPress.map((press) => (
            <a key={press.title} href={press.href} className="group block">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
                <SmartImage
                  src={press.cover}
                  alt={press.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-lg font-bold underline decoration-signal underline-offset-4 group-hover:text-signal">
                {press.title}
              </p>
            </a>
          ))}
        </div>
      </section>

      <Marquee text="404 TRAVELS" reverse />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(projectCategories) as Array<keyof typeof projectCategories>).map((key) => {
          const cat = projectCategories[key];
          return (
            <Link key={key} href={`/projects/${key}`} className="group">
              <Card className="h-full border-border/60 bg-card transition-colors group-hover:border-signal">
                <CardContent className="flex h-full flex-col justify-between gap-4 p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-signal">
                    404 {key}
                  </span>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </>
  );
}
