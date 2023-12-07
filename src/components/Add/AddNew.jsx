/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createSession } from '../../redux/spa-sessions/thunk';
import SessionForm from './SessionForm';

function AddNew() {
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();
  const [newSession, setNewSession] = useState({
    name: '',
    description: '',
    deposit: 0,
    image: 'https://i.pravatar.cc/300?img=11',
    spa_session_fee: 0,
    registration_fee: 0,
    total_amount_payable: 0,
    duration: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSession({
      ...newSession,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newSession.name || newSession.name.trim() === '') {
      toast.error('The name field is required.');
      return;
    }

    const data = new FormData();

    data.append('item[name]', event.target.name.value);
    data.append('item[image]', event.target.image.files[0]);
    data.append('item[description]', event.target.description.value);
    data.append('item[deposit]', event.target.deposit.value);
    data.append('item[spa_session_fee]', event.target.spa_session_fee.value);
    data.append('item[registration_fee]', event.target.registration_fee.value);
    data.append(
      'item[total_amount_payable]',
      event.target.total_amount_payable.value,
    );
    data.append('item[duration]', event.target.duration.value);
    dispatch(createSession({ data }));

    toast.success('New Session successfully added');
    setNewSession({
      name: '',
      description: '',
      deposit: 0,
      spa_session_fee: 0,
      registration_fee: 0,
      total_amount_payable: 0,
      duration: 0,
    });
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div>
        <h1>
          Add New Session
        </h1>
        <SessionForm
          newSession={newSession}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          imageInputRef={imageInputRef}
        />
      </div>
    </div>
  );
}
export default AddNew;
