import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const brandPillars = [
  {
    title: 'Calm Experience',
    description: 'Sound, scent, and light choreographed for an instant exhale.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 9c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
        <path d="M4 14c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      </svg>
    ),
  },
  {
    title: 'Caring Hands',
    description: 'Certified therapists who blend precision with heartfelt warmth.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11.5c2-1.5 4-1.5 6 0 2-1.5 4-1.5 6 0" />
        <path d="M5 11.5V16c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-4.5" />
        <path d="M9 8.5a3 3 0 1 1 6 0" />
      </svg>
    ),
  },
  {
    title: 'Clean Craft',
    description: 'Nature-led formulas and mindful details you can trust every visit.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 4v4" />
        <path d="M7 6l10 10" />
        <path d="M4 14.5C4 10 7.5 6 12 6s8 4 8 8.5S16.5 22 12 22s-8-4-8-7.5Z" />
      </svg>
    ),
  },
];

const mainServices = [
  {
    title: 'Facial Massage & Treatment',
    description:
      'Bespoke facials that blend calming touch with clean, high-performing products to reawaken glow and confidence.',
    image: {
      src: '/images/generated/service-facial-massage.png',
      alt: 'Guest enjoying a bespoke facial massage treatment',
    },
  },
  {
    title: 'Head Massage & Spa',
    description:
      'A sensory head spa ritual that relieves fatigue, soothes the nervous system, and invites deep mental rest.',
    image: {
      src: '/images/generated/service-head-spa.png',
      alt: 'Immersive head spa ritual with eucalyptus steam',
    },
  },
  {
    title: 'Hand & Feet Massage',
    description:
      'Gentle, precise care for hands and feet — perfect for mothers, frequent flyers, and anyone craving mindful touch.',
    image: {
      src: '/images/generated/service-hand-feet-massage.png',
      alt: 'Mindful hand and feet massage ritual for mothers and daughters',
    },
  },
  {
    title: 'IV Drip Therapy',
    description:
      'Scientifically curated IV cocktails that replenish from within, paired with soft lighting and personalized aromas.',
    image: {
      src: '/images/generated/service-iv-drip-lounge.png',
      alt: 'Boutique IV drip therapy lounge at WANAKA Sanctuary',
    },
  },
];

const missionHighlights = [
  {
    title: 'Trained & Trusted Hands',
    description:
      'Every treatment is delivered by therapists certified to the highest standards, blending precision with heartfelt hospitality.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11.5c2-1.5 4-1.5 6 0 2-1.5 4-1.5 6 0" />
        <path d="M5 11.5V16c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-4.5" />
        <path d="M9 8.5a3 3 0 1 1 6 0" />
      </svg>
    ),
  },
  {
    title: 'Nature-Led Products',
    description:
      'Clean, safe, and conscious formulations protect every skin type — especially sensitive guests, mothers, and young families.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 4c-4 0-7 3.4-7 7.6 0 6.1 4.2 8.4 7 9.9 2.8-1.5 7-3.8 7-9.9C19 7.4 16 4 12 4Z" />
        <path d="M9 12c1.2.8 2.4 1 3.8.6 1.4-.4 2.4-1.2 3.2-2.6" />
      </svg>
    ),
  },
  {
    title: 'Hospitality First',
    description:
      'Thoughtful touches — warm towels, curated playlists, handwritten notes — turn small rituals into memorable everyday luxuries.',
    icon: (
      <svg
        className="h-10 w-10 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21c-4.5-2.6-7-5.7-7-9.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 7 5.5c0 3.8-2.5 6.9-7 9.5Z" />
        <path d="M9.5 12.5 11 14l3.5-3.5" />
      </svg>
    ),
  },
];

const signatureJourneys = [
  {
    title: 'Express Reset',
    description:
      '45-minute school-run ritual with facial, head, and palm massage — served with botanical drinks and mindful snacks.',
  },
  {
    title: 'Happy Bar Lounge',
    description:
      'A cozy hospitality corner for journaling, refreshments, and lingering moments of quiet before heading home.',
  },
  {
    title: 'Private Retreat',
    description:
      'Reserve the sanctuary for families or close friends to share restorative experiences without interruption.',
  },
  {
    title: 'Kids Friendly Rituals',
    description:
      'Playful, gentle treatments designed for mothers and daughters to bond through shared self-care.',
  },
];

const multiSensoryJourney = [
  {
    text: 'Custom soundscapes tuned to each room — from flowing water to meditative tones.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v0a7 7 0 0 1-7 7v0a7 7 0 0 1-7-7Z" />
        <path d="M9 11a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3Z" />
        <path d="M12 15v4" />
      </svg>
    ),
  },
  {
    text: 'Aroma zoning with lavender, eucalyptus, or citrus to match the desired mood.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 20c2.2-1.4 4-3.2 4-5.5A4 4 0 0 0 12 10a4 4 0 0 0-4 4.5c0 2.3 1.8 4.1 4 5.5Z" />
        <path d="M12 4.5V6" />
        <path d="M9.5 5 9 6.5" />
        <path d="M14.5 5 15 6.5" />
      </svg>
    ),
  },
  {
    text: 'Adaptive warm-to-cool lighting that signals either deep relaxation or post-treatment refresh.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 4v4" />
        <path d="M6.3 6.3 8.5 8.5" />
        <path d="M4 12h3" />
        <path d="M19 12h-3" />
        <path d="M15.5 8.5 17.7 6.3" />
        <path d="M12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    ),
  },
];

const immersiveDetails = [
  {
    text: 'Mood Cards that guide welcome drinks and intention setting.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="4" y="5" width="8" height="14" rx="2" />
        <path d="m12 7 4-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8" />
        <path d="M8 9h0" />
        <path d="M8 13h0" />
      </svg>
    ),
  },
  {
    text: 'Scent-matched bath bomb foot soaks as a grounding prelude.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11h14" />
        <path d="M5 11a7 7 0 0 0 7 7v0a7 7 0 0 0 7-7" />
        <path d="M8 7h0" />
        <path d="M12 7h0" />
        <path d="M16 7h0" />
      </svg>
    ),
  },
  {
    text: 'A two-minute sound bath moment to ease into or out of treatments.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 18a7 7 0 0 1 0-12" />
        <path d="M19 18a7 7 0 0 0 0-12" />
        <path d="M9 16a3 3 0 0 1 0-8" />
        <path d="M15 16a3 3 0 0 0 0-8" />
      </svg>
    ),
  },
  {
    text: 'Thoughtful surprise gifts — from gemstone bracelets to wellness treats.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 8c1.1-2.5.2-4-1-4S8 4.5 8 6c0 1.6 1 3 4 5 3-2 4-3.4 4-5 0-1.5-1.2-2-3-2" />
        <path d="M5 10h14v10H5z" />
        <path d="M12 10v10" />
      </svg>
    ),
  },
  {
    text: 'A loyalty journey that rewards every visit with meaningful rituals.',
    icon: (
      <svg
        className="h-8 w-8 text-[#5b6d65]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 4h12l1 6-7 10-7-10z" />
        <path d="m7 8 5-2 5 2" />
      </svg>
    ),
  },
];

const galleryImages = [
  {
    src: '/images/generated/gallery-lounge-glow.png',
    alt: 'Ambient view of the WANAKA lounge with curved seating',
    label: 'Lounge Glow',
  },
  {
    src: '/images/generated/gallery-calm-corners.png',
    alt: 'Calm corner featuring tea ritual and botanical accents',
    label: 'Calm Corners',
  },
  {
    src: '/images/generated/gallery-wellness-wing.png',
    alt: 'Perspective down the sanctuary wellness wing',
    label: 'Wellness Wing',
  },
];

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@wanakasanctuary.com',
    href: 'mailto:hello@wanakasanctuary.com',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 5 8-5" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '062 642 6565',
    href: 'tel:+66626426565',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6.6 4.6 9 4l1.3 3.5-1.5 1.1a10 10 0 0 0 4.6 4.6l1.1-1.5L18 15l-.6 2.4a2 2 0 0 1-2 1.6c-6.1 0-11-4.9-11-11a2 2 0 0 1 1.6-2Z" />
      </svg>
    ),
  },
  {
    label: 'Address',
    value: '99 65 Tambon Bang Kaeo, Bang Phli District, Samut Prakan 10540',
    icon: (
      <svg
        className="h-6 w-6 text-white/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21c-4-3.5-7-7.1-7-10.5a7 7 0 0 1 14 0c0 3.4-3 7-7 10.5Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#f7f2e8] text-[#2f3a36]">
      <header className="sticky top-0 z-20 border-b border-[#d6c8b2]/40 bg-[#f7f2e8]/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-2xl font-semibold tracking-wide text-[#2f3a36]">
              WANAKA Sanctuary
            </p>
            <nav className="hidden items-center gap-6 text-sm font-medium text-[#5b6d65] lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[#2f3a36]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="rounded-full border border-[#5b6d65] px-4 py-2 text-sm font-medium text-[#5b6d65] transition hover:bg-[#5b6d65] hover:text-white"
              >
                Book a Ritual
              </Link>
            </div>
          </div>
          <nav className="mt-5 flex gap-4 overflow-x-auto text-xs font-semibold uppercase tracking-[0.3em] text-[#5b6d65] lg:hidden">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-[#2f3a36]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3d8c7] via-[#f7f2e8] to-[#b4b8a0]/30" />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
            <div className="space-y-8">
              <span className="inline-flex w-fit items-center rounded-full bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-[#6f7b7a]">
                Everyday Sanctuary
              </span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#2f3a36] sm:text-5xl">
                Small Rituals. Big Rest.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#44544d]">
                Calm, caring, and clean craft come together in Bangna’s newest wellness sanctuary.
                WANAKA is the pause between school runs, meetings, and family life — a place where
                modern women and their loved ones breathe, reset, and feel wonderful again.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#services"
                  className="rounded-full bg-[#5b6d65] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#46574f]"
                >
                  Explore Services
                </Link>
                <Link
                  href="#about"
                  className="rounded-full border border-[#6f7b7a] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:border-[#2f3a36]"
                >
                  Discover The Story
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-[#d6c8b2]/40 blur-3xl" />
              <div className="relative h-80 rounded-[32px] bg-white/70 shadow-xl shadow-[#d6c8b2]/40 md:h-[28rem]">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/60">
                  <Image
                    src="/images/clinic.png"
                    alt="Soft-lit lounge interior of WANAKA Sanctuary"
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 80vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#d6c8b2]/50 bg-white/60">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 sm:grid-cols-3">
            {brandPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group rounded-3xl border border-[#d6c8b2]/60 bg-white/80 p-6 shadow-sm shadow-[#d6c8b2]/20 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d6c8b2]/40"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-[#f7f2e8] p-3 text-[#5b6d65]">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#2f3a36]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52635d]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-6xl px-6 py-24 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                About WANAKA
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                A sanctuary for your skin, body, and mind.
              </h2>
              <p className="text-lg leading-relaxed text-[#44544d]">
                Happiness and confidence are born from balance. WANAKA Sanctuary was created so every
                visit feels like coming home to yourself — whether you are a devoted mom, a growing
                entrepreneur, or a family seeking calm. Warm interiors, mindful therapists, and gentle
                rituals invite you to pause, feel cared for, and reconnect with what matters.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[32px] bg-[#d6c8b2]/40 blur-3xl" />
              <div className="relative h-80 rounded-[32px] bg-white/80 shadow-xl shadow-[#d6c8b2]/30 md:h-[26rem]">
                <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/60">
                  <Image
                    src="/images/generated/about-sanctuary.png"
                    alt="Serene treatment suite inside WANAKA Sanctuary"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 460px, 85vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mission"
          className="border-y border-[#d6c8b2]/50 bg-[#e3d8c7]/60"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[32px] bg-[#d6c8b2]/40 blur-3xl" />
              <div className="relative h-64 overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-xl shadow-[#d6c8b2]/30 md:h-80">
                <Image
                  src="/images/generated/mission-hero.png"
                  alt="Mindful ritual collage representing WANAKA mission"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 440px, 90vw"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                  Mission
                </p>
                <h2 className="text-3xl font-semibold text-[#2f3a36] sm:text-4xl">
                  Craft moments that feel wonderful.
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-[#44544d]">
                  From the first welcome to the final sip of tea, every detail is designed to restore
                  your glow and sense of presence. WANAKA promises premium, trustworthy care without
                  pressure — only kindness, skill, and rituals rooted in nature.
                </p>
              </div>
              <div className="space-y-4">
                {missionHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="flex gap-4 rounded-3xl bg-white/80 p-6 shadow-lg shadow-[#d6c8b2]/30"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f7f2e8] text-[#5b6d65]">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2f3a36]">
                        {highlight.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#52635d]">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="mx-auto max-w-6xl px-6 py-24 lg:py-28"
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="lg:w-1/3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                Services
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                Rituals that fit real life, crafted for calm and visible results.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#52635d]">
                Choose a signature service or layer treatments together. Every ritual begins with a
                grounding welcome and ends with a mindful closing — no rush, just restoration.
              </p>
            </div>
            <div className="lg:w-2/3">
              <div className="grid gap-6 md:grid-cols-2">
                {mainServices.map((service) => (
                  <div
                    key={service.title}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#d6c8b2]/40"
                  >
                    <div>
                      <div className="relative mb-5 h-40 overflow-hidden rounded-[24px] border border-white/60 bg-[#f7f2e8] shadow-inner shadow-[#d6c8b2]/30">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 260px, 90vw"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-[#2f3a36]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#52635d]">
                        {service.description}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                      Calm • Caring • Clean
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl bg-[#5b6d65] p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                  Signature Journeys
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {signatureJourneys.map((journey) => (
                    <div key={journey.title}>
                      <h4 className="text-lg font-semibold">{journey.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        {journey.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="border-t border-[#d6c8b2]/50 bg-[#f7f2e8]/90"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                  Experience Design
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                  A multi-sensory journey that lingers long after you leave.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#44544d]">
                  Every touchpoint is curated to honor your senses. WANAKA flows like the gentle
                  rhythm of waves: arrive softly, move through guided rituals, and depart feeling
                  balanced, cherished, and renewed.
                </p>
              </div>
              <div className="space-y-10">
                <div className="relative h-56 overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-lg shadow-[#d6c8b2]/30 sm:h-64">
                  <Image
                    src="/images/generated/experience-banner.png"
                    alt="Sensory lighting journey inside WANAKA Sanctuary"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 90vw"
                  />
                </div>
                <div className="rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20">
                  <h3 className="text-lg font-semibold text-[#2f3a36]">
                    Multi-sensory Notes
                  </h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#52635d]">
                    {multiSensoryJourney.map((item) => (
                      <li key={item.text} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7f2e8] text-[#5b6d65]">
                          {item.icon}
                        </div>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-[#d6c8b2]/70 bg-white/80 p-6 shadow-md shadow-[#d6c8b2]/20">
                  <h3 className="text-lg font-semibold text-[#2f3a36]">
                    Immersive Details
                  </h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#52635d]">
                    {immersiveDetails.map((detail) => (
                      <li key={detail.text} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7f2e8] text-[#5b6d65]">
                          {detail.icon}
                        </div>
                        <span>{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6f7b7a]">
                Sanctuary Preview
              </p>
              <h2 className="text-3xl font-semibold leading-tight text-[#2f3a36] sm:text-4xl">
                A glimpse into the rituals we are crafting for you.
              </h2>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="group relative h-80 overflow-hidden rounded-[32px] border border-white/50 bg-white/60 shadow-lg shadow-[#d6c8b2]/30 sm:h-96"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/50 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                  <p className="text-lg font-semibold">{image.label}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    Imagery Coming Soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-t border-[#d6c8b2]/50 bg-gradient-to-br from-[#5b6d65] via-[#44544d] to-[#2f3a36] text-white"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/15 to-transparent mix-blend-screen" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                Book Your Moment
              </p>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Ready for the calm between drop-off and pick-up?
              </h2>
              <p className="text-base leading-relaxed text-white/80">
                Share your preferred ritual, schedule, or special requests. Our concierge team will
                curate the ideal experience — from express resets to immersive family retreats.
              </p>
            </div>
            <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 backdrop-blur">
              <div className="space-y-4 text-sm text-white/80">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      {detail.icon}
                    </div>
                    {detail.href ? (
                      <Link
                        href={detail.href}
                        className="text-white/80 transition hover:text-white"
                      >
                        <span className="font-semibold text-white">{detail.label}:</span>{' '}
                        {detail.value}
                      </Link>
                    ) : (
                      <p>
                        <span className="font-semibold text-white">{detail.label}:</span>{' '}
                        {detail.value}
                      </p>
                    )}
                  </div>
                ))}
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Membership Preview Available on Request
                </p>
              </div>
              <Link
                href="mailto:hello@wanakasanctuary.com"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#2f3a36] transition hover:bg-[#f7f2e8]"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#2f3a36] py-10 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WANAKA Sanctuary. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#about" className="transition hover:text-white">
              About
            </Link>
            <Link href="#services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="#experience" className="transition hover:text-white">
              Experience
            </Link>
            <Link href="#contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Trigger deploy 01