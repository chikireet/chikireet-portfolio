<template>
  <div class="bg-[#0A0A0A] text-[#FBFAFC] min-h-screen font-inter selection:bg-[#5A1BD1]/30 overflow-hidden pb-10">
    
    <header :class="['fixed top-[14px] left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 md:gap-8 pl-6 pr-2 py-3 bg-[#050505]/45 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700 opacity-0 transform translate-y-[-10px]', { '!opacity-100 !translate-y-0': isHeaderRevealed }]">
      <div class="text-xl font-medium tracking-tight text-[#FBFAFC] select-none shrink-0 whitespace-nowrap">STAR<span class="font-instrument font-normal italic text-[#FBFAFC]">FORCE</span></div>
      
      <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-[#FBFAFC]">
        <a href="#versatility" class="hover:opacity-80 transition duration-200 whitespace-nowrap">Versatility</a>
        <a href="#features" class="hover:opacity-80 transition duration-200 whitespace-nowrap">Pack Details</a>
        <a href="#compatibility" class="hover:opacity-80 transition duration-200 whitespace-nowrap">Compatibility</a>
        <a href="#reviews" class="hover:opacity-80 transition duration-200 whitespace-nowrap">Reviews</a>
        <a href="#faq" class="hover:opacity-80 transition duration-200 whitespace-nowrap">FAQ</a>
      </nav>

      <div class="flex items-center gap-3 shrink-0">
        <div class="relative inline-block shrink-0" ref="currencyDropdown">
          <button @click.stop="isCurrencyOpen = !isCurrencyOpen" 
            class="bg-white/5 border border-white/10 px-3 py-2 rounded-full flex items-center gap-2 text-xs text-[#FBFAFC] font-medium transition-all duration-200 hover:border-white/30 focus:outline-none cursor-pointer whitespace-nowrap">
            <span class="inline-block scale-110 select-none">{{ selectedCurrency.flag }}</span>
            <span class="font-mono font-bold hidden sm:inline">{{ selectedCurrency.code }}</span>
            <span class="text-[10px] text-[#999999] transition-transform duration-200" :class="{ 'rotate-180 text-[#5A1BD1]': isCurrencyOpen }">↓</span>
          </button>

          <transition name="dropdown-fade">
            <div v-if="isCurrencyOpen" 
              class="absolute right-0 top-[calc(100%+12px)] w-64 rounded-3xl border border-white/10 bg-[#050505]/95 backdrop-blur-xl p-2 shadow-2xl z-50">
              <div class="max-h-64 overflow-y-auto pr-1 space-y-1 scrollbar-hide">
                <button v-for="currency in currencies" :key="currency.id"
                  @click="selectCurrency(currency)"
                  class="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-left text-sm text-[#999999] hover:text-white hover:bg-white/[0.06] transition-all duration-150 group focus:outline-none cursor-pointer"
                  :class="{ 'bg-white/[0.08] text-[#FBFAFC] font-bold border-l-2 border-[#5A1BD1] rounded-l-none': selectedCurrency.id === currency.id }">
                  <div class="flex items-center gap-3 truncate">
                    <span class="text-xl leading-none select-none">{{ currency.flag }}</span>
                    <div class="flex flex-col min-w-0 truncate">
                      <span class="font-mono tracking-wide text-neutral-100 font-bold group-hover:text-white">{{ currency.code }}</span>
                      <span class="text-xs text-neutral-500 truncate group-hover:text-neutral-300 transition-colors">{{ currency.country }}</span>
                    </div>
                  </div>
                  <span class="text-xs font-semibold text-neutral-500 font-mono pl-2 shrink-0 group-hover:text-[#FBFAFC]">{{ currency.symbol }}</span>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="bg-[#5A1BD1] text-[#FBFAFC] px-5 py-2 rounded-full text-xs font-medium hover:bg-[#6b2af0] transition duration-200 disabled:opacity-50 shrink-0 whitespace-nowrap">
          {{ isCheckoutLoading ? 'Wait...' : 'Get Pack' }}
        </button>
      </div>
    </header>

    <section class="pt-48 pb-20 px-4 flex flex-col items-center text-center max-w-[1200px] mx-auto mt-10">
      <div :class="['inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-normal text-[#FBFAFC] mb-8 reveal-init', { 'reveal-active': isPillRevealed }]">
        <span class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></span>
        Cinematic Color Made Simple
      </div>
      
      <h1 class="text-6xl md:text-[110px] font-medium md:leading-[121px] md:tracking-[-5.5px] text-[#FBFAFC] mb-8 overflow-hidden flex flex-col items-center">
        <span :class="['reveal-line reveal-init', { 'reveal-active': isH1Line1Revealed }]">Hollywood Color.</span>
        <span :class="['reveal-line font-instrument font-normal italic md:tracking-normal text-[#FBFAFC] pt-2 reveal-init', { 'reveal-active': isH1Line2Revealed }]">Straight From Your iPhone.</span>
      </h1>
      
      <p :class="['text-xl md:text-[28px] font-medium md:leading-[42px] md:tracking-[-0.6px] text-[#999999] mb-12 max-w-4xl reveal-init', { 'reveal-active': isElementsRevealed }]">
        Turn ordinary iPhone footage into rich cinematic video in seconds. No complicated editing skills needed — just import the LUT, tap once, and get the polished film look.
      </p>
      
      <div :class="['flex flex-col sm:flex-row gap-4 mb-20 reveal-init', { 'reveal-active': isElementsRevealed }]">
        <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="bg-[#5A1BD1] text-[#FBFAFC] px-10 py-4 rounded-full font-medium hover:bg-[#6b2af0] transition shadow-[0_0_30px_rgba(90,27,209,0.4)] disabled:opacity-50 whitespace-nowrap">
          {{ isCheckoutLoading ? 'Opening Checkout...' : `Buy Now — ${selectedCurrency.symbol}${currentPrice} ${selectedCurrency.code}` }}
        </button>
      </div>

      <div v-reveal class="w-full rounded-[48px] bg-[#0D0D0D] p-2 border border-white/5 custom-inner-bevel relative overflow-hidden shadow-2xl">
        <div class="rounded-[40px] overflow-hidden aspect-video relative group z-0">
          <video autoplay muted loop playsinline class="w-full h-full object-cover">
            <source src="https://www.dropbox.com/scl/fi/ke4fvbwkzuc8b40csx6m7/hero-4.mov?rlkey=uqdajhqtuqi4ids1eh0hk2giw&st=m7rgm3sv&raw=1" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>

    <section id="versatility" class="px-4 max-w-[1200px] mx-auto mb-8">
      <div class="bg-[#0D0D0D] rounded-[48px] py-32 px-6 md:px-16 flex flex-col items-center text-center custom-inner-bevel relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A] z-10 pointer-events-none"></div>

        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#999999] mb-8">
            Versatility
          </div>
          
          <h2 class="text-5xl md:text-[70px] font-medium md:leading-[84px] md:tracking-[-3.5px] text-[#FBFAFC] mb-6 flex flex-col items-center overflow-hidden">
            <span v-reveal class="reveal-line">One LUT Pack. <span class="font-instrument font-normal italic md:tracking-normal text-[#FBFAFC]">Any Content.</span></span>
          </h2>
          
          <p v-reveal class="text-lg md:text-[22px] font-medium md:leading-[33px] md:tracking-[-0.4px] text-[#999999] mb-16 max-w-3xl">
            Move the slider to see the difference. Flat iPhone footage instantly becomes deep and cinematic.
          </p>

          <div 
            class="w-full p-2 rounded-3xl bg-[#0A0A0A]/60 border border-white/10 shadow-2xl relative select-none mb-12" 
            @mousemove="handleDrag" 
            @touchmove="handleDrag" 
            ref="sliderContainer"
          >
            <div class="relative rounded-2xl overflow-hidden aspect-[16/10] z-10 bg-[#0A0A0A]">
              <div class="absolute inset-0 z-0">
                <img :src="`/slides/${activeTag.filePrefix}_before.jpg`" class="w-full h-full object-cover pointer-events-none" alt="Before LUT" />
                <span class="absolute bottom-6 left-6 bg-[#050505]/80 backdrop-blur text-xs px-4 py-2 rounded-xl text-neutral-300 border border-white/10 font-mono font-bold">Apple Log</span>
              </div>
              
              <div class="absolute inset-0 z-10" :style="{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }">
                <img :src="`/slides/${activeTag.filePrefix}_after.jpg`" class="w-full h-full object-cover pointer-events-none" alt="After LUT" />
                <span class="absolute bottom-6 right-6 bg-[#5A1BD1]/80 backdrop-blur text-xs px-4 py-2 rounded-xl text-white border border-white/20 font-mono font-bold">SF Kodak 500T</span>
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

          <div class="w-full overflow-x-auto scrollbar-hide border-b border-white/5 relative mb-4">
            <div class="flex items-center justify-center min-w-max md:min-w-0 pb-6 relative px-4 gap-8 md:gap-16 mx-auto" ref="tabsContainer">
              <button v-for="(tag, index) in useCases" :key="tag.label"
                :ref="el => { if (el) tabRefs[index] = el }"
                @click="setTab(tag, index)"
                class="text-base md:text-xl font-bold tracking-tight transition-all duration-300 px-6 py-3.5 flex items-center gap-3 rounded-2xl focus:outline-none bg-transparent border-none outline-none cursor-pointer whitespace-nowrap shrink-0 transform hover:scale-[1.02]"
                :class="activeTag.label === tag.label ? 'text-[#5A1BD1]' : 'text-neutral-400 hover:text-neutral-200'">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="tag.svgPath" />
                </svg>
                <span>{{ tag.label }}</span>
              </button>
              <div class="absolute bottom-0 h-[3px] bg-[#5A1BD1] transition-all duration-300 ease-out rounded-full shadow-[0_-2px_10px_rgba(90,27,209,0.4)]"
                :style="{ left: `${underlineStyle.left}px`, width: `${underlineStyle.width}px` }">
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="features" class="px-4 max-w-[1200px] mx-auto mb-16">
      <div class="bg-[#0D0D0D] rounded-[48px] py-32 px-6 md:px-16 flex flex-col items-center text-center custom-inner-bevel relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A] z-10 pointer-events-none"></div>

        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#999999] mb-8">
            Pack Details
          </div>
          
          <h2 class="text-5xl md:text-[70px] font-medium md:leading-[84px] md:tracking-[-3.5px] text-[#FBFAFC] mb-6 flex flex-col items-center overflow-hidden">
            <span v-reveal class="reveal-line">Everything You Need For</span>
            <span v-reveal class="reveal-line font-instrument font-normal italic text-[#FBFAFC] pt-2">Get Cinematic Results</span>
          </h2>
          
          <p v-reveal class="text-lg md:text-[22px] font-medium md:leading-[33px] md:tracking-[-0.4px] text-[#999999] mb-24 max-w-3xl">
            Designed meticulously to upgrade your mobile cinematography workflow instantly.
          </p>

          <div class="grid md:grid-cols-2 gap-8 w-full text-left mb-8">
            <div v-reveal class="bg-[#0A0A0A]/60 border border-white/5 rounded-3xl p-8 custom-inner-bevel flex flex-col">
              <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl mb-6 border border-white/10">⚡</div>
              <h3 class="text-2xl md:text-[28px] font-medium md:leading-[28px] md:tracking-[-0.6px] text-[#FBFAFC] mb-4">STARFORCE LUTS Collection</h3>
              <div class="space-y-4 text-base font-medium leading-[27px] text-[#999999]">
                <div>
                  <span class="text-[#FBFAFC]">Kodak VISION3 Looks:</span> Real film-inspired looks designed specifically for iPhone. Clean skin tones, rich contrast, and cinematic depth.
                </div>
                <div class="border-t border-white/5 pt-3">
                  <span class="text-[#FBFAFC]">Exposure Variations:</span> Different exposure versions help your footage look great in bright sunlight or low light conditions.
                </div>
                <div class="border-t border-white/5 pt-3">
                  <span class="text-[#FBFAFC]">Commercial Saturation:</span> Extra saturation options for creators who want bolder, commercial-style colors.
                </div>
              </div>
            </div>

            <div v-reveal class="bg-[#0A0A0A]/60 border border-white/5 rounded-3xl p-8 custom-inner-bevel flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl mb-6 border border-white/10">📖</div>
                <h3 class="text-2xl md:text-[28px] font-medium md:leading-[28px] md:tracking-[-0.6px] text-[#FBFAFC] mb-4">PDF Installation Guide</h3>
                <p class="text-base font-medium text-[#FBFAFC] mb-2">Simple step-by-step instructions.</p>
                <div class="text-[#999999] text-base font-medium space-y-2 leading-[27px]">
                  <p>A beginner-friendly guide showing you exactly how to install and use the pack directly on your mobile device.</p>
                  <ul class="text-sm text-neutral-500 space-y-2 pl-4 list-disc border-t border-white/5 pt-3 mt-3">
                    <li><span class="text-neutral-300 font-medium">Quick Setup:</span> Download and install in minutes.</li>
                    <li><span class="text-neutral-300 font-medium">Best Camera Settings:</span> Recommendations for clean footage.</li>
                    <li><span class="text-neutral-300 font-medium">App Tutorials:</span> Easy guides for CapCut, VN, and more.</li>
                  </ul>
                </div>
              </div>
              <div class="mt-6 text-xs font-mono text-neutral-500 uppercase pt-4 border-t border-white/5">Starforce_Manual_v1.pdf</div>
            </div>
          </div>

          <div v-reveal class="w-full bg-[#0A0A0A]/60 border border-white/5 rounded-3xl p-8 custom-inner-bevel text-left">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div class="max-w-xl">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl mb-6 border border-white/10">🎥</div>
                <h3 class="text-2xl md:text-[28px] font-medium text-[#FBFAFC] mb-2 flex flex-wrap items-center gap-3">
                  Full Video Tutorial
                  <span class="text-[10px] sm:text-xs font-mono font-bold bg-[#5A1BD1]/20 text-[#5A1BD1] px-2 py-1 rounded-lg border border-[#5A1BD1]/30 shrink-0">COMING SOON</span>
                </h3>
                <p class="text-[#999999] text-base font-medium leading-[27px]">
                  Full video walkthrough showing how to install and use the STARFORCE LUTS pack in apps like CapCut, VN, Blackmagic Camera, DaVinci Resolve, and Premiere Pro.
                </p>
              </div>
              <div class="bg-white/5 border border-white/10 px-5 py-3 rounded-xl text-xs text-[#FBFAFC] font-mono shrink-0 font-bold opacity-50">
                iPhone_Masterclass.mp4
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="compatibility" class="py-24 px-4 max-w-[1200px] mx-auto flex flex-col items-center text-center">
      <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#999999] mb-8">
        Compatibility
      </div>
      <h2 class="text-5xl md:text-[70px] font-medium md:leading-[84px] md:tracking-[-3.5px] text-[#FBFAFC] mb-6 flex flex-col items-center overflow-hidden">
        <span v-reveal class="reveal-line">Works With <span class="font-instrument font-normal italic md:tracking-normal text-[#FBFAFC]">Almost Every App</span></span>
      </h2>
      <p v-reveal class="text-lg md:text-[22px] font-medium md:leading-[33px] md:tracking-[-0.4px] text-[#999999] mb-16 max-w-4xl">
        Compatible with CapCut, VN, DaVinci Resolve, Premiere Pro, Final Cut Pro, Blackmagic Camera, and many more.
      </p>

      <div class="w-full flex flex-col overflow-hidden relative py-2">
        <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none"></div>

        <div class="marquee-container flex gap-1.5 items-center">
          <div class="marquee-content flex gap-1.5 min-w-full justify-around animate-marquee-left">
            <div v-for="app in activeApps" :key="app.name" class="flex items-center bg-[#0D0D0D] border border-white/5 hover:border-white/10 transition px-7 py-4 rounded-2xl text-lg md:text-[22px] font-medium text-[#FBFAFC] shrink-0 custom-inner-bevel">
              <span class="bg-clip-text text-transparent bg-gradient-to-r font-mono" :class="app.gradientClass">{{ app.name }}</span>
            </div>
          </div>
          <div class="marquee-content flex gap-1.5 min-w-full justify-around animate-marquee-left">
            <div v-for="app in activeApps" :key="app.name + '-loop'" class="flex items-center bg-[#0D0D0D] border border-white/5 hover:border-white/10 transition px-7 py-4 rounded-2xl text-lg md:text-[22px] font-medium text-[#FBFAFC] shrink-0 custom-inner-bevel">
              <span class="bg-clip-text text-transparent bg-gradient-to-r font-mono" :class="app.gradientClass">{{ app.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="reviews" class="px-4 max-w-[1200px] mx-auto mb-16">
      <div class="bg-[#0D0D0D] rounded-[48px] py-32 px-6 md:px-16 flex flex-col items-center text-center custom-inner-bevel relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A] z-10 pointer-events-none"></div>

        <div class="relative z-20 flex flex-col items-center w-full">
          <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#999999] mb-8">
            Reviews
          </div>
          
          <h2 class="text-5xl md:text-[70px] font-medium md:leading-[84px] md:tracking-[-3.5px] text-[#FBFAFC] mb-6 flex flex-col items-center overflow-hidden">
            <span v-reveal class="reveal-line">What Creators <span class="font-instrument font-normal italic md:tracking-normal text-[#FBFAFC]">Are Saying</span></span>
          </h2>
          
          <p v-reveal class="text-lg md:text-[22px] font-medium md:leading-[33px] md:tracking-[-0.4px] text-[#999999] mb-24 max-w-3xl">
            Real feedback from filmmakers, vloggers and content creators transforming mobile footage.
          </p>

          <div class="grid md:grid-cols-3 gap-6 w-full text-left">
            <div v-reveal v-for="(review, index) in reviews.slice(0, 6)" :key="index" 
                 class="bg-[#0A0A0A]/60 border border-white/5 p-6 rounded-3xl custom-inner-bevel flex flex-col justify-between transition hover:border-white/10 duration-300">
              <div>
                <div class="flex gap-0.5 text-orange-400 text-xs mb-4">
                  <span v-for="star in 5" :key="star">★</span>
                </div>
                <p class="text-base font-medium leading-[27px] text-[#FBFAFC]/90 mb-6 font-light">
                  "{{ review.text }}"
                </p>
              </div>
              <div class="flex items-center gap-3 border-t border-white/5 pt-4">
                <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover border border-white/20 select-none pointer-events-none" />
                <div class="flex flex-col min-w-0">
                  <h4 class="text-sm font-bold text-[#FBFAFC] truncate">{{ review.name }}</h4>
                  <p class="text-xs text-neutral-500 font-mono truncate">{{ review.username }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-24 max-w-3xl mx-auto px-4">
      <div class="text-center mb-16">
        <div v-reveal class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-[#999999] mb-8">
          Questions
        </div>
        <h2 class="text-5xl font-medium text-[#FBFAFC] tracking-[-2px] flex flex-col items-center overflow-hidden">
          <span v-reveal class="reveal-line">Frequently Asked <span class="font-instrument font-normal italic text-[#FBFAFC]">Questions</span></span>
        </h2>
      </div>

      <div class="space-y-4 mb-16">
        <div v-reveal v-for="(item, index) in faqs" :key="index" class="rounded-3xl bg-[#0D0D0D] overflow-hidden transition-all duration-300 custom-inner-bevel">
          <button @click="toggleFaq(index)" class="w-full px-6 py-6 text-left flex justify-between items-center font-medium text-[18px] text-[#FBFAFC]">
            {{ item.q }}
            <span class="text-2xl font-light transition-transform duration-300 text-[#999999]" :class="{ 'rotate-180 text-[#5A1BD1]': openFaq === index }">↓</span>
          </button>
          <div v-show="openFaq === index" class="px-6 pb-8 text-[#999999] text-[18px] leading-[27px] font-medium border-t border-white/5 pt-4">
            {{ item.a }}
          </div>
        </div>
      </div>

      <div v-reveal class="w-full rounded-3xl p-6 sm:p-8 bg-[#0D0D0D] border border-white/5 text-left space-y-4 custom-inner-bevel">
        <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-[#5A1BD1] select-none">Disclaimer</h4>
        <div class="text-xs sm:text-sm text-neutral-400 font-light space-y-3 leading-relaxed">
          <p>It is important to understand that these LUTs are not a one-click solution. Simply applying the LUT is not enough — adjustments may be required depending on the specific lighting conditions, camera settings, and type of footage used.</p>
          <p>To achieve the best possible results, we strongly recommend carefully following the provided instructions and using the LUTs properly within your editing workflow.</p>
          <p>The final look depends not only on the quality of the LUT itself, but also on how it is applied and adjusted during the color grading process.</p>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 flex flex-col items-center">
      <div v-reveal class="relative w-full max-w-md bg-[#0D0D0D] rounded-[40px] p-8 md:p-10 overflow-hidden custom-inner-bevel">
        <div class="absolute -right-20 -bottom-20 w-72 h-72 bg-[radial-gradient(circle_at_center,_#5A1BD1_0%,transparent_70%)] opacity-20 z-0 pointer-events-none filter blur-xl"></div>
        
        <div class="relative z-20 flex flex-col">
          <div class="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Instant Download
          </div>
          
          <div class="flex items-end gap-1 mb-8">
            <span class="text-5xl md:text-6xl font-medium text-[#FBFAFC]">{{ selectedCurrency.symbol }}{{ currentPrice }}</span>
            <span class="text-[#999999] mb-2 font-medium">/ {{ selectedCurrency.code }}</span>
          </div>
          <p class="text-[18px] text-[#999999] font-medium mb-10 leading-[27px] tracking-[-0.4px]">One-time payment. Lifetime usage license metrics.</p>
          
          <div class="flex flex-col gap-4 mb-10">
            <button @click.stop.prevent="shopifyCheckout" :disabled="isCheckoutLoading" class="w-full bg-[#5A1BD1] text-[#FBFAFC] py-4 rounded-full font-medium hover:bg-[#6b2af0] transition disabled:opacity-50 whitespace-nowrap">
              {{ isCheckoutLoading ? 'PROCESSING...' : 'BUY NOW' }}
            </button>
          </div>

          <ul class="space-y-5 text-base text-[#999999] font-medium">
            <li v-for="item in pricingFeatures" :key="item.text" class="flex items-center gap-3">
              <span class="text-[#FBFAFC] text-xl shrink-0">✦</span> 
              <span>{{ item.text }}</span>
              <span v-if="item.comingSoon" class="text-[10px] font-mono font-bold bg-[#5A1BD1]/20 text-[#5A1BD1] px-2 py-0.5 rounded-md ml-auto shrink-0 border border-[#5A1BD1]/30">COMING SOON</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="pt-16 pb-4 px-8 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-[#999999]">
      <div class="flex gap-6 mb-4 md:mb-0">
        <a href="#" class="hover:text-[#FBFAFC] transition whitespace-nowrap">About</a>
        <a href="#" class="hover:text-[#FBFAFC] transition whitespace-nowrap">Blog</a>
        <a href="#" class="hover:text-[#FBFAFC] transition whitespace-nowrap">Features</a>
        <a href="#" class="hover:text-[#FBFAFC] transition whitespace-nowrap">Pricing</a>
        <a href="#" class="hover:text-[#FBFAFC] transition whitespace-nowrap">Legal</a>
      </div>
      <div class="whitespace-nowrap">
        Created by <span class="text-[#FBFAFC]">Gene Perez</span>
      </div>
    </footer>

    <transition name="modal-fade">
      <div v-if="showModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4" @mousedown.self="closeModal">
        <div class="absolute inset-0 bg-[#020205]/80 backdrop-blur-md transition-opacity pointer-events-none"></div>

        <div class="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-[32px] p-8 shadow-2xl z-10 transform custom-inner-bevel flex flex-col">
          <button @click="closeModal" class="absolute top-5 right-5 text-neutral-500 hover:text-white transition-colors focus:outline-none cursor-pointer z-20">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div v-if="!isSuccess">
            <span class="text-xs font-mono uppercase tracking-widest text-[#5A1BD1] font-bold mb-3 block">Special Offer</span>
            <h3 class="text-3xl font-medium text-white tracking-tight mb-3">
              GET 10% OFF <br/>
              <span class="font-instrument font-normal italic text-[#FBFAFC]">YOUR PACK</span>
            </h3>
            <p class="text-neutral-400 text-sm mb-6 font-light leading-relaxed">
              Grab your discount code and get practical, on-set coloring techniques sent straight to your inbox!
            </p>

            <form @submit.prevent="submitDiscount" class="space-y-4 relative z-10">
              <div>
                <input v-model="formName" type="text" placeholder="Name" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#5A1BD1]/50 focus:ring-1 focus:ring-[#5A1BD1]/50 outline-none transition-all duration-300 font-light text-sm" />
              </div>
              <div>
                <input v-model="formEmail" type="email" placeholder="Email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-[#5A1BD1]/50 focus:ring-1 focus:ring-[#5A1BD1]/50 outline-none transition-all duration-300 font-light text-sm" />
              </div>

              <div class="pt-2">
                <button type="submit" :disabled="isSubmitting" class="w-full bg-[#5A1BD1] text-[#FBFAFC] font-bold text-sm px-6 py-4 rounded-xl transition-all duration-300 tracking-wide focus:outline-none cursor-pointer disabled:opacity-50">
                  {{ isSubmitting ? 'PROCESSING...' : 'Get my discount' }}
                </button>
              </div>
              <p class="text-xs text-neutral-500 mt-4 text-center font-light">No spam, ever. Unsubscribe anytime.</p>
            </form>
          </div>

          <div v-else class="text-center py-8">
            <div class="w-16 h-16 rounded-full bg-[#5A1BD1]/20 border border-[#5A1BD1]/30 flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">You're on the list!</h3>
            <p class="text-neutral-400 text-sm">Check your email for your 10% discount code.</p>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// ТЕСТОВЫЙ РЕЖИМ: установи в false перед билдом (npm run build)
const FORCE_TEST_MODAL = false; 

const isHeaderRevealed = ref(false)
const isPillRevealed = ref(false)
const isH1Line1Revealed = ref(false)
const isH1Line2Revealed = ref(false)
const isElementsRevealed = ref(false)

const vReveal = {
  mounted: (el) => {
    el.classList.add('reveal-init')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" })
    observer.observe(el)
  }
}

let shopifyClient = null
const isCheckoutLoading = ref(false)

const loadShopifySDK = () => {
  return new Promise((resolve) => {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = () => resolve()
  })
}

const shopifyCheckout = async () => {
  if (!shopifyClient || isCheckoutLoading.value) return
  
  try {
    isCheckoutLoading.value = true
    const rawProductId = '7926413426731'
    const productIdGid = btoa(`gid://shopify/Product/${rawProductId}`)

    let product
    try {
      product = await shopifyClient.product.fetch(productIdGid)
    } catch (e) {
      if (shopifyClient.product && typeof shopifyClient.product.fetch === 'function') {
        product = await shopifyClient.product.fetch(rawProductId)
      }
    }

    if (!product || !product.variants || product.variants.length === 0) {
      isCheckoutLoading.value = false
      return
    }

    const activeVariantId = product.variants[0].id
    const checkout = await shopifyClient.checkout.create()
    await shopifyClient.checkout.addLineItems(checkout.id, [{ variantId: activeVariantId, quantity: 1 }])
    
    if (checkout.webUrl) {
      window.top.location.href = checkout.webUrl
    }
  } catch (error) {
    console.warn('Shopify SDK fallback activated.')
  } finally {
    isCheckoutLoading.value = false
  }
}

const currencies = ref([
  { id: 'us', code: 'USD', symbol: '$', flag: '🇺🇸', country: 'United States', rate: 1.0 },
  { id: 'ca', code: 'CAD', symbol: '$', flag: '🇨🇦', country: 'Canada', rate: 1.37 },
  { id: 'gb', code: 'GBP', symbol: '£', flag: '🇬🇧', country: 'United Kingdom', rate: 0.79 },
  { id: 'au', code: 'AUD', symbol: '$', flag: '🇦🇺', country: 'Australia', rate: 1.51 },
  { id: 'fr', code: 'EUR', symbol: '€', flag: '🇫🇷', country: 'France', rate: 0.92 },
  { id: 'de', code: 'EUR', symbol: '€', flag: '🇩🇪', country: 'Germany', rate: 0.92 },
  { id: 'jp', code: 'JPY', symbol: '¥', flag: '🇯🇵', country: 'Japan', rate: 156.2 },
  { id: 'ae', code: 'AED', symbol: 'د.إ', flag: '🇦🇪', country: 'United Arab Emirates', rate: 3.67 }
])

const selectedCurrency = ref(currencies.value[0])
const isCurrencyOpen = ref(false)
const currencyDropdown = ref(null)
const basePriceCAD = 34

const currentPrice = computed(() => {
  const cadData = currencies.value.find(c => c.code === 'CAD')
  const cadRate = cadData ? cadData.rate : 1.37
  const priceInBaseCurrency = basePriceCAD / cadRate
  return Math.round(priceInBaseCurrency * selectedCurrency.value.rate)
})

const selectCurrency = (currency) => {
  selectedCurrency.value = currency
  isCurrencyOpen.value = false
}

const fetchLocationAndLiveRates = async () => {
  try {
    const geoResponse = await fetch('https://ipapi.co/json/')
    let detectedCountryCode = 'us'
    if (geoResponse.ok) {
      const geoData = await geoResponse.json()
      detectedCountryCode = geoData.country_code ? geoData.country_code.toLowerCase() : 'us'
    }

    const rateResponse = await fetch('https://open.er-api.com/v6/latest/USD')
    if (rateResponse.ok) {
      const rateData = await rateResponse.json()
      currencies.value.forEach(currency => {
        if (rateData.rates && rateData.rates[currency.code]) {
          currency.rate = rateData.rates[currency.code]
        }
      })
    }

    const matchedCurrency = currencies.value.find(c => c.id === detectedCountryCode)
    if (matchedCurrency) selectedCurrency.value = matchedCurrency
  } catch (error) {
    console.warn('Currency tracking metrics defaulted.', error)
  }
}

const useCases = ref([
  { label: 'Fashion', filePrefix: 'aesthetic', svgPath: 'M18 8h1a4 4 0 010 8h-1M2 8h14v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 2v2M10 2v2M14 2v2' },
  { label: 'Travel', filePrefix: 'travel', svgPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7' },
  { label: 'Fitness', filePrefix: 'gym', svgPath: 'M6.5 12h11M3 9v6m18-6v6M6 7a2 2 0 012 2v6a2 2 0 01-2 2M18 7a2 2 0 012 2v6a2 2 0 01-2 2' },
  { label: 'Vlog', filePrefix: 'vlog', svgPath: 'M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z' }
])

const activeTag = ref(useCases.value[0])
const sliderPos = ref(50)
const sliderContainer = ref(null)
const tabRefs = ref([])
const tabsContainer = ref(null)
const underlineStyle = ref({ left: 0, width: 0 })

const updateUnderline = () => {
  const currentIndex = useCases.value.findIndex(t => t.label === activeTag.value.label)
  const currentTabEl = tabRefs.value[currentIndex]
  if (currentTabEl && tabsContainer.value) {
    underlineStyle.value = { left: currentTabEl.offsetLeft, width: currentTabEl.offsetWidth }
  }
}

const setTab = (tag, index) => {
  activeTag.value = tag
  updateUnderline()
}

const handleDrag = (e) => {
  if (!sliderContainer.value) return
  let clientX = e.touches ? e.touches[0].clientX : e.clientX
  const rect = sliderContainer.value.getBoundingClientRect()
  sliderPos.value = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
}

const activeApps = ref([
  { name: 'Davinci Resolve', gradientClass: 'from-[#ff5a19] via-[#00c853] to-[#00b0ff]' },
  { name: 'Premiere Pro', gradientClass: 'from-[#2c133a] via-[#912ba3] to-[#da3bc8]' },
  { name: 'Final Cut Pro', gradientClass: 'from-[#ffdb00] via-[#ff3b30] to-[#e019b1]' },
  { name: 'CapCut', gradientClass: 'from-[#ffffff] to-[#9e9e9e]' }, 
  { name: 'Blackmagic Cam', gradientClass: 'from-[#0d47a1] via-[#1976d2] to-[#42a5f5]' },
  { name: 'VN App', gradientClass: 'from-[#ffffff] to-[#9e9e9e]' },
  { name: '+ Many More', gradientClass: 'from-orange-400 via-amber-300 to-amber-500' }
])

const reviews = ref([
  { 
    name: 'Andrew Daye', 
    username: '@andrewdaye_', 
    text: 'As a performance coach, focusing on the details matters. These LUTs give my videos that exact sharp, high-end commercial aesthetic while keeping human skin tones looking beautifully natural.', 
    avatar: '/avatars/andrewdaye_.jpg' 
  },
  { 
    name: 'Silka', 
    username: '@imsilks', 
    text: 'The midtone depth and color roll-off are absolutely breathtaking. Capturing cinematic, moody city frames right here in Toronto has never been easier — it instantly transforms Apple Log clips.', 
    avatar: '/avatars/imsilks.jpg' 
  },
  { 
    name: 'Esteban Niño Palacio', 
    username: '@eldivinenino', 
    text: 'Beautiful colors that help move away from dry, over-processed digital looks. These presets add a unique texture and organic, film-inspired warmth to my visual content seamlessly.', 
    avatar: '/avatars/eldivinenino.jpg' 
  },
  { 
    name: 'Magnus Grønnebæk', 
    username: '@groennebaek', 
    text: 'Meticulously crafted for cinematic results. The highlight retention and contrast balance feel like actual film stocks, giving mobile footage an elite, tour-documentary level look.', 
    avatar: '/avatars/groennebaek.jpg' 
  },
  { 
    name: 'Victoria', 
    username: '@viktoriaumbra', 
    text: 'I love keeping things raw and authentic, and these LUTs manage to elevate simple, casual moments from my life into rich cinematic memories without making them look fake.', 
    avatar: '/avatars/viktoriaumbra.jpg' 
  },
  { 
    name: 'Ahmed Elmogamer', 
    username: '@frankverander', 
    text: 'As an artist, color science is everything to me. The way the Kodak VISION3 simulations handle highlights and dense shadows is outstanding. A complete game-changer for mobile filmmaking.', 
    avatar: '/avatars/frankverander.jpg' 
  }
])
const pricingFeatures = ref([
  { text: 'STARFORCE LUTS .cube collection', comingSoon: false },
  { text: 'Kodak VISION3 film simulations', comingSoon: false },
  { text: 'Film grain overlays', comingSoon: true },
  { text: 'Commercial saturation options', comingSoon: false },
  { text: 'Full step-by-step installation PDF', comingSoon: false },
  { text: 'iPhone masterclass video tutorial', comingSoon: true },
  { text: 'Lifetime updates included', comingSoon: false }
])

const openFaq = ref(null)
const toggleFaq = (index) => { openFaq.value = openFaq.value === index ? null : index }

const faqs = ref([
  { q: "How do I download the LUTs after purchase?", a: "Immediately after purchase, you will receive access to download the LUT files, ready to use in any software that supports the .cube format." },
  { q: "What devices work best with these LUTs?", a: "The best results are achieved on iPhones with Apple Log support. However, the LUTs also work with other iPhone models when using the Blackmagic Camera app." },
  { q: "What happens if my download link expires?", a: "We only renew download links within 30 days of the purchase date. If your download link has expired after 30 days, you will need to repurchase the pack." },
  { q: "Do you offer refunds?", a: "Because all products are digital downloads, we cannot issue refunds once the files have been delivered." },
  { q: "What if I accidentally purchase multiple quantities?", a: "If multiple quantities are purchased by mistake, refunds cannot be issued. If you have any questions or concerns regarding your purchase, please contact us through the contact page." }
])

const showModal = ref(false)
const formName = ref('')
const formEmail = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const triggerModal = () => {
  const hasSeen = localStorage.getItem('starforce_discount_seen');
  if ((!hasSeen || FORCE_TEST_MODAL) && !showModal.value) {
    showModal.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  localStorage.setItem('starforce_discount_seen', 'true')
}

const submitDiscount = async () => {
  if (!formName.value || !formEmail.value) return
  isSubmitting.value = true

  try {
    const response = await $fetch('/api/subscribe', {
      method: 'POST',
      body: {
        name: formName.value,
        email: formEmail.value,
        listId: 2
      }
    })

    if (response && !response.success) {
      console.error('Ошибка сервера API:', response.error)
    }

    isSuccess.value = true
    localStorage.setItem('starforce_discount_seen', 'true')
    
    setTimeout(() => {
      showModal.value = false
    }, 2000)

  } catch (error) {
    console.error('Network Error during API request:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleClickOutside = (e) => {
  if (currencyDropdown.value && !currencyDropdown.value.contains(e.target)) {
    isCurrencyOpen.value = false
  }
}

const handleMouseLeave = (e) => {
  if (e.clientY <= 20) {
    triggerModal()
  }
}

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const threshold = document.body.offsetHeight * 0.85
  if (scrollPosition >= threshold) {
    triggerModal()
    window.removeEventListener('scroll', handleScroll)
  }
}

onMounted(async () => {
  window.addEventListener('click', handleClickOutside)
  document.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('scroll', handleScroll, { passive: true })

  fetchLocationAndLiveRates()

  setTimeout(() => { isHeaderRevealed.value = true }, 400)      
  setTimeout(() => { isPillRevealed.value = true }, 700)        
  setTimeout(() => { isH1Line1Revealed.value = true }, 1000)    
  setTimeout(() => { isH1Line2Revealed.value = true }, 1300)    
  setTimeout(() => { isElementsRevealed.value = true }, 1600)   

  setTimeout(() => {
    triggerModal()
  }, 15000)

  try {
    await loadShopifySDK()
    if (window.ShopifyBuy) {
      shopifyClient = window.ShopifyBuy.buildClient({
        domain: 'ep4r2x-ny.myshopify.com',
        storefrontAccessToken: '3953c3c71ba0e2ee73bc41117d089209',
      })
    }
  } catch (e) {
    console.warn('Shopify SDK fallback activated.')
  }

  await nextTick()
  updateUnderline()
  window.addEventListener('resize', updateUnderline)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  document.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateUnderline)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

html, body {
  background-color: #0A0A0A !important;
  color: #FBFAFC;
  margin: 0;
  padding: 0;
  overscroll-behavior-y: none;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

.font-instrument {
  font-family: 'Instrument Serif', serif;
}

.custom-inner-bevel {
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.13),
    inset 0 4px 10px -3px rgba(255, 255, 255, 0.03);
}

.reveal-init {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(35px) scale(0.98);
  transition: opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 1100ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-active {
  opacity: 1 !important;
  filter: blur(0px) !important;
  transform: translateY(0px) scale(1) !important;
}

.reveal-line {
  display: inline-block;
  will-change: transform, opacity, filter;
}

.marquee-container {
  display: flex;
  overflow: hidden;
  user-select: none;
}

.marquee-content {
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
}

.animate-marquee-left {
  animation: scroll-left 25s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.2s, transform 0.2s; }
.dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-4px); }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>