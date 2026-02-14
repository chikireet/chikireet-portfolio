<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body {
  /* Заменяем фиксированную высоту на минимальную, чтобы контент мог растягиваться */
  min-height: 100%; 
  margin: 0;
  padding: 0;
  /* УДАЛЯЕМ overflow: hidden и разрешаем скролл */
  overflow-x: hidden; /* Запрещаем только горизонтальный скролл, если есть вылеты */
  overflow-y: auto;   /* Разрешаем вертикальный скролл */
  background-color: #ffc200;
  
  /* Улучшаем плавность скролла на мобильных устройствах */
  -webkit-overflow-scrolling: touch;
}
</style>
