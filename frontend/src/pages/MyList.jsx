import { useState, useEffect } from "react";
import AttractionCard from "../components/AttractionCard";

function MyList() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("myList")) || [];
    setSaved(list);
  }, []);

  const removeAttraction = (id) => {
    const updated = saved.filter((item) => item.location_id !== id);
    setSaved(updated);
    localStorage.setItem("myList", JSON.stringify(updated));
  };

  return (
    <div className="mylist-container max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6 text-center">
        My Saved Attractions 
      </h2>

      {saved.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          You haven't saved any attractions yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((a) => (
            <AttractionCard
              key={a.location_id}
              attraction={a}
              onRemove={() => removeAttraction(a.location_id)}
              showRemoveButton={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;
