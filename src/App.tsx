import React from 'react';
import { Layout } from './components/layout/Layout';
import YieldSphereLanding from './components/InnovativeLanding';
import { ProfessionalNavbar } from './components/layout/ProfessionalNavbar';

const App: React.FC = () => {
  return (
    <Layout>
      <ProfessionalNavbar/>
      <YieldSphereLanding />
    </Layout>
  );
};

export default App;