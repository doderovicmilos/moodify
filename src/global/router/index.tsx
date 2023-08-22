import { createBrowserRouter } from 'react-router-dom';

import Playlist from '../../pages/Playlist';
import Root from './routes/Root';

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
