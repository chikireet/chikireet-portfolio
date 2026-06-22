<template> 
  <div class="brand-hybrid-shell !bg-[#000000] text-[#f5f5f7] font-sans antialiased min-h-screen selection:bg-[#0071e3] selection:text-white">
    
    <nav :class="['fixed top-0 left-0 w-full z-[9999] bg-[#000000]/70 backdrop-blur-md border-b border-white/10 transition-all duration-1000 ease-out', isLoaded ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 -translate-y-4 blur-md']">
      <div class="max-w-[1024px] mx-auto px-6 h-12 flex items-center justify-between text-[12px] tracking-tight">
        <div @click="refreshPage" class="font-semibold text-[14px] tracking-normal text-white cursor-pointer select-none active:opacity-70 transition">
          Othership Case Study <span class="text-[#8e8e93] font-light">/0027</span>
        </div>
        <div class="hidden md:flex space-x-6 text-[#f5f5f7]/80 font-normal">
          <a href="#strategy" class="hover:text-[#2997ff] transition">The Problem</a>
          <a href="#focus-case" class="hover:text-[#2997ff] transition">Case Study</a>
          <a href="#results" class="hover:text-[#2997ff] transition">The Results</a>
          <a href="#production" class="hover:text-[#2997ff] transition">Production</a>
          <a href="#cta-section" class="hover:text-[#2997ff] transition">Contact</a>
        </div>
        <a href="https://wa.me/14375534826?text=Hi!%20I%20saw%20your%20Othership%20case%20study.%20Let's%20connect%20and%20talk%20about%20a%20potential%20project." 
           target="_blank" 
           class="bg-[#25D366] text-black px-3 py-1 rounded-full text-[12px] font-semibold hover:bg-[#20ba5a] transition shadow-sm tracking-normal flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" viewBox="0 0 510 512.459" fill="currentColor">
            <path d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.903 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"/>
          </svg>
          <span>WhatsApp Me</span>
        </a>
      </div>
    </nav>

    <header class="max-w-[980px] mx-auto px-6 pt-52 pb-24 text-center flex flex-col items-center justify-center">
      <h1 class="text-[48px] sm:text-[64px] md:text-[80px] font-semibold tracking-tighter text-white leading-[1.04] mb-6 text-center">
        <span :class="['block transition-all duration-1000 ease-out delay-[400ms]', isLoaded ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-md translate-y-4']">
          Most Brands Just Post.
        </span>
        <span :class="['block font-instrument font-normal italic text-[#2997ff] transition-all duration-1000 ease-out delay-[1000ms]', isLoaded ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-md translate-y-4']">
          The Best Create Experiences.
        </span>
      </h1>
      <p :class="['text-[21px] md:text-[24px] text-[#8e8e93] max-w-3xl mx-auto font-normal tracking-tight leading-[1.38] text-center transition-all duration-1000 ease-out delay-[1600ms]', isLoaded ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-md translate-y-4']">
        A cinematic content system designed to answer questions, build trust, and make customers feel your experience before they ever walk through your doors.
      </p>
    </header>

    <section id="strategy" class="max-w-[980px] mx-auto px-6 py-12 scroll-mt-16">
      <div v-reveal class="w-full bg-[#1c1c1e] rounded-[28px] border border-white/5 p-8 md:p-14 shadow-2xl text-left cascade-container">
        <h2 class="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight text-white leading-[1.1] mb-6 sub-step-1">
          The Problem.
        </h2>
        <p class="text-[19px] md:text-[21px] text-[#8e8e93] font-normal tracking-tight leading-tight mb-8 sub-step-2">
          We turned the Instagram profile into a complete customer journey — answering questions, removing hesitation, and creating desire before the first visit.
        </p>
        <div class="text-[17px] text-[#8e8e93] font-normal tracking-normal leading-[1.5] space-y-6 sub-step-3">
          <p>When a potential customer discovers your business, they have questions:</p>
          
          <ul class="space-y-3 pl-2 font-scribble text-[24px] md:text-[28px] text-[#2997ff] tracking-wide leading-tight py-1">
            <li class="flex items-start gap-3">
              <span class="text-[12px] mt-2 select-none text-[#2997ff] font-sans">•</span>
              <span>What does this place actually look like?</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[12px] mt-2 select-none text-[#2997ff] font-sans">•</span>
              <span>What should I expect during the experience?</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[12px] mt-2 select-none text-[#2997ff] font-sans">•</span>
              <span>Is this for someone like me?</span>
            </li>
          </ul>
          
          <p>Most businesses expect people to find those answers on their website.</p>
          <p class="text-white font-semibold text-[17px]">I designed a content strategy where the Instagram profile itself answered those questions.</p>
        </div>
      </div>
    </section>

    <section id="portfolio" class="max-w-[980px] mx-auto px-6 pb-24 scroll-mt-16">
      <div v-reveal id="stats-trigger" class="pt-20 pb-16 text-center cascade-container">
        <div :class="['text-[56px] md:text-[80px] font-semibold tracking-tighter text-white flex items-center justify-center gap-1 leading-none sub-step-1', isViewsBounce ? 'animate-bounce-scale' : '']">
          <span>{{ displayedViews }}</span>
          <span class="text-[32px] md:text-[48px] font-light text-[#2997ff] transition-opacity duration-500" :class="isViewsCounterActive ? 'opacity-100' : 'opacity-0'">+</span>
        </div>
        <p class="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#8e8e93] mt-4 sub-step-2">
          Total organic views generated <span class="block md:inline">for the brand</span>
        </p>
      </div>

      <div v-reveal id="grid-trigger" class="w-full bg-[#1c1c1e] rounded-[28px] border border-white/5 p-6 md:p-10 shadow-2xl cascade-container">
        <div class="flex items-center gap-3 border-b border-white/5 pb-6 mb-6 px-2 sub-step-1">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-[2px] shrink-0">
            <div class="w-full h-full rounded-full bg-[#1c1c1e] overflow-hidden flex items-center justify-center">
              <img src="/othership-profile.png" alt="Othership Profile" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="hidden w-full h-full bg-[#1c1c1e] items-center justify-center font-bold text-purple-400 text-[9px]">OTH</div>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <h2 class="text-[17px] font-semibold tracking-tight text-white">othership</h2>
            <svg class="w-4 h-4 text-[#0095f6]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-[2px] sub-step-2">
          <div v-for="(post, index) in instagramPosts" :key="index" 
               :class="['relative aspect-[3/4] overflow-hidden bg-[#2c2c2e] border border-white/5 select-none pointer-events-none transition-all duration-[700ms] cubic-bezier(0.19, 1, 0.22, 1)', revealedPosts.includes(index) ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-[0.92] blur-md']">
            
            <img :src="post.imageUrl" alt="Post thumbnail" class="absolute inset-0 w-full h-full object-cover z-0" />
            <div class="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
              <svg class="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-[11px] font-semibold tracking-tight leading-none">{{ post.views }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="focus-case" class="max-w-[980px] mx-auto px-6 py-12 scroll-mt-16">
      <div v-reveal class="bg-[#1c1c1e] rounded-[28px] border border-white/5 py-14 px-8 md:px-14 shadow-2xl w-full cascade-container">
        <h3 class="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight text-white leading-[1.1] mb-2 sub-step-1">
          The Case Study
        </h3>
        <p class="text-[19px] md:text-[21px] text-[#86868b] font-normal tracking-tight leading-tight sub-step-2">
          How we helped Othership turn their Instagram profile into an immersive customer experience
        </p>
        <div class="font-scribble text-[24px] md:text-[28px] text-[#2997ff] tracking-wide leading-relaxed border-l border-[#2997ff]/30 pl-5 space-y-3 py-1 mt-6 sub-step-3">
          <p>“A few years ago, I partnered with Othership to create a complete cinematic Instagram content system.</p>
          <p>The goal wasn’t to create random viral videos. The goal was to build a library of content that gave a new visitor a complete understanding of the brand.”</p>
        </div>
      </div>

      <div v-reveal class="w-full mt-8 overflow-hidden">
        <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide">
          <div v-for="(pillar, index) in strategyPillars" :key="index" 
               class="bg-[#1c1c1e] rounded-[28px] border border-white/5 py-8 px-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-[85vw] sm:w-[360px] md:w-[460px] shrink-0 snap-center card-reveal-container">
            
            <div class="space-y-4 text-left flex flex-col justify-between h-full">
              <div>
                <div class="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#8e8e83] mb-1 card-step-1">Strategy</div>
                <h4 class="text-[20px] font-semibold tracking-tight text-white leading-tight card-step-2">{{ pillar.title }}</h4>
                <p class="text-[14px] text-[#8e8e93] font-normal tracking-normal leading-[1.4] mt-2 card-step-3">{{ pillar.description }}</p>
              </div>
              <a :href="pillar.reelUrl" target="_blank" class="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#2997ff] uppercase tracking-wider mt-4 self-start bg-[#2997ff]/10 hover:bg-[#2997ff]/20 px-4 py-2 rounded-full transition border border-[#2997ff]/20 card-step-4">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span>Watch</span>
              </a>
            </div>

            <div class="flex justify-center w-full card-step-phone">
              <div class="w-[130px] md:w-[150px] aspect-[9/16] border border-white/10 rounded-[32px] p-1.5 relative shadow-xl bg-[#2c2c2e] flex items-center justify-center shrink-0">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#1c1c1e] rounded-full z-30 flex items-center justify-center border border-white/5">
                  <div class="w-4 h-0.5 bg-[#3a3a3c] rounded-full"></div>
                </div>
                <div class="w-full h-full rounded-[26px] overflow-hidden bg-black relative border border-white/5 z-10 shadow-inner">
                  <video autoplay loop muted playsinline class="w-full h-full object-cover">
                    <source :src="pillar.video" type="video/mp4">
                  </video>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="flex items-center justify-center gap-2 mt-1 text-[12px] font-medium tracking-normal text-[#2997ff]/80 uppercase select-none">
          <span class="md:hidden flex items-center gap-1.5">
            Swipe to see strategies
            <svg class="w-3.5 h-3.5 animate-bounce-horizontal-reverse" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
          <span class="hidden md:flex items-center gap-1.5 text-[#8e8e93] normal-case font-normal text-[13px]">
            <span class="bg-[#1c1c1e] px-2 py-0.5 rounded text-[11px] font-semibold text-gray-300 border border-white/10 shadow-md">Shift</span> 
            + Scroll horizontally to explore metrics matrix
          </span>
        </div>
      </div>
    </section>

    <section id="results" class="max-w-[980px] mx-auto px-6 py-12 scroll-mt-16">
      <div v-reveal id="results-trigger" class="w-full bg-[#1c1c1e] rounded-[28px] border border-white/5 p-8 md:p-14 shadow-2xl text-left cascade-container">
        <h2 class="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight text-white leading-[1.1] mb-4 sub-step-1">
          Results
        </h2>
        <p class="text-[19px] md:text-[21px] text-[#8e8e93] font-normal tracking-tight leading-tight mb-10 flex flex-wrap items-baseline gap-1.5 sub-step-2">
          <span :class="['font-semibold text-white', isResultsBounce ? 'animate-bounce-scale' : '']">
            {{ displayedResultsViews }}
          </span>
          <span>Organic Views. Zero Paid Ads.</span>
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mt-8 sub-step-3">
          <div class="bg-[#2c2c2e] rounded-2xl p-6 flex flex-col justify-between border border-white/5">
            <div>
              <p class="text-[11px] uppercase tracking-[0.04em] font-semibold text-[#8e8e93] mb-2">Featured Video</p>
              <h4 class="text-[20px] font-semibold tracking-tight text-white mb-1">POV Experience</h4>
              <p :class="['text-[32px] font-semibold tracking-tight text-[#2997ff] mt-4 flex items-baseline gap-1', isResultsBounce ? 'animate-bounce-scale' : '']">
                <span>{{ animatedPovViews }}K</span> 
                <span class="text-[14px] font-normal text-[#8e8e93] transition-opacity duration-500" :class="isResultsActive ? 'opacity-100' : 'opacity-0'">views</span>
              </p>
            </div>
            <div class="border-t border-white/10 pt-4 mt-6 text-[12px] font-medium text-[#8e8e93]">
              <span class="text-white/90">108 comments</span>
            </div>
          </div>

          <div class="bg-[#2c2c2e] rounded-2xl p-6 flex flex-col justify-between border border-white/5">
            <div>
              <p class="text-[11px] uppercase tracking-[0.04em] font-semibold text-[#8e8e93] mb-2">Featured Campaign</p>
              <h4 class="text-[20px] font-semibold tracking-tight text-white mb-1">Black Friday</h4>
              <p :class="['text-[32px] font-semibold tracking-tight text-[#2997ff] mt-4 flex items-baseline gap-1', isResultsBounce ? 'animate-bounce-scale' : '']">
                <span>{{ animatedBfViews }}K</span> 
                <span class="text-[14px] font-normal text-[#8e8e93] transition-opacity duration-500" :class="isResultsActive ? 'opacity-100' : 'opacity-0'">views</span>
              </p>
            </div>
            <div class="border-t border-white/10 pt-4 mt-6 text-[12px] font-medium text-[#8e8e93]">
              <span class="text-white/90">33 comments</span>
            </div>
          </div>

          <div class="bg-[#2c2c2e] rounded-2xl p-6 flex flex-col justify-between border border-white/5">
            <div>
              <p class="text-[11px] uppercase tracking-[0.04em] font-semibold text-[#8e8e93] mb-2">Core Distribution</p>
              <h4 class="text-[20px] font-semibold tracking-tight text-white mb-1">Educational & Proof</h4>
              <p class="text-[24px] font-semibold tracking-tight text-[#2997ff] mt-5">17K–110K <span class="text-[14px] font-normal text-[#8e8e93]">views each</span></p>
            </div>
            <div class="border-t border-white/10 pt-4 mt-6 text-[12px] font-medium text-[#8e8e93]">
              <span class="text-white/90">Multiple assets matrix</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="production" class="max-w-[980px] mx-auto px-6 py-12 text-left scroll-mt-16">
      <div v-reveal class="w-full bg-[#1c1c1e] rounded-[28px] border border-white/5 shadow-2xl flex flex-col justify-between overflow-hidden cascade-container">
        <div class="p-8 md:p-14 space-y-6">
          <h2 class="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight text-white leading-[1.1] mb-2 sub-step-1">
            Behind the Production
          </h2>
          <p class="text-[19px] md:text-[21px] text-[#8e8e93] font-normal tracking-tight leading-tight sub-step-2">
            A full-service production from concept to final delivery
          </p>
          <div class="text-[17px] text-[#f5f5f7] font-normal tracking-normal space-y-4 sub-step-3">
            <p class="text-[#8e8e93]">Every piece was developed and produced by me:</p>
            <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 font-scribble text-[24px] text-[#2997ff] tracking-wide leading-none py-1">
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Creative strategy</span></li>
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Concept design</span></li>
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Directing</span></li>
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Cinematography</span></li>
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Editing</span></li>
              <li class="flex items-center gap-3"><svg class="w-[18px] h-[18px] text-[#2997ff]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Final delivery</span></li>
            </ul>
          </div>
        </div>
        <div class="w-full aspect-video bg-[#1c1c1e] border-t border-white/5 overflow-hidden relative sub-step-4">
          <video autoplay loop muted playsinline class="w-full h-full object-cover opacity-90">
            <source src="https://www.dropbox.com/scl/fi/ofv8mdqkcuyrwjbk47d2e/bts.mp4?rlkey=j027zat71sau6fs4k4f0snb2z&st=y1u2xdsx&raw=1" type="video/mp4">
          </video>
        </div>
      </div>
    </section>

    <section id="for-businesses" class="w-full pt-20 pb-12 text-left overflow-hidden flex flex-col items-center">
      <div v-reveal class="max-w-[980px] w-full px-6 mb-8 cascade-container">
        <h2 class="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight text-white leading-[1.1] mb-3 sub-step-1">
          For businesses like yours
        </h2>
        <p class="text-[19px] md:text-[21px] text-[#8e8e93] font-normal tracking-tight leading-tight max-w-2xl sub-step-2">
          This system works especially well for experience-based businesses:
        </p>
      </div>

      <div v-reveal class="max-w-[1240px] w-full relative py-2 select-none mask-gradient overflow-hidden flex mb-14 cascade-container">
        <div class="w-max flex shrink-0 gap-4 items-center animate-marquee pr-4 sub-step-3">
          <span v-for="(type, idx) in businessTypes" :key="'m1-' + idx" 
                class="bg-[#1c1c1e] text-[16px] md:text-[17px] font-semibold tracking-tight text-[#f5f5f7] border border-white/5 rounded-full px-6 py-3 shadow-md whitespace-nowrap">
            {{ type }}
          </span>
        </div>
        <div class="w-max flex shrink-0 gap-4 items-center animate-marquee pr-4 sub-step-3" aria-hidden="true">
          <span v-for="(type, idx) in businessTypes" :key="'m2-' + idx" 
                class="bg-[#1c1c1e] text-[16px] md:text-[17px] font-semibold tracking-tight text-[#f5f5f7] border border-white/5 rounded-full px-6 py-3 shadow-md whitespace-nowrap">
            {{ type }}
          </span>
        </div>
      </div>

      <div id="cta-section" class="max-w-[980px] w-full px-6 mx-auto scroll-mt-24">
        <div v-reveal class="w-full bg-[#1c1c1e] rounded-[28px] border border-white/5 p-8 md:p-14 shadow-2xl text-left flex flex-col md:flex-row gap-10 items-stretch cascade-container">
          <div class="w-full md:w-3/5 text-left space-y-6 flex flex-col justify-between">
            <div class="text-[19px] md:text-[21px] text-[#8e8e93] font-normal tracking-tight leading-[1.4] space-y-6">
              <h3 class="text-[28px] md:text-[36px] font-semibold tracking-tight text-white leading-[1.15] sub-step-1">
                Your customers are already researching you online.
              </h3>
              <p class="text-[12px] uppercase tracking-[0.08em] font-semibold text-white !mt-8 sub-step-2">The question is:</p>
              <p class="font-scribble text-[28px] md:text-[38px] text-[#2997ff] tracking-wide leading-[1.2] py-1 sub-step-3">
                Let’s build the content your future customers need to see before they say yes.
              </p>
            </div>

            <div class="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sub-step-4">
              <a href="https://wa.me/14375534826?text=Hi!%20I%20saw%20your%20Othership%20case%20study.%20Let's%20connect%20and%20talk%20about%20a%20potential%20project." 
                 target="_blank" 
                 class="inline-flex items-center justify-center gap-2 bg-[#25D366] text-black font-semibold text-[15px] px-6 py-3 rounded-full hover:bg-[#20ba5a] transition shadow-sm text-center">
                <span>Chat on WhatsApp</span>
              </a>

              <a href="https://ig.me/m/chikireet" 
                 target="_blank" 
                 class="inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-semibold text-[15px] px-6 py-3 rounded-full hover:brightness-110 transition shadow-sm text-center">
                <span>Message on Instagram</span>
              </a>
            </div>

            <div class="pt-2 flex items-center gap-5 text-[13px] font-semibold tracking-normal text-[#2997ff] select-none lowercase sub-step-5">
              <a href="https://www.instagram.com/chikireet/" target="_blank" class="flex items-center gap-1.5 hover:opacity-80 transition">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>instagram</span>
              </a>
              <span class="text-white/10 font-normal">|</span>
              <a href="https://chikireet.com/" target="_blank" class="flex items-center gap-1.5 hover:opacity-80 transition">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>website</span>
              </a>
            </div>
          </div>

          <div class="w-full md:w-2/5 rounded-[20px] overflow-hidden bg-[#000000] border border-white/5 relative sub-step-3">
            <img src="/feedback.jpg" alt="Organic Feedback Metrics" class="w-full h-full object-cover opacity-95" />
          </div>
        </div>
      </div>
    </section>

    <footer class="max-w-[980px] mx-auto px-6 border-t border-white/10 pt-6 pb-6 text-[#8e8e93] text-[12px] font-normal mt-8">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>Copyright © 2026. All rights reserved.</p>
        <div class="flex space-x-4 text-[#8e8e93]">
          <span class="text-white font-medium">Gene Perez</span>
          <span class="text-white/10">|</span>
          <span>Toronto, ON</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

useSeoMeta({
  title: 'Othership Case Study: 1M+ Organic Views',
  ogTitle: 'Othership Study: 1M+ Organic Views',
  description: 'How strategic cinematic content transformed the customer journey.',
  ogDescription: 'How strategic cinematic content transformed the customer journey.',
  ogImage: 'https://chikireet.com/og-preview.jpg',
  ogUrl: 'https://chikireet.com/case',
  twitterCard: 'summary_large_image'
})

const isLoaded = ref(false)
const isViewsCounterActive = ref(false)
const isResultsActive = ref(false)

const isViewsBounce = ref(false)
const isResultsBounce = ref(false)

const displayedViews = ref('0')
const displayedResultsViews = ref('0')

const animatedPovViews = ref(0)
const animatedBfViews = ref(0)

// Массив индексов постов, которые прошли анимацию прелоадера
const revealedPosts = ref([])

// Безопасное обновление: сбрасываем хэш адреса, чтобы страница открылась с самого верха
const refreshPage = () => {
  window.location.hash = ''
  window.location.reload()
}

const businessTypes = ref([
  'Wellness studios', 'Gyms', 'Spas', 'Hospitality', 'Premium services', 'Unique physical spaces'
])

const vReveal = {
  mounted: (el) => {
    el.classList.add('reveal-init')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-active')
          
          if (entry.target.id === 'grid-trigger') {
            revealPostsRandomly()
          }
          if (entry.target.id === 'stats-trigger' && !isViewsCounterActive.value) {
            isViewsCounterActive.value = true
            runComplexTicker('views')
          }
          if (entry.target.id === 'results-trigger' && !isResultsActive.value) {
            isResultsActive.value = true
            runComplexTicker('results')
            runNumberTicker(animatedPovViews, 218, 1000)
            runNumberTicker(animatedBfViews, 110, 1000)
          }
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.02, rootMargin: "0px 0px -40px 0px" })
    observer.observe(el)
  }
}

// Рандомизированное проявление постов в шахматном/случайном порядке
const revealPostsRandomly = () => {
  // Создаем массив индексов [0, 1, 2, ..., 8] и тасуем его
  const indices = Array.from({ length: instagramPosts.value.length }, (_, i) => i)
  
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }

  // Быстрый асинхронный конвейер появления (весь процесс занимает до 400-500мс)
  indices.forEach((postIndex, step) => {
    setTimeout(() => {
      revealedPosts.value.push(postIndex)
    }, step * 45) // 45мс шаг между проявлениями элементов
  })
}

const strategyPillars = ref([
  {
    title: 'Experience Videos',
    description: 'Cinematic POV videos that made viewers feel like they were already inside the space.',
    video: 'https://www.dropbox.com/scl/fi/ej8pzo2qvk66ew612b4rw/1.mp4?rlkey=r5f4w7vpk2p1809uwxzyi6eye&st=e0turlai&raw=1',
    reelUrl: 'https://www.instagram.com/reels/C3-qklVgjnB/'
  },
  {
    title: 'Customer Testimonials',
    description: 'Real stories from real people to build trust and social proof.',
    video: 'https://www.dropbox.com/scl/fi/t0qgkyha6k44hhd6xacze/2.mp4?rlkey=9bnns6mwubvfcy5tohls17tnx&st=paxtbpvo&raw=1',
    reelUrl: 'https://www.instagram.com/reels/C8Zzc0Nuhb_/'
  },
  {
    title: 'Space & Atmosphere',
    description: 'Showing the design, energy, and details that make the location unique.',
    video: 'https://www.dropbox.com/scl/fi/4z6v9es64kxy54c0wsyw1/4.mp4?rlkey=m30gc4n19b3be06mq4dhidbml&st=u6fgmjjn&raw=1',
    reelUrl: 'https://www.instagram.com/reels/C_JCthypFIM/'
  },
  {
    title: 'Educational Content',
    description: 'Answering the most common questions and removing uncertainty.',
    video: 'https://www.dropbox.com/scl/fi/xq8b1e0ocn5pw22k7vrq6/3.mp4?rlkey=1bnmfkmvumafi7s0wtvmu8178&st=0mkz5uem&raw=1',
    reelUrl: 'https://www.instagram.com/reels/C6B8K5-gJ23/'
  },
  {
    title: 'Promotional Campaigns',
    description: 'High-impact content designed around special launches and events.',
    video: 'https://www.dropbox.com/scl/fi/3hfmhzozv88lkyekm5ol0/5.mp4?rlkey=s9rrk4jbyk4oe4c8u8r1j33n9&st=x5tq6yjk&raw=1',
    reelUrl: 'https://www.instagram.com/reels/DReopg8jXX4/'
  }
])

const instagramPosts = ref([
  { views: '218K', imageUrl: '/othership-grid-1.jpg' },
  { views: '25.5K', imageUrl: '/othership-grid-2.jpg' },
  { views: '110K', imageUrl: '/othership-grid-3.jpg' },
  { views: '26K', imageUrl: '/othership-grid-4.jpg' },
  { views: '26.5K', imageUrl: '/othership-grid-5.jpg' },
  { views: '17.5K', imageUrl: '/othership-grid-6.jpg' },
  { views: '34.5K', imageUrl: '/othership-grid-7.jpg' },
  { views: '21.7K', imageUrl: '/othership-grid-8.jpg' },
  { views: '19.1K', imageUrl: '/othership-grid-9.jpg' }
])

const runComplexTicker = (mode) => {
  const startTime = performance.now()
  const duration = 900
  const ceiling = 999999

  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const currentNum = Math.floor(progress * ceiling)

    if (mode === 'views') {
      displayedViews.value = currentNum.toLocaleString()
    } else {
      displayedResultsViews.value = currentNum.toLocaleString()
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      setTimeout(() => {
        if (mode === 'views') {
          displayedViews.value = '1M'
          isViewsBounce.value = true
        } else {
          displayedResultsViews.value = '1M'
          isResultsBounce.value = true
        }
      }, 80)
    }
  }
  requestAnimationFrame(animate)
}

const runNumberTicker = (refItem, ceiling, timeline) => {
  const startTime = performance.now()
  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / timeline, 1)
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    
    refItem.value = Math.floor(easeProgress * ceiling)
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  let themeMeta = document.querySelector('meta[name="theme-color"]')
  if (!themeMeta) {
    themeMeta = document.createElement('meta')
    themeMeta.setAttribute('name', 'theme-color')
    document.head.appendChild(themeMeta)
  }
  themeMeta.setAttribute('content', '#000000')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

:global(body, html, #app, .brand-hybrid-shell) {
  background-color: #000000 !important;
}

.font-instrument { font-family: 'Instrument Serif', serif; }
.font-scribble { font-family: 'Caveat', cursive; }

:global(html) {
  scroll-behavior: smooth;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee { animation: marquee 24s linear infinite; }

.mask-gradient {
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

@keyframes bounceHorizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}
.animate-bounce-horizontal-reverse { animation: bounceHorizontal 1.6s infinite ease-in-out; }

@keyframes elasticScale {
  0% { transform: scale(1); }
  30% { transform: scale(1.12); }
  55% { transform: scale(0.97); }
  100% { transform: scale(1); }
}
.animate-bounce-scale { animation: elasticScale 0.65s cubic-bezier(0.25, 1, 0.5, 1) both; }

.reveal-init {
  opacity: 0;
  filter: blur(14px);
  transform: translateY(24px);
  transition: opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 1200ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-active {
  opacity: 1 !important;
  filter: blur(0px) !important;
  transform: translateY(0px) !important;
}

.cascade-container .sub-step-1,
.cascade-container .sub-step-2,
.cascade-container .sub-step-3,
.cascade-container .sub-step-4,
.cascade-container .sub-step-5 {
  opacity: 0;
  filter: blur(10px);
  transform: translateY(16px);
  transition: opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 900ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-active.cascade-container .sub-step-1,
.reveal-active.cascade-container .sub-step-2,
.reveal-active.cascade-container .sub-step-3,
.reveal-active.cascade-container .sub-step-4,
.reveal-active.cascade-container .sub-step-5 {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0px);
}

.reveal-active.cascade-container .sub-step-1 { transition-delay: 150ms; }
.reveal-active.cascade-container .sub-step-2 { transition-delay: 350ms; }
.reveal-active.cascade-container .sub-step-3 { transition-delay: 550ms; }
.reveal-active.cascade-container .sub-step-4 { transition-delay: 750ms; }
.reveal-active.cascade-container .sub-step-5 { transition-delay: 950ms; }

.card-reveal-container .card-step-1,
.card-reveal-container .card-step-2,
.card-reveal-container .card-step-3,
.card-reveal-container .card-step-4,
.card-reveal-container .card-step-phone {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(12px);
  transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 800ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
}
.card-reveal-container .card-step-phone { transform: scale(0.93); }

.reveal-active .card-reveal-container .card-step-1,
.reveal-active .card-reveal-container .card-step-2,
.reveal-active .card-reveal-container .card-step-3,
.reveal-active .card-reveal-container .card-step-4 {
  opacity: 1;
  filter: blur(0px);
  transform: translateY(0px);
}
.reveal-active .card-reveal-container .card-step-phone {
  opacity: 1;
  filter: blur(0px);
  transform: scale(1);
}

.reveal-active .card-reveal-container .card-step-1 { transition-delay: 100ms; }
.reveal-active .card-reveal-container .card-step-2 { transition-delay: 250ms; }
.reveal-active .card-reveal-container .card-step-3 { transition-delay: 400ms; }
.reveal-active .card-reveal-container .card-step-4 { transition-delay: 550ms; }
.reveal-active .card-reveal-container .card-step-phone { transition-delay: 300ms; transition-duration: 1100ms; }
</style>