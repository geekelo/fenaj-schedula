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

  return (
    <div>
      <p>{ items[id].name }</p>
      <p>{ items[id].description }</p>
      <p>{ items[id].spa_session_fee }</p>
      <p>{ items[id].registration_fee }</p>
      <p>{ items[id].total_amount_payable }</p>
      <p>{ items[id].duration }</p>
      <p>{ items[id].image }</p>
      <NavLink to={`/reserve-spa-session/${items[id].id}`}><button type="submit">Reserve Session</button></NavLink>
    </div>
  );
}

export default ItemDetails;
