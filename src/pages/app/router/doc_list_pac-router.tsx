import React from "react";
import {Route, Routes} from "react-router-dom";
import DocListPac from "../../doctor_pac/doc-list";


function MediaRouter (){
    return(
      <Routes>
        <Route path="/doc-list-pac" element={<DocListPac />} />
      </Routes>  
    );
}
export default MediaRouter;