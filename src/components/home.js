import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { displayItems } from '../redux/displayItemSlice';
import EachItem from './eachitem';

import 'swiper/css';
import 'swiper/css/navigation';
import '../stylesheets/eachItem.css';

function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);

  useEffect(() => {
    // Loads spa session items
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
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          navigation
          modules={[Navigation]}
        >
          {[...items] // Create a shallow copy of the items array
            .sort((a, b) => b.id - a.id) // Sort items based on the 'id' in descending order
            .map((each) => (
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
