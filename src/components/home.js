import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayItems } from '../redux/displayItemSlice';
import EachItem from './eachitem';

function Home() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);

  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(displayItems());
  }, [dispatch]);
  console.log(items);
  return (
    <div>
      {items.map((each) => <EachItem key={each.id} eachitem={each} />)}
    </div>
  );
}

export default Home;
