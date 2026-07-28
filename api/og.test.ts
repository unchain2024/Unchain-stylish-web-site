import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const SHELL = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>UNCHAIN | Unchain The World</title>
    <meta name="description" content="UNCHAIN株式会社" />
    <meta property="og:title" content="UNCHAIN | Unchain The World" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body><div id="root"></div></body>
</html>`;

const ROWS = [
  {
    id: "1f2e3d4c-5b6a-4978-8899-aabbccddeeff",
    title: "【レポート】AI World 2026 Summer Tokyo",
    title_en: "[Recap] AI World 2026 Summer Tokyo",
    description: "幕張メッセで開催されたAI World 2026に出展しました。",
    description_en: "UNCHAIN exhibited at AI World 2026 Summer Tokyo, held July 22-24.",
    image_url: "https://cdn.example.com/recap.png",
    created_at: "2026-07-25T00:00:00.000Z",
    author_first_name: "歌代",
    author_last_name: "りな",
  },
];

function mockNetwork(opts: { supabaseDown?: boolean } = {}) {
  const { supabaseDown = false } = opts;
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);

    if (url.endsWith("/index.html")) {
      return new Response(SHELL, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    if (url.includes("/rest/v1/")) {
      if (supabaseDown) throw new Error("ECONNREFUSED");
      return new Response(JSON.stringify(ROWS), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response("not found", { status: 404 });
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function loadHandler() {
  vi.stubEnv("VITE_SUPABASE_URL", "https://proj.supabase.co");
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", "anon-key");
  vi.resetModules();
  return (await import("./og")).default;
}

const call = async (
  handler: (r: Request) => Promise<Response>,
  query: string
) => handler(new Request(`https://unchain.co.jp/api/og?${query}`));

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("og edge function", () => {
  it("injects the article's English OGP tags", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const res = await call(
      handler,
      "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en"
    );
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(html).toContain(
      '<meta property="og:title" content="[Recap] AI World 2026 Summer Tokyo | UNCHAIN" />'
    );
    expect(html).toContain(
      '<meta property="og:description" content="UNCHAIN exhibited at AI World 2026 Summer Tokyo, held July 22-24." />'
    );
    expect(html).toContain('<meta property="og:image" content="https://cdn.example.com/recap.png" />');
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).toContain(
      '<meta property="og:url" content="https://unchain.co.jp/en/blog/recap-ai-world-2026-summer-tokyo" />'
    );
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(html).toContain('<html lang="en"');
  });

  it("injects Japanese tags on the unprefixed route", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const html = await (
      await call(handler, "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=ja")
    ).text();

    expect(html).toContain(
      '<meta property="og:title" content="【レポート】AI World 2026 Summer Tokyo | UNCHAIN" />'
    );
    expect(html).toContain(
      '<meta property="og:url" content="https://unchain.co.jp/blog/recap-ai-world-2026-summer-tokyo" />'
    );
    expect(html).toContain('<html lang="ja"');
  });

  it("leaves exactly one og:title and one <title> — the generic ones are stripped", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const html = await (
      await call(handler, "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en")
    ).text();

    expect(html.match(/property="og:title"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html).not.toContain("Unchain The World");
    expect(html).toContain('<div id="root">'); // SPA still boots
  });

  it("emits canonical and hreflang alternates", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const html = await (
      await call(handler, "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en")
    ).text();

    expect(html).toContain(
      '<link rel="canonical" href="https://unchain.co.jp/en/blog/recap-ai-world-2026-summer-tokyo" />'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="ja" href="https://unchain.co.jp/blog/recap-ai-world-2026-summer-tokyo" />'
    );
    expect(html).toContain(
      '<link rel="alternate" hreflang="en" href="https://unchain.co.jp/en/blog/recap-ai-world-2026-summer-tokyo" />'
    );
  });

  it("hits Supabase exactly once and never asks for a slug column", async () => {
    const fetchMock = mockNetwork();
    const handler = await loadHandler();
    await call(handler, "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en");

    const restCalls = fetchMock.mock.calls.filter((c) => String(c[0]).includes("/rest/v1/"));
    expect(restCalls).toHaveLength(1);
    expect(String(restCalls[0][0])).not.toContain("slug");
  });

  it("only ever reads from Supabase", async () => {
    const fetchMock = mockNetwork();
    const handler = await loadHandler();
    await call(handler, "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en");

    for (const [, init] of fetchMock.mock.calls) {
      const method = (init as RequestInit | undefined)?.method;
      expect(method === undefined || method.toUpperCase() === "GET").toBe(true);
    }
  });

  it("resolves an article by its bare id", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const html = await (
      await call(handler, "section=blog&slug=1f2e3d4c-5b6a-4978-8899-aabbccddeeff&lang=en")
    ).text();

    // The canonical url uses the readable slug even when reached via the id.
    expect(html).toContain(
      '<link rel="canonical" href="https://unchain.co.jp/en/blog/recap-ai-world-2026-summer-tokyo" />'
    );
  });

  it("queries the news table for section=news", async () => {
    const fetchMock = mockNetwork();
    const handler = await loadHandler();
    await call(handler, "section=news&slug=recap-ai-world-2026-summer-tokyo&lang=ja");

    const restCall = fetchMock.mock.calls.find((c) => String(c[0]).includes("/rest/v1/"));
    expect(String(restCall?.[0])).toContain("/rest/v1/articles?");
  });

  it("404s an unknown slug but still serves the app shell", async () => {
    mockNetwork();
    const handler = await loadHandler();
    const res = await call(handler, "section=blog&slug=nope&lang=en");

    expect(res.status).toBe(404);
    expect(await res.text()).toContain('<div id="root">');
  });

  it("serves the unmodified shell when Supabase is unreachable", async () => {
    mockNetwork({ supabaseDown: true });
    const handler = await loadHandler();
    const res = await call(
      handler,
      "section=blog&slug=recap-ai-world-2026-summer-tokyo&lang=en"
    );

    expect(res.status).toBe(200);
    expect(await res.text()).toContain('<div id="root">');
  });

  it("escapes html in titles and descriptions", async () => {
    ROWS[0].title_en = 'Tips & "Tricks" <script>';
    mockNetwork();
    const handler = await loadHandler();
    const html = await (
      await call(handler, "section=blog&slug=tips-tricks-script&lang=en")
    ).text();
    ROWS[0].title_en = "[Recap] AI World 2026 Summer Tokyo";

    expect(html).toContain("Tips &amp; &quot;Tricks&quot; &lt;script&gt; | UNCHAIN");
    expect(html).not.toContain("<script>");
  });
});
