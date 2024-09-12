interface MapStyles {
  elementType: string;
  stylers: { color: string }[];
  featureType?: string;
}
interface Map {
  startLocation: any;
  endLocation: any;
}

interface Conditions {
  start: boolean;
  end: boolean;
}
export function useMapHelper() {
  const store = useStore();
  const toast = useToast();
  const startLocation = ref("");
  const endLocation = ref("");
  const map = reactive<Map>({
    startLocation: null,
    endLocation: null,
  });
  const mapStyles = computed<MapStyles[]>(() => {
    return store.darkMode
      ? [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
        ]
      : [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#f5f5f5" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text.fill",
            stylers: [{ color: "#757575" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }],
          },
        ];
  });

  const handleSameAddress = () => {
    if (startLocation.value === endLocation.value) {
      toast.add({
        title: "Error",
        description: "Start and end address cannot be the same",
        color: "red",
      });
      startLocation.value = "";
      endLocation.value = "";
      map.startLocation = null;
      map.endLocation = null;
      return true;
    }
    return false;
  };
  const handleStartPlaceSelected = (place: any) => {
    startLocation.value = place.address;
    map.startLocation = place;
  };

  const handleEndPlaceSelected = (place: any) => {
    endLocation.value = place.address;
    map.endLocation = place;
  };
  const enableConditions = computed<Conditions>(() => ({
    start: map.startLocation !== null,
    end: map.endLocation !== null,
  }));
  const isBothFilled = computed(() => {
    return enableConditions.value.start && enableConditions.value.end;
  });
  const updateMapLocations = () => {
    map.startLocation = startLocation.value;
    map.endLocation = endLocation.value;
  };
  watch([startLocation, endLocation], () => {
    if (startLocation.value && endLocation.value) {
      handleSameAddress();
    }
  });

  return {
    mapStyles,
    handleSameAddress,
    map,
    startLocation,
    endLocation,
    enableConditions,
    handleEndPlaceSelected,
    handleStartPlaceSelected,
    updateMapLocations,
    isBothFilled,
  };
}
