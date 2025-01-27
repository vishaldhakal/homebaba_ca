import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-4 md:mb-5 mt-20">
        <Image
          src="/contact-bottom-2.png"
          alt="Real Estate Agent"
          width={300}
          height={300}
          className="rounded-full mb-6 md:mb-8 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover"
          priority
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Looking to buy a New Home?
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Don't know where to start? Contact Homebaba now!
        </p>
      </div>
      <ContactForm />
    </>
  );
}
