import React from "react";

export default function Carousel({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500">No attractions to display</p>;
  }

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-4">Top Attractions</h3>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
        {items.map((item) => (
          <div
            key={item.location_id}
            className="flex-shrink-0 w-60 bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-3">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">
                {item.address_obj?.city || item.address_obj?.country}
              </p>
              {item.rating && (
                <p className="text-sm text-yellow-500">
                  ⭐ {item.rating} ({item.num_reviews})
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
