import { useState, ChangeEvent, FormEvent } from "react";
import { useGetUsersQuery } from "../../RTK/Auth/AuthApi";

import "./HomeTop.css";

const HomeTop = () => {
  // State to store search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {data} = useGetUsersQuery()
  console.log(data);
  

  // Handle input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("Search term:", searchTerm);
    // You can trigger search API call here
  };

  return (
    <main>
      <div className="Body">
        <div className="landing">
          <div className="text-center">
            <h1>Homeless? Get a home now!</h1>
            <p>Helping 100 million homeless people find a home.</p>
          </div>

          {/* Search Input */}
          <form className="search-input text-center" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by location"
              className="rounded-pill"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Search icon click also triggers submit */}
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleSearchSubmit}
              role="button"
              style={{ cursor: "pointer" }}
            ></i>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomeTop;
