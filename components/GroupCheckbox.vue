<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps<{
  options: { label: string; value: string }[];
}>();

const emit = defineEmits(["update:checkedItem"]);

const checkedItem = defineModel();

const handleClick = (value: string) => {
  checkedItem.value = value;
  emit("update:checkedItem", value);
};
</script>

<template>
  <div
    class="flex flex-wrap sm:flex-nowrap items-center w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
  >
    <button
      v-for="(item, index) in options"
      :key="index"
      :class="{
        'bg-orange-500 text-white': checkedItem === item.value,
        'text-gray-700 dark:text-gray-300': checkedItem !== item.value,
        'hover:bg-gray-100 dark:hover:bg-gray-900': checkedItem !== item.value,
        'text-xs sm:text-sm': options.length > 3,
        'text-sm': options.length <= 3,
        'w-full sm:w-auto': true,
      }"
      @click="handleClick(item.value)"
      class="flex-1 py-2 whitespace-nowrap sm:py-3 px-2 sm:px-3 font-medium focus:outline-none rounded-full m-1 sm:m-0"
    >
      {{ item.label }}
    </button>
  </div>
</template>
