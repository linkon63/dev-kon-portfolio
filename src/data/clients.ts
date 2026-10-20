// Brands and products I've built for. Every entry shows in the client logo
// wall on the home page; entries with a `project` also get a detailed card in
// the "Client Work" grid on /allProject.
//
// neoComerz, Barnoi Holdings and Dizitali are already in the Projects
// database (admin → Projects), so they carry logo + tagline only.
//
// Assets live in /public/assets/clients:
//   logos/<slug>.webp    — logo for the wall and modal
//   screens/<slug>.webp  — 1280×800 homepage screenshot for the project card
//
// Order is display order: products first, then company sites, then stores.

export type ClientProject = {
  summary: string;
  description: string;
  features: string[];
  /** Framework detected on the live site — extend with your own stack. */
  stack: string[];
  /** Your role on the project, e.g. "Full-stack developer · Team lead". */
  role?: string;
};

export type Client = {
  slug: string;
  name: string;
  url: string;
  industry: string;
  /** Short line used when there's no `project` (already in Projects). */
  tagline?: string;
  /** e.g. "Softzino product" — shown as a small badge. */
  badge?: string;
  project?: ClientProject;
};

export const clients: Client[] = [
  {
    slug: "neocomerz",
    name: "neoComerz",
    url: "https://neocomerz.com/",
    industry: "E-commerce SaaS",
    tagline:
      "No-code e-commerce platform with premium themes and a full store-building service.",
  },
  {
    slug: "softzino-hrms",
    name: "Softzino HRMS",
    url: "https://hrms.softzino.com/",
    industry: "HR Tech · SaaS",
    badge: "Softzino product",
    project: {
      summary:
        "All-in-one HR system that turns manual registers into one digital board.",
      description:
        "Softzino-HRMS is a modular HR platform that automates attendance, leave, payroll and scheduling in a single system. Companies switch on the modules they need today — employee lifecycle, online/offline and geofenced attendance, shifts, leave policies, holiday calendars and reports — and add the rest as they grow.",
      features: [
        "Employee profiles, onboarding, documents and full lifecycle management",
        "Online & offline attendance with geofencing, shifts and work-hour tracking",
        "Leave requests, approvals, leave policies and a holiday & events calendar",
        "Payroll and real-time reporting dashboards",
        "Employee self-service dashboard with live notifications",
      ],
      stack: ["Next.js", "React"],
    },
  },
  {
    slug: "autoofix",
    name: "Autoofix",
    url: "https://autoofix.com/",
    industry: "Automotive SaaS",
    badge: "Softzino product",
    project: {
      summary:
        "Cloud-based management software for auto repair workshops and garages.",
      description:
        "Autoofix digitises an auto repair workshop end to end — quotations, invoicing, inventory, service history and staff performance — so garage owners can run the whole business from any device. It's used by workshops across Dhaka, with Basic, Premium and Enterprise plans.",
      features: [
        "Quotations and customizable invoices with per-invoice profit",
        "Inventory management with multiple price levels per item",
        "Service history tracking for every vehicle and customer",
        "Employee performance tracking, balance sheet and financial reports",
        "Multi-device sync and multiple firms under one account",
      ],
      stack: ["Nuxt", "Vue"],
    },
  },
  {
    slug: "autoping",
    name: "AutoPing.ai",
    url: "https://autoping.ai/",
    industry: "Automotive · Mobile App",
    project: {
      summary:
        "Real-time used-car alerts across 30 marketplaces in 17 countries.",
      description:
        "AutoPing.ai helps car importers, resellers and serious buyers reach underpriced used cars first. One saved filter watches 30 marketplaces — mobile.de, AutoScout24, Otomoto, Autogidas and more — across Europe and the US, and sends a push alert within minutes of a matching listing going live.",
      features: [
        "iOS and Android apps with real-time push alerts",
        "One saved filter watches 30 marketplaces in 17 countries",
        "Filters for make, model, year, price, mileage and fuel type",
        "Free plan, with paid plans from €4.99 / month",
      ],
      stack: ["React"],
    },
  },
  {
    slug: "bariplus",
    name: "BariPlus",
    url: "https://bariplusbd.com/",
    industry: "PropTech",
    project: {
      summary:
        "Property platform to buy, rent or sell homes, land and commercial spaces.",
      description:
        "BariPlus is a Bangladeshi property platform that connects property seekers with owners. People can buy, rent or sell houses, flats, land, commercial spaces, hotels, garages and more — on the web and in the iOS and Android apps — and businesses can promote their listings with banner ads.",
      features: [
        "Buy / rent / sell search with location and category filters",
        "Listings for homes, land, commercial spaces, hotels and garages",
        "Companion iOS and Android apps",
        "Promotions and banner ads for businesses",
      ],
      stack: ["Nuxt", "Vue"],
    },
  },
  {
    slug: "barnoi-holdings",
    name: "Barnoi Holdings",
    url: "https://barnoiholdings.com/",
    industry: "Real Estate",
    tagline: "Real-estate developer — providing luxury and comfort to all.",
  },
  {
    slug: "dizitali",
    name: "Dizitali",
    url: "https://dizitali.com/",
    industry: "Digital Marketing Agency",
    tagline:
      "Creative digital marketing agency — social media, web development and ad strategy.",
  },
  {
    slug: "davinci-media",
    name: "Da Vinci Media",
    url: "https://www.davincimedia.studio/",
    industry: "Creative Agency",
    project: {
      summary:
        "Website for a Dhaka-based creative and video production agency.",
      description:
        "Da Vinci Media builds brands, websites, digital products and marketing campaigns, with a strong focus on cinematic video production. The site presents their case studies, services, portfolio, blog and careers, and lets visitors book a free consultation call straight from the page.",
      features: [
        "Case studies and portfolio showcase",
        "Service pages: video production, web & experience design, branding",
        "Built-in consultation booking (Google Meet)",
        "Blog, careers and contact pages",
      ],
      stack: ["Next.js", "React"],
    },
  },
  {
    slug: "bdigo",
    name: "BdiGo",
    url: "https://bdigo.com/",
    industry: "Travel & Tourism",
    project: {
      summary:
        "Travel agency website with destinations, tour packages and online booking.",
      description:
        "BdiGo is a Bangladeshi tours & travels agency. The site showcases domestic and international destinations — from Sajek Valley, the Sundarbans and Cox's Bazar to Kashmir, Bali and the Maldives — with ready-made tour packages, a travel blog and customer testimonials, and lets travellers book their trip online.",
      features: [
        "Domestic and international destination listings",
        "Tour package bundles with duration and itinerary",
        "Online booking and enquiry flow",
        "Travel blog and customer testimonials",
      ],
      stack: ["Nuxt", "Vue"],
    },
  },
  {
    slug: "mh-engineering",
    name: "MH Engineering",
    url: "https://mhengineeringbd.com/",
    industry: "Water Treatment & Engineering",
    project: {
      summary:
        "Corporate website for a water-treatment and infrastructure engineering firm.",
      description:
        "MH Engineering Corporation designs and builds industrial ETP, WTP, STP, RO and demineralization plants and provides environmental consultancy (ECC). The site covers their products, projects, industry solutions, IT services and client portfolio, with a blog and news section.",
      features: [
        "Products and services catalog — ETP, WTP, STP, RO and ZLD plants",
        "Project and client showcases",
        "Industry-specific solution pages",
        "Blog & news, with a language switcher",
      ],
      stack: ["Next.js", "React"],
    },
  },
  {
    slug: "prasine",
    name: "Prasine International",
    url: "https://prasineint.com/",
    industry: "Apparel Manufacturing",
    project: {
      summary:
        "Corporate site for an apparel buying house and garment manufacturer.",
      description:
        "Prasine International is a Bangladesh-based apparel buying house and garment manufacturer serving global brands since 2019. The site walks buyers through their end-to-end process — fabric sourcing, development, sampling, manufacturing, quality assurance and shipment — and showcases their product categories and showroom.",
      features: [
        "Source-to-shipment process overview for global buyers",
        "Product categories from knit & woven to denim and outerwear",
        "Showroom gallery",
        "Buyer enquiry and quote requests",
      ],
      stack: ["Next.js", "React"],
    },
  },
  {
    slug: "organishi",
    name: "Organishi",
    url: "https://organishi.com/",
    industry: "Organic Food E-commerce",
    project: {
      summary: "Online store for organic food, straight from the farm.",
      description:
        "Organishi sells natural and organic food online across Bangladesh — mustard oil, salt, superfoods, nuts & seeds, grains, rice and flour — with a Bangla-first storefront, seasonal offers and a feed of the most recent products.",
      features: [
        "Category catalog: oil, salt, superfoods, nuts & seeds, grains",
        "Seasonal offers and promotional banners",
        "Product search, wishlist and cart",
        "Customer accounts and support contacts",
      ],
      stack: ["Next.js", "React"],
    },
  },
  {
    slug: "barnoi",
    name: "Barnoi",
    url: "https://barnoi.com/",
    industry: "Fashion E-commerce",
    project: {
      summary:
        "Online store for a Bangladeshi apparel brand selling polo shirts and T-shirts.",
      description:
        "Barnoi is a Bangladeshi clothing brand — “Flow in Style” — selling premium polo shirts and T-shirts. The store covers the full shopping flow: new arrivals, combo offers, cart and checkout, order tracking and customer accounts, plus a blog and delivery, return and cancellation policies.",
      features: [
        "Product catalog with new arrivals and combo offers",
        "Cart, checkout and order tracking",
        "Customer accounts",
        "Blog and store policy pages",
      ],
      stack: ["WordPress", "WooCommerce"],
    },
  },
  {
    slug: "pj-fashion",
    name: "PJ Fashion",
    url: "https://pjfashionbd.com/",
    industry: "Fashion E-commerce",
    project: {
      summary:
        "Online fashion store for sarees, panjabis, hoodies and women's wear.",
      description:
        "PJ Fashion is a Bangladeshi clothing brand. Its online store lets shoppers browse sarees, panjabis, hoodies and women's collections, search products, keep a cart and saved addresses, and check out with their account. Store settings, policies and social links are managed from the admin.",
      features: [
        "Category-based catalog with product search",
        "Customer login, saved addresses and cart",
        "Checkout and order flow",
        "Admin-managed store settings, policies and social links",
      ],
      stack: ["Laravel", "Inertia.js", "Vue"],
    },
  },
];
