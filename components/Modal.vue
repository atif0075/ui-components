<template>
  <div
    v-if="localVisible"
    class="fixed inset-0 flex items-center justify-center z-[9999999]"
  >
    <div
      class="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
      @click="close"
    ></div>
    <div
      ref="modalRef"
      class="bg-gray-50 dark:bg-gray-900 p-4 rounded-3xl shadow-lg z-10 max-w-lg w-full"
    >
      <div v-if="showHeader" class="flex justify-between items-center pb-4">
        <slot name="header">
          <h2 class="text-xl font-semibold">
            {{ title }}
          </h2>
        </slot>
        <button
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          @click="close"
        >
          <Icon icon="mdi:close" class="w-6 h-6" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import anime from "animejs";
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    showHeader?: boolean;
    title?: string;
  }>(),
  {
    showHeader: true,
    title: "Default Title",
  }
);

const emit = defineEmits(["update:modelValue"]);

const modalRef = ref<HTMLElement | null>(null);
const isVisible = defineModel<boolean>();
const localVisible = ref(isVisible.value);

const close = () => {
  anime({
    targets: modalRef.value,
    opacity: 0,
    scale: 0.8,
    duration: 300,
    easing: "easeInOutQuad",
    complete: () => {
      localVisible.value = false;
      isVisible.value = false;
    },
  });
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      localVisible.value = true;
      nextTick(() => {
        anime({
          targets: modalRef.value,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 300,
          easing: "easeInOutQuad",
        });
      });
    } else {
      close();
    }
  }
);

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    close();
  }
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
