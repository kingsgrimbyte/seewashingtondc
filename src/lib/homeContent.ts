import homeContentData from './homeContent.json';

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  quickCategories: Array<{
    name: string;
    icon: string;
    href: string;
  }>;
  whyVisitDC: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    features: Array<{
      icon: string;
      text: string;
    }>;
    ctaText: string;
    ctaLink: string;
    image: string;
    stats: {
      number: string;
      label: string;
    };
  };
  seasonalGuide: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    seasons: Array<{
      season: string;
      icon: string;
      color: string;
      bgColor: string;
      description: string;
      highlights: string[];
    }>;
    ctaText: string;
    ctaLink: string;
  };
  popularNow: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    categories: Array<{
      name: string;
      icon: string;
      href: string;
      color: string;
      bgColor: string;
    }>;
    ctaText: string;
    ctaLink: string;
  };
  bookYourStay: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    hotelTypes: Array<{
      icon: string;
      text: string;
      description: string;
    }>;
    ctaText: string;
    ctaLink: string;
    image: string;
    stats: {
      number: string;
      label: string;
    };
  };
  neighborhoods: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    neighborhoods: Array<{
      name: string;
      description: string;
      icon: string;
      color: string;
      bgColor: string;
      features: string[];
    }>;
    ctaText: string;
    ctaLink: string;
    stats: {
      number: string;
      label: string;
    };
  };
  blogGuides: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    titleGradient: string;
    description: string;
    blogPosts: Array<{
      title: string;
      description: string;
      category: string;
      icon: string;
      color: string;
      bgColor: string;
      readTime: string;
      image: string;
      link: string;
    }>;
    featuredGuide: {
      badge: string;
      title: string;
      description: string;
      rating: string;
      readTime: string;
      image: string;
      link: string;
    };
    ctaText: string;
    ctaLink: string;
  };
  seasonalHighlights: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    description: string;
    highlights: Array<{
      title: string;
      image: string;
      badge: string;
      link: string;
    }>;
  };
  newsletter: {
    badge: string;
    badgeColor: string;
    badgeTextColor: string;
    title: string;
    description: string;
    placeholder: string;
    ctaText: string;
    privacyText: string;
  };
  faq: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export function getHomeContent(): HomeContent {
  return homeContentData as HomeContent;
}

export function getHeroContent() {
  return getHomeContent().hero;
}

export function getQuickCategories() {
  return getHomeContent().quickCategories;
}

export function getWhyVisitDC() {
  return getHomeContent().whyVisitDC;
}

export function getSeasonalGuide() {
  return getHomeContent().seasonalGuide;
}

export function getPopularNow() {
  return getHomeContent().popularNow;
}

export function getBookYourStay() {
  return getHomeContent().bookYourStay;
}

export function getNeighborhoods() {
  return getHomeContent().neighborhoods;
}

export function getBlogGuides() {
  return getHomeContent().blogGuides;
}

export function getSeasonalHighlights() {
  return getHomeContent().seasonalHighlights;
}

export function getNewsletter() {
  return getHomeContent().newsletter;
}

export function getFAQ() {
  return getHomeContent().faq;
}
