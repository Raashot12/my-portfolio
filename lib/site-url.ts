const siteUrlError =
  "NEXT_PUBLIC_SITE_URL must be set to the deployed portfolio URL.";

export function getSiteUrl(): URL {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    throw new Error(siteUrlError);
  }

  const siteUrl = new URL(configuredUrl);
  siteUrl.hash = "";
  siteUrl.search = "";
  return siteUrl;
}

export function getSiteUrlString(): string {
  return getSiteUrl().toString().replace(/\/$/, "");
}
