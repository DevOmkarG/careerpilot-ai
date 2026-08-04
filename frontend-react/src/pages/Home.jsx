import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  Target,
  Compass,
  Check,
  Mail,
  BookOpen,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "ATS optimization",
    desc: "Catch what applicant-tracking systems flag before a recruiter ever sees it.",
  },
  {
    icon: Brain,
    title: "AI review",
    desc: "Line-by-line feedback on phrasing, structure, and missing keywords.",
  },
  {
    icon: Target,
    title: "Career guidance",
    desc: "Matched roles and next steps based on what's actually on your resume.",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Try it before you commit",
    features: ["3 resume analyses", "Basic ATS score", "1 job match / month"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/ month",
    tagline: "For active job seekers",
    features: [
      "Unlimited resume analyses",
      "AI cover letter generator",
      "Unlimited job matching",
      "Mock interview simulator",
      "Application tracker",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Campus",
    price: "Custom",
    period: "per institute",
    tagline: "For colleges & placement cells",
    features: [
      "Bulk student seats",
      "Placement-cell dashboard",
      "Priority support",
      "Custom onboarding",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

const blogPosts = [
  {
    title: "5 resume mistakes that get you auto-rejected by ATS",
    tag: "ATS Tips",
  },
  {
    title: "How to tailor one resume for ten different job descriptions",
    tag: "Career Strategy",
  },
  {
    title: "What recruiters actually look at in the first 7 seconds",
    tag: "Hiring Insights",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 [font-family:'Inter',sans-serif]">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <Compass size={19} className="text-white" />
            </div>
            <div>
              <h1 className="text-[15px] font-bold tracking-tight text-slate-900 [font-family:'Sora',sans-serif]">
                CareerPilot
              </h1>
              <p className="text-[11px] font-medium text-slate-400">AI resume intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#blog" className="hover:text-slate-900">Blog</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign up free
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -right-24 top-[80px] h-[380px] w-[380px] rounded-full bg-teal-50 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 md:px-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
              <Sparkles size={13} />
              AI-powered resume analyzer
            </div>

            <h1 className="text-[44px] font-bold leading-[1.1] tracking-tight text-slate-900 [font-family:'Sora',sans-serif] md:text-[56px]">
              Chart a clearer
              <br />
              path to your{" "}
              <span className="text-blue-600">next role.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
              Get an instant read on your ATS score, missing skills, and the
              fastest path to an interview — trusted by candidates applying
              across India, the US, and the UK.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-700"
              >
                Analyze your resume — free
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-slate-200 px-7 py-3.5 text-[15px] font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Log in
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              3 free analyses included. No card required.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3" id="features">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      <Icon size={17} className="text-blue-600" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-slate-800">{f.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-5 text-slate-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual placeholder — replaces the old functional upload box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
              <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
                Sample result
              </p>
              <div className="mt-4 flex items-center gap-6">
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-8 border-blue-100">
                  <span className="text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
                    87%
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">ATS Score</p>
                  <p className="mt-1 text-sm text-slate-500">Strong match for Frontend roles</p>
                </div>
              </div>
              <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check size={15} className="text-teal-600" />
                  Keyword coverage is strong
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check size={15} className="text-teal-600" />
                  Missing: "TypeScript", "CI/CD"
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check size={15} className="text-teal-600" />
                  3 quantified achievements found
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-slate-100 bg-slate-50/60 py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-slate-500">
              Start free with 3 resume analyses. Upgrade only when you need more.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-8 ${
                  p.highlight
                    ? "border-blue-600 bg-white shadow-xl shadow-blue-600/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-8 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-bold text-white">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
                    {p.price}
                  </span>
                  <span className="text-sm text-slate-400">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <Check size={15} className="mt-0.5 flex-shrink-0 text-teal-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    navigate(p.name === "Campus" ? "/officer-signup" : "/signup")
                  }
                  className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition ${
                    p.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section id="blog" className="py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
                From the blog
              </h2>
              <p className="mt-2 text-slate-500">Career advice, ATS tips, and hiring insights.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <BookOpen size={16} className="text-blue-600" />
                </div>
                <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {post.tag}
                </span>
                <h3 className="mt-2 text-[15px] font-semibold leading-6 text-slate-800">
                  {post.title}
                </h3>
                <span className="mt-4 inline-block text-xs font-medium text-slate-400">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-slate-100 bg-slate-50/60 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Questions? We're here to help.
          </h2>
          <p className="mt-3 text-slate-500">
            For support, partnerships, or campus licensing — reach out any time.
          </p>
          <a
            href="mailto:luckygaikwad62@gmail.com"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Mail size={16} />
            luckygaikwad62@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <Compass size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-slate-700 [font-family:'Sora',sans-serif]">
              CareerPilot
            </span>
            <span className="text-sm text-slate-400">© 2026</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <span>Privacy</span>
            <span>Terms</span>
            <a href="#contact" className="hover:text-slate-600">Support</a>
          </div>

        
        </div>
      </footer>
    </div>
  );
}
