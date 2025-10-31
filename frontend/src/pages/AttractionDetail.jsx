import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function AttractionDetail() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const res = await fetch(`/api/attractions/details/${id}/`);
        const data = await res.json();
        setAttraction(data);
      } catch (err) {
        console.error("Error fetching attraction:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttraction();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!attraction) return <div className="text-center mt-10">Not found</div>;

  const photos = attraction.photos || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/home" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-2">{attraction.name}</h1>
      <p className="text-gray-600 mb-4">{attraction.address_obj?.address_string}</p>

      {photos.length > 0 && (
        <img
          src={photos[0].images.large.url}
          alt={attraction.name}
          className="rounded-lg shadow-md mb-6"
        />
      )}

      <div className="space-y-2">
        {attraction.rating && (
          <p className="text-yellow-500">
            ⭐ {attraction.rating} ({attraction.num_reviews} reviews)
          </p>
        )}
        {attraction.category?.name && (
          <p className="text-sm text-gray-500">Category: {attraction.category.name}</p>
        )}
        {attraction.description && (
          <p className="text-gray-700">{attraction.description}</p>
        )}
        {attraction.website && (
          <a
            href={attraction.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Visit Website
          </a>
        )}
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {photos.slice(1, 7).map((p, i) => (
            <img
              key={i}
              src={p.images.medium.url}
              alt={`Photo ${i + 1}`}
              className="rounded-md shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AttractionDetail;
