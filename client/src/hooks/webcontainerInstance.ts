// webcontainerInstance.ts
import { WebContainer } from "@webcontainer/api";

let instance: WebContainer | null = null;

export async function getWebContainerInstance(): Promise<WebContainer> {
  if (!instance) {
    instance = await WebContainer.boot();
  }
  return instance;
}
