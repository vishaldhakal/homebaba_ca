import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          City Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the city you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
