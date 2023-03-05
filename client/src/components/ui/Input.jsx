/* =============================
📦 Component - Input
============================= */
export default function Input({ children, register, type, name, ...rest }) {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  let input;

  switch (type) {
    case 'textarea': {
      input = register ? <textarea {...rest} {...register(name)} /> : <textarea {...rest} />;
      break;
    }
    default: {
      input = register ? <input type={type} name={name}{...rest} {...register(name)} /> : <input type={type} name={name}{...rest} />;
      break;
    }
  }
  /* =============================
  📦 Section - Methods:
  ============================= */

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <>
      {children}
      {input}
    </>
  );
}
