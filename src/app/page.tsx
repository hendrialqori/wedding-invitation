import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="bg-ivory min-h-screen">
      <Hero />
      <Profile />
      <OurStory />
      <Gallery />
    </main>
  );
}
