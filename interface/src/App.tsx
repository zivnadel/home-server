import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Home";
import Settings from "./Settings";
import { LangContextProvider } from "./store/LangContext";

const App: React.FC = () => {
  return (
    <HashRouter>
      <LangContextProvider>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </LangContextProvider>
    </HashRouter>
  );
};

export default App;
