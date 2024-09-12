<template>
  <button
    :class="
      cn(
        'relative  w-auto  overflow-hidden bg-transparent p-[1px] text-xl',
        containerClassName
      )
    "
    :style="`border-radius: ${borderRadius};`"
  >
    <div
      class="absolute inset-0"
      :style="`border-radius: calc(${borderRadius} * 0.96);`"
    >
      <MovingBorder :duration="duration" rx="30%" ry="30%">
        <div
          :class="
            cn(
              'h-20 w-20 bg-[radial-gradient(var(--orange-500)_40%,transparent_60%)] opacity-[0.8]',
              borderClassName
            )
          "
        />
      </MovingBorder>
    </div>
    <div
      :class="
        cn(
          'relative flex h-full w-full items-center justify-center border border-gray-800 bg-gray-900/[0.8] text-white antialiased backdrop-blur-xl',
          className
        )
      "
      :style="`border-radius: calc(${borderRadius} * 0.96);`"
    >
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { cn } from "~/utils/cn";

withDefaults(
  defineProps<{
    borderRadius?: string;
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
  }>(),
  {
    borderRadius: "1.75rem",
    containerClassName: undefined,
    borderClassName: undefined,
    duration: 2000,
    className: undefined,
  }
);
</script>
<style>
:root {
  --orange-500: #f59e0b;
}
</style>
