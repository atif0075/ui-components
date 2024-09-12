<template>
  <div class="flex items-center gap-x-3">
    <re-button
      @click="$router.back()"
      icon="mdi:arrow-left"
      color="zinc"
      fill
    />
    <h1 class="heading1">
      <slot />
    </h1>
  </div>
</template>
