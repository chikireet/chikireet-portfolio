<template>
  <div 
    ref="isolatedContainer"
    @wheel="handleAutonomousWheel"
    @touchstart="handleAutonomousTouchStart"
    @touchmove="handleAutonomousTouchMove"
    class="fixed inset-0 w-full h-full bg-[#020205] overflow-hidden z-0 pointer-events-auto selection:bg-orange-500 selection:text-white font-sans antialiased"
  >
    <canvas ref="spaceCanvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

    <div 
      class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-950/20 to-purple-900/10 blur-[140px] rounded-full pointer-events-none z-0 transition-transform duration-75"
      :style="{ transform: `translateY(${-currentVirtualScroll * 0.2}px)` }"
    ></div>
    <div 
      class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-orange-950/15 to-transparent blur-[120px] rounded-full pointer-events-none z-0 transition-transform duration-75"
      :style="{ transform: `translateY(${-currentVirtualScroll * 0.2}px)` }"
    ></div>

    <div 
      ref="contentLayer"
      class="absolute inset-x-0 w-full flex flex-col items-center pointer-events-auto"
      :style="{ transform: `translateY(${-currentVirtualScroll}px)` }"
    >
      
      <header 
        class="w-full max-w-6xl px-4 sm:px-6 absolute top-6 z-50 pointer-events-auto"
        :style="{ transform: `translateY(${currentVirtualScroll}px)` }"
      >
        <div class="liquid-glass rounded-3xl px-6 sm:px-8 py-4 flex justify-between items-center border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          
          <div class="flex items-center gap-4 select-none">
            <div class="relative w-8 h-8 flex items-center justify-center">
              <div class="absolute w-5 h-5 rounded-full bg-red-600/50 backdrop-blur-[2px] border border-red-400/30 -translate-y-[4px] shadow-[0_0_10px_rgba(239,68,68,0.4)] mix-blend-screen z-10"></div>
              <div class="absolute w-5 h-5 rounded-full bg-green-500/40 backdrop-blur-[2px] border border-green-400/30 -translate-x-[4px] translate-y-[2px] shadow-[0_0_10px_rgba(34,197,94,0.4)] mix-blend-screen z-10"></div>
              <div class="absolute w-5 h-5 rounded-full bg-blue-600/50 backdrop-blur-[2px] border border-blue-400/30 translate-x-[4px] translate-y-[2px] shadow-[0_0_10px_rgba(59,130,246,0.4)] mix-blend-screen z-10"></div>
            </div>
            <span class="font-bold tracking-wider text-sm md:text-base font-mono text-white">STARFORCE LUTS</span>
          </div>
          
          <nav class="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-300">
            <button @click="scrollToVirtualSection(1350)" class="hover:text-white transition-colors duration-300 bg-transparent border-none p-0 outline-none cursor-pointer">Features</button>
            <button @click="scrollToVirtualSection(2750)" class="hover:text-white transition-colors duration-300 bg-transparent border-none p-0 outline-none cursor-pointer">Compatibility</button>
            <button @click="scrollToVirtualSection(3450)" class="hover:text-white transition-colors duration-300 bg-transparent border-none p-0 outline-none cursor-pointer">Reviews</button>
          </nav>
          
          <div class="flex items-center gap-4">
            <div class="relative inline-block" ref="currencyDropdown">
              <button @click.stop="isCurrencyOpen = !isCurrencyOpen" 
                class="liquid-glass border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-3 text-sm text-neutral-200 font-semibold transition-all duration-200 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none cursor-pointer">
                <span class="inline-block scale-125 select-none">{{ selectedCurrency.flag }}</span>
                <span class="font-mono font-bold">{{ selectedCurrency.code }}</span>
                <span class="text-xs text-neutral-400 font-bold transition-transform duration-200" :class="{ 'rotate-180 text-orange-400': isCurrencyOpen }">↓</span>
              </button>

              <transition name="dropdown-fade">
                <div v-if="isCurrencyOpen" 
                  class="absolute right-0 top-[calc(100%+12px)] w-64 rounded-2xl border border-white/10 bg-[#020205] p-2 shadow-[0_24px_64px_rgba(0,0,0,0.95)] z-50">
                  <div class="max-h-64 overflow-y-auto pr-1 space-y-1 scrollbar-hide">
                    <button v-for="currency in currencies" :key="currency.id"
                      @click="selectCurrency(currency)"
                      class="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150 group focus:outline-none cursor-pointer"
                      :class="{ 'bg-white/[0.08] text-orange-400 font-bold border-l-2 border-orange-500/80 rounded-l-none': selectedCurrency.id === currency.id }">
                      <div class="flex items-center gap-3 truncate">
                        <span class="text-xl leading-none select-none">{{ currency.flag }}</span>
                        <div class="flex flex-col min-w-0 truncate">
                          <span class="font-mono tracking-wide text-neutral-100 font-bold group-hover:text-white">{{ currency.code }}</span>
                          <span class="text-xs text-neutral-400 truncate group-hover:text-neutral-200 transition-colors">{{ currency.country }}</span>
                        </div>
                      </div>
                      <span class="text-xs font-semibold text-neutral-400 font-mono pl-2 shrink-0 group-hover:text-orange-400">{{ currency.symbol }}</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="liquid-glass-btn-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer disabled:opacity-50">
              {{ isCheckoutLoading ? 'Processing...' : 'Get Pack' }}
            </button>
          </div>
        </div>
      </header>

      <section class="w-full max-w-6xl px-4 sm:px-6 pt-56 pb-20 text-center flex flex-col items-center">
        <div class="inline-flex items-center gap-3 px-5 py-2 rounded-2xl liquid-glass border border-white/10 text-xs md:text-sm font-semibold text-neutral-300 mb-8 tracking-wide">
          <span class="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] animate-pulse"></span>
          Cinematic Color Made Simple
        </div>
        
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          Hollywood Color. <br />
          <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent tracking-wide">Straight From Your iPhone.</span>
        </h1>
        
        <p class="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Turn ordinary iPhone footage into rich cinematic video in seconds. No complicated editing skills needed — just import the LUT, tap once, and get the polished film look.
        </p>

        <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="liquid-lens-btn text-white font-bold text-base px-10 py-4 rounded-2xl transition-all duration-300 mb-20 relative overflow-hidden group tracking-wide focus:outline-none cursor-pointer disabled:opacity-50">
          <span class="absolute inset-0 liquid-lens-glow"></span>
          <span class="relative z-10 flex items-center justify-center gap-2">
            {{ isCheckoutLoading ? 'Opening Checkout...' : `Buy Now — ${selectedCurrency.symbol}${Math.round(25 * selectedCurrency.rate)}` }} 
            <span v-if="!isCheckoutLoading" class="text-xs opacity-60 font-mono">{{ selectedCurrency.code }}</span>
            <span v-if="!isCheckoutLoading" class="text-sm opacity-60 font-mono ml-1">↓</span>
          </span>
        </button>

        <div class="w-full rounded-3xl p-2 liquid-glass border border-white/10 shadow-[0_32px_96px_rgba(0,0,0,0.8)]">
          <div class="rounded-2xl overflow-hidden aspect-video relative group">
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80" 
              alt="Cinematic Landscape" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section class="w-full max-w-6xl px-4 sm:px-6 py-32">
        <div class="text-center mb-16">
          <span class="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Versatility</span>
          <h2 class="text-3xl md:text-5xl font-extrabold mt-4 text-white tracking-tight">
            One LUT Pack. <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">Any Content.</span>
          </h2>
          <p class="text-neutral-400 text-sm md:text-base mt-3 font-light">Move the slider to see the difference. Flat iPhone footage instantly becomes deep and cinematic.</p>
        </div>

        <div class="w-full p-2 rounded-3xl liquid-glass border border-white/10 shadow-2xl relative select-none touch-none mb-12" @mousemove="handleDrag" @touchmove="handleDrag" ref="sliderContainer">
          <div class="relative rounded-2xl overflow-hidden aspect-[16/10] z-10 bg-neutral-900/40">
            <div class="absolute inset-0 z-0">
              <img :src="`/slides/${activeTag.filePrefix}_before.jpg`" class="w-full h-full object-cover pointer-events-none" alt="Before LUT" />
              <span class="absolute bottom-6 left-6 liquid-glass text-xs px-4 py-2 rounded-xl text-neutral-300 border border-white/10 font-mono font-bold">Apple Log</span>
            </div>
            
            <div class="absolute inset-0 z-10" :style="{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }">
              <img :src="`/slides/${activeTag.filePrefix}_after.jpg`" class="w-full h-full object-cover pointer-events-none" alt="After LUT" />
              <span class="absolute bottom-6 right-6 liquid-glass text-xs px-4 py-2 rounded-xl text-orange-400 border border-orange-500/30 font-mono font-bold">SF Kodak 500T</span>
            </div>

            <div class="absolute top-0 bottom-0 w-0 z-30 pointer-events-none" :style="{ left: `${sliderPos}%` }">
              <div class="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white to-white/20 -translate-x-1/2"></div>
              <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-white/30 shadow-xl pointer-events-auto cursor-ew-resize flex items-center justify-center bg-gradient-to-b from-white/20 to-transparent backdrop-blur-md transition-transform duration-200 active:scale-90 hover:scale-105">
                <div class="flex gap-[3px] justify-center items-center">
                  <div class="w-[2px] h-3 bg-white/80 rounded-full"></div>
                  <div class="w-[2px] h-3 bg-white/80 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full overflow-x-auto scrollbar-hide border-b border-white/5 relative">
          <div class="flex items-center justify-between min-w-[760px] md:min-w-0 pb-4 relative" ref="tabsContainer">
            <button v-for="(tag, index) in useCases" :key="tag.label"
              :ref="el => { if (el) tabRefs[index] = el }"
              @click="setTab(tag, index)"
              class="text-sm font-bold tracking-wide transition-all duration-300 px-3 py-2 flex items-center gap-2 rounded-xl focus:outline-none bg-transparent border-none outline-none cursor-pointer"
              :class="activeTag.label === tag.label ? 'text-orange-400' : 'text-neutral-400 hover:text-neutral-200'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" :d="tag.svgPath" />
              </svg>
              <span>{{ tag.label }}</span>
            </button>
            <div class="absolute bottom-0 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ease-out shadow-[0_0_10px_#f97316]"
              :style="{ left: `${underlineStyle.left}px`, width: `${underlineStyle.width}px` }">
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="w-full max-w-6xl px-4 sm:px-6 py-32">
        <div class="text-center mb-16">
          <span class="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Pack Details</span>
          <h2 class="text-3xl md:text-5xl font-extrabold mt-4 text-white tracking-tight">
            Everything You Need For <br />
            <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">Get Cinematic Results</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div class="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-xl mb-6 border border-white/10">⚡</div>
              <h3 class="text-xl font-bold mb-4 text-white">STARFORCE LUTS Collection</h3>
              <div class="space-y-4 text-sm font-light leading-relaxed text-neutral-400">
                <div>
                  <span class="text-white font-semibold">Kodak VISION3 Looks</span>
                  <p class="text-xs text-neutral-500 mt-1">Real film-inspired looks designed specifically for iPhone. Clean skin tones, rich contrast, and cinematic depth.</p>
                </div>
                <div class="border-t border-white/5 pt-3">
                  <span class="text-neutral-200 font-semibold">Exposure Variations</span>
                  <p class="text-xs text-neutral-500 mt-1">Different exposure versions help your footage look great in bright sunlight or low light conditions.</p>
                </div>
                <div class="border-t border-white/5 pt-3">
                  <span class="text-neutral-200 font-semibold">Commercial Saturation</span>
                  <p class="text-xs text-neutral-500 mt-1">Extra saturation options for creators who want bolder, commercial-style colors.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-xl mb-6 border border-white/10">📖</div>
              <h3 class="text-xl font-bold mb-4 text-white">PDF Installation Guide</h3>
              <p class="text-neutral-300 text-sm font-medium mb-3">Simple step-by-step instructions.</p>
              <div class="text-neutral-400 text-sm font-light space-y-2 leading-relaxed">
                <p>A beginner-friendly guide showing you exactly how to install and use the pack directly on your mobile device.</p>
                <ul class="text-xs text-neutral-500 space-y-2 pl-4 list-disc border-t border-white/5 pt-3 mt-3">
                  <li><span class="text-neutral-300 font-medium">Quick Setup:</span> Download and install in minutes.</li>
                  <li><span class="text-neutral-300 font-medium">Best Camera Settings:</span> Recommendations for clean footage.</li>
                  <li><span class="text-neutral-300 font-medium">App Tutorials:</span> Easy guides for CapCut, VN, and more.</li>
                </ul>
              </div>
            </div>
            <div class="mt-6 text-xs font-mono text-neutral-500 uppercase pt-4 border-t border-white/5">Starforce_Manual_v1.pdf</div>
          </div>
        </div>

        <div class="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-lg">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div class="max-w-xl">
              <div class="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-xl mb-6 border border-white/10">🎥</div>
              <h3 class="text-xl font-bold mb-2 text-white">Full Video Tutorial</h3>
              <p class="text-neutral-400 text-sm font-light leading-relaxed">
                Full video walkthrough showing how to install and use the STARFORCE LUTS pack in apps like CapCut, VN, Blackmagic Camera, DaVinci Resolve, and Premiere Pro.
              </p>
            </div>
            <div class="liquid-glass border border-white/20 px-5 py-3 rounded-xl text-xs text-orange-400 font-mono shrink-0 font-bold">
              iPhone_Masterclass.mp4
            </div>
          </div>
        </div>
      </section>

      <section id="compatibility" class="w-full max-w-6xl px-4 sm:px-6 py-32 text-center">
        <div class="mb-16">
          <h2 class="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Works With <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">Almost Every App</span>
          </h2>
          <p class="text-neutral-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Compatible with CapCut, VN, DaVinci Resolve, Premiere Pro, Final Cut Pro, Blackmagic Camera, and many more.
          </p>
        </div>
        
        <div class="py-4 overflow-hidden relative w-full">
          <div class="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#020205] to-transparent z-10 pointer-events-none"></div>
          <div class="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#020205] to-transparent z-10 pointer-events-none"></div>
          
          <div class="whitespace-nowrap inline-flex gap-4 items-center animate-marquee">
            <div v-for="app in activeApps" :key="app.name" 
              class="px-6 py-3 rounded-full border border-neutral-800/60 bg-neutral-900/30 text-sm md:text-base font-bold shadow-md select-none">
              <span class="bg-clip-text text-transparent bg-gradient-to-r font-mono" :class="app.gradientClass">
                {{ app.name }}
              </span>
            </div>
            <div v-for="app in activeApps" :key="app.name + '_loop'" 
              class="px-6 py-3 rounded-full border border-neutral-800/60 bg-neutral-900/30 text-sm md:text-base font-bold shadow-md select-none">
              <span class="bg-clip-text text-transparent bg-gradient-to-r font-mono" :class="app.gradientClass">
                {{ app.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" class="w-full max-w-6xl px-4 sm:px-6 py-32 overflow-hidden">
        <div class="text-center mb-16">
          <span class="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Reviews</span>
          <h2 class="text-3xl md:text-5xl font-extrabold mt-4 text-white tracking-tight">
            What Creators <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">Are Saying</span>
          </h2>
        </div>

        <div class="w-full relative px-1">
          <div class="w-full overflow-hidden">
            <div 
              class="flex transition-transform duration-700 ease-in-out gap-6"
              :style="{ transform: `translateX(-${currentReviewSlide * 100}%)` }"
            >
              <div 
                v-for="(group, gIndex) in groupedReviews" 
                :key="gIndex" 
                class="w-full shrink-0 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <div 
                  v-for="review in group" 
                  :key="review.name" 
                  class="liquid-glass rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between gap-6 transition-all duration-300 hover:border-white/20"
                >
                  <div class="space-y-3">
                    <div class="flex gap-1 text-orange-400 text-xs tracking-wider select-none">
                      <span v-for="star in 5" :key="star">★</span>
                    </div>
                    <p class="text-neutral-300 text-sm font-light leading-relaxed">
                      "{{ review.text }}"
                    </p>
                  </div>

                  <div class="flex items-center gap-3 border-t border-white/5 pt-4">
                    <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover border border-white/20 select-none pointer-events-none" />
                    <div class="flex flex-col min-w-0">
                      <span class="text-white text-sm font-bold truncate">{{ review.name }}</span>
                      <span class="text-neutral-500 text-xs font-mono truncate">{{ review.username }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="flex justify-center items-center gap-2.5 mt-10 select-none">
            <button 
              v-for="(_, index) in groupedReviews" 
              :key="index"
              @click="currentReviewSlide = index"
              class="w-2.5 h-2.5 rounded-full transition-all duration-300 border-none outline-none focus:outline-none cursor-pointer"
              :class="currentReviewSlide === index ? 'bg-orange-500 w-7 shadow-[0_0_8px_#f97316]' : 'bg-white/20 hover:bg-white/40'"
            ></button>
          </div>
        </div>
      </section>

      <section id="faq" class="w-full max-w-3xl px-4 sm:px-6 py-32">
        <div class="text-center mb-16">
          <span class="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Questions</span>
          <h2 class="text-3xl md:text-5xl font-extrabold mt-4 text-white tracking-tight">
            Frequently Asked <span class="bg-gradient-to-r from-orange-400 via-amber-200 to-amber-400 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        <div class="space-y-4 mb-16">
          <div v-for="(item, index) in faqs" :key="index" class="border border-white/10 rounded-2xl liquid-glass overflow-hidden shadow-md">
            <button @click="toggleFaq(index)" class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors duration-300 gap-4 focus:outline-none cursor-pointer">
              <span class="text-base sm:text-lg font-bold text-neutral-100 leading-snug">{{ item.q }}</span>
              <span class="text-neutral-400 font-mono text-sm font-bold transition-transform duration-300 shrink-0" :class="{ 'rotate-180 text-orange-400': openFaq === index }">↓</span>
            </button>
            
            <transition 
              @before-enter="beforeEnter" 
              @enter="enter" 
              @before-leave="beforeLeave" 
              @leave="leave">
              <div v-show="openFaq === index" class="border-t border-white/5 overflow-hidden transition-all duration-300 ease-out">
                <div class="px-6 pb-6 pt-4 text-sm text-neutral-400 font-light leading-relaxed whitespace-pre-line">
                  {{ item.a }}
                </div>
              </div>
            </transition>
          </div>
        </div>

        <div class="w-full rounded-3xl p-6 sm:p-8 border border-white/5 bg-white/[0.01] backdrop-blur-md text-left space-y-4">
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 select-none">Disclaimer</h4>
          <div class="text-xs sm:text-sm text-neutral-400 font-light space-y-3 leading-relaxed">
            <p>It is important to understand that these LUTs are not a one-click solution. Simply applying the LUT is not enough — adjustments may be required depending on the specific lighting conditions, camera settings, and type of footage used.</p>
            <p>To achieve the best possible results, we strongly recommend carefully following the provided instructions and using the LUTs properly within your editing workflow.</p>
            <p>The final look depends not only on the quality of the LUT itself, but also on how it is applied and adjusted during the color grading process.</p>
          </div>
        </div>
      </section>

      <section class="w-full max-w-6xl px-4 sm:px-6 py-32 text-center flex flex-col items-center">
        <h2 class="text-4xl sm:text-6xl font-black tracking-tight mb-2 text-white">
          STARFORCE LUTS
        </h2>
        <p class="text-neutral-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-10">Instant Access • Future Updates Included</p>
        
        <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="liquid-lens-btn text-white font-extrabold text-sm px-16 py-5 rounded-2xl transition-all duration-300 tracking-widest uppercase focus:outline-none cursor-pointer disabled:opacity-50">
          {{ isCheckoutLoading ? 'PROCESSING...' : `BUY NOW — ${selectedCurrency.symbol}${Math.round(25 * selectedCurrency.rate)} ${selectedCurrency.code}` }}
        </button>
      </section>

      <footer class="w-full liquid-glass border-t border-white/10 text-neutral-400 text-xs sm:text-sm py-16 px-4 sm:px-8 backdrop-blur-2xl flex flex-col items-center">
        <div class="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
          <div>
            <h5 class="text-white font-bold mb-4 uppercase text-[11px] font-mono tracking-wider">Support</h5>
            <p class="hover:text-white transition duration-300 cursor-pointer mb-1">support@starforceluts.com</p>
            <p class="text-neutral-500">Toronto, ON, Canada</p>
          </div>
          <div>
            <h5 class="text-white font-bold mb-4 uppercase text-[11px] font-mono tracking-wider">Links</h5>
            <ul class="space-y-2">
              <li><button @click="scrollToVirtualSection(1350)" class="hover:text-white transition duration-300 bg-transparent border-none p-0 cursor-pointer text-left">STARFORCE Pack</button></li>
              <li><button @click="scrollToVirtualSection(1350)" class="hover:text-white transition duration-300 bg-transparent border-none p-0 cursor-pointer text-left">Installation</button></li>
            </ul>
          </div>
          <div>
            <h5 class="text-white font-bold mb-4 uppercase text-[11px] font-mono tracking-wider">Social</h5>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white transition duration-300">YouTube</a></li>
              <li><a href="#" class="hover:text-white transition duration-300">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h5 class="text-white font-bold mb-4 uppercase text-[11px] font-mono tracking-wider">Legal</h5>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div class="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4 text-[11px] text-neutral-500">
          <p>© 2026 STARFORCE LUTS. All rights reserved.</p>
          <p class="font-mono tracking-widest font-bold">DESIGN BY GENE PEREZ</p>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

// Loading state for the Shopify Checkout action
const isCheckoutLoading = ref(false);

// 12 Testimonial reviews data
const reviews = ref([
  { name: 'Marcus Vance', username: '@marcus.films', text: 'Honestly, I was skeptical about using LUTs on iPhone footage, but these completely transformed my Apple Log clips. The highlights look incredibly rolled off.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Elena Rostova', username: 'youtube/elenavlogs', text: 'The commercial saturation variant is my absolute favorite. It gives my travel vlogs that glossy, high-end commercial aesthetic without flattening skin tones.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Devon Takahashi', username: '@devon.tk', text: 'Perfect exposure compensation layers. Setting up inside CapCut mobile took less than two minutes thanks to the clear step-by-step PDF manual.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Sarah Jenkins', username: '@sarah_j_prod', text: 'Incredible depth in the midtones! This LUT collection saved me hours of post-processing color grading on my recent commercial project.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Chris Evans', username: 'vimeo/chrisevans', text: 'Clean professional skin tones even in complex, mixed low-light conditions. These are now permanently mapped into my iPhone film workflow.', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Amara Okafor', username: '@amara.create', text: 'Breathtaking colors. Gives that unique cinematic texture straight to mobile devices without requiring heavy desktop gear.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Liam Gallagher', username: '@liam_vids', text: 'The vision3 simulation is exceptionally precise. It matches amazingly well with my main mirrorless camera setups as a secondary B-cam lut.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Chantal Dubois', username: '@chantal.dubois', text: 'An absolute masterpiece of color science for mobile devices. The installation was seamless, and the look is instantly premium.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Kenji Sato', username: '@kenji.cinematic', text: 'Incredible highlight recovery algorithms hidden in these cube curves. Best investment for documentary mobile creators this year.', avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Sofia Martinez', username: '@sofia.stories', text: 'They add an organic lifestyle look that perfectly mimics modern cinematic commercials. My clients are thrilled with the swift results!', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Alex Mercer', username: '@mercer.media', text: 'The density and shadow tones are beautiful. Highly recommend the vision3 pack for anyone shooting in Apple Log.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Taylor Reed', username: '@taylor_cuts', text: 'Amazing value. The video masterclass cleared up all my mobile workflow doubts instantly. 5 stars all the way!', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80' }
]);

// Carousel group calculations
const currentReviewSlide = ref(0);
const groupedReviews = computed(() => {
  const groups = [];
  for (let i = 0; i < reviews.value.length; i += 3) {
    groups.push(reviews.value.slice(i, i + 3));
  }
  return groups;
});

let reviewInterval = null;
const startReviewCarousel = () => {
  reviewInterval = setInterval(() => {
    if (currentReviewSlide.value < groupedReviews.value.length - 1) {
      currentReviewSlide.value++;
    } else {
      currentReviewSlide.value = 0;
    }
  }, 5000);
};

const useCases = ref([
  { label: 'Aesthetic Vlog', filePrefix: 'aesthetic', svgPath: 'M18 8h1a4 4 0 010 8h-1M2 8h14v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 2v2M10 2v2M14 2v2' },
  { label: 'Travel Vlog', filePrefix: 'travel', svgPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7' },
  { label: 'Gym & Fitness', filePrefix: 'gym', svgPath: 'M6.5 12h11M3 9v6m18-6v6M6 7a2 2 0 012 2v6a2 2 0 01-2 2M18 7a2 2 0 012 2v6a2 2 0 01-2 2' },
  { label: 'Talking Head', filePrefix: 'talking', svgPath: 'M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z' },
  { label: 'Action Shots', filePrefix: 'action', svgPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Family Archives', filePrefix: 'family', svgPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 01-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }
]);

const activeApps = ref([
  { name: 'Davinci Resolve', gradientClass: 'from-[#ff5a19] via-[#00c853] to-[#00b0ff]' },
  { name: 'Premiere Pro', gradientClass: 'from-[#2c133a] via-[#912ba3] to-[#da3bc8]' },
  { name: 'Final Cut Pro', gradientClass: 'from-[#ffdb00] via-[#ff3b30] to-[#e019b1]' },
  { name: 'CapCut', gradientClass: 'from-[#ffffff] to-[#9e9e9e]' }, 
  { name: 'Blackmagic Cam', gradientClass: 'from-[#0d47a1] via-[#1976d2] to-[#42a5f5]' },
  { name: 'VN App', gradientClass: 'from-[#ffffff] to-[#9e9e9e]' },
  { name: '+ Many More', gradientClass: 'from-orange-400 via-amber-300 to-amber-500' }
]);

const activeTag = ref(useCases.value[0]);
const tabRefs = ref([]);
const tabsContainer = ref(null);
const underlineStyle = ref({ left: 0, width: 0 });

const updateUnderline = () => {
  const currentIndex = useCases.value.findIndex(t => t.label === activeTag.value.label);
  const currentTabEl = tabRefs.value[currentIndex];
  if (currentTabEl && tabsContainer.value) {
    underlineStyle.value = { left: currentTabEl.offsetLeft, width: currentTabEl.offsetWidth };
  }
};

const setTab = (tag, index) => {
  activeTag.value = tag;
  updateUnderline();
};

const sliderPos = ref(50);
const sliderContainer = ref(null);
const handleDrag = (e) => {
  if (!sliderContainer.value) return;
  const rect = sliderContainer.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  sliderPos.value = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
};

const beforeEnter = (el) => { el.style.height = '0'; el.style.opacity = '0'; };
const enter = (el) => { el.style.height = el.scrollHeight + 'px'; el.style.opacity = '1'; };
const beforeLeave = (el) => { el.style.height = el.scrollHeight + 'px'; el.style.opacity = '1'; };
const leave = (el) => { el.offsetHeight; el.style.height = '0'; el.style.opacity = '0'; };

const openFaq = ref(null);
const toggleFaq = (index) => { openFaq.value = openFaq.value === index ? null : index; };

// ПОЛНЫЙ ОРИГИНАЛЬНЫЙ СПИСОК ВАЛЮТ
const currencies = ref([
  { id: 'us', code: 'USD', symbol: '$', flag: '🇺🇸', country: 'United States', rate: 1.0 },
  { id: 'ca', code: 'CAD', symbol: '$', flag: '🇨🇦', country: 'Canada', rate: 1.37 },
  { id: 'gb', code: 'GBP', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', rate: 0.79 },
  { id: 'au', code: 'AUD', symbol: '$', flag: '🇦🇺', country: 'Australia', rate: 1.51 },
  { id: 'fr', code: 'EUR', symbol: '€', flag: '🇫🇷', country: 'France', rate: 0.92 },
  { id: 'de', code: 'EUR', symbol: '€', flag: '🇩🇪', country: 'Germany', rate: 0.92 },
  { id: 'it', code: 'EUR', symbol: '€', flag: '🇮🇹', country: 'Italy', rate: 0.92 },
  { id: 'es', code: 'EUR', symbol: '€', flag: '🇪🇸', country: 'Spain', rate: 0.92 },
  { id: 'nl', code: 'EUR', symbol: '€', flag: '🇳🇱', country: 'Netherlands', rate: 0.92 },
  { id: 'at', code: 'EUR', symbol: '€', flag: '🇦🇹', country: 'Austria', rate: 0.92 },
  { id: 'be', code: 'EUR', symbol: '€', flag: '🇧🇪', country: 'Belgium', rate: 0.92 },
  { id: 'bg', code: 'EUR', symbol: '€', flag: '🇧🇬', country: 'Bulgaria', rate: 0.92 },
  { id: 'hr', code: 'EUR', symbol: '€', flag: '🇭🇷', country: 'Croatia', rate: 0.92 },
  { id: 'cy', code: 'EUR', symbol: '€', flag: '🇨🇾', country: 'Cyprus', rate: 0.92 },
  { id: 'cz', code: 'CZK', symbol: 'Kč', flag: '🇨🇿', country: 'Czechia', rate: 22.8 },
  { id: 'dk', code: 'DKK', symbol: 'kr.', flag: '🇩🇰', country: 'Denmark', rate: 6.88 },
  { id: 'ee', code: 'EUR', symbol: '€', flag: '🇪🇪', country: 'Estonia', rate: 0.92 },
  { id: 'fi', code: 'EUR', symbol: '€', flag: '🇫🇮', country: 'Finland', rate: 0.92 },
  { id: 'gr', code: 'EUR', symbol: '€', flag: '🇬🇷', country: 'Greece', rate: 0.92 },
  { id: 'hk', code: 'HKD', symbol: '$', flag: '🇭🇰', country: 'Hong Kong SAR', rate: 7.81 },
  { id: 'hu', code: 'HUF', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary', rate: 358.5 },
  { id: 'ie', code: 'EUR', symbol: '€', flag: '🇮🇪', country: 'Ireland', rate: 0.92 },
  { id: 'il', code: 'ILS', symbol: '₪', flag: '🇮🇱', country: 'Israel', rate: 3.72 },
  { id: 'jp', code: 'JPY', symbol: '¥', flag: '🇯🇵', country: 'Japan', rate: 156.2 },
  { id: 'lv', code: 'EUR', symbol: '€', flag: '🇱🇻', country: 'Latvia', rate: 0.92 },
  { id: 'lt', code: 'EUR', symbol: '€', flag: '🇱🇹', country: 'Lithuania', rate: 0.92 },
  { id: 'lu', code: 'EUR', symbol: '€', flag: '🇱🇺', country: 'Luxembourg', rate: 0.92 },
  { id: 'my', code: 'MYR', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia', rate: 4.68 },
  { id: 'mt', code: 'EUR', symbol: '€', flag: '🇲🇹', country: 'Malta', rate: 0.92 },
  { id: 'nz', code: 'NZD', symbol: '$', flag: '🇳🇿', country: 'New Zealand', rate: 1.63 },
  { id: 'no', code: 'EUR', symbol: '€', flag: '🇳🇴', country: 'Norway', rate: 0.92 },
  { id: 'pl', code: 'PLN', symbol: 'zł', flag: '🇵🇱', country: 'Poland', rate: 3.95 },
  { id: 'pt', code: 'EUR', symbol: '€', flag: '🇵🇹', country: 'Portugal', rate: 0.92 },
  { id: 'ro', code: 'RON', symbol: 'Lei', flag: '🇷🇴', country: 'Romania', rate: 4.58 },
  { id: 'sg', code: 'SGD', symbol: '$', flag: '🇸🇬', country: 'Singapore', rate: 1.34 },
  { id: 'sk', code: 'EUR', symbol: '€', flag: '🇸🇰', country: 'Slovakia', rate: 0.92 },
  { id: 'si', code: 'EUR', symbol: '€', flag: '🇸🇮', country: 'Slovenia', rate: 0.92 },
  { id: 'kr', code: 'KRW', symbol: '₩', flag: '🇰🇷', country: 'South Korea', rate: 1358.0 },
  { id: 'se', code: 'SEK', symbol: 'kr', flag: '🇸🇪', country: 'Sweden', rate: 10.65 },
  { id: 'ch', code: 'CHF', symbol: 'CHF', flag: '🇨🇭', country: 'Switzerland', rate: 0.91 },
  { id: 'ae', code: 'AED', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates', rate: 3.67 }
]);

const selectedCurrency = ref(currencies.value[0]);
const isCurrencyOpen = ref(false);
const currencyDropdown = ref(null);

const selectCurrency = (currency) => {
  selectedCurrency.value = currency;
  isCurrencyOpen.value = false;
  recalculateMaxScroll();
};

const handleClickOutside = (e) => {
  if (currencyDropdown.value && !currencyDropdown.value.contains(e.target)) {
    isCurrencyOpen.value = false;
  }
};

// АВТООПРЕДЕЛЕНИЕ ЛОКАЦИИ И ИНТЕРНЕТ-КУРСОВ
const fetchLocationAndLiveRates = async () => {
  try {
    // 1. Стучимся за гео-определением страны по IP
    const geoResponse = await fetch('https://ipapi.co/json/');
    let detectedCountryCode = 'us';
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      detectedCountryCode = geoData.country_code ? geoData.country_code.toLowerCase() : 'us';
    }

    // 2. Стягиваем свежие мировые котировки относительно USD
    const rateResponse = await fetch('https://open.er-api.com/v6/latest/USD');
    if (rateResponse.ok) {
      const rateData = await rateResponse.json();
      currencies.value.forEach(currency => {
        if (rateData.rates && rateData.rates[currency.code]) {
          currency.rate = rateData.rates[currency.code];
        }
      });
    }

    // 3. Сопоставляем найденную локацию с нашей базой
    const matchedCurrency = currencies.value.find(c => c.id === detectedCountryCode);
    if (matchedCurrency) {
      selectedCurrency.value = matchedCurrency;
    }
  } catch (error) {
    console.warn('Currency auto-tracker metrics initiated on standard fallbacks.', error);
  }
};

const faqs = ref([
  { q: "How do I download the LUTs after purchase?", a: "Immediately after purchase, you will receive access to download the LUT files, ready to use in any software that supports the .cube format." },
  { q: "What devices work best with these LUTs?", a: "The best results are achieved on iPhones with Apple Log support. However, the LUTs also work with other iPhone models when using the Blackmagic Camera app." },
  { q: "What happens if my download link expires?", a: "We only renew download links within 30 days of the purchase date. If your download link has expired after 30 days, you will need to repurchase the pack." },
  { q: "Do you offer refunds?", a: "Because all products are digital downloads, we cannot issue refunds once the files have been delivered." },
  { q: "What if I accidentally purchase multiple quantities?", a: "If multiple quantities are purchased by mistake, refunds cannot be issued. If you have any questions or concerns regarding your purchase, please contact us through the contact page." }
]);

// --- MOTION PARALLAX DRIVER CONFIG (SSR SAFE) ---
const spaceCanvas = ref(null);
const isolatedContainer = ref(null);
const contentLayer = ref(null);
let animationFrameId = null;

const windowHeight = ref(800);
const targetVirtualScroll = ref(0);
const currentVirtualScroll = ref(0);
const dynamicMaxScroll = ref(4500);

let touchStartY = 0;

const recalculateMaxScroll = () => {
  if (contentLayer.value) {
    dynamicMaxScroll.value = Math.max(1000, contentLayer.value.scrollHeight - windowHeight.value);
  }
};

const handleAutonomousWheel = (e) => {
  targetVirtualScroll.value += e.deltaY;
  targetVirtualScroll.value = Math.max(0, Math.min(dynamicMaxScroll.value, targetVirtualScroll.value));
};

const handleAutonomousTouchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const handleAutonomousTouchMove = (e) => {
  const touchCurrentY = e.touches[0].clientY;
  const touchDeltaY = touchStartY - touchCurrentY;
  touchStartY = touchCurrentY;

  targetVirtualScroll.value += touchDeltaY * 1.4;
  targetVirtualScroll.value = Math.max(0, Math.min(dynamicMaxScroll.value, targetVirtualScroll.value));
};

const scrollToVirtualSection = (val) => {
  targetVirtualScroll.value = Math.min(dynamicMaxScroll.value, val);
};

// --- SHOPIFY HEADLESS DRIVER INTEGRATION ---
let shopifyClient = null;

const loadShopifySDK = () => {
  return new Promise((resolve) => {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = () => resolve();
  });
};

const shopifyCheckout = async () => {
  if (!shopifyClient || isCheckoutLoading.value) return;
  
  try {
    isCheckoutLoading.value = true;
    
    // 1. Your actual Product ID from the original Shopify code
    const rawProductId = '7926413426731';
    
    // The Shopify SDK expects a base64 encoded GID string
    const productIdGid = btoa(`gid://shopify/Product/${rawProductId}`);

    // 2. Fetch the live product directly from your Shopify store
    let product;
    try {
      product = await shopifyClient.product.fetch(productIdGid);
    } catch (e) {
      // Fallback in case the SDK version accepts raw IDs
      product = await shopifyClient.product.fetch(rawProductId);
    }

    if (!product || !product.variants || product.variants.length === 0) {
      alert('Error: Could not load product variants from Shopify. Is the product active?');
      isCheckoutLoading.value = false;
      return;
    }

    // 3. Dynamically grab the correct, active Variant ID
    const activeVariantId = product.variants[0].id;
    
    // 4. Generate the checkout session with the valid variant
    const checkout = await shopifyClient.checkout.create();
    const lineItemsToAdd = [{
      variantId: activeVariantId,
      quantity: 1
    }];
    
    await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
    
    // 5. Break out of the virtual container and redirect
    if (checkout.webUrl) {
      window.top.location.href = checkout.webUrl;
    }
  } catch (error) {
    console.error('Shopify transaction error:', error);
    alert('There was an error connecting to checkout. Check the console for details.');
  } finally {
    isCheckoutLoading.value = false;
  }
};

onMounted(async () => {
  window.addEventListener('click', handleClickOutside);
  windowHeight.value = window.innerHeight;
  
  startReviewCarousel();
  fetchLocationAndLiveRates();

  // Initialize unified headless storefront configuration channel
  await loadShopifySDK();
  if (window.ShopifyBuy) {
    shopifyClient = window.ShopifyBuy.buildClient({
      domain: 'ep4r2x-ny.myshopify.com',
      storefrontAccessToken: '3953c3c71ba0e2ee73bc41117d089209',
    });
  }

  await nextTick();
  updateUnderline();
  recalculateMaxScroll();
  window.addEventListener('resize', updateUnderline);

  const canvas = spaceCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let stars = [];
  const starCount = 140;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    windowHeight.value = window.innerHeight;
    recalculateMaxScroll();
    stars = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.3 + 0.3,
        depth: Math.random() * 0.45 + 0.1,
        baseAlpha: Math.random() * 0.5 + 0.4,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
  };

  const renderStarfield = () => {
    currentVirtualScroll.value += (targetVirtualScroll.value - currentVirtualScroll.value) * 0.08;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.phase += s.twinkleSpeed;
      const alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;

      let y = (s.y - currentVirtualScroll.value * s.depth) % canvas.height;
      if (y < 0) y += canvas.height;

      ctx.beginPath();
      ctx.arc(s.x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, alpha))})`;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(renderStarfield);
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  renderStarfield();

  const accordionObserver = new MutationObserver(recalculateMaxScroll);
  if (contentLayer.value) {
    accordionObserver.observe(contentLayer.value, { childList: true, subtree: true, attributes: true });
  }

  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', updateUnderline);
    window.removeEventListener('resize', resizeCanvas);
    accordionObserver.disconnect();
    if (reviewInterval) clearInterval(reviewInterval);
    cancelAnimationFrame(animationFrameId);
  });
});
</script>

<style scoped>
/* Clear global browser scrolling footprint configuration */
:global(html), :global(body) {
  overflow: hidden !important;
  height: 100% !important;
  scrollbar-width: none !important;
}
:global(html::-webkit-scrollbar), :global(body::-webkit-scrollbar) {
  display: none !important;
}

/* Liquid glass panel layout elements */
.liquid-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 16px 40px rgba(0, 0, 0, 0.5);
}

/* Refractive glass layout buttons */
.liquid-lens-btn {
  background: radial-gradient(120% 100% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 122, 41, 0.03) 50%, rgba(0, 0, 0, 0.2) 100%);
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 16px 32px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.liquid-lens-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 24px rgba(249, 115, 22, 0.15), 0 16px 32px rgba(0, 0, 0, 0.4);
  transform: translateY(-1px);
}

/* Gloss white assets structural configuration */
.liquid-glass-btn-white {
  background: linear-gradient(180deg, #ffffff 0%, #f0f0f5 100%);
  color: #000;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.liquid-glass-btn-white:hover {
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
}

/* Internal linear animations flare configuration */
.liquid-lens-glow {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.01) 30%, rgba(249, 115, 22, 0.1) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: flow 6s linear infinite;
}
@keyframes flow { 0% { background-position: 100% 0%; } 100% { background-position: -100% 0%; } }

/* Marquee infinite scroll track configuration */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 35s linear infinite;
}

.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-4px); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
