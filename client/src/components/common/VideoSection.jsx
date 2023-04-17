// @ts-nocheck
import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '~/configs/tmdb.configs';
import NavigationSwiper from './NavigationSwiper';

const VideoItem = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    if (iframeRef?.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'; // fixed aspect ratio 16/9
      iframeRef.current.setAttribute('height', height);
    }
  }, [video]);

  return (
    <div className="h-max">
      <iframe ref={iframeRef} width="100%" src={tmdbConfigs.youtubePath(video?.key)} title="" />
    </div>
  );
};

function VideoSection({ videos }) {
  return (
    // NavigationSwiper: .swiper-slide(&.-active) <pb for pagination>, .swiper-pagination-bullet, .swiper-button-next/prev, .swiper: padding for navigationBtn,
    <NavigationSwiper>
      {videos?.map((video, index) => (
        // VideoItem Box
        <SwiperSlide key={index}>
          <VideoItem video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
}

export default VideoSection;
