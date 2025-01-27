import { notFound } from "next/navigation";
import CityPage from "../../page";
import getPageMetadata from "@/helpers/getPageMetadata";

export const revalidate = 3600;

export default async function DetachedPage({ params }) {
  try {
    return CityPage({
      params,
      searchParams: { project_type: "Detached" },
      pageType: "Detached",
    });
  } catch (error) {
    notFound();
  }
}
