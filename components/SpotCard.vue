<script setup lang="ts">
import { cn } from "~/utils/cn";

interface Props {
  gradientColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  innerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  gradientColor: "#ff914b",
  backgroundColor: "#ffffff",
  textColor: "#4b5563",
  borderRadius: "1rem",
  innerClass: "",
});

const el = ref<HTMLElement | null>(null);
// Set the initial position far away from the element to prevent the background from showing initially
const mousePosition = ref({ x: -9999, y: -9999 });

const updateMousePosition = (event: MouseEvent) => {
  if (el.value) {
    const rect = el.value.getBoundingClientRect();
    mousePosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
};

onMounted(() => {
  window.addEventListener("mousemove", updateMousePosition);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateMousePosition);
});

const background = computed(() => ({
  background: `radial-gradient(200px 89.55% at ${mousePosition.value.x}px ${mousePosition.value.y}px, ${props.gradientColor} 0%, rgba(255, 255, 255, 0.00) 100%)`,
  borderRadius: props.borderRadius,
}));

const contentStyle = computed(() => ({
  borderRadius: `calc(${props.borderRadius} - 1px)`,
}));
</script>

<template>
  <div ref="el" :style="background" class="p-px bg-gray-900 relative card">
    <div
      :style="contentStyle"
      :class="cn(innerClass, 'h-full p-4 relative rounded-xl z-10')"
    >
      <slot></slot>
    </div>
  </div>
</template>
