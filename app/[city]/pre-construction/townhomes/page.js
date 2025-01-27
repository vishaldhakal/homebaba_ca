import { notFound } from "next/navigation";
import CityPage from "../../page";

export const revalidate = 3600;

export default async function TownhomesPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Townhomes" },
      pageType: "Townhomes",
    });
  } catch (error) {
    notFound();
  }
}
