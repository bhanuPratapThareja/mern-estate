// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SwipePhotos({ images }) {
    return (
            <Swiper 
              modules={[Navigation, Autoplay]} 
              navigation
              pagination={{ clickable: false }}
              loop
              autoplay
              spaceBetween={50}
            >
              {images.map((url) => {
                return (
                  <SwiperSlide key={url}>
                      <img src={url} alt='image' className='h-[550px] w-full object-cover' />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          )
}
