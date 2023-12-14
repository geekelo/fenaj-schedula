import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { displayItems, deleteItem } from '../redux/displayItemSlice';
import DeleteEachItem from './deleteEachItem';

import 'swiper/css';
import 'swiper/css/navigation';
import '../stylesheets/eachItem.css';

function DeleteItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);
  const [userLoggedin, setuserLoggedin] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (new Date().getTime() > parsedData.expirationTime) {
        localStorage.clear();
        setuserLoggedin(false);
        navigate('/login');
      } else {
        setuserLoggedin(true);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(displayItems());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (userLoggedin) {
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      const { token } = parsedData.extractedUserData;
      const ddd = await dispatch(deleteItem({ id, token }));
      if (ddd) {
        dispatch(displayItems());
      }
    }
  };

  if (userLoggedin) {
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
            loop
            modules={[Navigation]}
            className="mySwiper"
          >
            {items.map((each) => (
              <SwiperSlide key={each.id}>
                <DeleteEachItem
                  key={each.id}
                  eachitem={each}
                  handleDelete={handleDelete}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default DeleteItems;
