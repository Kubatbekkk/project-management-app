import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Spinner from 'components/Spinner/Spinner';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

const Layout = ({ isSpinning, children }: { isSpinning: boolean; children: ReactNode }) => {
  return (
    <>
      <ToastContainer limit={3} newestOnTop />
      <Header />
      <div className={`main-container ${isSpinning ? 'main-darken' : ''}`}>{children}</div>
      <Footer />
      {isSpinning && <Spinner />}
    </>
  );
};

export default Layout;
