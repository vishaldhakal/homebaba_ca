export const metadata = {
  title: "Privacy Policy - Homebaba",
  description:
    'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
  authors: [{ name: "Homebaba", url: "https://homebaba.ca" }],
  openGraph: {
    title: "Privacy Policy - Homebaba",
    description:
      'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
    url: "https://homebaba.ca/privacy",
    siteName: "Homebaba",
    images: [
      {
        url: "https://homebaba.ca/contact.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://homebaba.ca/privacy",
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
