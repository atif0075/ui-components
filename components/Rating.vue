<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: number;
  max: number;
  type: "star" | "point";
  size?: "sm" | "md" | "lg";
  color?: string;
  editable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "yellow",
  editable: false,
});

const emit = defineEmits<{
  (e: "update:value", value: number): void;
}>();

const filledWidth = computed(() => (props.value / props.max) * 100 + "%");

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-4 h-4"; // Small size for stars
    case "lg":
      return "w-6 h-6"; // Large size for stars
    default:
      return "w-5 h-5"; // Medium size by default
  }
});

const colorClasses = computed(() => {
  switch (props.color) {
    case "yellow":
      return "text-yellow-400";
    case "blue":
      return "text-blue-500";
    case "green":
      return "text-green-500";
    case "red":
      return "text-red-500";
    default:
      return "text-yellow-400";
  }
});

const handleClick = (index: number) => {
  if (props.editable) {
    emit("update:value", index + 1);
  }
};
</script>

<template>
  <div class="flex items-center">
    <template v-if="type === 'star'">
      <div class="relative inline-flex">
        <!-- Empty Stars -->
        <div class="flex text-gray-300">
          <svg
            v-for="i in max"
            :key="`empty-${i}`"
            :class="sizeClasses"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>
        <!-- Filled Stars -->
        <div
          class="absolute top-0 left-0 flex overflow-hidden"
          :style="{ width: filledWidth }"
        >
          <div :class="['flex', colorClasses]">
            <svg
              v-for="i in max"
              :key="`filled-${i}`"
              @click="handleClick(i - 1)"
              :class="[sizeClasses, { 'cursor-pointer': editable }]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="type === 'point'">
      <div :class="['font-bold', colorClasses]">
        {{ value.toFixed(1) }}
      </div>
      <div class="text-gray-400 ml-1">/ {{ max.toFixed(1) }}</div>
    </template>
  </div>
</template>
