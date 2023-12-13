import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function EachItem({ eachitem }) {
  return (
    <div className="item-content ">
      <img src={eachitem.image} alt="item" />

      <h4>{eachitem.name}</h4>
      <p>{eachitem.description}</p>
      <NavLink to={`/spa-session/${eachitem.id}`} className="button">
        View Details
      </NavLink>
    </div>
  );
}

EachItem.propTypes = {
  eachitem: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming id is a number, adjust if it's a different type
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default EachItem;
