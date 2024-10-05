// import "./SearchBar.css"; // Import your custom styles
import { useState } from "react";
import "./searchBar.module.css";

const SearchBar = ({ data, setSearchedData }) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cultural",
    "Tech",
    "Club Recruitment",
    "Sports",
    "Miscellaneous",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for "${query}" in category "${selectedCategory}"`);

    const filteredData = data.filter((item) => {
      if (selectedCategory === "All") {
        return true; // Keep all items if 'All' is selected
      }
      return item.category === selectedCategory;
    });

    setSearchedData(filteredData);

    // Implement your search logic here
  };

  return (
    <div className="search-bar" style={{ border: "none", padding: "20px" }}>
      <form
        onSubmit={handleSearch}
        className="d-flex align-items-center justify-content-flex-start"
      >
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedCategory}
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu show">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
