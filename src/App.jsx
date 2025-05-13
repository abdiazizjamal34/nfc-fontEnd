import React, { Suspense } from "react";
import Linktree from "./Components/Linktree";
import { Spinner } from "@material-tailwind/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nointernet from "./Components/Nointernet";
import Error500 from "./Components/Error500";
import Error404 from "./Components/Error404";

const App = () => {
  return (
    <Suspense fallback={<Spinner className="h-10 w-10" />}>
      <Routes>
        <Route path="/:username" element={<Linktree />} />
        <Route path="/Nointernet" element={<Nointernet />} />
        <Route path="/" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default App;
