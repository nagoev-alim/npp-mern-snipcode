/* =============================
📦 Custom Imports
============================= */

/* =============================
📦 Component - ErrorMessages
============================= */
export default function ErrorMessage({ errors, field }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */

  /* =============================
  📦 Section - Methods:
  ============================= */

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <>
      {errors?.[field] ? <div className='font-semibold text-xs text-red-500' dangerouslySetInnerHTML={{__html: errors?.[field]?.message}}></div> : null}
    </>
  );
}
