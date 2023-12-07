/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

function SessionForm({
  newSession,
  handleChange,
  handleSubmit,
  imageInputRef,
}) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* name */}
      <div>
        <label htmlFor="name">
          z
          Name *:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={newSession.name}
            required
          />
        </label>
      </div>
      {/* image */}
      <div>
        <label htmlFor="image">
          Image *:
          <input
            ref={imageInputRef}
            id="image"
            type="file"
            name="image"
          />
        </label>
      </div>
      {/* description */}
      <div>
        <label htmlFor="description">
          Description *:
          <textarea
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={newSession.description}
            required
            maxLength="250"
          />
        </label>
      </div>
      {/* deposit */}
      <div>
        <label htmlFor="deposit" className="">
          Deposit:
          <input
            id="deposit"
            className=""
            type="number"
            name="deposit"
            onChange={handleChange}
            value={newSession.deposit}
          />
        </label>
      </div>
      {/* spa-session-fee */}
      <div>
        <label htmlFor="spa_session_fee" className="">
          Spa_Session Fee:
          <input
            id="spa_session_fee"
            className=""
            type="number"
            name="spa_session_fee"
            onChange={handleChange}
            value={newSession.spa_session_fee}
          />
        </label>
      </div>
      {/* registration_fee */}
      <div>
        <label htmlFor="registration_fee" className="">
          Option to Registration Fee:
          <input
            id="registration_fee"
            className="w-full p-2 rounded text-black"
            type="number"
            name="registration_fee"
            onChange={handleChange}
            value={newSession.registration_fee}
          />
        </label>
      </div>
      {/*  total_amount_fee */}
      <div>
        <label htmlFor="total_amount_payable" className="">
          Total Amount Payable:
          <input
            id="total_amount_payable"
            className=""
            type="number"
            name="total_amount_payable"
            onChange={handleChange}
            value={newSession.total_amount_payable}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="duration"
          className=""
        >
          Duration:
          <input
            id="duration"
            className=""
            type="number"
            name="duration"
            onChange={handleChange}
            value={newSession.duration}
          />
        </label>
      </div>

      <div className="flex justify-center">
        <button type="submit">Add New Session</button>
      </div>
    </form>
  );
}

SessionForm.propTypes = {
  newSession: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    deposit: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    spa_session_fee: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    registration_fee: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    total_amount_payable: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }).isRequired,
  imageInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SessionForm;
