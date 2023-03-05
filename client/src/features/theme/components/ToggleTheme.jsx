import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

/* =============================
📦 Custom Imports
============================= */
import { themeSelector, toggleTheme } from '../themeSlice.js';

/* =============================
📦 Component - ToggleTheme
============================= */
export default function ToggleTheme() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector.all);

  useEffect(() => {
    document.documentElement.className = theme ? 'dark' : '';
  }, [theme, dispatch]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onToggleTheme = () => {
    dispatch(toggleTheme(!theme));
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <button className='toggle-theme-btn' onClick={onToggleTheme}>
      {theme ? <HiLightBulb size={25} /> : <HiOutlineLightBulb size={25} />}
    </button>
  );
}
