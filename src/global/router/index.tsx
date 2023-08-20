import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Playlist from "../../pages/Playlist";
import Settings from "../../pages/Settings";

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
      },
      {
        id: 'settings',
        element: <Settings />,
        path: 'settings'
      }
    ]
  }
]);
