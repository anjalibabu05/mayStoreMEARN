import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faBars, faUser, faRightFromBracket, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { userProfileUpdateContext } from '../../context/ContextSearch'; // ✅ context for live updates

const Header = () => {
  const [status, setStatus] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [token, setToken] = useState('');
  const [prof, setProf] = useState('');
  const navigate = useNavigate();

  // ✅ Context for image update
  const { userProfileUpdateStatus } = useContext(userProfileUpdateContext);

  // ✅ Load stored user data initially
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('existingUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      const user = JSON.parse(storedUser);
      if (user.profile) {
        setProf(`http://localhost:4000/upload/${user.profile}`);
      }
    }
  }, []);

  // ✅ Update Header image when profile updates
  useEffect(() => {
    if (userProfileUpdateStatus?.profile) {
      setProf(`http://localhost:4000/upload/${userProfileUpdateStatus.profile}`);
    }
  }, [userProfileUpdateStatus]);

  // ✅ Handle logout cleanly
  const handleLogOut = () => {
    sessionStorage.removeItem('existingUser');
    sessionStorage.removeItem('token');
    setToken(''); // clear local state
    setDropdown(false); // close dropdown
    setProf(''); // clear profile image
    navigate('/'); // redirect to home or login
    window.location.reload(); // 🔄 force re-render to clear old user state
  };

  return (
    <>
      <div className="md:grid grid-cols-3 p-3">
        <div className="flex items-center">
          <img
            src="https://openclipart.org/download/275692/1489798288.svg"
            alt="BookStore"
            style={{ width: '50px', height: '50px' }}
          />
          <h1 className="text-2xl md:hidden ms-2">BOOK STORE</h1>
        </div>

        <div className="md:flex justify-center items-center hidden">
          <h1 className="text-3xl">BOOK STORE</h1>
        </div>

        <div className="md:flex justify-end items-center hidden">
          <FontAwesomeIcon icon={faInstagram} className="me-3" />
          <FontAwesomeIcon icon={faXTwitter} className="me-3" />
          <FontAwesomeIcon icon={faFacebookF} className="me-3" />

          {!token ? (
            <Link to="/login">
              <button className="border border-white rounded px-3 py-2 ms-3">
                <FontAwesomeIcon icon={faUser} /> Login
              </button>
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <img
                src={prof || 'https://cdn-icons-png.flaticon.com/512/9512/9512683.png'}
                alt="user icon"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                className="mx-4 cursor-pointer rounded-full border"
                onClick={() => setDropdown(!dropdown)}
              />

              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-20">
                  <Link to="/Profile">
                    <div
                      onClick={() => setDropdown(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Profile
                    </div>
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="p-3 w-full bg-gray-900 text-white md:flex justify-center">
        <div className="flex justify-between px-3 md:hidden">
          <span onClick={() => setStatus(!status)} className="text-2xl">
            <FontAwesomeIcon icon={faBars} />
          </span>

          <Link to="/login">
            <button className="border border-white rounded px-3 py-2 ms-3">
              <FontAwesomeIcon icon={faUserSecret} /> Login
            </button>
          </Link>

          {/* Mobile dropdown */}
          {token && (
            <div className="relative inline-block text-left">
              <img
                src={prof || 'https://cdn-icons-png.flaticon.com/512/9512/9512683.png'}
                alt="user icon"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                className="mx-4 cursor-pointer rounded-full border"
                onClick={() => setDropdown(!dropdown)}
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-20">
                  <Link to="/Profile">
                    <div
                      onClick={() => setDropdown(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      Profile
                    </div>
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to="/"><li className="mx-4">Home</li></Link>
          <Link to="/all-books"><li className="mx-4">Books</li></Link>
          <Link to="/careers"><li className="mx-4">Career</li></Link>
          <Link to="/contact"><li className="mx-4">Contact</li></Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
