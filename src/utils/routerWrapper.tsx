import { v4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import ROUTES_LIST from './router';

const RoutesWrapper = () => {
  return (
    <Routes>
      {ROUTES_LIST.map(({ path, element }) => (
        <Route path={path} element={element} key={v4()} />
      ))}
    </Routes>
  );
};

export default RoutesWrapper;
