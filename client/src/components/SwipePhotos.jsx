import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function SwipePhotos({ images }) {
  
  SwiperCore.use(Navigation)

  return (
      <>
        <Swiper navigation>
          {images.map((url) => {
            return (
              <SwiperSlide key={url}>
              <div
                className='h-[550px] min-w-full' 
                style={{ background: `url($url) center no-repeat`, backgroundSize: 'cover' }}
              ></div>
              </SwiperSlide>
            )
})}
        </Swiper>
      </>
  )
}
