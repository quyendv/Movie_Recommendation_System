import Header from '../common/Header';

function MainLayout({ children }) {
  return (
    <>
      {/* Header */}
      <Header />

      {children}

      {/* Footer */}
    </>
  );
}

export default MainLayout;
