import {Route, Routes} from "react-router-dom";
import Media from "../../media_model/media";


function DocListRouter (){
    return(
      <Routes>
        <Route path="/" element={<Media />} />
      </Routes>  
    );
}
export default DocListRouter;