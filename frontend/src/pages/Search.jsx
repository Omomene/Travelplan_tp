import { useState } from "react";
import AttractionCard from "../components/AttractionCard";
import FilterBar from "../components/FilterBar";

function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async ({ query, category, rating }) => {
    if (!query && !category && !rating) return;
    setLoading(true);
    try {
      let url = `/api/attractions/search/?query=${query || ""}`;
      if (category) url += `&category=${category}`;
      if (rating) url += `&min_rating=${rating}`;

      const res = await fetch(url);
      const data = await res.json();
      let filtered = data.data || [];

 
      if (rating) {
        filtered = filtered.filter((a) => Number(a.rating) >= rating);
      }

      setResults(filtered);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6 text-center">
        Search for Attractions
      </h2>


      <FilterBar onFilter={handleFilter} />

      
      {loading && <p className="text-center text-gray-600 mb-4">Loading...</p>}

   
      {results.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {results.map((a) => (
            <AttractionCard key={a.location_id} attraction={a} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No results found. Try adjusting your filters or search query.
        </p>
      )}
    </div>
  );
}

export default Search;
