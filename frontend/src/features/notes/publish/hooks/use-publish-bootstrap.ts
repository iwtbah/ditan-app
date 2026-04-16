import { PUBLISH_INITIAL_IMAGES, PUBLISH_STORE_OPTIONS } from "../../mocks";

export function usePublishBootstrap() {
  return {
    initialImages: PUBLISH_INITIAL_IMAGES,
    storeOptions: PUBLISH_STORE_OPTIONS,
  };
}
