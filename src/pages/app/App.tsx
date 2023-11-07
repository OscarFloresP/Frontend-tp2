import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import DocListRouter from "./router/doc_list_pac-router";
import MediaRouter from "./router/media-router";

function App(){
  return(
        <Router>
          <DocListRouter/>
          <MediaRouter/>
        </Router>
  )
}
export default App;