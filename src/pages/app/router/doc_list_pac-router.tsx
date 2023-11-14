import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocListPac from '../../doctor_pac/doc-list';

interface DocListRouterProps {
  appToken: string | null;
}

function DocListRouter({ appToken }: DocListRouterProps) {
  return (
    <Routes>
      <Route path="/doc-list-pac" element={<DocListPac appToken={appToken} />} />
    </Routes>
  );
}

export default DocListRouter;