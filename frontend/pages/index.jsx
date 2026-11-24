import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

// SnapFind Events landing — premium dark (Ve.ai-style): near-black page,
// dark surface cards, Instrument Serif headlines, teal CTAs. Explicit rgba
// colours throughout: the light-theme override in globals.css rewrites
// text-white / bg-white-* / border-white-* into faint dark tints, so those
// classes must never appear on this dark page.
const serif = { fontFamily: "'Instrument Serif', Georgia, 'Times New Roman', serif" };
const INK = "#0a0c10";
const SURFACE = "#12151b";
const TEAL = "#0F766E";
const PAPER = "#F5F2EC";
const MUTED = "#A8A29A";

const STEPS = [
  {
    n: "01",
    title: "Photographer uploads",
    desc: "Thousands of event photos flow into the studio. Faces are detected right in the browser, so matching stays fast and private.",
  },
  {
    n: "02",
    title: "QR to join",
    desc: "Every event gets its own QR code. Guests point their camera and they're inside — no app to install, no account maze.",
  },
  {
    n: "03",
    title: "Selfie is the key",
    desc: "One front-camera selfie registers your Face ID. The camera opens right inside the page. Private, instant, yours.",
  },
  {
    n: "04",
    title: "Gallery finds you",
    desc: "The AI compares your Face ID against every face in every photo — group shots included — and assembles only the moments you're in.",
  },
];

const FEATURES = [
  {
    icon: "✦",
    title: "Free forever",
    desc: "No paid APIs, no cloud bills, no cards. Just open technology on the free tier.",
  },
  {
    icon: "◉",
    title: "On-device AI",
    desc: "Face detection runs in the browser itself — fast, private, and infinitely scalable.",
  },
  {
    icon: "⬢",
    title: "Private by design",
    desc: "Guests see only their own matches. Nobody browses anyone else's moments.",
  },
  {
    icon: "⟡",
    title: "Zero install",
    desc: "QR in, gallery out. It lives entirely in the browser you already have.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>SnapFind Events: Every guest finds their photos</title>
        <meta
          name="description"
          content="SnapFind Events is a free AI photo finder for events. Guests scan a QR code, check in with a selfie, and instantly receive the photos they're in."
        />
        <meta name="theme-color" content="#0a0c10" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: INK, color: PAPER }}>
        <Navbar />

        {/* ---------------- HERO ---------------- */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#2DD4BF" }}
          >
            SnapFind Events · AI photo finder
          </p>
          <h1
            style={serif}
            className="mx-auto mt-5 max-w-4xl text-5xl font-normal leading-[1.05] sm:text-7xl"
          >
            Every guest finds
            <br />
            <span style={{ color: "#2DD4BF" }}>their photos.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: MUTED }}>
            Photographers upload the event. Guests scan a code, show their
            face, and get back only their moments — group shots included,
            with no cloud, no fees, and no app.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gallery"
              className="rounded-xl px-8 py-4 text-base font-semibold transition hover:opacity-90"
              style={{ backgroundColor: TEAL, color: "#ffffff" }}
            >
              Find my photos →
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-[rgba(255,255,255,0.2)] px-8 py-4 text-base font-semibold transition hover:border-[rgba(255,255,255,0.45)]"
              style={{ color: PAPER }}
            >
              Create account
            </Link>
          </div>
        </section>

        {/* ---------------- HOW IT WORKS ---------------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#2DD4BF" }}
          >
            How it works
          </p>
          <h2 style={serif} className="mt-3 max-w-2xl text-4xl font-normal leading-tight sm:text-5xl">
            Four steps. Zero scrolling through someone else&apos;s album.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-6"
                style={{ backgroundColor: SURFACE }}
              >
                <p className="text-3xl font-normal" style={{ ...serif, color: "#2DD4BF" }}>
                  {s.n}
                </p>
                <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {s.desc}
                </p>
                {s.n === "02" && (
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src="/sample-qr.svg"
                      alt="Sample event QR code"
                      className="h-20 w-20 shrink-0 rounded-xl bg-white p-1.5"
                    />
                    <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
                      Sample event QR — point a camera at it to see the guest
                      join page.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 style={serif} className="mx-auto max-w-3xl text-center text-4xl font-normal leading-tight sm:text-5xl">
            Built for photographers,
            <br />
            <span style={{ color: "#2DD4BF" }}>free for everyone.</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[rgba(255,255,255,0.08)] p-7"
                style={{ backgroundColor: SURFACE }}
              >
                <div className="text-3xl" style={{ color: "#2DD4BF" }}>
                  {f.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FINALE ---------------- */}
        <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h2 style={serif} className="mx-auto max-w-3xl text-4xl font-normal leading-tight sm:text-6xl">
            Your moments are waiting.
            <br />
            <span style={{ color: "#2DD4BF" }}>Go find them.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/gallery"
              className="rounded-xl px-8 py-4 text-base font-semibold transition hover:opacity-90"
              style={{ backgroundColor: TEAL, color: "#ffffff" }}
            >
              Find my photos →
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-[rgba(255,255,255,0.2)] px-8 py-4 text-base font-semibold transition hover:border-[rgba(255,255,255,0.45)]"
              style={{ color: PAPER }}
            >
              Create account
            </Link>
          </div>
        </section>

        <footer className="border-t border-[rgba(255,255,255,0.08)] py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs sm:flex-row sm:px-6" style={{ color: MUTED }}>
            <span className="flex items-center gap-2 font-display font-bold" style={{ color: PAPER }}>
              <img src="/logo-mark.svg" alt="" className="h-6 w-6" />
              Snap<span style={{ color: "#2DD4BF" }}>Find</span>
              <span className="font-medium" style={{ color: MUTED }}>Events</span>
            </span>
            <span>Free &amp; open-source. Your photos stay yours.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
