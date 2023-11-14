import {Route, Routes} from "react-router-dom";
import Media from "../../media_model/media";

interface MediaRouterProps {
  appToken: string | null;
}
function MediaRouter ({ appToken }: MediaRouterProps){
    return(
      <Routes>
        <Route path="/model" element={<Media appToken={appToken}/>} />
      </Routes>  
    );
}
export default MediaRouter;