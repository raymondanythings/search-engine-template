import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { placeApi } from "./api/http";
import { IFetchPlace } from "./api/place";
import styled from "styled-components";
import Head from "./components/Head";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IFetchPlace[]>();
  const [search, setSearch] = useState("");

  const fetch = async () => {
    setLoading(true);
    const res = await placeApi.fetchPlace();
    setData(res.list);
    setLoading(false);
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setSearch(v);
  };

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setSearch("");
    const res = await placeApi.searchPlace(search);
    console.log(res);
    setData(res?.list);
    setLoading(false);
  }, [search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Head />
      <form className="py-2 w-full" onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleSearchInput}
          type="text"
          placeholder="검색어"
          className="px-2 py-1 w-fit block mx-auto ring-2 ring-blue-200 focus:outline-none rounded-sm focus:ring-blue-400 transition"
        />
      </form>
      <div className="w-fit mx-auto py-2 space-y-4">
        {loading
          ? "Loading..."
          : data?.length
          ? data.map((place) => (
              <div key={place.seq}>
                <ul className="space-y-2 flex flex-col justify-center items-center">
                  <li>
                    <Img src={place.imgUrl1} />
                  </li>
                  <li>{place.name}</li>
                </ul>
              </div>
            ))
          : "Place Not Found."}
      </div>
    </div>
  );
}

export default App;

const Img = styled.img`
  aspect-ratio: 16/9;
  width: 200px;
`;
