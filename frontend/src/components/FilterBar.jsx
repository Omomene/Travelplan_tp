import React, { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const handleApply = () => {
    onFilter({ query, category, rating });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md shadow-sm mb-6">
 
      <input
        type="text"
        placeholder="Search by city or attraction..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
      />

   
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        <option value="attractions">Attractions</option>
        <option value="restaurants">Restaurants</option>
        <option value="hotels">Hotels</option>
        <option value="events">Events</option>
      </select>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="px-3 py-2 border rounded-md"
      >
        <option value={0}>Any Rating</option>
        <option value={1}>1+ ⭐</option>
        <option value={2}>2+ ⭐</option>
        <option value={3}>3+ ⭐</option>
        <option value={4}>4+ ⭐</option>
        <option value={5}>5 ⭐</option>
      </select>

    
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
      >
        Apply
      </button>
    </div>
  );
}
