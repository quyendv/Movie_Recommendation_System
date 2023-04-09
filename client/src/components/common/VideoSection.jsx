// @ts-nocheck
import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
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
      <iframe ref={iframeRef} width="100%" src="https://www.youtube.com/embed/xHNMEvYPdZE?controls=0" title="" />
    </div>
  );
};

function VideoSection() {
  return (
    // NavigationSwiper: .swiper-slide(&.-active) <pb for pagination>, .swiper-pagination-bullet, .swiper-button-next/prev, .swiper: padding for navigationBtn,
    <NavigationSwiper>
      {/* VideoItem Box */}
      <SwiperSlide>
        <VideoItem video={'https://www.youtube.com/embed/xHNMEvYPdZE?controls=0'} />
      </SwiperSlide>

      {/* VideoItem Box */}
      <SwiperSlide>
        <VideoItem video={'https://www.youtube.com/embed/xHNMEvYPdZE?controls=0'} />
      </SwiperSlide>

      {/* VideoItem Box */}
      <SwiperSlide>
        <VideoItem video={'https://www.youtube.com/embed/xHNMEvYPdZE?controls=0'} />
      </SwiperSlide>
    </NavigationSwiper>
  );
}

export default VideoSection;
