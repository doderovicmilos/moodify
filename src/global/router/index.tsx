import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Playlist from "../../pages/Playlist";

export default createBrowserRouter([
  {
    id: 'home',
    path: '/',
    element: <Root />,
    children: [
      {
        id: 'songList',
        element: <Playlist />,
        index: true 
      }
    ]
  }
]);
