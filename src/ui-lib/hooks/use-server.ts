import { useEffect, useState } from "react";

const useServer = () => {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  return isServer;
};

export { useServer };
