import { useEffect, useState } from 'react';
import { ImSpinner10 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';

function GlobalLoading() {
  // @ts-ignore
  const { globalLoading } = useSelector((state) => state.global);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      // loading 1s
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <div
      className={`pointer-events-none fixed h-screen w-screen bg-transparent ${
        isLoading ? 'visible [&+*]:invisible' : 'invisible [&+*]:visible'
      }`}
    >
      <Header />
 
      {/* MainContent/MainPage */}
      <div className="h-full w-full pt-header">
        {/* LinearProgressBar */}
        <progress className="linear-progress" />

        {/* Loading */}
        <div className="grid h-full w-full place-content-center text-skin-primary">
          <ImSpinner10 size={80} className="animate-spin" />
        </div>
      </div>
    </div>
  );
}

export default GlobalLoading;
