import Content from "@/components/Content";
import AboutSection from "@/components/AboutSection";
import Projects from "@/components/Projects";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
      <Content />
      <AboutSection />
      <Projects />
      <Footer />
    </main>
  );
}
