import HeroSection from '~/components/common/HeroSection';
import MediaSection from '~/components/common/MediaSection';
import SectionWrapper from '~/components/common/SectionWrapper';
import tmdbConfigs from '~/configs/tmdb.configs';

function HomePage() {
  return (
    <div className="h-full w-full">
      {/* HeroSection */}
      <HeroSection mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      {/* MainSection */}
      <div className="container mx-auto p-4 sm:p-8">
        {/* Popular movie */}
        <SectionWrapper title="Popular Movies">
          <MediaSection mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </SectionWrapper>

        {/* Popular tv series */}
        <SectionWrapper title="Popular Series">
          <MediaSection mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </SectionWrapper>

        {/* Rated movies */}
        <SectionWrapper title="Rated Movies">
          <MediaSection mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </SectionWrapper>

        {/* Rated tv series */}
        <SectionWrapper title="Rated Series">
          <MediaSection mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </SectionWrapper>
      </div>
    </div>
  );
}

export default HomePage;
