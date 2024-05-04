import logo from "./logo.svg";
import "./App.css";
import Card from "./Card";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(null);

  const limit = 6;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && hasMore) {
          console.log("intersecting");
          setOffset((currentOffset) => currentOffset + limit);
        }
      });
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
      );

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((existingProducts) => {
          const newItems = response.data.filter(
            (product) =>
              existingProducts?.findIndex((p) => p.id === product.id) === -1
          );
          return [...(existingProducts || []), ...newItems];
        });
      }
      setLoading(false);
    };
    fetchProducts();
  }, [offset]);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>React infinite scroll</h1>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <>
            {products.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
            {hasMore && (
              <div ref={loadingRef} style={{ margin: "4px 0" }}>
                Loading...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
