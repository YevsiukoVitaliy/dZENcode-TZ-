import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopMenu from './components/TopMenu';
import NavigationMenu from './components/NavigationMenu';
import Container from './components/Conteiner';
const Orders = lazy(() => import('./pages/Orders'));
const Products = lazy(() => import('./pages/Products'));
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <>
      <TopMenu />
      <NavigationMenu />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="groups" element={<Groups />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
