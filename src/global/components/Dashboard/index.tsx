import { useRecoilState } from 'recoil';
import AddSong from './components/AddSong';
import EditMood from './components/EditMoodDisplay';
import AppBar from './components/AppBar';
import { dashboardUIState } from './store';
import { useCallback } from 'react';


export default function Dashboard():JSX.Element {
  const [{ isAddSongActive, isEditMoodActive }, setDashboardUI] = useRecoilState(dashboardUIState);

  const toggleAddSong = useCallback(() => {
    setDashboardUI(prev=>({...prev, isAddSongActive: !prev.isAddSongActive}))
  }, [setDashboardUI]);

  const toggleEditMood = useCallback(() => {
    setDashboardUI(prev=>({...prev, isEditMoodActive: !prev.isEditMoodActive}))
  }, [setDashboardUI]);

  return (
    <>
      <AppBar />
      {isAddSongActive && <AddSong handleClose={toggleAddSong} />}
      {isEditMoodActive && <EditMood handleClose={toggleEditMood} />}
    </>
  );
}