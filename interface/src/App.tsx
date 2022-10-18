import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Home";
import Settings from "./Settings";

const App: React.FC = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
