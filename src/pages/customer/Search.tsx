import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, Product } from "../../api/products"; // adjust path if needed
import { Link } from "react-router-dom";



const Search = () => {
  const [searchParams] = useSearchParams();
const query = (searchParams.get("q") || "").toLowerCase();

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);

    fetchProducts().then((data) => {
      const filtered = data.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      setProducts(filtered);
      setLoading(false);
    });
  }, [query]);

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
              <div className="hidden lg:flex items-center justify-between flex-wrap gap-2 pb-6">
                <div className="flex items-center flex-wrap gap-2">
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
                {/* search bar on right */}
                  <div className="flex items-center w-96 rounded-2xl overflow-hidden bg-slate-800/50 ">
                  <div className="relative flex-1 flex items-center">
                    <span className="absolute left-4 text-slate-500">
                      🔍
                    </span>
                    <input
                      type="text"
                      placeholder="Brake Pads"
                      className="w-full bg-transparent pl-12 pr-4 py-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-0 border-none "
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors whitespace-nowrap border-none focus:outline-none focus:ring-0">
                    Search
                  </button>
                </div>
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

  {loading && (
    <p className="col-span-full text-center text-slate-400">
      Loading results...
    </p>
  )}

  {!loading && products.length === 0 && (
    <p className="col-span-full text-center text-slate-400">
      No results found for "{query}"
    </p>
  )}

  {!loading && products.map((product) => (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="group rounded-2xl overflow-hidden flex flex-col bg-slate-800/40 border border-white/5 hover:border-primary/40 transition-all no-underline"
    >
      <div className="h-56 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      <div className="p-5">
        <span className="text-xs text-slate-400">{product.brand}</span>
        <h3 className="text-white font-bold mt-1">{product.name}</h3>
        <p className="text-lg font-bold text-primary mt-2">
          ${product.price}
        </p>
      </div>
    </Link>
  ))}

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
