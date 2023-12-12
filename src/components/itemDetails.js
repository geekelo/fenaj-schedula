import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { displayItems } from '../redux/displayItemSlice';

function ItemDetails() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);

  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(displayItems());
  }, [dispatch]);

  if (items.length > 0) {
    const item = items.find((item) => item.id === parseInt(id, 10));
    console.log(item);
    return (
      <div>
        <p>{ item.name }</p>
        <p>{ item.description }</p>
        <p>{ item.spa_session_fee }</p>
        <p>{ item.registration_fee }</p>
        <p>{ item.total_amount_payable }</p>
        <p>{ item.duration }</p>
        <p><img src={item.image} alt="spa_session" /></p>
        <NavLink to={`/reserve-spa-session/${item.id}`}><button type="submit">Reserve Session</button></NavLink>
      </div>
    );
  }
}

export default ItemDetails;
