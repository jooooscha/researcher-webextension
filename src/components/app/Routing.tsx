import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { ROUTE_HOME, ROUTE_IMPORT, ROUTE_SEARCH, ROUTE_SETTINGS } from 'src/constants';

const SearchPage = lazy(() => import('src/pages/SearchPage'));
const ImportPage = lazy(() => import('src/pages/ImportPage'));
const SettingsPage = lazy(() => import('src/pages/SettingsPage'));

function Routing(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={ROUTE_HOME} element={<SearchPage />} />
        {/* component will be remounted each render */}
        {/* <Route path={ROUTE_SEARCH} exact component={SearchPage} /> */}
        <Route path={ROUTE_SEARCH} element={<SearchPage />} />
        <Route path={ROUTE_IMPORT} element={<ImportPage />} />
        <Route path={ROUTE_SETTINGS} element={<SettingsPage />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
