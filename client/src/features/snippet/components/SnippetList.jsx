import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

/* =============================
📦 Custom Imports
============================= */
import { API } from '../../../api/api.js';
import { resetSnippetState, snippetSelector } from '../snippetSlice.js';
import { SnippetItem } from './index.js';
import toast from 'react-hot-toast';

/* =============================
📦 Component - SnippetList
============================= */
export default function SnippetList() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const { entries: snippets, status, error, message } = useSelector(snippetSelector.all);

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(API.snippet.get());
    if (status === 'success' || snippets) {
      dispatch(resetSnippetState());
    }
  }, [dispatch]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return snippets.length !== 0
    ? <AnimatePresence>
      <div className='grid gap-4 max-w-4xl w-full mx-auto'>
        {snippets.map(snippet =>
          <motion.div
            key={snippet._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <SnippetItem snippet={snippet} />
          </motion.div>)}
      </div>
    </AnimatePresence>
    : <h3 className='font-bold text-center'>You have not any snippets 👋</h3>;
}
