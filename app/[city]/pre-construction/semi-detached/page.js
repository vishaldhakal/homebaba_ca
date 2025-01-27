import { notFound } from "next/navigation";
import CityPage from "../../page";

export const revalidate = 3600;

export default async function SemiDetachedPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Semi-Detached" },
      pageType: "Semi-Detached",
    });
  } catch (error) {
    notFound();
  }
}
