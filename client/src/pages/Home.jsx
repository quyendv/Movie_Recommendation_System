import HeroSection from '~/components/common/HeroSection';
import MediaSection from '~/components/common/MediaSection';
import SectionWrapper from '~/components/common/SectionWrapper';

function HomePage() {
  return (
    <div className="h-full w-full">
      {/* HeroSection */}
      <HeroSection />

      {/* MainSection */}
      <div className="container mx-auto p-8">
        {/* Popular movie */}
        <SectionWrapper title="Popular Movies">
          <MediaSection />
        </SectionWrapper>

        {/* Popular tv series */}
        {/* Rated movies */}
        {/* Rated tv series */}
      </div>
    </div>
  );
}

export default HomePage;
