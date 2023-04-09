import HeroSection from '~/components/common/HeroSection';
import MediaSection from '~/components/common/MediaSection';
import SectionWrapper from '~/components/common/SectionWrapper';

function HomePage() {
  return (
    <div className="h-full w-full">
      {/* HeroSection */}
      <HeroSection />

      {/* MainSection */}
      <div className="container mx-auto p-4 sm:p-8">
        {/* Popular movie */}
        <SectionWrapper title="Popular Movies">
          <MediaSection />
        </SectionWrapper>

        {/* Popular tv series */}
        <SectionWrapper title="Popular Series">
          <MediaSection />
        </SectionWrapper>

        {/* Rated movies */}
        <SectionWrapper title="Rated Movies">
          <MediaSection />
        </SectionWrapper>

        {/* Rated tv series */}
        <SectionWrapper title="Rated Series">
          <MediaSection />
        </SectionWrapper>
      </div>
    </div>
  );
}

export default HomePage;
