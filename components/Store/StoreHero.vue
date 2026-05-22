<template>
  <section class="relative bg-black text-[#ffc200] pt-32 pb-16 px-8 overflow-hidden">
    <div class="max-w-4xl mx-auto text-center relative z-10 appear-animate">
      
      <span class="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#ffc200]/60 border border-[#ffc200]/30 px-4 py-1.5 mb-8">
        Digital Asset Authority
      </span>
      
      <h1 class="magical-text druk-title text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85] mb-8">
        Kodak Vision3 <br />
        <span class="text-white">LUT Pack</span>
      </h1>
      
      <p class="garamond-font text-[#ffc200] text-xl md:text-2xl italic tracking-wide max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
        Придай видео с iPhone аутентичный пленочный вид. Разработано специально для <strong class="font-bold">Apple Log</strong>. Настоящие цвета легендарной киноэмульсии 500T и 250D в один клик.
      </p>

      <a href="#buy-block" class="inline-block bg-[#ffc200] text-black font-bold uppercase py-4 px-10 tracking-widest hover:bg-white transition-colors duration-300">
        <span class="druk-title text-xl tracking-tight">Get the Pack — $25</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font { font-family: 'EB Garamond', serif; }

.magical-text {
  background: linear-gradient(90deg, #ffc200 0%, #fff 25%, #ffc200 50%, #fff 75%, #ffc200 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 4s linear infinite;
  text-shadow: 0 0 20px rgba(255, 194, 0, 0.2);
}
@keyframes shine { to { background-position: 200% center; } }

.appear-animate {
  animation: fade-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}
@keyframes fade-up { 
  from { opacity: 0; transform: translateY(30px); } 
  to { opacity: 1; transform: translateY(0); } 
}
</style>