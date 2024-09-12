<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: "Enter a location",
  },
  inputClass: {
    type: String,
    default: "",
  },
});
const config = useRuntimeConfig();
const apiKey = config.public.GOOGLE_MAPS_API_KEY;
const { loadGoogleMaps } = useGoogleMapsLoader(apiKey);
const emit = defineEmits(["place-selected"]);
const inpData = defineModel();
const inputElement = ref<HTMLInputElement | null>(null);
const autocomplete = ref<any>(null);
const selectedPlace = ref<any>(null);

onMounted(async () => {
  const google: any = await loadGoogleMaps();
  const options = {
    types: ["address"],
    componentRestrictions: { country: "uk" },
    fields: ["address_components", "geometry", "name", "formatted_address"],
  };

  autocomplete.value = new google.maps.places.Autocomplete(
    inputElement.value,
    options
  );

  autocomplete.value?.addListener("place_changed", handlePlaceChanged);
});

function handlePlaceChanged() {
  const place = autocomplete.value.getPlace();

  if (!place.geometry) {
    console.log("No details available for input: '" + place.name + "'");
    return;
  }

  selectedPlace.value = {
    name: place.name,
    address: place.formatted_address,
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
  };

  emit("place-selected", selectedPlace.value);
}

watch(
  () => props.placeholder,
  (newPlaceholder) => {
    if (inputElement.value) {
      inputElement.value.placeholder = newPlaceholder;
    }
  }
);
</script>

<template>
  <div class="autocomplete-container">
    <input
      ref="inputElement"
      type="text"
      v-model="inpData"
      :placeholder="placeholder"
      :class="[
        'autocomplete-input w-full !p-2.5 bg-white dark:bg-gray-900 !border !border-gray-300 dark:!border-gray-700 !rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500',
        inputClass,
      ]"
    />
  </div>
</template>

<style scoped>
.autocomplete-container {
  position: relative;
  width: 100%;
}

.autocomplete-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
