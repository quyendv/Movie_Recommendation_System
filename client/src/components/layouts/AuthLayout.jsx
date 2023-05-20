import Logo from '../common/Logo';

function AuthLayout({ children }) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[url(/src/assets/images/bg-auth3.jpg)] bg-cover bg-center bg-no-repeat p-4 sm:p-8">
      <div className="absolute left-4 top-4 md:left-8">
        <Logo />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
