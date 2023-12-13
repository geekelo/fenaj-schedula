import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { displayItems } from '../redux/displayItemSlice';
import EachItem from './eachitem';

import '../stylesheets/eachItem.css';
import 'swiper/css';
import 'swiper/css/navigation';

function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);

  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(displayItems());
  }, [dispatch]);

  return (
    <div className="eachItem">
      <div className="item_slider">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          navigation
          loop
          modules={[Navigation]}
          className="mySwiper"
        >
          {items.map((each) => (
            <SwiperSlide key={each.id}>
              <EachItem key={each.id} eachitem={each} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
