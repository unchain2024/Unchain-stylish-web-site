import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import { LanguageProvider } from "@/lib/language";

const ROWS = [
  {
    id: "ce4af7d9-9076-425a-8e11-3a5bd3af8480",
    category: "INSIGHT",
    title: "【出展レポート】AI World 2026 夏 東京",
    title_en: "[Recap] AI World 2026 Summer Tokyo",
    description: "幕張メッセで開催されました。",
    description_en: "UNCHAIN exhibited at AI World 2026 Summer Tokyo.",
    content: "本文です。",
    content_en: "Body copy.",
    image_url: "https://cdn.example.com/recap.png",
    author_first_name: "Rina",
    author_last_name: "Utashiro",
    created_at: "2026-07-25T00:00:00.000Z",
    is_draft: false,
  },
  {
    id: "9a93742d-4337-4c91-80f8-73a46b6f085b",
    category: "INSIGHT",
    title: "【出展レポート】NEXT BUSINESS EXPO SUMMER 2026",
    title_en: "[Recap] NEXT BUSINESS EXPO SUMMER 2026",
    description: "説明。",
    description_en: "A different article entirely.",
    content: "本文。",
    content_en: "Other body copy.",
    image_url: "",
    author_first_name: "Rina",
    author_last_name: "Utashiro",
    created_at: "2026-06-01T00:00:00.000Z",
    is_draft: false,
  },
];

// Chainable stub for `supabase.from(...).select(...).eq(...).eq(...).order(...)`.
vi.mock("@/lib/supabase", () => {
  const builder: any = {
    select: () => builder,
    eq: () => builder,
    order: () => Promise.resolve({ data: ROWS, error: null }),
  };
  return { supabase: { from: () => builder } };
});

vi.mock("@/components/Navigation", () => ({ default: () => <nav /> }));
vi.mock("@/components/Footer", () => ({ default: () => <footer /> }));

import BlogPage from "./BlogPage";

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <LanguageProvider>
          <Routes>
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/en/blog" element={<BlogPage />} />
            <Route path="/en/blog/:slug" element={<BlogPage />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

beforeEach(() => {
  vi.clearAllMocks();
});

describe("BlogPage routing", () => {
  it("lists articles as real links to their own URLs", async () => {
    renderAt("/en/blog");

    const link = await screen.findByRole("link", {
      name: /Recap\] AI World 2026 Summer Tokyo/,
    });
    expect(link).toHaveAttribute(
      "href",
      "/en/blog/recap-ai-world-2026-summer-tokyo"
    );
  });

  it("uses unprefixed paths on the Japanese site", async () => {
    renderAt("/blog");

    const link = await screen.findByRole("link", {
      name: /AI World 2026 夏 東京/,
    });
    expect(link).toHaveAttribute("href", "/blog/recap-ai-world-2026-summer-tokyo");
  });

  it("renders the article directly when deep-linked by slug", async () => {
    renderAt("/en/blog/recap-ai-world-2026-summer-tokyo");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "[Recap] AI World 2026 Summer Tokyo" })
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Body copy.")).toBeInTheDocument();
    // The other article must not be on the page.
    expect(screen.queryByText("Other body copy.")).not.toBeInTheDocument();
  });

  it("renders the Japanese article body on the unprefixed route", async () => {
    renderAt("/blog/recap-ai-world-2026-summer-tokyo");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "【出展レポート】AI World 2026 夏 東京" })
      ).toBeInTheDocument();
    });
    expect(screen.getByText("本文です。")).toBeInTheDocument();
  });

  it("still resolves an article by its bare id", async () => {
    renderAt("/en/blog/ce4af7d9-9076-425a-8e11-3a5bd3af8480");

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "[Recap] AI World 2026 Summer Tokyo" })
      ).toBeInTheDocument();
    });
  });

  it("shows a not-found state for an unknown slug", async () => {
    renderAt("/en/blog/no-such-article");

    await waitFor(() => {
      expect(screen.getByText("Article not found")).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: /Back to Blog/ })).toHaveAttribute(
      "href",
      "/en/blog"
    );
  });

  it("links back to the list from an article", async () => {
    renderAt("/blog/recap-ai-world-2026-summer-tokyo");

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /ブログ一覧へ戻る/ })).toHaveAttribute(
        "href",
        "/blog"
      );
    });
  });
});
