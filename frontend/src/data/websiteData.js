export const websiteData = {
  brand: {
    name: "spaciaz",
    tagline: "Landmark Real Estate & Architecture",
    phone: import.meta.env?.VITE_CONTACT_PHONE || "+0144 123 456 789",
    email: import.meta.env?.VITE_CONTACT_EMAIL || "contact@spaciaz.com",
    address: "742 Evergreen Terrace, Suite 500, New York, NY 10001",
  },
  
  navLinks: [
    { label: "Demos", href: "#hero", hasDropdown: true },
    { label: "Pages", href: "#landmark", hasDropdown: true },
    { label: "Services", href: "#expertise", hasDropdown: true },
    { label: "Projects", href: "#luxury-living", hasDropdown: true },
    { label: "News", href: "#news", hasDropdown: true },
    { label: "Contact", href: "#contact", hasDropdown: false },
  ],

  hero: {
    badge: "ARCHITECTURAL INNOVATION",
    titleLine1: "A new",
    titleLine2: "standard of",
    titleLine3: "excellence",
    description: "The largest privately-held real estate investors and managers in the world.",
    ctaButton: "View All Services",
    yearsExperience: "40",
    yearsLabel: "years of\nexperiences",
    towerImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    sliderPill: {
      total: "04",
      current: "01",
      title: "Explore Landmark Tower",
    }
  },

  landmarkSection: {
    sectionNumber: "01 / 02",
    title: "We developed landmark\nreal estate projects",
    cards: [
      {
        id: "what-we-do",
        tag: "01",
        title: "What we do",
        description: "We specialize in developing high quality residential and commercial spaces that foster community and elevate lifestyle.",
        linkText: "Our Mission",
        bgColor: "bg-[#161A16]",
        textColor: "text-white",
        accentColor: "bg-[#D4F138] text-black",
        hasImage: false,
      },
      {
        id: "our-impact",
        tag: "02",
        title: "Our impact",
        description: "Our work attracts leaders and developers to create solutions for modern living spaces.",
        linkText: "View Impact",
        bgColor: "bg-[#D4F138]",
        textColor: "text-[#141714]",
        accentColor: "bg-[#141714] text-white",
        hasImage: true,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Modern glass skyscraper geometric impact",
      },
      {
        id: "core-values",
        tag: "03",
        title: "Core values",
        description: "Over years of excellence, delivering smart, sustainable developments that inspire community and drive growth.",
        linkText: "Our Values",
        bgColor: "bg-[#161A16]",
        textColor: "text-white",
        accentColor: "bg-[#D4F138] text-black",
        hasImage: true,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Architectural modern luxury house",
      }
    ]
  },

  tickerItems: [
    {
      title: "Vibrant community",
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=160&q=80"
    },
    {
      title: "Comprehensive amenities",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=160&q=80"
    },
    {
      title: "Professional services",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=160&q=80"
    },
    {
      title: "Sustainable engineering",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=160&q=80"
    },
    {
      title: "Prime urban locations",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=160&q=80"
    },
    {
      title: "Biophilic architectural design",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=160&q=80"
    }
  ],

  statistics: [
    {
      value: "48+",
      label: "completed\nprojects",
      highlight: true
    },
    {
      value: "52+",
      label: "projects in\ndevelopment",
      highlight: false
    },
    {
      value: "2.3b+",
      label: "total projects\ncost ($USD)",
      highlight: false
    },
    {
      value: "18m+",
      label: "square feet of\nproperty managed",
      highlight: false
    }
  ],

  luxuryLiving: {
    tag: "PORTFOLIO & DEVELOPMENTS",
    title: "Discover luxury living in our\nmost affordable price",
    description: "Explore our signature collection of master-planned developments, urban penthouses, and eco-certified corporate headquarters.",
    categories: ["All Projects", "Residential", "Commercial", "Eco Villas", "Penthouses"],
    projects: [
      {
        id: 1,
        title: "The Luminara Sky Tower",
        category: "Residential",
        location: "Hudson Yards, New York",
        price: "$2,450,000+",
        area: "3,850 sq ft",
        beds: "4 Beds",
        baths: "4.5 Baths",
        completion: "2025",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
        tag: "Award Winner",
        description: "A cantilevered 62-story architectural masterpiece featuring biophilic vertical sky-gardens, private elevator entry, and panoramic panoramic skyline views.",
        features: ["Private Sky Terrace", "LEED Platinum Certified", "Valet & 24/7 Concierge", "Infinity Edge Heated Pool"]
      },
      {
        id: 2,
        title: "Solstice Pavilion Headquarters",
        category: "Commercial",
        location: "South Lake Union, Seattle",
        price: "$145,000,000",
        area: "480,000 sq ft",
        beds: "38 Floors",
        baths: "Multi-tenant",
        completion: "2024",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
        tag: "Net Zero Energy",
        description: "Next-generation corporate headquarters designed with kinetic solar facades, rainwater harvesting, and timber-hybrid engineering.",
        features: ["Solar Facade Array", "Biophilic Atrium", "Auditorium & Innovation Labs", "Direct Transit Link"]
      },
      {
        id: 3,
        title: "Vanguard Eco Coastal Villa",
        category: "Eco Villas",
        location: "Malibu Coastline, California",
        price: "$6,800,000",
        area: "5,400 sq ft",
        beds: "5 Beds",
        baths: "6 Baths",
        completion: "2025",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        tag: "Exclusive",
        description: "Seamless indoor-outdoor oceanfront residence with floor-to-ceiling retractable glass, minimalist limestone finishes, and geothermal climate control.",
        features: ["Private Beach Access", "Geothermal Heating", "Wine Cellar & Tasting Room", "Smart Automation OS"]
      },
      {
        id: 4,
        title: "Metropolis Vertex Penthouse",
        category: "Penthouses",
        location: "Mayfair, Central London",
        price: "£4,200,000",
        area: "4,100 sq ft",
        beds: "3 Beds",
        baths: "3.5 Baths",
        completion: "2024",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        tag: "Turnkey Luxury",
        description: "Crown jewel duplex penthouse perched over Hyde Park, featuring bespoke Italian marble, custom acoustic engineering, and private rooftop helipad access.",
        features: ["Bespoke Italian Marble", "Rooftop Plunge Pool", "Private Wine Gallery", "Direct Park Views"]
      }
    ]
  },

  leadership: {
    tag: "OUR LEADERSHIP",
    title: "Global executive leadership",
    subtitle: "A multidisciplinary team of world-renowned architects, urban planners, and financial strategists crafting tomorrow's landmarks.",
    members: [
      {
        name: "Marcus Sterling",
        role: "Chief Executive Officer & Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
        bio: "Over 25 years leading institutional real estate investments totaling $12B+ across North America, Europe, and Asia.",
      },
      {
        name: "Elena Rostova, FAIA",
        role: "Chief Architectural Officer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
        bio: "Pritzker-nominated architect leading sustainable skyscraper concepts and biophilic urban integration.",
      },
      {
        name: "David Vance",
        role: "Managing Director of Developments",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
        bio: "Directs engineering precision, high-efficiency procurement, and zero-carbon construction workflows.",
      },
      {
        name: "Sophia Chen",
        role: "Director of Interior & Experience Design",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
        bio: "Specializes in spatial aesthetics, sensory lighting, and high-end residential interior curation.",
      }
    ]
  },

  expertise: {
    tag: "OUR EXPERTISE",
    title: "The expertise we got",
    description: "From conceptual sketches and environmental impact studies to capital syndication and property operations, we provide end-to-end excellence.",
    services: [
      {
        number: "01",
        title: "Master Planning & Conceptual Architecture",
        desc: "We originate world-class urban blueprints that balance aesthetic grandeur, structural longevity, and local municipal zoning requirements.",
        points: ["3D Parametric Modeling", "Zoning & Environmental Clearances", "Density & Traffic Flow Optimization"]
      },
      {
        number: "02",
        title: "Sustainable & Biophilic Engineering",
        desc: "Embedding high-performance geothermal systems, solar kinetic facades, and living vertical gardens into multi-story developments.",
        points: ["LEED & WELL Platinum Certification", "Net-Zero Carbon Footprint Engineering", "Smart Greywater Reclamation"]
      },
      {
        number: "03",
        title: "High-End Interior Architecture & Styling",
        desc: "Curating tactile luxury with custom Italian stonework, bespoke millwork, acoustic isolation, and circadian lighting systems.",
        points: ["Bespoke Material Procurement", "Turnkey Penthouse Furnishing", "Acoustic & Smart Light Engineering"]
      },
      {
        number: "04",
        title: "Global Capital & Asset Portfolio Management",
        desc: "Guiding institutional funds, family offices, and private investors with data-driven yield optimization and asset appreciation.",
        points: ["Cross-Border Syndication", "Active Asset Enhancement", "Tenant Retention & Premium Leasing"]
      }
    ]
  },

  testimonials: [
    {
      id: 1,
      quote: "Spaciaz transformed our vision of a green residential tower into an award-winning reality that sold out in pre-launch within 45 days. Their design precision is unmatched.",
      name: "Jonathan Bradley",
      role: "Managing Partner, Bradley Capital Group",
      company: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 2,
      quote: "The combination of cutting-edge sustainable engineering and timeless architectural elegance made our corporate campus an icon in the Pacific Northwest.",
      name: "Claire Beaumont",
      role: "VP of Global Real Estate, Horizon Technologies",
      company: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: 3,
      quote: "From initial master planning through to handover, Spaciaz delivered our flagship coastal development two months ahead of schedule with zero compromises.",
      name: "Henrik Lindqvist",
      role: "Chief Executive Officer, Nordic Living Fund",
      company: "Oslo, Norway",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ],

  news: [
    {
      id: 1,
      category: "Architecture",
      date: "Nov 04, 2026",
      readTime: "5 min read",
      title: "The Rise of Biophilic Skyscrapers: How Green Living is Transforming Skylines",
      excerpt: "Why forward-thinking developers are investing billions in vertical gardens, natural air ventilation, and timber hybrid frames.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: 2,
      category: "Sustainability",
      date: "Oct 28, 2026",
      readTime: "4 min read",
      title: "Achieving True Net-Zero in High-Density Urban Developments",
      excerpt: "Breakthrough materials, kinetic solar shading, and micro-grid batteries that enable modern high-rises to generate their own power.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"
    },
    {
      id: 3,
      category: "Investment",
      date: "Oct 15, 2026",
      readTime: "6 min read",
      title: "Global Real Estate Trends: Where Prime Capital is Flowing in 2027",
      excerpt: "An in-depth analysis of institutional capital pivoting towards ultra-luxury wellness residences and next-generation innovation hubs.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
    }
  ]
};

