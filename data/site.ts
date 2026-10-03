/**
 * ---------------------------------------------------------------------------
 * ADIO PRINTS INTERNATIONAL — SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ---------------------------------------------------------------------------
 * The client can edit everything on this file (name, phone, address, hours,
 * services, portfolio, testimonials, FAQs...) without touching any component.
 * Components import from here — never hard-code business info in JSX.
 */

export const business = {
  name: "Adio Prints International",
  shortName: "Adio Prints",
  tagline: "Quality Prints • Lasting Impressions",
  description:
    "Fast, quality and affordable printing in Nigeria — banners, flex, signage, stickers, T-shirts, business cards, flyers and branded materials.",

  // Phone / WhatsApp — keep digits only for links, display string for text.
  phoneDisplay: "0808 843 0235",
  phoneRaw: "08088430235",
  phoneIntl: "+2348088430235",
  whatsappNumber: "2348088430235", // digits only, international, no "+"
  email: "hello@adioprints.com", // placeholder — replace with real email

  address: {
    line1: "12 Example Street, Shop 4", // placeholder — replace
    line2: "Ikeja, Lagos State",
    city: "Lagos",
    country: "Nigeria",
    postal: "",
  },

  hours: [
    { days: "Monday – Friday", time: "8:00am – 6:00pm" },
    { days: "Saturday", time: "9:00am – 4:00pm" },
    { days: "Sunday", time: "Closed (WhatsApp messages answered)" },
  ],

  socials: [
    { label: "Instagram", href: "https://instagram.com/adioprints", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com/adioprints", icon: "facebook" },
    { label: "X (Twitter)", href: "https://x.com/adioprints", icon: "twitter" },
    { label: "TikTok", href: "https://tiktok.com/@adioprints", icon: "tiktok" },
  ],

  areaServed: ["Lagos", "Nigeria", "West Africa"],
} as const;

/** Base public URL — set NEXT_PUBLIC_SITE_URL in .env / Vercel. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adioprints.example";

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const slogans = {
  hero: "Your Vision. Our Print.",
  tagline: "Quality Prints • Lasting Impressions",
  fast: "Fast. Quality. Affordable.",
  bigger: "Bigger. Brighter. Better Prints.",
  bigDreams: "Big Dreams, Bigger Prints",
  speaks: "Prints That Speak!",
  nextIdea: "Let's Print Your Next Big Idea!",
  process: "Design → Print → Deliver → Grow",
} as const;

/* -------------------------------------------------------------------------- */
/*                                 SERVICES                                   */
/* -------------------------------------------------------------------------- */

export type ServiceAccent = "cyan" | "magenta" | "yellow" | "red";

export interface Service {
  slug: string;
  title: string;
  icon: string;
  accent: ServiceAccent;
  short: string;
  description: string;
  uses: string[];
  options: string[];
  turnaround: string;
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "banners-flex",
    title: "Banners & Flex",
    icon: "flag",
    accent: "cyan",
    short: "Outdoor flex banners, pull-ups and backdrops that stop people in their tracks.",
    description:
      "From church programmes and sales promos to grand openings — we print bold, weather-resistant flex banners and roll-up stands that stay sharp in Nigerian sun and rain. Crisp colour, strong eyelets, same-day options for urgent jobs.",
    uses: [
      "Church & mosque programmes",
      "Grand openings and promotions",
      "Conference and event backdrops",
      "Market and roadside advertising",
    ],
    options: [
      "Frontlit flex (500gsm / 440gsm)",
      "Backlit flex for light boxes",
      "Canvas and mesh banners",
      "Roll-up / pull-up banners with carry case",
      "Sizes from 1ft to 50ft+",
      "Hemming, eyelets, pole pockets, ropes",
    ],
    turnaround: "Same day to 48 hours",
    keywords: ["banner and flex printing", "flex banner price in Nigeria", "roll up banner"],
  },
  {
    slug: "signage-billboards",
    title: "Signage & Billboards",
    icon: "building",
    accent: "magenta",
    short: "Shop signs, 3D letters, ACP panels and billboards built to be seen from far away.",
    description:
      "We design, fabricate and install durable business signage — ACP cladding, acrylic 3D letters, light boxes, name plates and full billboards. Project management from survey to installation so your brand shows up properly.",
    uses: [
      "Shop and office signage",
      "Corporate identity and reception walls",
      "Directional and wayfinding signs",
      "Billboards and outdoor hoardings",
    ],
    options: [
      "ACP (aluminium composite) signage",
      "Acrylic / 3D fabricated letters",
      "Illuminated light boxes (LED)",
      "One-way vision window graphics",
      "PVC, foam board and name plates",
      "Site survey and installation",
    ],
    turnaround: "3 – 10 working days",
    keywords: ["signage and billboard", "shop sign in Nigeria", "3D letters signage"],
  },
  {
    slug: "stickers-labels",
    title: "Stickers & Labels",
    icon: "sticker",
    accent: "yellow",
    short: "Die-cut stickers, product labels and vinyl decals with clean, lasting adhesive.",
    description:
      "Product labels, logo stickers, car decals and promotional cut-outs. Printed on premium vinyl with gloss or matte lamination and cut to any shape — small batches welcome, bulk pricing available.",
    uses: [
      "Product and packaging labels",
      "Logo stickers and branding",
      "Car and window decals",
      "Event and giveaway stickers",
    ],
    options: [
      "Gloss, matte and transparent vinyl",
      "Die-cut, kiss-cut and roll labels",
      "Waterproof BOPP labels",
      "Removable and permanent adhesive",
      "UV and scratch-resistant lamination",
      "Sheeted or roll formats",
    ],
    turnaround: "24 – 72 hours",
    keywords: ["sticker printing Nigeria", "product labels printing", "vinyl sticker"],
  },
  {
    slug: "tshirts-apparel",
    title: "T-Shirts & Apparel",
    icon: "shirt",
    accent: "red",
    short: "Custom T-shirts, polos, caps and hoodies for teams, events and merch drops.",
    description:
      "DTF, HTV and screen printing on quality cotton and polos — sharp on dark and light fabrics alike. Perfect for uniform orders, church groups, school events, corporate retreats and branded merchandise.",
    uses: [
      "Corporate uniforms and team wear",
      "Event and volunteer T-shirts",
      "Church, school and NGO groups",
      "Merch and brand drops",
    ],
    options: [
      "DTF print (full colour, any fabric)",
      "Screen print (best for bulk)",
      "Heat transfer vinyl (HTV)",
      "Polo shirts, hoodies, caps, aprons",
      "Sizes S – 3XL, kids sizes available",
      "Back, front and sleeve placements",
    ],
    turnaround: "2 – 7 working days",
    keywords: ["custom T-shirt printing", "DTF shirt printing Nigeria", "uniform printing"],
  },
  {
    slug: "business-cards",
    title: "Business Cards",
    icon: "creditCard",
    accent: "cyan",
    short: "Premium business cards in matte, gloss or spot UV that people actually keep.",
    description:
      "First impressions matter. We print crisp business cards on thick stock with premium finishes — matte, gloss, spot UV, rounded corners and foil options. Free layout check on every order.",
    uses: [
      "Personal and company cards",
      "Sales and field teams",
      "Real estate and consultants",
      "Complimentary cards for clients",
    ],
    options: [
      "350gsm – 450gsm art paper",
      "Matte, gloss and silk lamination",
      "Spot UV and gold/silver foil",
      "Rounded corners and edge painting",
      "Standard 3.5 × 2in or custom size",
      "Single or double-sided",
    ],
    turnaround: "24 – 72 hours",
    keywords: ["business card printing", "cheap business cards Lagos", "spot UV card"],
  },
  {
    slug: "posters-flyers",
    title: "Posters & Flyers",
    icon: "fileText",
    accent: "magenta",
    short: "High-impact posters, handbills and flyers that carry your message far.",
    description:
      "Concert posters, sales handbills, service flyers and menu cards — printed in full colour on quality stock with sharp text and vivid images. Great for street promotions, church outreaches and product launches.",
    uses: [
      "Sales and street promotions",
      "Church and event outreach",
      "Menus, price lists and inserts",
      "Product launch handbills",
    ],
    options: [
      "A5, A4, A3 and custom sizes",
      "Gloss, matt and uncoated stock",
      "130gsm – 170gsm flyers",
      "Posters up to A1 and beyond",
      "Folding: bi-fold, tri-fold, z-fold",
      "Design assistance available",
    ],
    turnaround: "Same day – 48 hours",
    keywords: ["flyer printing Nigeria", "poster printing Lagos", "handbill printing"],
  },
  {
    slug: "invitations",
    title: "Invitations & Cards",
    icon: "mail",
    accent: "yellow",
    short: "Weddings, birthdays, naming ceremonies and corporate invites with class.",
    description:
      "Elegant invitation cards for weddings, birthdays, anniversaries and corporate events. Choose from our ready layouts or let us design something unique — printed, cut and delivered ready to hand out.",
    uses: [
      "Weddings and traditional ceremonies",
      "Birthdays and anniversaries",
      "Naming ceremonies and funerals",
      "Corporate invitations and RSVP cards",
    ],
    options: [
      "Art paper, textured and kraft stock",
      "Gold/silver foil and embossing",
      "Envelopes included",
      "Digital or offset printing",
      "Single cards or boxed sets",
      "Custom artwork or template design",
    ],
    turnaround: "3 – 7 working days",
    keywords: ["wedding invitation printing", "event invitation card Nigeria", "birthday invites"],
  },
  {
    slug: "branded-materials",
    title: "Branded Materials",
    icon: "gift",
    accent: "red",
    short: "Mugs, notebooks, pens, lanyards, tote bags — your logo, everywhere.",
    description:
      "Corporate gifts and branded giveaways that keep your business in people's hands. We brand mugs, notebooks, pens, lanyards, tote bags, umbrellas and more with your logo, colours and message.",
    uses: [
      "Corporate gifts and hampers",
      "Conference and summit packs",
      "Church and NGO giveaways",
      "Staff onboarding kits",
    ],
    options: [
      "Sublimation mugs and bottles",
      "Notebooks, diaries and pens",
      "Lanyards, ID cards and tote bags",
      "Umbrellas, caps and aprons",
      "USB drives and power banks",
      "Packaging with your brand tag",
    ],
    turnaround: "3 – 10 working days",
    keywords: ["branded materials Nigeria", "corporate gifts printing", "logo mug printing"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* -------------------------------------------------------------------------- */
/*                              TRUST / PROCESS                               */
/* -------------------------------------------------------------------------- */

export const trustStrip = [
  { title: "Fast Turnaround", detail: "Same-day options on urgent jobs", icon: "timer" },
  { title: "Quality Prints", detail: "Vivid colour, sharp detail", icon: "badgeCheck" },
  { title: "Affordable Prices", detail: "Fair rates with bulk discounts", icon: "wallet" },
  { title: "Nationwide Delivery", detail: "Lagos pickup or courier anywhere", icon: "truck" },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Design",
    text: "Send your idea, logo or rough sketch. Our designers create a clean layout — or we work with your ready file.",
    icon: "penTool",
  },
  {
    step: "02",
    title: "Print",
    text: "You approve a digital proof, then we print on the right material with calibrated colour and sharp finishing.",
    icon: "printer",
  },
  {
    step: "03",
    title: "Deliver",
    text: "Pick up from our Lagos shop or we ship nationwide with tracking. Urgent jobs can leave same day.",
    icon: "packageCheck",
  },
  {
    step: "04",
    title: "Grow",
    text: "Consistent branding across every piece helps customers recognise and trust you. We keep the file on record.",
    icon: "trendingUp",
  },
] as const;

export const whyUs = [
  {
    title: "Speed you can plan around",
    text: "We hit deadlines. Urgent banners and flyers can be ready the same day when you approve early.",
    icon: "timer",
  },
  {
    title: "Colour that matches your brand",
    text: "Calibrated printing and a proof before production — what you approve is what you get.",
    icon: "palette",
  },
  {
    title: "Prices that respect your budget",
    text: "Clear quotes, no hidden fees, and real discounts when you order in bulk.",
    icon: "wallet",
  },
  {
    title: "One shop for everything",
    text: "Banners, signage, cards, shirts and branded items — one team, one consistent look.",
    icon: "layers",
  },
  {
    title: "Design help included",
    text: "No artwork? No problem. Our designers handle layout, resizing and file setup for you.",
    icon: "penTool",
  },
  {
    title: "We deliver nationwide",
    text: "Collect in Lagos or we dispatch anywhere in Nigeria with tracking and careful packaging.",
    icon: "truck",
  },
] as const;

export const stats = [
  { value: "8+", label: "Years in business" },
  { value: "2,500+", label: "Projects completed" },
  { value: "900+", label: "Happy clients" },
  { value: "48hrs", label: "Average turnaround" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                 PORTFOLIO                                  */
/* -------------------------------------------------------------------------- */

export type PortfolioCategory =
  | "Banners"
  | "Signage"
  | "Stickers"
  | "Apparel"
  | "Cards"
  | "Flyers"
  | "Branded";

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  description: string;
  /** Replace `gradient` with a real image path e.g. "/images/portfolio/flex-1.jpg" */
  image: string;
  gradient: string;
}

/**
 * PLACEHOLDER ITEMS — replace with real project photos.
 * To use a real photo: set image to "/images/portfolio/your-file.jpg"
 * and drop the file in /public/images/portfolio/
 */
export const portfolio: PortfolioItem[] = [
  {
    id: "grand-opening-flex",
    title: "Grand Opening Flex Banner",
    client: "Sunrise Electronics",
    category: "Banners",
    description: "10ft × 3ft frontlit flex with hemming and eyelets, installed same day.",
    image: "",
    gradient: "linear-gradient(135deg, #00AEEF 0%, #0B0B0F 100%)",
  },
  {
    id: "church-programme-backdrop",
    title: "Church Programme Backdrop",
    client: "Grace Chapel",
    category: "Banners",
    description: "12ft × 8ft stage backdrop printed on matte vinyl for clean stage photos.",
    image: "",
    gradient: "linear-gradient(135deg, #EC008C 0%, #0B0B0F 100%)",
  },
  {
    id: "shop-signage",
    title: "Shopfront 3D Signage",
    client: "Kemi Fashion House",
    category: "Signage",
    description: "ACP panel with acrylic 3D letters and LED illumination, installed in Ikeja.",
    image: "",
    gradient: "linear-gradient(135deg, #E11D2E 0%, #0B0B0F 100%)",
  },
  {
    id: "office-reception",
    title: "Office Reception Brand Wall",
    client: "Northbridge Capital",
    category: "Signage",
    description: "Brushed ACP reception wall with mounted logo and company name.",
    image: "",
    gradient: "linear-gradient(135deg, #FFD500 0%, #0B0B0F 100%)",
  },
  {
    id: "product-labels",
    title: "Product Label Set",
    client: "Mama T Kitchen",
    category: "Stickers",
    description: "Waterproof die-cut BOPP labels, gloss laminated, supplied on rolls.",
    image: "",
    gradient: "linear-gradient(135deg, #FFD500 0%, #00AEEF 100%)",
  },
  {
    id: "logo-stickers",
    title: "Die-cut Logo Stickers",
    client: "Zoe Studios",
    category: "Stickers",
    description: "500 gloss vinyl logo stickers, kiss-cut on A4 sheets for easy peeling.",
    image: "",
    gradient: "linear-gradient(135deg, #00AEEF 0%, #EC008C 100%)",
  },
  {
    id: "event-tees",
    title: "Marathon Event T-Shirts",
    client: "Lagos City Run",
    category: "Apparel",
    description: "300 DTF-printed cotton tees with front logo and back sponsor wall.",
    image: "",
    gradient: "linear-gradient(135deg, #0B0B0F 0%, #E11D2E 100%)",
  },
  {
    id: "corporate-polos",
    title: "Corporate Staff Polos",
    client: "Delta Logistics",
    category: "Apparel",
    description: "120 embroidered & DTF polos in three colourways, sizes S–3XL.",
    image: "",
    gradient: "linear-gradient(135deg, #EC008C 0%, #0B0B0F 100%)",
  },
  {
    id: "spot-uv-cards",
    title: "Spot UV Business Cards",
    client: "Ada Real Estate",
    category: "Cards",
    description: "450gsm double-sided cards with soft-touch matte and gloss spot UV logo.",
    image: "",
    gradient: "linear-gradient(135deg, #0B0B0F 0%, #FFD500 100%)",
  },
  {
    id: "clinic-cards",
    title: "Clinic Appointment Cards",
    client: "WellLife Medical",
    category: "Cards",
    description: "Compact cards with appointment grid, matt laminated, 1,000 pcs.",
    image: "",
    gradient: "linear-gradient(135deg, #00AEEF 0%, #0B0B0F 100%)",
  },
  {
    id: "promo-flyers",
    title: "Sales Promo Flyers",
    client: "Bright Home Appliances",
    category: "Flyers",
    description: "5,000 A5 flyers on 140gsm gloss for nationwide distribution.",
    image: "",
    gradient: "linear-gradient(135deg, #E11D2E 0%, #FFD500 100%)",
  },
  {
    id: "conference-handbills",
    title: "Conference Handbills",
    client: "Future Leaders Summit",
    category: "Flyers",
    description: "Tri-fold handbills with schedule and speaker line-up, matt stock.",
    image: "",
    gradient: "linear-gradient(135deg, #0B0B0F 0%, #00AEEF 100%)",
  },
  {
    id: "branded-mugs",
    title: "Branded Coffee Mugs",
    client: "Bluegate Consulting",
    category: "Branded",
    description: "150 sublimation mugs in gift boxes for staff onboarding kits.",
    image: "",
    gradient: "linear-gradient(135deg, #FFD500 0%, #EC008C 100%)",
  },
  {
    id: "summit-kits",
    title: "Summit Welcome Kits",
    client: "TechNext Africa",
    category: "Branded",
    description: "Notebook, pen, lanyard and tote — all branded, packed per delegate.",
    image: "",
    gradient: "linear-gradient(135deg, #EC008C 0%, #00AEEF 100%)",
  },
];

export const portfolioCategories: Array<"All" | PortfolioCategory> = [
  "All",
  "Banners",
  "Signage",
  "Stickers",
  "Apparel",
  "Cards",
  "Flyers",
  "Branded",
];

/* -------------------------------------------------------------------------- */
/*                              TESTIMONIALS                                  */
/* -------------------------------------------------------------------------- */

/**
 * PLACEHOLDER TESTIMONIALS — replace with real client quotes before launch.
 */
export const testimonials = [
  {
    name: "Chinedu Okafor",
    role: "Owner, Sunrise Electronics",
    quote:
      "We needed a banner before our grand opening and Adio Prints delivered the same afternoon. Sharp colour, clean eyelets, no stress.",
    rating: 5,
  },
  {
    name: "Pastor Grace Adeyemi",
    role: "Grace Chapel, Lagos",
    quote:
      "They handle all our programme backdrops and handbills. Deadlines are tight every month but they never miss one.",
    rating: 5,
  },
  {
    name: "Bisi Balogun",
    role: "Events Planner",
    quote:
      "Invitations, T-shirts and branded notebooks for a 500-guest wedding — one team, one consistent look, delivered on time.",
    rating: 5,
  },
];

export const clientLogos = [
  "Sunrise Electronics",
  "Grace Chapel",
  "Northbridge Capital",
  "Mama T Kitchen",
  "Delta Logistics",
  "WellLife Medical",
  "TechNext Africa",
  "Zoe Studios",
];

/* -------------------------------------------------------------------------- */
/*                                    FAQS                                     */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How fast can you print?",
    a: "Most flyers, posters and banners are ready in 24–48 hours. We offer same-day service on urgent jobs when artwork is approved before noon. Signage, apparel and branded materials take 2–10 working days depending on fabrication.",
  },
  {
    q: "Is there a minimum order?",
    a: "No minimum for banners, signage and apparel — we can print one piece. Stickers and flyers have low minimums (from 50 pieces) and prices drop significantly as quantity increases.",
  },
  {
    q: "Can you help with the design?",
    a: "Yes. Send your logo, colours and a short brief and our designers will create the layout. Basic layout tweaks on existing artwork are free; full custom design is quoted per project.",
  },
  {
    q: "How do I pay?",
    a: "A 50% deposit confirms your job, with the balance before delivery. We accept bank transfer. For regular corporate clients we can arrange invoice terms after the first two orders.",
  },
  {
    q: "Do you deliver outside Lagos?",
    a: "Yes — we ship nationwide through reliable courier partners with tracking. Lagos clients can also pick up from the shop or request dispatch within the city.",
  },
  {
    q: "What file formats do you accept?",
    a: "Best: PDF, AI or CDR with fonts outlined and images at 300 DPI in CMYK. We also accept high-resolution PNG. If your file is low resolution we will flag it before printing and offer to fix it.",
  },
  {
    q: "What if the print is wrong or damaged?",
    a: "We check every proof with you before production, but if a job does not match the approved proof or arrives damaged, we reprint it at no cost. Just report it within 48 hours of delivery.",
  },
  {
    q: "Do you give bulk discounts?",
    a: "Yes. Quantity, size and material all affect price, and larger runs get better rates. Send your specs for a free quote — you will usually get a better price per unit than you expect.",
  },
  {
    q: "Can I see a sample before the full run?",
    a: "Absolutely. For apparel and signage we can produce a single sample first. For high-volume print jobs we send a digital proof and, where needed, a physical proof on the actual material.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              QUOTE FORM META                               */
/* -------------------------------------------------------------------------- */

export const deadlineOptions = [
  "Urgent (same day)",
  "Within 48 hours",
  "This week",
  "Next week",
  "Flexible / no rush",
];

export const quoteDefaults = {
  material: "Not sure — please advise",
  deadline: "Flexible / no rush",
};

export const sitemapExtraPaths = ["/", "/services", "/portfolio", "/how-it-works", "/about", "/contact"];
