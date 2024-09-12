<script setup lang="ts">
/// <reference types="@types/google.maps" />

// import { useMapHelper } from "./MapHelper";

interface PolylineOptions {
  strokeColor: string;
  strokeWeight: number;
}

interface Props {
  startLocation?: string;
  endLocation?: string;
  polylineOptions: PolylineOptions;
}

const store = useStore();
const config = useRuntimeConfig();
const apiKey = config.public.GOOGLE_MAPS_API_KEY;
const { loadGoogleMaps } = useGoogleMapsLoader(apiKey);
const toast = useToast();
const props = withDefaults(defineProps<Props>(), {
  polylineOptions: () => ({
    strokeColor: "#ff914b",
    strokeWeight: 5,
  }),
});

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<google.maps.Map | null>(null);
const directionsService = ref<google.maps.DirectionsService | null>(null);
const directionsRenderer = ref<google.maps.DirectionsRenderer | null>(null);
const isLoaded = ref(false);
const errorMessage = ref("");
const { mapStyles } = useMapHelper();
const mapOptions = ref({
  zoom: 4,
  center: { lat: 51.509865, lng: -0.118092 },
  disableDefaultUI: true,
  styles: mapStyles.value,
});

const emit = defineEmits<{
  (e: "totalDistance", distance: number): void;
}>();

onMounted(async () => {
  try {
    const google: any = await loadGoogleMaps();

    if (!mapContainer.value) {
      throw new Error("Map container element not found");
    }

    console.log("Initializing map");
    map.value = new google.maps.Map(mapContainer.value, mapOptions.value);

    console.log("Map initialized");

    console.log("Initializing directions service and renderer");
    directionsService.value = new google.maps.DirectionsService();
    directionsRenderer.value = new google.maps.DirectionsRenderer({
      map: map.value,
    });
    console.log("Directions service and renderer initialized");

    isLoaded.value = true;
    console.log("Component fully loaded, checking for route update");

    if (props.startLocation && props.endLocation) {
      updateRoute();
    }
  } catch (error) {
    console.error("Error in GoogleMap component:", error);
    if (error instanceof Error) {
      errorMessage.value = `Error: ${error.message}`;
    } else {
      errorMessage.value = "An unknown error occurred";
    }
  }
});

function clearExistingRoute() {
  if (directionsRenderer.value) {
    directionsRenderer.value.setDirections(null);
  }
}

function calculateDistance(result: google.maps.DirectionsResult) {
  let distance = 0;
  const myroute = result.routes[0];

  if (myroute && myroute.legs) {
    for (let i = 0; i < myroute.legs.length; i++) {
      distance += myroute.legs[i].distance?.value || 0;
    }
  }

  const distanceInMiles = Math.round((distance / 1609.344) * 10) / 10;
  emit("totalDistance", distanceInMiles);
}

function updateRoute() {
  if (!isLoaded.value) {
    console.warn("Google Maps not yet loaded. Skipping route update.");
    return;
  }

  clearExistingRoute();

  if (!props.startLocation || !props.endLocation) {
    return;
  }

  if (props.startLocation === props.endLocation) {
    toast.add({
      title: "Start and end locations are the same",
      description: "Please provide different start and end locations",
      color: "red",
    });

    return;
  }

  if (!directionsService.value) {
    console.error("Directions service is not initialized");
    return;
  }

  const request: google.maps.DirectionsRequest = {
    origin: props.startLocation,
    destination: props.endLocation,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  console.log("Sending directions request", request);

  directionsService.value.route(request, (result, status) => {
    console.log("Received directions response", status);
    if (status === google.maps.DirectionsStatus.OK && result) {
      if (directionsRenderer.value && map.value) {
        directionsRenderer.value.setDirections(result);
        calculateDistance(result);
        directionsRenderer.value.setOptions({
          polylineOptions: props.polylineOptions,
        });
        if (result.routes[0].bounds) {
          fitMapToRoute(result.routes[0].bounds);
        }
        console.log("Route updated successfully");
      }
    } else {
      console.error("Directions request failed due to " + status);
      errorMessage.value = `Directions request failed: ${status}`;
    }
  });
}

function fitMapToRoute(bounds: google.maps.LatLngBounds) {
  if (map.value) {
    map.value.fitBounds(bounds);
    const padding = { top: 50, right: 50, bottom: 50, left: 50 };
    map.value.fitBounds(bounds, padding);
  }
}

watch(
  () => props.polylineOptions,
  (newOptions) => {
    if (isLoaded.value && directionsRenderer.value && map.value) {
      directionsRenderer.value.setOptions({
        polylineOptions: newOptions,
      });
      updateRoute();
    }
  },
  { deep: true }
);

watch([() => props.startLocation, () => props.endLocation], () => {
  if (isLoaded.value) {
    updateRoute();
  }
});

watch(
  () => store.darkMode,
  () => {
    mapOptions.value = {
      ...mapOptions.value,
      styles: mapStyles.value,
    };
    if (isLoaded.value && map.value) {
      map.value.setOptions(mapOptions.value);
    }
    if (isLoaded.value && props.startLocation && props.endLocation) {
      updateRoute();
    }
  }
);
</script>

<template>
  <div>
    <div ref="mapContainer" class="map-container"></div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
