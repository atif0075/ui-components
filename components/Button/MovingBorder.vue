<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    class="absolute h-full w-full"
    width="100%"
    height="100%"
  >
    <rect ref="pathElement" fill="none" width="100%" height="100%" :rx="rx" :ry="ry" />
  </svg>
  <div
    style="position: absolute; top: 0; left: 0; display: inline-block;"
    :style="{ transform }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = withDefaults(defineProps<{
  duration?: number;
  rx?: string;
  ry?: string;
}>(), {
  duration: 2000,
  rx: '0',
  ry: '0',
});

const pathElement = ref<SVGRectElement | null>(null);
const progress = ref(0);
let animationFrameId: number;

const x = ref(0);
const y = ref(0);

const transform = computed(() => 
  `translateX(${x.value}px) translateY(${y.value}px) translateX(-50%) translateY(-50%)`
);

onMounted(() => {
  const animate = (time: number) => {
    if (pathElement.value) {
      const length = pathElement.value.getTotalLength();
      const pxPerMillisecond = length / props.duration;
      const newProgress = (time * pxPerMillisecond) % length;
      progress.value = newProgress === 0 ? 0 : newProgress;

      const point = pathElement.value.getPointAtLength(progress.value);
      x.value = point.x;
      y.value = point.y;
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>
