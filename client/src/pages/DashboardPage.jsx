import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* =============================
📦 Custom Imports
============================= */
import { authSelector } from '../features/auth/authSlice.js';
import { SnippetForm, SnippetList } from '../features/snippet/components/index.js';

/* =============================
📦 Component - DashboardPage
============================= */
export default function DashboardPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const navigate = useNavigate();
  const { user: { name } } = useSelector(authSelector.all);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='c-container max-w-6xl grid gap-4'>
      <button className='button max-w-[150px]' onClick={() => navigate('/')}>Back to Home</button>
      <h1 className='title justify-center'>🙌 Welcome to Dashboard, {name}</h1>
      <SnippetForm />
      <SnippetList />
    </div>
  );
}
