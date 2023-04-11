import Header from '../common/Header';

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* MainPage ~ MainContent */}
      <main className="flex-1 overflow-hidden">{children}</main>

      {/* Footer */}
    </div>
  );
}

export default MainLayout;
