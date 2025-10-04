import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Contact See Washington DC | Plan Your Trip Today',
  description: 'Get in touch with See Washington DC for travel tips, questions, or support. Our team helps you plan a smooth and memorable sightseeing experience in the capital.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,},
  openGraph: {
    title: 'Contact See Washington DC | Plan Your Trip Today',
    description: 'Get in touch with See Washington DC for travel tips, questions, or support. Our team helps you plan a smooth and memorable sightseeing experience in the capital.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Washington DC Directory',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 