import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

export default function SubcategoryNotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-white to-primary/5">
        {/* Decorative background elements */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-70" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl opacity-70" />

        <div className="relative z-10 max-w-2xl w-full mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Error 404
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Page not found</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            We couldn't find the page you're looking for!
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center text-white rounded-md bg-primary px-6 py-3 text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-8 text-xs text-primary/70">
            Or explore top sections:
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <Link href="/things-to-do" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Things to do</Link>
              <Link href="/eat-and-drink" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Eat & Drink</Link>
              <Link href="/entertainment" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Entertainment</Link>
              <Link href="/map" className="rounded-full bg-primary/10 text-primary px-3 py-1 hover:bg-primary/20 transition">Map</Link>
            </div>
          </div>
        </div>
      </div>
  )
}
