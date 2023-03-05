import toast from 'react-hot-toast';
import { FiTrash2, GoClippy, RiFileEditLine } from 'react-icons/all.js';
import { useDispatch } from 'react-redux';
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

/* =============================
📦 Custom Imports
============================= */
import { API } from '../../../api/api.js';
import { setEditStatus } from '../snippetSlice.js';

/* =============================
📦 Component - SnippetItem
============================= */
export default function SnippetItem({ snippet }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();

  /* =============================
  📦 Section - Methods:
  ============================= */
  // Copy to clipboard
  const onClipboard = () => {
    navigator.clipboard.writeText(snippet.description);
    toast.success('Copied to clipboard!');
  };
  // Delete snippet
  const onDelete = () => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      dispatch(API.snippet.delete(snippet._id));
      toast.success('Snippet deleted!');
    }
  };
  // Update snippet
  const onUpdate = () => {
    dispatch(setEditStatus({
      isEditable: true,
      item: snippet,
    }));
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='grid gap-6 p-3 lg:p-5 bg-white border-2 rounded relative dark:bg-neutral-800'>
      <div className='absolute right-2 top-2 lg:right-4 lg:top-4 flex gap-1 items-center'>
        <button className='button w-[35px] h-[35px] p-0' onClick={onClipboard}>
          <GoClippy size={18} />
        </button>
        <button className='button w-[35px] h-[35px] p-0' onClick={onUpdate}>
          <RiFileEditLine size={18} />
        </button>
        <button className='button w-[35px] h-[35px] p-0 text-red-500' onClick={onDelete}>
          <FiTrash2 size={18} />
        </button>
      </div>
      <h3 className='font-bold pr-[150px] break-words'>{snippet.title}</h3>
      <SyntaxHighlighter className='rounded' children={snippet.description} language="javascript" style={a11yDark} />
    </div>
  );
}
