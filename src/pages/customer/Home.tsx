import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../../api/products";

import arrowDown from "../../assets/arrow_down.svg";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: "build_circle", label: "Brakes & Rotors" },
  { icon: "settings_applications", label: "Engine Parts" },
  { icon: "opacity", label: "Oil & Fluids" },
  { icon: "tire_repair", label: "Tires & Wheels" },
  { icon: "electric_bolt", label: "Batteries" },
  { icon: "handyman", label: "Tools" },
];




const brands = [
  { icon: "verified", name: "BOSCH" },
  { icon: "offline_bolt", name: "DENSO" },
  { icon: "change_history", name: "VALVOLINE" },
  { icon: "public", name: "GOODYEAR" },
  { icon: "local_shipping", name: "MOBIL 1" },
];

const HomePage = () => {
  const [deals, setDeals] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const navigate = useNavigate();
const [query, setQuery] = useState("");

  useEffect(() => {
  fetchFeaturedProducts()

    .then((products) => {
      const mappedDeals = products.map((p, index) => ({
  id: p.id, // ✅ ADD THIS
  image: p.image,
  seller: p.brand,
  title: p.name,
  oldPrice: index === 0 ? "$45.00" : undefined,
  price: `$${p.price}`,
  rating: "4.5",
  ratingCount: "(120+)",
  badge: index === 0 ? "-15% OFF" : undefined,
  badgeColor: "bg-rose-500/90",
  badgeBorder: "border-rose-400/20",
  bestSeller: index === 2,
}));
      setDeals(mappedDeals);
    })
    .catch(() => setError("Failed to load products"))
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="bg-[#0f172a] -mr-4 -ml-5 -mt-8 font-display text-slate-100 antialiased selection:bg-primary selection:text-white overflow-x-hidden">
      <div className="relative flex min-h-screen w-full flex-col">
        

        {/* MAIN */}
        <main className="flex-1">
          {/* HERO SECTION */}
          <section className="relative bg-[#0f172a] pb-28">
            <div className="absolute inset-0 bg-grid-slate-700/[0.05] bg-[bottom_1px_center] [mask-image:linear-gradient(0deg,transparent,black)]" />
            <div className="relative w-full h-[650px] overflow-hidden ml-20">
              <div
                className="absolute inset-0 bg-cover bg-center "
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj-1wVtwXAtM_BusNMjYgA4E3jg0JJXMX52eJ00X578aHh95w65uoIRCroXPW5jmMyKRZpFOqKgWdiXQ-K_rFGD1RXunfkFSMJMg-hCt3heHQXYR5kUitfIUvv_1r_UsHf5NReKqVS3OpP-yWX9frmYmCAX7fV7w9BKcqTIfMCIam0F_dv2JuwgsN710_BNRN4RNOfyVd0ea5RVEXJJe_YHutXzkvy6fS5Jlzmj9Ua0jqhWj_f4zSJFLW6WY6BANHY5m-ljarn6FGL")',
                  transform: "scale(1.05)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent h-40 bottom-0 top-auto" />

              <div className="relative h-full w-full px-0 flex flex-col justify-center pb-20 z-10">
                <div className="max-w-3xl space-y-8 animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-blue-200 text-sm font-medium shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    Over 5 Million Parts Available
                  </div>

                  <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-xl">
                    Your Ride, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-400 [text-shadow:0_0_20px_rgba(59,130,246,0.5)]">
                      Perfected.
                    </span>
                  </h1>

                  <p className="text-slate-300 text-lg sm:text-xl font-light max-w-xl leading-relaxed">
                    Find the exact parts you need with our AI-powered
                    compatibility engine. Quality guaranteed.
                  </p>

                  <div className="w-full max-w-2xl mt-8 pt-4">
                    <form className="flex w-full items-center p-2 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all focus-within:bg-slate-900/60 focus-within:border-blue-500/30 focus-within:shadow-[0_0_10px_rgba(59,130,246,0.3)] group">
                      <div className="flex items-center justify-center pl-4 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                        <span className="material-symbols-outlined text-2xl">
                          search
                        </span>
                      </div>
                      <input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="flex-1 w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-400/70 px-4 text-lg h-14 focus:outline-none"
  placeholder="Search part number, keyword or VIN..."
/>

                      <button
  type="button"
  onClick={() => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }}
  className="bg-primary hover:bg-blue-500 text-white font-bold px-8 rounded-xl h-14 flex items-center gap-2"
>
  Search
</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* VEHICLE SELECT PANEL */}
            <div className="relative z-0 -mt-28 w-full flex justify-center animate-[fadeIn_0.8s_ease-out_0.2s_both]">
                  <div className="w-full px-6 md:pl-20 md:pr-16">
                <div className="rounded-3xl p-1 shadow-[0_4px_30px_rgba(0,0,0,0.3)] bg-[rgba(15,23,42,0.6)] backdrop-blur-[16px] border border-white/10 w-full">
                <div className="bg-[#0f172a]/80 backdrop-blur-md rounded-[1.2rem] p-6 md:p-8 border border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/50 pb-6 mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <span className="material-symbols-outlined">
                            garage_home
                          </span>
                        </div>
                        Find Parts for Your Vehicle
                      </h3>
                      <p className="text-sm text-slate-400 mt-2 pl-12">
                        Select your vehicle details to ensure 100% fitment.
                      </p>
                    </div>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-sm text-blue-400 font-bold hover:text-blue-300 transition-colors bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-500/10 hover:border-blue-500/30"
                    >
                      <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">
                        directions_car
                      </span>
                      My Garage (3 saved)
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    {/* Make */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
                        Make
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/50 text-white h-14 pl-4 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 text-base font-medium transition-shadow hover:bg-slate-800 cursor-pointer [&::-webkit-appearance]:none [&::-moz-appearance]:none"
                          style={{ backgroundImage: 'none' }}
                        >
                          <option disabled value="">
                            Select Make
                          </option>
                          <option>Toyota</option>
                          <option>Honda</option>
                          <option>Ford</option>
                          <option>BMW</option>
                        </select>
                        <img src={arrowDown} alt="Dropdown Arrow" className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                      </div>
                    </div>

                    {/* Model */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
                        Model
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/50 text-white h-14 pl-4 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 text-base font-medium transition-shadow hover:bg-slate-800 cursor-pointer [&::-webkit-appearance]:none [&::-moz-appearance]:none"
                          style={{ backgroundImage: 'none' }}
                        >
                          <option disabled value="">
                            Select Model
                          </option>
                          <option>Camry</option>
                          <option>Corolla</option>
                          <option>RAV4</option>
                        </select>
                        <img src={arrowDown} alt="Dropdown Arrow" className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                      </div>
                    </div>

                    {/* Year */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
                        Year
                      </label>
                      <div className="relative">
                        <select
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/50 text-white h-14 pl-4 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 text-base font-medium transition-shadow hover:bg-slate-800 cursor-pointer [&::-webkit-appearance]:none [&::-moz-appearance]:none"
                          style={{ backgroundImage: 'none' }}
                        >
                          <option disabled value="">
                            Select Year
                          </option>
                          <option>2023</option>
                          <option>2022</option>
                          <option>2021</option>
                        </select>
                        <img src={arrowDown} alt="Dropdown Arrow" className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-white/10"
                    >
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                      Find Parts
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>

          {/* TOP CATEGORIES */}
          <section className="py-20 px-0 bg-[#0f172a] w-full -mt-20">
            <div className="w-full px-6 md:pl-20 md:pr-16">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">
                    Top Categories
                  </h2>
                  <p className="text-slate-400 mt-2 font-light">
                    Browse parts by system for quick access
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-1 text-blue-400 text-sm font-bold hover:text-blue-300 hover:gap-2 transition-all"
                >
                  View All Categories{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className="group flex flex-col items-center gap-5 p-6 rounded-2xl bg-[rgba(30,41,59,0.4)] backdrop-blur-[8px] border border-white/5 hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 text-blue-500 flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-3xl">
                        {item.icon}
                      </span>
                    </div>
                    <span className="font-semibold text-sm text-center text-slate-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED DEALS */}
          <section className="py-16 px-0 bg-[#0f172a] relative w-full -mt-10">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 -ml-20 pointer-events-none" />
            <div className="w-full relative z-10">
              <div className="w-full px-6 md:pl-20 md:pr-16">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">
                      Featured Deals
                    </h2>
                    <p className="text-slate-400 mt-2 font-light">
                      Limited time offers on top rated components
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all text-slate-400"
                    >
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800/50 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all text-slate-400"
                    >
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

  {/* 🔄 Loading state */}
  {loading && (
    <p className="text-slate-400 text-center col-span-full">
      Loading deals...
    </p>
  )}

  {/* ❌ Error state */}
  {error && (
    <p className="text-red-400 text-center col-span-full">
      {error}
    </p>
  )}

  {/* ✅ Products */}
  {!loading && !error && deals.map((deal) => (
  <div
    key={deal.id}
    onClick={() => navigate(`/product/${deal.id}`)}
    className="group cursor-pointer bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/5 flex flex-col shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 hover:border-blue-500/30 transition-all duration-300 overflow-hidden relative"
  >


    {/* IMAGE */}
    <div className="h-56 bg-slate-900/40 relative overflow-hidden">
      <img
        src={deal.image}
        alt={deal.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* CONTENT */}
    <div className="p-5 flex flex-col flex-1">
      <div className="text-xs text-slate-400 mb-2 font-medium">
        Sold by <span className="text-blue-400">{deal.seller}</span>
      </div>

      <h3 className="font-bold text-slate-100 text-lg mb-2 leading-snug group-hover:text-blue-400 transition-colors">
        {deal.title}
      </h3>

      <div className="mt-auto flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-2xl font-bold text-white">
          {deal.price}
        </span>

        <button
          type="button"
          className="h-10 w-10 rounded-full bg-slate-700/50 text-white hover:bg-blue-600 flex items-center justify-center transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  </div>
))}

</div>

            </div>
          </div>
          </section>

          {/* TRUSTED BRANDS */}
          <section className="py-16 px-0 bg-[#0f172a] border-t border-slate-800 w-full">
            <div className="w-full">
              <h2 className="text-white text-2xl font-bold leading-tight mb-12 text-center opacity-60">
                Trusted by Mechanics Worldwide
              </h2>
              <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="group flex items-center gap-2 text-2xl font-black text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">
                      {brand.icon}
                    </span>
                    {brand.name}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SUBSCRIBE SECTION */}
          {/* <section className="relative py-20 px-0 overflow-hidden border-t border-white/5 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-[#0f172a] w-full" />
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10 px-4 md:px-8">
              <div className="flex flex-col gap-4 max-w-lg">
                <div className="inline-block w-fit px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm text-xs font-bold text-blue-200 mb-2 border border-blue-400/20">
                  JOIN THE COMMUNITY
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tight [text-shadow:0_0_20px_rgba(59,130,246,0.5)]">
                  Unlock Pro Benefits
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed font-light">
                  Get exclusive discounts, repair guides from certified
                  mechanics, and early access to sales events.
                </p>
              </div>
              <div className="w-full md:w-auto flex-1 max-w-md">
                <div className="flex gap-2 p-2 bg-slate-900/60 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl focus-within:border-blue-500/50 transition-colors">
                  <input
                    type="email"
                    className="w-full bg-transparent rounded-lg px-4 py-3 text-white placeholder:text-slate-500 border-none focus:ring-0 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-all whitespace-nowrap shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-slate-500 text-xs mt-3 text-center">
                  No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </section> */}
        </main>


        
      </div>
    </div>
  );
};

export default HomePage;
export { HomePage };
