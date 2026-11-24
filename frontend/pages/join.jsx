import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { getEventPublic } from "../lib/api";

// Static-export friendly: the event slug comes from ?event=<slug>
// (QR codes point here). Works the same in `next dev` and in the export.
//
// Dark premium (Ve.ai-style): dark card #12151b, Instrument Serif
// heading, teal CTA. Explicit rgba colours throughout: the light-theme
// override in globals.css rewrites text-white / bg-white-* /
// border-white-* into faint dark tints, so those classes never appear
// on this dark page.
const serif = { fontFamily: "'Instrument Serif', Georgia, 'Times New Roman', serif" };
const INK = "#0a0c10";
const SURFACE = "#12151b";
const TEAL = "#0F766E";
const PAPER = "#F5F2EC";
const MUTED = "#A8A29A";

export default function Join() {
  const router = useRouter();
  const [slug, setSlug] = useState(null);
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const s = router.query.event;
    if (!s || typeof s !== "string") {
      setNotFound(true);
      return;
    }
    setSlug(s);
    try {
      localStorage.setItem("eventSlug", s);
    } catch {}
    getEventPublic(s)
      .then((d) => setEvent(d.event))
      .catch(() => setNotFound(true));
  }, [router.isReady, router.query]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: INK, color: PAPER }}>
      <Head>
        <title>Join event — SnapFind Events</title>
        <meta name="theme-color" content="#0a0c10" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <main className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        {notFound ? (
          <div
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-10"
            style={{ backgroundColor: SURFACE }}
          >
            <h1 style={serif} className="text-3xl font-normal">Event not found</h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
              This invite link looks invalid or expired. Ask your photographer
              for a fresh QR code.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl border border-[rgba(255,255,255,0.2)] px-6 py-3 text-sm font-semibold transition hover:border-[rgba(255,255,255,0.45)]"
              style={{ color: PAPER }}
            >
              Back home
            </Link>
          </div>
        ) : (
          <div
            className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-10"
            style={{ backgroundColor: SURFACE }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#2DD4BF" }}
            >
              You&apos;re invited
            </p>
            <h1 style={serif} className="mt-3 text-4xl font-normal leading-tight">
              {event ? event.name : "Loading your event…"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
              Create a free account, check in with a selfie, and our AI will
              find every photo you appear in.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/signup"
                className="rounded-xl px-6 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{ backgroundColor: TEAL, color: "#ffffff" }}
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-[rgba(255,255,255,0.2)] px-6 py-3 text-sm font-semibold transition hover:border-[rgba(255,255,255,0.45)]"
                style={{ color: PAPER }}
              >
                I already have an account. Log in
              </Link>
            </div>
            {slug && (
              <p className="mt-6 text-xs" style={{ color: MUTED }}>Event code: <span style={{ color: "#2DD4BF" }}>{slug}</span></p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
