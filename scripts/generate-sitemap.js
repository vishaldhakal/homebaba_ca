/* const https = require("https");

async function generateSitemap() {
  try {
    const response = await fetch("https://homebaba.ca/api/sitemap-update");
    const data = await response.json();

    if (data.success) {
      console.log(
        `✅ Sitemap generated successfully with ${data.urlCount} URLs`
      );
    } else {
      console.error("❌ Failed to generate sitemap:", data.message);
    }
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
  }
}

generateSitemap();
 */
