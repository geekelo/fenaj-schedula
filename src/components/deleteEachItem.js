import React from 'react';
import PropTypes from 'prop-types';

function DeleteEachItem({ eachitem, handleDelete }) {
  const triggerHandleDelete = (e, reverseId) => {
    e.preventDefault();
    handleDelete(reverseId);
  };

  return (
    <div>
      <p>
        <img src={eachitem.image} alt="item" />
      </p>
      <p>{eachitem.name}</p>
      <p>{eachitem.description}</p>
      <button
        type="submit"
        onClick={(e) => triggerHandleDelete(e, eachitem.id)}
      >
        Delete
      </button>
    </div>
  );
}

DeleteEachItem.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  eachitem: PropTypes.shape({
    id: PropTypes.number.isRequired, // Assuming id is a number, adjust if it's a different type
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default DeleteEachItem;
