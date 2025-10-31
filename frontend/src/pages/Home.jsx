import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard";
import Carousel from "../components/Carousel";

function Home() {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const country = localStorage.getItem("country");
  const profile = localStorage.getItem("profile");

  useEffect(() => {
    if (!country) {
      window.location.href = "/";
      return;
    }

    const fetchAttractions = async () => {
      try {
        const res = await fetch(
          `/api/attractions/home/?country=${country}&profile=${profile}`
        );
        const data = await res.json();
        console.log("Backend response:", data);
        setAttractions(data.results || data.data || []);
      } catch (err) {
        console.error("Error fetching attractions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [country, profile]);

 
  const topAttractions = attractions.slice(0, 5);
  const suggestedAttractions = attractions.slice(5);

  return (
    <div className="home-container max-w-7xl mx-auto px-4 py-8">
    
      <section className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6 text-center">
          Top Attractions in {country}
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading attractions...</p>
        ) : topAttractions.length > 0 ? (
          <Carousel items={topAttractions} />
        ) : (
          <p className="text-gray-500 text-center">
            No top attractions found for {country}.
          </p>
        )}
      </section>

      
      <section>
        <h3 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
          You may also like
        </h3>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 animate-pulse h-64"
                ></div>
              ))
            : suggestedAttractions.length > 0 ? (
                suggestedAttractions.map((a) => (
                  <AttractionCard key={a.location_id} attraction={a} />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                  No suggestions available at the moment.
                </p>
              )}
        </div>
      </section>
    </div>
  );
}

export default Home;
