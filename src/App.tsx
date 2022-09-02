import { useContext } from 'react';
import RoutesWrapper from 'utils/routerWrapper';
import { AppContext } from 'store/storeWrapper';
import 'react-toastify/dist/ReactToastify.css';
import './sass/App.scss';
import Layout from 'components/Layout/Layout';

function App() {
  const { isSpinning } = useContext(AppContext);

  return (
    <Layout isSpinning={isSpinning}>
      <RoutesWrapper />
    </Layout>
  );
}

export default App;
