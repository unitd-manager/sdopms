import React, { Suspense } from 'react';
// import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PermifyProvider } from '@permify/react-role';
import Themeroutes from './routes/Router';
import ThemeSelector from './layouts/theme/ThemeSelector';
import Loader from './layouts/loader/Loader';
import '@fortawesome/fontawesome-free/css/all.css';
import { AppProvider } from './context/AppContext';
import rbac from './context/role-based-access';
import TestingRoutes from './routes/Testing';
// import ContextRBAC from './context/ContextRBAC';

rbac.addUserRoles('ADMIN123', ['ADMIN']);

const App = () => {
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);

  return (
    <PermifyProvider>
     
        <AppProvider>
          <Suspense fallback={<Loader />}>
            <div
              className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`}
              dir={direction ? 'rtl' : 'ltr'}
            >
              <ThemeSelector />
              <TestingRoutes />
              <Themeroutes></Themeroutes>
            </div>
          </Suspense>
        </AppProvider>
      {/* </ContextRBAC.Provider> */}
    </PermifyProvider>
  );
};

export default App;
