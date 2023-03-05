import { Link, useNavigate } from 'react-router-dom';
import {
  BsFileCodeFill,
  FaUserAstronaut,
  MdOutlineDashboardCustomize,
  RiLoginBoxLine,
  TbDoorExit,
} from 'react-icons/all.js';
import { useDispatch, useSelector } from 'react-redux';

/* =============================
📦 Custom Imports
============================= */
import { authSelector, logout } from '../../features/auth/authSlice.js';

/* =============================
📦 Component - Header
============================= */
export default function Header() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector.all);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <header className='header'>
      <div className='c-container grid place-items-center gap-2 sm:flex sm:justify-between sm:items-center'>
        {/* Logo */}
        <Link className='font-bold text-lg flex items-center gap-1' to='/'>
          Snip <BsFileCodeFill size={20} /> Code
        </Link>

        {/* Menu */}
        <div className='flex flex-wrap items-center justify-center gap-2'>
          {!user
            ? (<>
              <Link className='button' to='/auth?register'>
                <RiLoginBoxLine size={20} /> Sign Up
              </Link>
              <Link className='button button--primary' to='/auth?login'>
                <FaUserAstronaut size={20} /> Sign In
              </Link>
            </>)
            : (<>
              <Link className='button' to='/dashboard'>
                <MdOutlineDashboardCustomize size={20} /> Dashboard
              </Link>
              <button className='button button--primary' onClick={onLogout}>
                <TbDoorExit size={20} /> Logout
              </button>
            </>)
          }
        </div>
      </div>
    </header>
  );
}
