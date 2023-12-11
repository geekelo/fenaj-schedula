import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayItems, deleteItem } from '../redux/displayItemSlice';
import DeleteEachItem from './deleteEachItem';

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
      <div>
        {
          items.map((each) => (
            <DeleteEachItem
              key={each.id}
              eachitem={each}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    );
  }
}

export default DeleteItems;
