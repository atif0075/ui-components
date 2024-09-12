<script setup lang="ts">
import { type MazGalleryImage } from "maz-ui/components/MazGallery";
const allImages = ref<MazGalleryImage[]>([]);
const dropZoneRef = ref<HTMLDivElement>();
function onDrop(files: File[] | null) {
  // called when files are dropped on zone
  if (files) {
    allImages.value = files.map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
    }));
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // accept only images
  dataTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
});
</script>
<template>
  <MazGallery v-if="allImages.length > 0" :images="allImages" :height="320" />
  <section
    ref="dropZoneRef"
    class="w-full backdrop-blur bg-zinc-100/30 border rounded-3xl p-4 flex justify-center items-center h-96"
  >
    <div class="flex flex-col items-center">
      <div
        class="flex items-center justify-center w-16 h-16 rounded-full bg-zinc-200"
      >
        <icon icon="mdi:plus" v-if="isOverDropZone" size="md" />
        <icon icon="mdi:cloud-upload" v-else size="md" />
      </div>
      <p class="mt-4 text-lg font-medium text-gray-500">
        Drag and drop your photos here
      </p>
      <p class="mt-1 text-sm text-gray-400">or</p>
      <re-button fill  class="mt-4">
        Select photos
      </re-button>
    </div>
  </section>
</template>
