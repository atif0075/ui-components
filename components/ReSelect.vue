<template>
  <div class="relative z-10">
    <Listbox v-model="selectedOption">
      <div class="relative z-10">
        <ListboxButton :class="[className ? className : 'rounded-2xl']"
          class="relative w-full cursor-default bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-3.5 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
          <span class="block truncate">{{ selectedOption }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon icon="ri:arrow-down-s-line" class="text-zinc-600" />
          </span>
        </ListboxButton>
        <transition name="fade">
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            <ListboxOption v-for="item in options" :key="item.value" :value="item.value" :class="[
              item.value === selectedOption ? 'bg-red-100 text-red-600' : 'text-zinc-800 dark:text-gray-100',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]">
              <span :class="[
                item.value === selectedOption ? 'font-medium' : 'font-normal',
                'block truncate',
              ]">{{ item.label }}</span>
              <span v-if="item.value === selectedOption"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                <Icon icon="ri:check-line" />
              </span>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
interface Option {
  label: string;
  value: string;
}

const props = defineProps<{
  options: Option[];
  selected?: string;
  className?: string;
}>();

const { options, selected, className } = toRefs(props);
const selectedOption = ref<string>(selected.value || (options.value.length > 0 ? options.value[0].value : ''));

const emit = defineEmits(['onChange']);

watchEffect(() => {
  selectedOption.value = selected.value || (options.value.length > 0 ? options.value[0].value : '');
});

watch(selectedOption, (val) => {
  emit('onChange', val);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
