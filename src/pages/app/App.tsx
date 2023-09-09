import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import DocListRouter from "./router/doc_list_pac-router";

function App(){
  return(
      <Routes>
        <Router>
          <DocListRouter/>
        </Router>
      </Routes>
  )
}
export default App;