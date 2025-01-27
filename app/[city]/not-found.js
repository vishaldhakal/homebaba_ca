import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          City Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the city you're looking for.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
