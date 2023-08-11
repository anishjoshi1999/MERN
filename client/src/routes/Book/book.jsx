import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseURL = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseURL
        if(selectedCategory){
            url += `?category=${selectedCategory}`
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error fetching data.Please try again later.")
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Books</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, dolorem?
      </p>

      <h2>Fetch Example</h2>
      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All</option>
            <option value="romance">romance</option>
            <option value="science">science</option>
            <option value="crime">crime</option>
            <option value="food">food</option>
            <option value="adventure">adventure</option>
            <option value="thriller">thriller</option>
            <option value="fiction">fiction</option>
            <option value="other">other</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>{error}</p>
      ): (
      <ul className="books">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`/books/${item.slug}`}>
              <img
                src={`http://localhost:8000/uploads/${item.thumbnail}`}
                alt={item.title}
              />
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default Book;
