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
        // Clear expired data, set userLoggedin to false, and navigate to login
        localStorage.clear();
        setuserLoggedin(false);
        navigate('/login');
      } else {
        // The key 'userData' exists in local storage
        setuserLoggedin(true);
      }
    } else {
      // No 'userData' found in local storage, navigate to login
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(displayItems());
  }, [items]);

  const handleDelete = (id) => {
    if (userLoggedin) {
      console.log(id);
      const storedData = localStorage.getItem('userData');
      const parsedData = JSON.parse(storedData);
      // Call checkLoginStatus when the component mounts
      const { token } = parsedData.extractedUserData;
      dispatch(deleteItem({ id, token }));
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
