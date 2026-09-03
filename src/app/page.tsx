import { HomeView } from "@/views/home";
import { JsonLd } from "@/shared/ui";
import { buildPersonJsonLd, buildProfilePageJsonLd } from "@/shared/lib/seo";
import { profile } from "@/entities/profile";
import { site } from "@/shared/config/site";

const personJsonLd = buildPersonJsonLd({
  name: profile.name,
  jobTitle: profile.title,
  url: site.url,
  sameAs: profile.links.map((l) => l.href),
  description: profile.tagline,
  image: `${site.url}${profile.image}`,
});

const profilePageJsonLd = buildProfilePageJsonLd({
  name: profile.name,
  url: site.url,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[personJsonLd, profilePageJsonLd]} />
      <HomeView />
    </>
  );
}
