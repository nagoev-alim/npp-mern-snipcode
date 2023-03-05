import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

/* =============================
📦 Custom Imports
============================= */
import { FormGroup } from '../../../components/ui/index.js';
import { API } from '../../../api/api.js';
import { snippetDefaultValues, snippetSchema } from '../../../utils/validateSchema.js';
import { resetSnippetState, setEditStatus, snippetSelector } from '../snippetSlice.js';
import TextareaAutosize from 'react-textarea-autosize';

/* =============================
📦 Component - SnippetForm
============================= */
export default function SnippetForm() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const { editStatus } = useSelector(snippetSelector.all);
  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object(snippetSchema)),
    defaultValues: snippetDefaultValues,
  });

  /* =============================
  📦 Section - Side Effects:
  ============================= */
  useEffect(() => {
    if (editStatus.isEditable === true) {
      setValue('title', editStatus.item.title);
      setValue('description', editStatus.item.description);
      setUpdate(true);
    }
  }, [editStatus]);

  /* =============================
  📦 Section - Methods:
  ============================= */
  // Form submit handler
  const onSubmit = async (data) => {
    if (editStatus.isEditable === true) {
      await dispatch(API.snippet.update({ id: editStatus.item._id, data }));
      onCancel();
      toast.success('Your snippet has been updated!');
    } else {
      await dispatch(API.snippet.create(data));
      toast.success('Your snippet has been created!');
    }
    reset();
  };
  // Cancel update and reset form state
  const onCancel = () => {
    setUpdate(false);
    dispatch(setEditStatus({ isEditable: false, item: null }));
    dispatch(resetSnippetState());
    reset();
  };

  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <div className='c-container grid gap-2 py-10 max-w-4xl bg-white shadow rounded-md'>
      <form className='form ' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup type='text' name='title' placeholder='Enter your title' register={register} errors={errors} />
        <TextareaAutosize className='input min-h-[150px]'  name='description'  placeholder='Enter your snippet'
                          {...register('description')} errors={errors} />
        <button
          disabled={!isValid}
          type='submit'
          className={`button ${update ? 'button--success' : 'button--primary'}`}
        >
          {update ? 'Update Snippet' : 'Submit'}
        </button>
        {update &&
          <button type='button' className='button button--danger' onClick={onCancel}>Cancel Update</button>}
      </form>
    </div>
  );
}
