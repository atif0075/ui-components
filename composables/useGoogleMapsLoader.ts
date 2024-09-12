// composables/useGoogleMapsLoader.js
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from "vue";

let loaderInstance: Loader | null = null;
let googleInstance = ref<null | typeof google | undefined>(null);

export function useGoogleMapsLoader(apiKey: string | undefined) { 

  if (!loaderInstance) {
    loaderInstance = new Loader({
      apiKey: apiKey as string,
      version: "weekly",
      libraries: ["places"],
    });
  }

  const loadGoogleMaps = async () => {
    if (!googleInstance.value) {
      googleInstance.value = await loaderInstance?.load()
    }
    return googleInstance.value;
  };

  return { loadGoogleMaps };
}
