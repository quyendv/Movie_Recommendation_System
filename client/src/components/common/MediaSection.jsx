import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import mediaApi from '~/apis/media.api';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

function MediaSection({ mediaType = 'movie', mediaCategory = 'popular' }) {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({ mediaType, mediaCategory, page: 1 });
      console.log({ name: 'MediaSection getList', response, err });
      // @ts-ignore
      if (response) setMedias(response.results);
      // TODO: toast if err
    };
    getMedias();
  }, [mediaType, mediaCategory]); // TODO: dispatch

  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        // MediaItemBox: keep SwiperSlide
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
}

export default MediaSection;
