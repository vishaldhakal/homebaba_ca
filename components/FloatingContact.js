"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      const shouldShow = window.scrollY > 300;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Link
      href="#mycontact"
      className="phone-deal-float fixed bottom-4 left-0 translate-x-1/2 z-50 md:hidden"
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById("mycontact")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div className="phone-deal-content">
        <Image
          src="/contact-bottom-2.png"
          alt="Agent"
          width={85}
          height={75}
          className="phone-deal-avatar"
          priority
        />
        <div className="phone-deal-text">
          <div className="deal-title">Send Me Info</div>
        </div>
      </div>
    </Link>
  );
}
