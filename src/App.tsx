import React from 'react';

import { MediaStore } from './stores/MediaStore';
import Routes from './pages/Routes';

function App() {
  return (
    <MediaStore>
      <Routes />
    </MediaStore>
  );
}

export default App;
