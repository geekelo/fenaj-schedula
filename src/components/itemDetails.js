import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { displayItems } from '../redux/displayItemSlice';
import '../stylesheets/detailsItem.css';

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
    return (
      <>
        <div className="container">
          <div className="content-container">
            <div className="image-container">
              <div className="image">
                <img src={item.image} alt="spa_session" />
              </div>
            </div>
            <div className="text-container">
              <div>
                <h1>{item.name}</h1>
                <p>
                  - $
                  {item.deposit}
                  {' '}
                  deposit upon any purchase
                </p>
              </div>
              <ul>
                <li className="list-item">
                  <span>Registration fee</span>
                  <span>
                    $
                    {item.registration_fee}
                  </span>
                </li>
                <li className="list-item">
                  <span>spa_session fee</span>
                  <span>
                    $
                    {item.spa_session_fee}
                  </span>
                </li>
                <li className="list-item">
                  <span>Total amount of payable</span>
                  <span>
                    $
                    {item.total_amount_payable}
                  </span>
                </li>
                <li className="list-item">
                  <span>Duration</span>
                  <span>
                    {item.duration}
                    Months
                  </span>
                </li>
              </ul>
              <div className="apr-text">
                <span>
                  <span className="font-extrabold">5.9% APR</span>
                  {' '}
                  Representative
                </span>
              </div>

            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="reserve-button">
            <NavLink to={`/reserve-spa-session/${item.id}`}>
              Reserve Session
            </NavLink>
          </div>
          <div className="back-button">
            <NavLink to="/home">Back</NavLink>
          </div>
        </div>

      </>
    );
  }
}

export default ItemDetails;
