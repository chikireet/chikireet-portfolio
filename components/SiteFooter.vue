<template>
  <footer class="w-full border-t border-[#ffc200]/10 py-8 md:py-10 px-6 md:px-12 bg-black relative z-10 mt-auto">
    <div class="max-w-[1450px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-10 text-left">
      
      <div class="md:col-span-3">
        <h3 class="canela-title text-xl text-[#ffc200]">
          Contact Details
        </h3>
      </div>
      
      <div class="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <div class="flex flex-col gap-1">
          <span class="footer-label">Location</span>
          <span class="garamond-text text-lg italic text-[#ffc200]">Toronto, Canada</span>
        </div>
        <div class="flex-col gap-1 flex">
          <span class="footer-label">Handle</span>
          <a href="https://instagram.com/chikireet" target="_blank" class="garamond-text text-lg italic hover:underline text-[#ffc200]">@chikireet</a>
        </div>
        <div class="flex-col gap-1 flex">
          <span class="footer-label">Email Address</span>
          <a href="mailto:evingeny@gmail.com" class="garamond-text text-lg italic hover:underline break-all text-[#ffc200]">evingeny@gmail.com</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.canela-title { 
  font-family: 'CanelaCustom', serif; 
  font-weight: 700;
  font-style: italic;
  /* 'normal' ensures it uses the font's intended spacing */
  letter-spacing: normal; 
  text-transform: none;
}

.garamond-text { font-family: 'EB Garamond', serif; }

.footer-label { 
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.6;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #ffc200;
  margin-bottom: 0.25rem;
}
</style>