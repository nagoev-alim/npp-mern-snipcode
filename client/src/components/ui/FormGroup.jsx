/* =============================
📦 Custom Imports
============================= */
import { ErrorMessage, Input } from './index.js';

/* =============================
📦 Component - FormGroup
============================= */
export default function FormGroup({ className, type, placeholder, label, name, register, errors }) {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <label className='form-group'>
      <Input
        className={`input ${className || ''}`}
        type={type || name}
        name={name}
        placeholder={placeholder}
        register={register}
      >
        {label && <span className='form-group-label'>{placeholder}</span>}
      </Input>
      <ErrorMessage errors={errors} field={name} />
    </label>
  );
}
