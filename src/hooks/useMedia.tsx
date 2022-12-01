import React from 'react';

const useMedia = (media: string) => {
  const [match, setMatch] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      const sizeWindow = window.matchMedia(media);
      setMatch(sizeWindow.matches);
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return match;
};

export default useMedia;
