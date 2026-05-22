<template>
  <section class="bg-black text-[#ffc200] py-24 px-8 border-t border-[#ffc200]/10">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        <div class="md:col-span-7 space-y-6">
          <h2 class="druk-title text-4xl md:text-6xl uppercase tracking-tighter leading-none">
            What's Inside
          </h2>
          <div class="garamond-font text-lg md:text-xl leading-relaxed space-y-4 opacity-90 text-justify">
            <p>
              Этот пак — результат калибровки цифровой матрицы iPhone под органическую структуру плёнки. Внутри находятся файлы, готовые к моментальной интеграции как на мобильных устройствах, так и в профессиональном десктопном софте.
            </p>
          </div>
          
          <ul class="space-y-3 font-mono text-xs uppercase tracking-wider text-[#ffc200]/80 pt-4">
            <li class="flex items-center gap-3">
              <span class="text-[#ffc200]">●</span>
              <span>01. Kodak Vision3 500T (Tungsten / Ночной свет)</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-[#ffc200]">●</span>
              <span>02. Kodak Vision3 250D (Daylight / Дневной свет)</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-[#ffc200]">●</span>
              <span>Формат .CUBE (Universal 33x33 & 65x65)</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-[#ffc200]">●</span>
              <span>PDF-гайд по экспозиции Apple Log</span>
            </li>
          </ul>
        </div>

        <div class="md:col-span-5 relative bg-[#0a0a0a] border border-[#ffc200]/20 p-8 h-80 flex flex-col justify-between group overflow-hidden">
          <div class="absolute inset-0 border-0 group-hover:border-[8px] group-hover:border-[#ffc200] transition-all duration-300 pointer-events-none"></div>
          
          <div class="text-[10px] font-mono tracking-[0.2em] text-[#ffc200]/40">GENE PEREZ / LABS</div>
          <div class="my-auto">
            <div class="text-7xl font-black tracking-tighter text-[#ffc200]/10 group-hover:text-[#ffc200]/20 transition-colors duration-500 druk-title selection:bg-transparent">
              KV3
            </div>
            <div class="text-xl font-bold uppercase tracking-widest mt-1 text-[#ffc200] font-mono">FILM EMULATION</div>
          </div>
          <div class="text-[10px] font-mono text-[#ffc200]/50 flex justify-between tracking-widest">
            <span>LUT CUBE PACK</span>
            <span>V1.0</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.druk-title { font-family: 'Druk Text Cyr Heavy', sans-serif; }
.garamond-font { font-family: 'EB Garamond', serif; }
</style>