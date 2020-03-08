import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  // to show data from useEffect, 1. need to put data from promise in STATE

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    //reaching out to api is sideffect
    // axios
    //   .get("http://hn.algolia.com/api/v1/search?query=reacthooks")
    //   .then(response => {
    //     setResults(response.data.hits);
    //   });
    // [] means the useEffect function runs only on componentMount and NOT on any updates
    // to call fetch value based on 'query' value change - pass it into array as DEPENDENCY
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery("");
    // 'current' proprefers points to mointed text input element
    searchInputRef.current.focus();
  };
  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purlpe-200 shadow-lg  rounded">
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form className="mb-2" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button
          className="bg-green-700 text-white m-1 p-1 rounded"
          type="submit"
        >
          Search
        </button>
        <button
          className="bg-orange-700 text-white rounded p-1"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-orange-dark ">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                className="text-indigo-600 hover:text-indigo-700"
                href={result.url}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-700 font-bold">{error.message}</div>}
    </div>
  );
}
