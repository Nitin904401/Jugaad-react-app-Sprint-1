import React from "react";

const Search = () => {
  return (
    <div className=" font-display text-slate-300 antialiased selection:bg-primary/30 selection:text-white min-h-screen w-full">
      {/* background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* CONTENT */}
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex w-full flex-col gap-8 py-8 lg:flex-row">
            {/* SIDEBAR */}
            <aside className="flex w-full flex-col gap-6 lg:w-72 flex-shrink-0">
              {/* mobile breadcrumbs */}
              <div className="flex flex-wrap gap-2 pb-2 lg:hidden">
                <a
                  href="#"
                  className="text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </a>
                <span className="text-slate-600 text-sm font-medium">/</span>
                <a
                  href="#"
                  className="text-slate-400 text-sm font-medium hover:text-primary transition-colors"
                >
                  Brakes
                </a>
                <span className="text-slate-600 text-sm font-medium">/</span>
                <span className="text-slate-200 text-sm font-medium">
                  Brake Pads
                </span>
              </div>

              {/* vehicle card */}
              <div className="rounded-2xl p-5 relative overflow-hidden group border border-white/5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 blur-xl" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="mt-1 flex items-center justify-center text-green-400 bg-green-500/10 rounded-full p-2 ring-1 ring-green-500/20">
                    <span className="material-symbols-outlined text-[24px]">
                      check_circle
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                      Your Vehicle
                    </p>
                    <h2 className="text-white text-lg font-bold leading-tight">
                      2018 Ford F-150
                    </h2>
                    <p className="text-green-400 text-sm font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                      Fits this vehicle
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full rounded-xl bg-slate-800 border border-slate-600 py-2.5 text-sm font-semibold text-slate-300 hover:border-primary hover:text-white hover:bg-slate-700 hover:shadow-sm transition-all duration-200">
                  Change Vehicle
                </button>
              </div>

              {/* filters */}
              <div className="flex flex-col gap-0 rounded-2xl bg-slate-800/40 border border-white/5 backdrop-blur-sm shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] overflow-hidden divide-y divide-white/5">
                {/* category */}
                <div className="p-5">
                  <h3 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4">
                    Category
                  </h3>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        Brake Pads{" "}
                        <span className="text-slate-600 text-xs ml-1">
                          (124)
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        Rotors{" "}
                        <span className="text-slate-600 text-xs ml-1">
                          (86)
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        Calipers{" "}
                        <span className="text-slate-600 text-xs ml-1">
                          (42)
                        </span>
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        Hardware Kits{" "}
                        <span className="text-slate-600 text-xs ml-1">
                          (18)
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* price */}
                <div className="p-5">
                  <h3 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4">
                    Price Range
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative flex-1 group">
                      <span className="absolute left-3 top-2.5 text-slate-500 text-sm group-focus-within:text-primary transition-colors">
                        $
                      </span>
                      <input
                        type="number"
                        defaultValue={20}
                        placeholder="Min"
                        className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-6 pr-2 text-sm text-slate-200 focus:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder-slate-500"
                      />
                    </div>
                    <span className="text-slate-600">-</span>
                    <div className="relative flex-1 group">
                      <span className="absolute left-3 top-2.5 text-slate-500 text-sm group-focus-within:text-primary transition-colors">
                        $
                      </span>
                      <input
                        type="number"
                        defaultValue={500}
                        placeholder="Max"
                        className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-6 pr-2 text-sm text-slate-200 focus:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder-slate-500"
                      />
                    </div>
                  </div>
                  <button className="w-full py-1.5 rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all">
                    Apply Price
                  </button>
                </div>

                {/* brand */}
                <div className="p-5">
                  <h3 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4">
                    Brand
                  </h3>
                  <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2">
                    {["Bosch", "Brembo", "Duralast", "PowerStop", "Wagner"].map(
                      (brand, idx) => (
                        <label
                          key={brand}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            defaultChecked={idx === 0}
                            className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                          />
                          <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                            {brand}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* availability */}
                <div className="p-5">
                  <h3 className="text-slate-200 text-sm font-bold uppercase tracking-wider mb-4">
                    Availability
                  </h3>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        In Stock
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-slate-600 bg-slate-800 text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                      />
                      <span className="text-slate-400 text-sm font-medium group-hover:text-primary transition-colors">
                        On Sale
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN RESULTS */}
            <main className="flex flex-1 flex-col">
              {/* breadcrumb desktop */}
              <div className="hidden lg:flex items-center flex-wrap gap-2 pb-6">
                <a
                  href="#"
                  className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
                >
                  Home
                </a>
                <span className="material-symbols-outlined text-[14px] text-slate-600">
                  chevron_right
                </span>
                <a
                  href="#"
                  className="text-slate-400 text-sm font-medium hover:text-white transition-colors"
                >
                  Brakes
                </a>
                <span className="material-symbols-outlined text-[14px] text-slate-600">
                  chevron_right
                </span>
                <span className="text-white text-sm font-semibold bg-slate-800 border border-slate-700 px-3 py-1 rounded-full shadow-sm">
                  Brake Pads
                </span>
              </div>

              {/* header row */}
              <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl bg-slate-800/40 border border-white/5 backdrop-blur-sm shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] p-5 sm:flex-row sm:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Brake Pads for 2018 Ford F-150
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Showing 124 results matched
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-400 whitespace-nowrap">
                      Sort by:
                    </label>
                    <div className="relative group">
                      <select className="h-10 cursor-pointer rounded-xl border border-slate-600 bg-slate-800 pl-3 pr-8 text-sm font-semibold text-slate-200 focus:border-primary focus:ring-0 hover:border-primary/50 transition-all appearance-none w-44">
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                        <option>Top Rated</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden h-8 w-px bg-slate-700 sm:block" />
                  <div className="flex gap-1 rounded-xl bg-slate-800 border border-slate-700 p-1">
                    <button className="flex size-9 items-center justify-center rounded-lg bg-primary text-white shadow-sm ring-1 ring-black/5 transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        grid_view
                      </span>
                    </button>
                    <button className="flex size-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        view_list
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RESULT CARDS GRID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {/* Card 1 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      alt="Bosch QuietCast Brake Pads"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkC-MxjDnJ1XEEqCfwBRsVvtgEqLiRJJwzSnq6vTXAeLwW3aEW8Ykq_o3w-GPkpEn_sZzSz6rsU0W1baATdTMq7hvFABqT1QSSSATsSt6CXjvjBe7Bm9ahKKzXIoqLqeusR310aSRd3GuzDKAK9Q32eOZPtxzAI23aEzuJVwlwE6IxR_BKAlhpKDHOJyJRdKmKHfWMqTJ5OzJpDYdeZXWtq1uZoTnsi_Qn4mERpur6zuR_sNV1QSA_JTcGRbNNhc4E1A6F9lXZ2rIA"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        Bosch
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #BC905
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      QuietCast Premium Ceramic Brake Pads
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {["star", "star", "star", "star", "star_half"].map(
                          (icon) => (
                            <span
                              key={icon}
                              className="material-symbols-outlined text-[16px] fill-current"
                            >
                              {icon}
                            </span>
                          )
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (428)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-2xl font-bold text-white">
                          $45.99
                        </span>
                        <div className="flex items-center text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded font-medium border border-green-500/20">
                          <span className="material-symbols-outlined text-[14px] mr-1">
                            local_shipping
                          </span>
                          Free Shipping
                        </div>
                      </div>
                      <p className="mb-3 text-xs text-slate-500">
                        Sold by{" "}
                        <span className="font-semibold text-slate-300">
                          PartsKing
                        </span>
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-primary-dark hover:shadow-blue-500/40 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      alt="Brembo High Carbon Rotor"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoRApDF1AkGhlcETUnS5KQy9ecliJpkV9zpZPvuAQtDgMImbM8g5S5KSbjjeKkePULwrmRa1sgrT3MSllBorTW1Mj1U5qHBPIoamrR-pnqC_C9qdIs__jv9pefSQ5T_PqegLbj-egQmYHdGNmpQ4gVyNk1wMt4aDiWQEwBNQJeT5qm80rkzDWa175MzFLQ06xqNAkrQDYxm9ddFLWkwJ3SL8tk6YhYSZD5Rybio4jUA4Qa9sw9nhkP7XtV8ASXjLHCZnZVpi5Y0k6U"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        Brembo
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #09.C499.11
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      High Carbon Disc Brake Rotor (Front)
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[16px] fill-current"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (156)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-2xl font-bold text-white">
                          $89.00
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Low Stock
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <p className="text-xs text-slate-500">
                          Sold by{" "}
                          <span className="font-semibold text-slate-300">
                            EuroParts
                          </span>
                        </p>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-primary-dark hover:shadow-blue-500/40 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative opacity-80 hover:opacity-100 bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute right-0 top-16 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 shadow-md z-10 rounded-l backdrop-blur-sm">
                      SALE -25%
                    </div>
                    <img
                      alt="Duralast Gold Brake Pads"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] grayscale group-hover:grayscale-0 transition-all duration-500"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHdWip6F-9ywznk_AhZY-pRg7jHzQaiPWW5AFqktv4nJqThHg2kl52dbWdNIkShKjKqXMGyBeDsw3CQ-l9BGBk1tNYBjxe79Sg437EU77ly0IGQ16mIJiePVRSQPUTqd_6pWpUxGriPj-T8lQFgO87PFmToz6P9W_Moc1fS5vlrdpZx_JBeHl2voopUxTJhq42-ow3Mv0IMOYD3hxWL0fFXgLiIPZzH67c41ueUSxCiW4lklPa6rSHqChOCPa-nNOu2Znujc_J_v6C"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        Duralast
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #DG905
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      Gold Ceramic Brake Pads (Set of 4)
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star_half
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-slate-600">
                          star
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (89)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-bold text-red-500">
                          $32.50
                        </span>
                        <span className="text-sm text-slate-500 line-through decoration-slate-500">
                          $42.00
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-700 px-2 py-0.5 rounded">
                          Out of Stock
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <p className="text-xs text-slate-500">
                          Sold by{" "}
                          <span className="font-semibold text-slate-300">
                            AutoMega
                          </span>
                        </p>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed hover:bg-slate-800 border border-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          notifications
                        </span>
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      alt="PowerStop Brake Kit"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeVjMx1SQK-CEyW5lo1XQW_vGUPzSWIaP0TqQHqC1T-heKvz85KP6ydjToazSofClksIHtT1fiagq_r-Dlp15TLBfsUWcZJfGkVVbz_gf0Zf5e4wMNPztBpA-HanoZJH9VdRSt6gfPxEzeNLQrsyUlD2JzISpw3kNInYQp9mdgbZM-prZSkfmmhB_SekkYeDbGnBYWr-Becs6JkPnFxAYTomyelY5nW4IRXVFKPz_ilTSLRDs_MEj9s9JLuVc7iAmCnAq4gYWHUiVU"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        PowerStop
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #K2009
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      Z23 Evolution Sport Brake Upgrade Kit
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[16px] fill-current"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (1024)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-2xl font-bold text-white">
                          $219.99
                        </span>
                        <div className="flex items-center text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded font-medium border border-green-500/20">
                          <span className="material-symbols-outlined text-[14px] mr-1">
                            local_shipping
                          </span>
                          Free Shipping
                        </div>
                      </div>
                      <p className="mb-3 text-xs text-slate-500">
                        Sold by{" "}
                        <span className="font-semibold text-slate-300">
                          AutoPartsPro Direct
                        </span>
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-primary-dark hover:shadow-blue-500/40 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      alt="Wagner ThermoQuiet"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoUYVwyqSy8cTUSANSwJU25YqIyKmECAImbNFPlkDGA2SOViemmE-M6xhleAfA_jjL0zJ35nzpAowEhrSyX8HWeHpcoZYKZ6gJ4N169lrBpj30p8PIoHxQptOZbI5EcSJXTp63vE8PlOVdAYnGLrN1cS1xE1n9uxGvBX3dAx3y5M1Kg5lCmpCxOfUnSL8mi72DjcaSxCsC0M9WZ1NNPIu1KK3eKCpQxdh-CpRT76s3VYWsZpYg1QzKK20O4lpUN9r1BpJwsmHyPcA-"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        Wagner
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #QC1324
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      ThermoQuiet Ceramic Disc Brake Pad Set
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-slate-600">
                          star
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (67)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-2xl font-bold text-white">
                          $38.99
                        </span>
                      </div>
                      <p className="mb-3 text-xs text-slate-500">
                        Sold by{" "}
                        <span className="font-semibold text-slate-300">
                          Global Parts
                        </span>
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-primary-dark hover:shadow-blue-500/40 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 6 */}
                <div className="group rounded-2xl overflow-hidden flex flex-col relative bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-primary/40 transition-all duration-300">
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-green-400 shadow-lg shadow-green-900/20 border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    Guaranteed Fit
                  </div>
                  <div className="relative flex h-56 items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      alt="Motorcraft OEM Pads"
                      className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGZZwhuf-HE2Zp0vEEoJdU_wROodTkCoigitxgwQdPCMLy_54XT-Mv_EcASqmx0lUHiFistByC2qMqJuLjmAryozt0xQrvyY4OkfoQppUSY-VMUDATYY1eCCuwcx36OUItccmdGuCwSUQDj5oxqmuFN8RbvSMMxESeOMsmLeLFDUuzzDRZybTVFzKygCfmDO5yvuxNA6LZsRd1nIKDQbb-XRgBySJWqOAGZVpRGH62J11SDSyhCsh7CenS_lSoO1XbXSrm6E2b-PeV"
                    />
                    <button className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 shadow-sm hover:bg-slate-700 hover:text-red-500 cursor-pointer text-slate-400 border border-white/10 transition-all hover:scale-110 active:scale-95">
                      <span className="material-symbols-outlined text-[20px] block">
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-5 bg-slate-800/30 border-t border-white/5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800/80 border border-white/5 px-2 py-0.5 rounded">
                        Motorcraft
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        #BR1085
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-tight text-slate-200 group-hover:text-primary transition-colors line-clamp-2 h-10">
                      Original Equipment Front Brake Pads
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex text-amber-400 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[16px] fill-current"
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        (312)
                      </span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-dashed border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-2xl font-bold text-white">
                          $54.50
                        </span>
                      </div>
                      <p className="mb-3 text-xs text-slate-500">
                        Sold by{" "}
                        <span className="font-semibold text-slate-300">
                          Ford Parts Direct
                        </span>
                      </p>
                      <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-primary-dark hover:shadow-blue-500/40 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">
                          shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* pagination */}
              <div className="mt-12 flex items-center justify-center">
                <div className="flex gap-2 p-1.5 bg-slate-800/40 border border-white/5 rounded-2xl shadow-sm backdrop-blur-sm">
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-600 disabled:opacity-50 hover:bg-slate-700 transition-all"
                    disabled
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_left
                    </span>
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                    1
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent text-slate-400 font-medium hover:bg-white/5 hover:text-white transition-all">
                    2
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent text-slate-400 font-medium hover:bg-white/5 hover:text-white transition-all">
                    3
                  </button>
                  <span className="flex h-10 w-10 items-center justify-center text-slate-600 pb-2">
                    ...
                  </span>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent text-slate-400 font-medium hover:bg-white/5 hover:text-white transition-all">
                    12
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
export { Search as SearchPage };
