import { useEffect } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

/* =============================
📦 Custom Imports
============================= */
import { defaultValues, validateSchema } from '../utils/validateSchema.js';
import { API } from '../api/api.js';
import { authSelector, resetAuthState } from '../features/auth/authSlice.js';
import { FormGroup, Spinner } from '../components/ui/index.js';

/* =============================
📦 Component - AuthPage
============================= */
export default function AuthPage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  let renderingContent = null;
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestType = search.substring(1);
  const { user, message, error, status } = useSelector(authSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(validateSchema[requestType])),
    defaultValues: defaultValues[requestType],
  });

  /* =============================
  📦 Section - Methods:
  ============================= */
  const onSubmit = (data) => {
    if (requestType === 'login') {
      dispatch(API.auth.login(data));
      toast.success('Login Success');
    }

    if (requestType === 'register') {
      dispatch(API.auth.register(data));
      toast.success('Register Success');
    }
    reset();
  };

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (requestType !== 'login' && requestType !== 'register') {
      navigate('/');
    }
    reset();
  }, [search]);

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(resetAuthState());
    }
    if (user || status === 'success') {
      navigate('/');
      dispatch(resetAuthState());
    }
  }, [dispatch, error, message, user]);

  /* =============================
  📦 Section - Rendering:
  ============================= */
  switch (requestType) {
    case 'login': {
      renderingContent = <div className='c-container grid gap-2 py-10 max-w-lg bg-white shadow rounded-md mt-14'>
        {/* Header */}
        <div className='grid gap-1 justify-items-center sm:gap-2 mb-2'>
          <h1 className='title'>
            <FaSignInAlt /> Login
          </h1>
          <p className='text-neutral-500 md:font-bold md:text-xl'>Login and start use app</p>
        </div>
        {/* Form */}
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <FormGroup name='email' placeholder='Enter your email' register={register} errors={errors} />
          <FormGroup name='password' placeholder='Enter your password' register={register} errors={errors} />
          <button disabled={!isValid} type='submit' className='button button--primary'>Submit</button>
        </form>
        {/* Links */}
        <p className='text-center'>
          Don't have an account? <Link className='font-bold hover:underline text-blue-600' to='/auth?register'>Register</Link>
        </p>
      </div>;
      break;
    }
    case 'register': {
      renderingContent = <div className='c-container grid gap-2 py-10 max-w-lg bg-white shadow rounded-md mt-14'>
        {/* Header */}
        <div className='grid gap-1 justify-items-center sm:gap-2 mb-2'>
          <h1 className='title'><FaUser /> Register</h1>
          <p className='text-neutral-500 md:font-bold md:text-xl'>Please create an account</p>
        </div>
        {/* Form */}
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <FormGroup name='name'  placeholder='Enter your Name' register={register} errors={errors} />
          <FormGroup name='email' placeholder='Enter your Email' register={register} errors={errors} />
          <FormGroup name='password' placeholder='Enter your Password' register={register} errors={errors} />
          <FormGroup type='password' name='confirmPassword' placeholder='Confirm your password' register={register}
                     errors={errors} />
          <button disabled={!isValid} type='submit' className='button button--primary'>Submit</button>
        </form>
        {/* Links */}
        <p className='text-center'>
          Already have account? <Link className='font-bold hover:underline text-blue-600' to='/auth?login'>Login</Link>
        </p>
      </div>;
      break;
    }
    default: {
      renderingContent = null;
      break;
    }
  }

  return status === 'loading' ? <Spinner /> : renderingContent;
}


