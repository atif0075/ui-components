<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { IconSize } from "./IconTypes";
interface Props {
  icon: string;
  width?: string;
  height?: string;
  color?: string;
  class?: string | Record<string, boolean> | Array<string>;
  size?: IconSize | number | string;
}

const props = defineProps<Props>();

type Size = {
  [key: string]: string;
};

const sizeMap: Size = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
  "3xl": "w-24 h-24",
  "4xl": "w-32 h-32",
  "5xl": "w-40 h-40",
  "6xl": "w-48 h-48",
  "7xl": "w-56 h-56",
  "8xl": "w-64 h-64",
  "9xl": "w-72 h-72",
};

const sizeClass = computed(() => sizeMap[props.size || ""]);
const combinedClass = computed(() => `${sizeClass.value} ${props.class || ""}`);
</script>

<template>
  <Icon
    :icon="icon"
    :width="width || size"
    :height="height || size"
    :color="color"
    :class="combinedClass"
  />
</template>

<style scoped></style>
