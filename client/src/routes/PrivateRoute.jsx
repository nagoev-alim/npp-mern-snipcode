import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
/* =============================
📦 Custom Imports
============================= */
import { authSelector } from '../features/auth/authSlice.js';

/* =============================
📦 Component - PrivateRoute
============================= */
export default function PrivateRoute() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const { user } = useSelector(authSelector.all);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return user ? <Outlet /> : <Navigate to='/auth?login' />;
}
