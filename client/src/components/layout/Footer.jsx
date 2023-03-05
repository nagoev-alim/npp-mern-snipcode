import { BsHeartFill } from 'react-icons/bs';
/* =============================
📦 Component - Footer
============================= */
export default function Footer() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <footer className='footer'>
      <p className='flex flex-wrap gap-1 items-center'>Created with <BsHeartFill /> by
        <a className='font-bold' target='_blank' href='https://github.com/nagoev-alim'>Alim Nagoev</a>
      </p>
    </footer>
  );
}
