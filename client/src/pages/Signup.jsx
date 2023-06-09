// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsShieldLockFill } from 'react-icons/bs';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { IoWarningOutline } from 'react-icons/io5';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import userApi from '~/apis/user.api';
import { routesConfigs } from '~/configs/routes.configs';
import { setUser } from '~/redux/features/userSlice';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  displayName: yup.string().required('DisplayName is required'),
  password: yup
    .string()
    .required('Password is required')
    // .matches(
    //   /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,}$/, // no whitespace, min 6, includes: upper lower number symbol
    //   'Minimum 6 characters with 1 digit, 1 uppercase, 1 lowercase, and 1 special character.',
    // ),
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
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [error, setError] = useState(''); // error msg for all fields (after submit), yup for each field (before submit)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError(''); // clear error message

    const { username, displayName, password, confirmPassword } = data;
    const { response, err } = await userApi.signup({ username, displayName, password, confirmPassword });

    if (response) {
      dispatch(setUser(response.data)); // .data by server not axios
      navigate(routesConfigs.home);
      // TODO: toast
    }
    if (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-wrap rounded-2xl bg-[#ffffff26] p-8 shadow-lg backdrop-blur-sm transition duration-300 sm:p-12 md:p-16 lg:w-[900px]">
      {/* Form */}
      <form className="w-full pr-0 md:w-1/2 md:pr-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <h2 className="text-center font-berkshireSwash text-4xl font-semibold tracking-wider text-skin-primary transition duration-300 xl:text-5xl">
          Join Us!
        </h2>

        {/* List form-group: { form-label + form-control } + form-error (span: it is not affected by margin-top (space-y) unless block|inline-block) */}
        <div className="mt-8 space-y-6 text-white">
          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="text"
              placeholder="Enter username"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('username')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <FaUserAlt />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.username?.message}</span>

          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="text"
              placeholder="Enter display name"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('displayName')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <MdDriveFileRenameOutline />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.displayName?.message}</span>

          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="password"
              placeholder="Enter password"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('password')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <FaLock />
            </label>
          </div>
          <span className="text-sm font-medium text-red-500">{errors.password?.message}</span>

          <div className="relative overflow-hidden rounded bg-[#00000026]">
            <input
              type="password"
              placeholder="Enter repeat password"
              spellCheck={false}
              className="peer w-full border-b border-solid border-gray-300 bg-transparent px-8 py-1.5 transition duration-300 focus:border-form focus:text-form [&:not(:placeholder-shown)]:border-form [&:not(:placeholder-shown)]:text-form"
              {...register('confirmPassword')}
            />
            <label className="absolute left-2 top-1/2 -translate-y-1/2 transition duration-300 peer-focus:text-form peer-[:not(:placeholder-shown)]:text-form">
              <BsShieldLockFill />
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
            Sign Up
          </button>
          <p className="mt-2 text-sm font-semibold text-slate-400">
            Already have an account?
            <Link className="ml-2 text-blue-400 underline transition hover:text-red-400" to={routesConfigs.signin}>
              Sign in now
            </Link>
          </p>
        </div>
      </form>

      {/* Paper wrapper */}
      <div className="hidden w-full pl-0 md:block md:w-1/2 md:pl-4">
        <div className="h-full w-full rounded bg-[url('/src/assets/images/signup.jpg')] bg-cover bg-center bg-no-repeat"></div>
      </div>
    </div>
  );
}

export default Signup;
