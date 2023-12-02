import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Model</Link>
          </li>
          <li>
            <Link to="/lifestyle">Lifestyle</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/test-drive">Test Drive</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
