import React from "react";

const ProductDetail: React.FC = () => {
  return (
    <div>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>AutoPartsHub - Product Detail (Modern Glass)</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style type="text/tailwindcss" dangerouslySetInnerHTML={{__html: "\n        .glass-effect {\n            @apply backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl;\n        }\n        .frosted-card {\n            @apply backdrop-blur-2xl bg-slate-900/40 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)];\n        }\n        .hide-scrollbar::-webkit-scrollbar {\n            display: none;\n        }\n        .hide-scrollbar {\n            -ms-overflow-style: none;\n            scrollbar-width: none;\n        }\n        .neon-accent {\n            box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);\n        }\n        html {\n            scroll-behavior: smooth;\n        }\n    " }} />
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[100px]" />
          <div className="absolute top-[30%] left-[20%] w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Home</a></li>
              <li><span className="material-symbols-outlined text-[10px]">chevron_right</span></li>
              <li><a className="hover:text-primary transition-colors" href="#">Engine</a></li>
              <li><span className="material-symbols-outlined text-[10px]">chevron_right</span></li>
              <li className="text-slate-300">Electrical Components</li>
            </ol>
          </nav>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[5/4] w-full rounded-3xl overflow-hidden glass-effect group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-blue-900/10" />
                <div className="relative z-10 w-full h-full flex items-center justify-center p-16">
                  <img alt="Product View" className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNTUFO1XdKYvaCpEcqGZuFhylyHqNFYpdWgmJjjfQ0oJl2oLgKs80oqWCXNSIkRgPH30GApqsbRlYfiGytCQR2D9qZ0L-lkDV5AaCHvamQvlw8L15JgvHqBLB_MGRSluXTBgw-qAzfA0ViDL1xLB2kTyixF8VGzk9YBi_BaGRb0xOnV-9C23e6oQuIDiWXZ9r77hv65YPR2sl1mjbCMH8-Kp7zU5czV53i-W59NzPQxe64zoRM8OSm39SqAJi5ROexUGx14d_jHrBy" />
                </div>
                <div className="absolute top-8 left-8 flex gap-3">
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">Premium Grade</span>
                  <span className="bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10">In Stock</span>
                </div>
                <button className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl text-white hover:bg-primary transition-all duration-300">
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                <button className="shrink-0 size-24 rounded-2xl border-2 border-primary bg-slate-800/50 p-2 glass-effect">
                  <img alt="Thumbnail 1" className="w-full h-full object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdeNsL3Z3cncGlx0QOyjiRdrP4fkRlFesDAkqnwk0WVfFu8ecAugJYkD3rAzKGwDcYUTvvJonNteEAtYnBZxQaN5p9IYUK4jpzrdT5IjKdwscGelrJ7_JGVOi5GQqUo7prxe6DMOX7F9q3ewPupYcc9JsHxAaz3IJ70KdHqP8AZptIHjRCtSEk6lVeViGmcDuFRMvqwS96d3N3ehyfiK1TCg3UnazS8ETfNxUCE7tpQPKhZI4RsodyBEknspCs0jhTxHZmu32dPP1J" />
                </button>
                <button className="shrink-0 size-24 rounded-2xl border-2 border-transparent bg-slate-800/20 p-2 hover:border-white/20 transition-all glass-effect">
                  <img alt="Thumbnail 2" className="w-full h-full object-cover rounded-lg opacity-60 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKrpUko7hX4xkTy9wDrw-9qF8lMUd7l0B9ueXP-6DGXJ8w2R9aGDaMWoNQ3UIuGQ_v_eEFusAVaDv1WjpcD75p40y7DaOm2mxeX2Ip7ZEJ4nDsupFk2VNwZLBeyF7ilm1TcihrOnjl7FJGHlNvT83xWymTyyz_Wr9Pk56mj_nM7B5qe3Rkk3RlAxIOY30L2J4wacmx0zz95CdCpltJbqXDfO19ZqiSVxcElgJ_sBzcqBWFGGKqVOMnFArQPDr9s8MtyMrugVdnke9f" />
                </button>
                <button className="shrink-0 size-24 rounded-2xl border-2 border-transparent bg-slate-800/20 p-2 hover:border-white/20 transition-all glass-effect">
                  <img alt="Thumbnail 3" className="w-full h-full object-cover rounded-lg opacity-60 hover:opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9xUYBqH5_05SCZJqqGuMqzfzf7cfgqOKzl2sDrm74oqItkK2OLUo09wYAKYRRxbtjQSclFlxhlhmGUklw2L9zVc3HS03-1EIpbctLPJOE1yagoPhnMnIBjAdhqegs8QXxOyPdA3mcuNLF3pdY3iglKKya7i2_ArJZpcJJArnpZiJjMxGI0BXIBrJjlrGsxBz0XZT12-JjS9pEvbZhoyR-DR-t3Wmf2oILYRU1wIVGT6IIxRNk8E7u739GS4E1ftEWhQRLsuVQEnhd" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="frosted-card rounded-[2.5rem] p-8 lg:p-10 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">Bosch Performance</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-[1.15] tracking-tight">Heavy Duty Alternator 12V 90A Series</h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-yellow-500">
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-sm fill-current">star</span>
                        <span className="material-symbols-outlined text-sm fill-current text-slate-600">star</span>
                      </div>
                      <span className="text-xs font-bold text-slate-300">4.8 (124)</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">Part No: 31400-M74L00</span>
                  </div>
                </div>
                <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Compatibility Check</p>
                      <p className="text-sm font-semibold text-emerald-100">Fits 2015 Suzuki Swift</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-white uppercase underline underline-offset-4">Switch</button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Price</p>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-black text-white">$125.00</span>
                        <span className="text-lg text-slate-600 line-through font-bold">$160.00</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">Save $35.00 Today</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-primary hover:bg-primary-hover text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group">
                      <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">shopping_cart</span>
                      ADD TO CART
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-5 rounded-2xl border border-white/10 transition-all active:scale-95">
                      BUY NOW
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">12 Month<br />Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">local_shipping</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">Next Day<br />Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className="flex gap-8 border-b border-white/5">
                <button className="pb-4 text-sm font-black uppercase tracking-widest text-white border-b-2 border-primary">Technical Specs</button>
                <button className="pb-4 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-300">Reviews</button>
                <button className="pb-4 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-300">Q&amp;A</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-effect rounded-2xl p-6 group hover:border-neon-blue/40 transition-colors">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Electrical</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Voltage</span>
                    <span className="text-base font-bold text-white">12V</span>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl p-6 group hover:border-neon-blue/40 transition-colors">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Performance</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Amperage</span>
                    <span className="text-base font-bold text-white">90 Amps</span>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl p-6 group hover:border-neon-blue/40 transition-colors">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Hardware</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Pulley Type</span>
                    <span className="text-base font-bold text-white">6-Groove Serpentine</span>
                  </div>
                </div>
                <div className="glass-effect rounded-2xl p-6 group hover:border-neon-blue/40 transition-colors">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Build</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-400">Housing</span>
                    <span className="text-base font-bold text-white">Die-Cast Aluminum</span>
                  </div>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold text-white mb-4">Engineering Excellence</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Engineered to meet the highest industry standards, this Bosch alternator offers unmatched reliability for your vehicle's electrical demands. Utilizing advanced thermal management and precision bearings, it ensures consistent power delivery even under extreme engine bay temperatures. The high-density copper windings maximize efficiency while reducing noise and vibration.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-effect rounded-3xl overflow-hidden">
                <div className="bg-white/5 p-6 border-b border-white/10">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-blue">verified_user</span>
                    Compatibility List
                  </h3>
                </div>
                <div className="p-2 space-y-1">
                  <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-200">Suzuki Swift</p>
                      <span className="text-xs text-primary font-bold">MATCHED</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">2014 - 2018 • 1.2L Petrol</p>
                  </div>
                  <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-200">Suzuki Dzire</p>
                      <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">2015 - 2018 • 1.2L Petrol</p>
                  </div>
                  <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-slate-200">Suzuki Ertiga</p>
                      <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">2014 - 2016 • 1.4L Petrol</p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 text-center">
                  <button className="text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">See All Compatible Models</button>
                </div>
              </div>
              <div className="glass-effect rounded-3xl p-6 flex items-center justify-between group cursor-pointer border-transparent hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-slate-800 bg-cover border border-white/10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuEVelEFrD4FWKONg6vPwBBOobo7KO64BqGY6xW2hPAkQABMJFEWFsUwjZvStAShQQOQCyWfQKB6ZRX_-WWjw8Sb13aMGNRJj7tglSHZ6MNku-Yg1TvIaStPSomiKDafEtYZ04TMlr7XTFrwrjNjpfiXQJkWYWKU4vpw4Teaezro2cdX-JktgGqNjd-ffeTTcqB8mjA5x3-jtfUp7M-BWbNPdPLNHonr1BHTpqKQw-dlTDd0pco1IYSd90Nq3mFjbof4ecljdeifyQ")'}} />
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shipped &amp; Sold By</p>
                    <p className="font-bold text-white group-hover:text-primary transition-colors">Apex Auto Dynamics</p>
                  </div>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-lg">
                  <span className="text-sm font-black text-primary">4.9</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight">User Experiences</h3>
                <p className="text-slate-500 mt-2 font-medium">124 verified owners have shared their feedback</p>
              </div>
              <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl border border-white/10 transition-all">Write Review</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-effect p-8 rounded-[2rem] hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-slate-800 bg-cover ring-2 ring-white/5 group-hover:ring-primary/40 transition-all" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALrZ_Nlzg8aaQKvK6OAV7ct-aXYj3VxTDZFkXPsHxwN2_NDzfUxqCcaVugsDEbdhc2plfQLOo7dHzqtPPoIoa3talhqoYVd3j44tbukb55uIzc33Mt9-DWd-4ncCD6PZ62Edjk9S6ddVbQutRmOjWNiSHhd8vc7SZQ5z1PI68lxIAmMbapUKPPR_52n-w0pEe25NDwI_sBWskDc-Usk5m8UvUUvZWe-v2ZJS7Dnfk9EjZ4FSFRxjlu7eySl2lE4bn0q5Ex4FkkAqrZ")'}} />
                    <div>
                      <p className="font-bold text-white">Michael R.</p>
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-tighter">Verified Owner</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">Exceptional Build Quality</h4>
                <p className="text-sm text-slate-400 leading-relaxed italic">"The output is rock solid. My car's idle is smoother and the voltage meter doesn't dip even with high beams and AC on full."</p>
                <p className="mt-6 text-[10px] font-bold text-slate-600 uppercase">April 12, 2023</p>
              </div>
              <div className="glass-effect p-8 rounded-[2rem] hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-slate-800 bg-cover ring-2 ring-white/5 group-hover:ring-primary/40 transition-all" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDd-IsE7de4Ih2YdwOL_xeLYFcE28jyLhnzmYPQElH3C7569i7ICMdBpbBujriHej6SyXJmfGUcwabmwWUWRYnxjb3w_Jnb3jhR5RA0iYtmSopOdIGgkWhfJNk7Nrz4yBevYS7Lp9dIp8-tPceaPR6zyW6B7XVCgG4IsagpYzmEDo9HpJHngOuWzX2beBfumfZyowEDuFIcz3F1pkN_zvlR-RdHAJjReu5NHyMbzoRzJpt8yQirfrh-oIOj6g-_yuOObKiePlbmSsso")'}} />
                    <div>
                      <p className="font-bold text-white">Sarah Jenkins</p>
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-tighter">Verified Owner</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs fill-current">star</span>
                    <span className="material-symbols-outlined text-xs text-slate-700">star</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">Perfect Replacement</h4>
                <p className="text-sm text-slate-400 leading-relaxed italic">"Identical to the factory unit. Bolted right in without any modifications. Shipping was faster than expected too."</p>
                <p className="mt-6 text-[10px] font-bold text-slate-600 uppercase">March 28, 2023</p>
              </div>
            </div>
          </div>
        </main>
        
      </div>
    );
};

export default ProductDetail;