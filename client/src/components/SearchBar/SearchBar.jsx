import "./SearchBar.css";

function SearchBar({

    value,

    onChange,

    placeholder = "Search..."

}) {

    return (

        <div className="search-box">

            <span>

                🔍

            </span>

            <input

                value={value}

                onChange={onChange}

                placeholder={placeholder}

            />

        </div>

    );

}

export default SearchBar;