<template>
  <NuxtLayout>
    <NuxtPage />
    <SpeedInsights />
  </NuxtLayout>
</template>

<script setup>
// Importing the Vue-specific version to bypass the Nuxt module resolution error
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<style>
html {
  /* Forces Safari to recognize a scrollable area to hide the address bar */
  height: 100.1% !important; 
  background-color: #ffc200 !important;
  scroll-behavior: smooth;
}

body {
  min-height: 100dvh !important;
  margin: 0;
  padding: 0;
  
  /* CRITICAL: Allows browser UI to collapse on scroll */
  overflow-y: auto !important;
  overflow-x: hidden !important;
  
  background-color: #ffc200 !important;

  -webkit-overflow-scrolling: touch !important;
  touch-action: pan-y;
  
  overscroll-behavior-y: auto;
}

#__nuxt {
  min-height: 100dvh !important;
  display: flex;
  flex-direction: column;
}

.viewport, .panel {
  height: 100dvh !important;
}
</style>
