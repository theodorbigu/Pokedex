import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useEffect } from "react";
import { GetPokemonList } from "../actions/pokemonActions";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };

  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  const showData = () => {
    if (!_.isEmpty(pokemonList.data)) {
      return pokemonList.data.map((e) => {
        return (
          <div className={"list-wrapper"}>
            <div className={"pokemon-item"}>
              <p>{e.name}</p>
              <Link to={`/pokemon/${e.name}`}>View</Link>
            </div>
          </div>
        );
      });
    }

    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };
  return (
    <div>
      <div className={"search-wrapper"}>
        <p>Search: </p>
        <input type="text" onChange={e => setSearch(e.target.value)}></input>
        <button onClick={() => props.history.push(`/pokemon/${search.toLowerCase()}`)}>Search</button>
      </div>
      {showData()}
      {!_.isEmpty(pokemonList.data) && (
          <ReactPaginate 
          pageCount={Math.ceil(pokemonList.count /15)}
          pageRangeDisplay={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected +1)}
          />
      )}
    </div>
  );
};

export default PokemonList;
