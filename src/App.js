import React, { useEffect, useState } from 'react';
import Generator from './components/Generator';
import Profile from './components/Profile';
import { ROUTES } from './utils/routes';
import { loadData } from './utils/localStorage';

function App() {
  // State management
  const [page, setPage] = useState(ROUTES.GENERATOR);
  const [openAIKey, setOpenAIKey] = useState();
  const [resume, setResume] = useState();

  // Load data from local storage on component mount
  useEffect(() => {
    const fetchLocalData = async () => {
      const localResume = await loadData("resume");
      const localOpenAIKey = await loadData("openAIKey");

      setResume(localResume);
      setOpenAIKey(localOpenAIKey);
    };

    fetchLocalData();
  }, []);

  // Render components based on the current page
  switch (page) {
    case ROUTES.GENERATOR:
      return (
        <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />
      );

    case ROUTES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          setOpenAIKey={setOpenAIKey}
          setResume={setResume}
          resume={resume}
          openAIKey={openAIKey}
        />
      );

    default:
      return (
        <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />
      );
  }
}

export default App;
