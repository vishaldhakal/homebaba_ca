import { notFound } from "next/navigation";
import CityPage from "../page";
import getPageMetadata from "@/helpers/getPageMetadata";

export const revalidate = 3600;

export default async function CondosPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Condo" },
      pageType: "Condo",
    });
  } catch (error) {
    notFound();
  }
}
