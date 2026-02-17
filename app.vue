<template>
  <NuxtLayout>
    <NuxtPage />
    <SpeedInsights />
  </NuxtLayout>
</template>

<script setup>
/* Manual import removed to let the Nuxt module handle resolution */
</script>

<style>
html {
  /* STRATEGY: Setting height to slightly over 100% forces Safari to recognize 
     a scrollable area. This is the trigger required to hide the address bar.
  */
  height: 100.1% !important; 
  background-color: #ffc200 !important;
  scroll-behavior: smooth;
}

body {
  /* Use min-height to allow the viewport to expand/contract dynamically */
  min-height: 100dvh !important;
  margin: 0;
  padding: 0;
  
  /* CRITICAL: overflow-y must be 'auto' or 'scroll'. If it is 'hidden', 
     the browser will never collapse the address bar.
  */
  overflow-y: auto !important;
  overflow-x: hidden !important;
  
  /* Matches your branding to ensure the "notch" area stays yellow */
  background-color: #ffc200 !important;

  -webkit-overflow-scrolling: touch !important;
  touch-action: pan-y;
  
  /* 'auto' allows the browser's UI to react to the start of a scroll gesture */
  overscroll-behavior-y: auto;
}

#__nuxt {
  min-height: 100dvh !important;
  display: flex;
  flex-direction: column;
}

/* Ensure all panels and the main viewport respond to the 
    dynamic height changes when the address bar slides away.
*/
.viewport, .panel {
  height: 100dvh !important;
}
</style>
