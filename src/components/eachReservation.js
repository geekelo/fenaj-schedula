import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { displayItems } from '../redux/displayItemSlice';

function EachReservation({ eachReservation, handleDelete }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.display_items.value);
  console.log(items);
  useEffect(() => {
    // Call checkLoginStatus when the component mounts
    dispatch(displayItems());
  }, [dispatch]);

  const triggerHandleDelete = (e, reverseId) => {
    e.preventDefault();
    handleDelete(reverseId);
  };

  if (items) {
    return (
      <div>
        <p>{ eachReservation.id }</p>
        <p>{ eachReservation.city }</p>
        <p>{ eachReservation.date }</p>
        <NavLink to={`/spa-session/${eachReservation.id}`}><p>{ items[eachReservation.id].name }</p></NavLink>
        <button type="submit" onClick={(e) => triggerHandleDelete(e, eachReservation.id)}>Delete</button>
      </div>
    );
  }
}

EachReservation.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  eachReservation: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming id is a number, adjust if it's a different type
    date: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default EachReservation;
