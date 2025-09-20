import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Contact Us - Washington DC Directory',
  description: 'Get in touch with our team for questions, suggestions, or support. We\'re here to help you discover the best of Washington DC.',
  openGraph: {
    title: 'Contact Us - Washington DC Directory',
    description: 'Get in touch with our team for questions, suggestions, or support. We\'re here to help you discover the best of Washington DC.',
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