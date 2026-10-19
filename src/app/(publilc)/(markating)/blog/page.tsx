"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  GraduationCap,
  Search,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  image: string;
  featured?: boolean;
};

const categories = [
  "All Articles",
  "Education",
  "Technology",
  "Student Life",
  "Research",
  "Career",
];

const articles: Article[] = [
  {
    slug: "future-of-digital-education",
    title: "The Future of Digital Education in Modern Universities",
    excerpt:
      "Discover how digital learning platforms are transforming university education and creating more flexible learning experiences.",
    category: "Education",
    date: "October 12, 2026",
    readTime: "6 min read",
    author: "UniSphere Editorial Team",
    role: "Education",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=85",
    featured: true,
  },
  {
    slug: "ai-in-higher-education",
    title: "How AI Is Transforming Higher Education",
    excerpt:
      "Explore how artificial intelligence supports personalized learning, academic research, and university administration.",
    category: "Technology",
    date: "October 10, 2026",
    readTime: "5 min read",
    author: "Research Team",
    role: "Technology",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "student-productivity-guide",
    title: "A Practical Guide to Student Productivity",
    excerpt:
      "Build better study habits, manage your time effectively, and balance academic responsibilities with personal life.",
    category: "Student Life",
    date: "October 8, 2026",
    readTime: "4 min read",
    author: "Student Affairs",
    role: "Student Life",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "research-skills-for-students",
    title: "Essential Research Skills Every Student Should Develop",
    excerpt:
      "Learn how to evaluate sources, organize findings, and develop stronger academic research practices.",
    category: "Research",
    date: "October 5, 2026",
    readTime: "7 min read",
    author: "Academic Research Team",
    role: "Research",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "career-preparation-guide",
    title: "Preparing for Your First Professional Opportunity",
    excerpt:
      "Practical advice on building a portfolio, improving communication skills, and preparing for interviews.",
    category: "Career",
    date: "October 2, 2026",
    readTime: "6 min read",
    author: "Career Development Team",
    role: "Career",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "collaborative-learning",
    title: "Why Collaborative Learning Matters",
    excerpt:
      "Understand how teamwork, peer discussions, and shared projects can improve learning outcomes.",
    category: "Education",
    date: "September 28, 2026",
    readTime: "4 min read",
    author: "Academic Team",
    role: "Education",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "secure-digital-campus",
    title: "Building a More Secure Digital Campus",
    excerpt:
      "Learn why identity protection, secure authentication, and responsible data management matter to universities.",
    category: "Technology",
    date: "September 24, 2026",
    readTime: "8 min read",
    author: "Technology Team",
    role: "Technology",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "campus-community",
    title: "Creating a Stronger Campus Community",
    excerpt:
      "Explore ways students can build meaningful connections and participate in campus activities.",
    category: "Student Life",
    date: "September 20, 2026",
    readTime: "5 min read",
    author: "Student Affairs",
    role: "Student Life",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "skills-for-graduates",
    title: "Skills That Help Graduates Stand Out",
    excerpt:
      "Discover the technical and professional skills that can help graduates prepare for a changing job market.",
    category: "Career",
    date: "September 16, 2026",
    readTime: "5 min read",
    author: "Career Development Team",
    role: "Career",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
  },
];

const INITIAL_VISIBLE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const featuredArticle = articles.find((article) => article.featured);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        article.category === activeCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const showFeatured =
    activeCategory === "All Articles" &&
    searchQuery.trim() === "" &&
    Boolean(featuredArticle);

  const displayedArticles = useMemo(() => {
    const list = showFeatured
      ? filteredArticles.filter(
          (article) => article.slug !== featuredArticle?.slug,
        )
      : filteredArticles;

    return list.slice(0, visibleCount);
  }, [filteredArticles, visibleCount, showFeatured, featuredArticle]);

  const remainingCount =
    (showFeatured
      ? filteredArticles.filter(
          (article) => article.slug !== featuredArticle?.slug,
        ).length
      : filteredArticles.length) - displayedArticles.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b bg-muted/20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-0 top-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge
              variant="outline"
              className="mb-5 gap-2 rounded-full border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-orange-600 dark:text-orange-400"
            >
              <BookOpen className="h-3.5 w-3.5" />
              UniSphere Blog
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ideas that inspire
              <span className="mt-2 block text-orange-600 dark:text-orange-400">
                learning and growth.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore insights on education, technology, research, and student
              life to help you make the most of your university journey.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={searchQuery}
                  onChange={(event) =>
                    handleSearchChange(event.target.value)
                  }
                  placeholder="Search articles, topics, or ideas..."
                  aria-label="Search blog articles"
                  className="h-12 rounded-xl border-border/70 bg-background pl-12 pr-12 shadow-sm"
                />

                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Clear search"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
              Discover & Learn
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Explore our articles
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Find useful ideas and insights for your academic journey.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "article" : "articles"} found
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <Button
                key={category}
                type="button"
                variant={isActive ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={
                  isActive
                    ? "rounded-full bg-orange-600 text-white shadow-sm hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                    : "rounded-full border-border/70 bg-background hover:border-orange-500/40 hover:bg-orange-500/5"
                }
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* Featured article */}
        {showFeatured && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-12"
          >
            <Card className="group overflow-hidden rounded-2xl border-border/70 py-0 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="grid md:grid-cols-2">
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="relative block min-h-64 overflow-hidden bg-muted sm:min-h-80"
                  aria-label={`Read ${featuredArticle.title}`}
                >
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="border-0 bg-orange-600 text-white hover:bg-orange-600">
                      Featured Article
                    </Badge>
                  </div>
                </Link>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300"
                    >
                      {featuredArticle.category}
                    </Badge>

                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {featuredArticle.date}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredArticle.slug}`}>
                    <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400 sm:text-3xl">
                      {featuredArticle.title}
                    </h3>
                  </Link>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        {featuredArticle.author}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {featuredArticle.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" />
                      {featuredArticle.readTime}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Button
                    render={<Link href={`/blog/${featuredArticle.slug}`}/>}
                    className="w-fit gap-2 rounded-xl flex bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                  >
                    
                      <span >Read featured article</span>
                      <ArrowRight className="h-4 w-4" />
                  
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Article grid */}
        {displayedArticles.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayedArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.05, 0.2),
                }}
                className="h-full"
              >
                <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/70 py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg">
                  {/* Image */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-muted"
                    aria-label={`Read ${article.title}`}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <CardHeader className="gap-3 px-5 pt-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300"
                      >
                        {article.category}
                      </Badge>

                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </div>

                    <CardTitle className="text-lg leading-snug transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="flex items-center gap-1.5 text-xs">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      {article.date}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 px-5">
                    <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {article.author}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {article.role}
                      </p>
                    </div>

                    <Button
                      render={  <Link href={`/blog/${article.slug}`}></Link>}
                      variant="ghost"
                      size="icon"
                      aria-label={`Read ${article.title}`}
                      className="shrink-0 rounded-full text-orange-600 hover:bg-orange-500/10 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                    
                        <ArrowRight className="h-5 w-5" />
                 
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty state */
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-5 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No articles found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We couldn&apos;t find any articles matching your search. Try
              another keyword or choose a different category.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Articles");
                setVisibleCount(INITIAL_VISIBLE);
              }}
              className="mt-5 rounded-xl"
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Load more */}
        {remainingCount > 0 && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setVisibleCount((current) => current + INITIAL_VISIBLE)
              }
              className="h-11 gap-2 rounded-xl px-6"
            >
              Load more articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-background px-6 py-10 text-center shadow-sm sm:px-12 sm:py-14"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                <GraduationCap className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                Keep learning. Keep growing.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Your university journey is full of opportunities. Explore
                UniSphere to stay connected with your academic experience.
              </p>

              <Button
                 render={<Link href="/"/>}
                className="mt-7 gap-2 rounded-xl bg-orange-600 px-6 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                
                  <span>Explore UniSphere</span>
                  <ArrowRight className="h-4 w-4" />
          
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}