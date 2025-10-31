import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AttractionCard({ attraction, onRemove }) {
  const [image, setImage] = useState("/placeholder.jpg");
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await fetch(`/api/attractions/photos/${attraction.location_id}/`);
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setImage(data.photos[0].images?.large?.url || data.photos[0].images?.medium?.url || image);
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
      }
    };

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/attractions/details/${attraction.location_id}/`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };

    fetchPhoto();
    fetchDetails();
  }, [attraction.location_id]);

  const handleSave = () => {
    const list = JSON.parse(localStorage.getItem("myList")) || [];
    if (!list.find((a) => a.location_id === attraction.location_id)) {
      list.push(attraction);
      localStorage.setItem("myList", JSON.stringify(list));
      alert("Saved!");
    }
  };

  const goToDetails = () => {
    navigate(`/attraction/${attraction.location_id}`);
  };

  const rating = details?.rating || attraction.rating;
  const numReviews = details?.num_reviews || attraction.num_reviews;
  const categoryName = details?.category?.localized_name || attraction.category?.name;
  const subcategories = details?.subcategory?.map((sub) => sub.localized_name).join(", ") || "";

  return (
    <div
      onClick={goToDetails}
      className="bg-white shadow-md rounded-lg overflow-hidden w-64 m-2 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={image}
        alt={attraction.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{attraction.name}</h3>
        <p className="text-sm text-gray-600">{attraction.address_obj?.city}</p>

        {rating && (
          <p className="text-sm text-yellow-500">
            ⭐ {rating} ({numReviews})
          </p>
        )}

        {categoryName && (
          <p className="text-xs text-gray-500">
            {categoryName} {subcategories && `• ${subcategories}`}
          </p>
        )}

        <div className="mt-2">
          {onRemove ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttractionCard;
