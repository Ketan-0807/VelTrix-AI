// useWebContainer.ts
import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";
import { getWebContainerInstance } from "./webcontainerInstance";

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer>();

  useEffect(() => {
    const init = async () => {
      const instance = await getWebContainerInstance();
      setWebcontainer(instance);
    };

    init();
  }, []);

  return webcontainer;
}
