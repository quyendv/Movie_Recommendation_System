import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { routesConfigs } from '~/configs/routes.configs';

function ProtectedPage({ children }) {
  // @ts-ignore
  const { user } = useSelector((state) => state.user);

  // FIXME: UpdatePassword component không thuôc MainLayout (không tự động gọi api getUser khi reload) nên nếu reload bị redirect trực tiếp qua Signin -> Chuyển sang dùng modal UpdatePassword thay component, hoặc show modal thông báo require authorized và có nút redirect
  return user ? <>{children}</> : <Navigate to={routesConfigs.signin} />;
}

export default ProtectedPage;
