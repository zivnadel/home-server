import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="settings" element={<div>Settings</div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
