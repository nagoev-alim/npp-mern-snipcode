import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';

/* =============================
📦 Custom Imports
============================= */
import Routes from '../routes/Routes.jsx';
import { ToggleTheme } from '../features/theme/components/index.js';
import { Footer, Header, Layout, Main } from './layout/index.js';
import { Spinner } from './ui/index.js';
import { Toaster } from 'react-hot-toast';

/* =============================
📦 Component - App
============================= */
export default function App() {
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return (
    <Router>
      <Layout>
        <Header />
        <Main>
          <Suspense fallback={<Spinner/>}>
            <Routes />
          </Suspense>
        </Main>
        <Footer />
      </Layout>
      <Toaster position='bottom-center'/>
      {/*<ToggleTheme />*/}
    </Router>
  );
}
