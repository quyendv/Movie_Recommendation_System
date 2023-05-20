// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import userApi from '~/apis/user.api';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .test((value, ctx) => {
      const isWhitespace = /^(?=.*\s)/;
      if (isWhitespace.test(value)) {
        return ctx.createError({ message: 'Password must not contain Whitespaces.' });
      }

      const isContainsUppercase = /^(?=.*[A-Z])/;
      if (!isContainsUppercase.test(value)) {
        return ctx.createError({ message: 'Password must have at least one Uppercase Character.' });
      }

      const isContainsLowercase = /^(?=.*[a-z])/;
      if (!isContainsLowercase.test(value)) {
        return ctx.createError({ message: 'Password must have at least one Lowercase Character.' });
      }

      const isContainsNumber = /^(?=.*[0-9])/;
      if (!isContainsNumber.test(value)) {
        return ctx.createError({ message: 'Password must contain at least one Digit.' });
      }

      const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
      if (!isContainsSymbol.test(value)) {
        return ctx.createError({ message: 'Password must contain at least one Special Symbol.' });
      }

      const isValidLength = /^.{6,}$/;
      if (!isValidLength.test(value)) {
        return ctx.createError({ message: 'Password must be at least 6 Characters Long.' });
      }

      return true;
    }),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setError(''); // clear error message

    const { password, newPassword, confirmPassword } = data;
    const { response, err } = await userApi.updatePassword({ password, newPassword, confirmPassword });

    if (response) {
      dispatch(setUser(response.data)); // .data by server not axios
      navigate(routesConfigs.home);
      // // TODO: toast
    }
    if (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto w-full rounded-2xl bg-[#ffffff1a] p-8 shadow-lg backdrop-blur-md transition duration-300 sm:p-12 md:p-16 md:w-[600px]">
      {/* Form */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <h2 className="text-center text-4xl font-berkshireSwash font-bold tracking-wider text-skin-primary transition duration-300 xl:text-5xl">
          Update password
        </h2>

        {/* List form-group: { form-label + form-control } + form-error (span: it is not affected by margin-top (space-y) unless block|inline-block) */}
        <div className="mt-8 space-y-6 text-white">
          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="password"
              placeholder="Enter your password"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('password')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <FaUserAlt />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.password?.message}</span>

          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="password"
              placeholder="Enter your new password"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('newPassword')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <FaLock />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.newPassword?.message}</span>

          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="password"
              placeholder="Enter your repeat password"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('confirmPassword')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <FaLock />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.confirmPassword?.message}</span>
        </div>

        {/* Error Message (all fields, after submit) */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded border border-solid border-skin-secondary bg-black/70 px-2 py-1.5 text-sm font-semibold text-skin-secondary">
            <IoWarningOutline size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Form footer */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full rounded bg-skin-secondary p-2 text-center font-medium tracking-wide text-white transition-all hover:bg-skin-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
