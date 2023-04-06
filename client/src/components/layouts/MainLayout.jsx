import Header from '../common/Header';

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <>{children}</>

      {/* Footer */}
    </div>
  );
}

export default MainLayout;
