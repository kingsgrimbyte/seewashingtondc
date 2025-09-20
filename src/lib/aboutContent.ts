import aboutContent from './aboutContent.json';

export interface AboutContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  intro: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  audience: {
    title: string;
    sections: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  trust: {
    title: string;
    description: string;
  };
  stats: {
    title: string;
    items: Array<{
      number: string;
      label: string;
      icon: string;
      description: string;
    }>;
  };
  features: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      link: string | null;
      linkText: string;
    }>;
  };
  popularSearches: {
    title: string;
    subtitle: string;
    searches: string[];
  };
  team: {
    title: string;
    subtitle: string;
    members: Array<{
      title: string;
      description: string;
      icon: string;
      color: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

export function getAboutContent(): AboutContent {
  return aboutContent as AboutContent;
}

export default getAboutContent;
