import Header from '../common/Header';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* MainPage */}
      <>{children}</>

      {/* Footer */}
    </div>
  );
}

export default MainLayout;
