<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body {
  min-height: 100% !important;
  margin: 0;
  padding: 0;
  /* Разрешаем вертикальный скролл и запрещаем горизонтальный */
  overflow-y: auto !important;
  overflow-x: hidden !important;
  background-color: #ffc200;
  /* Улучшаем отзывчивость скролла на iOS */
  -webkit-overflow-scrolling: touch !important;
}
</style>