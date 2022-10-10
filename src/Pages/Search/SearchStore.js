import { useEffect, useState } from "react";
import TextInput from "../../Components/Input/TextInput";
import userApi from "../../API/Services/userApi";
import StoreCardRow from "../../Components/Card/StoreCardRow";
import { useNavigate } from "react-router-dom";

const SearchStore = () => {
  const [stores, setStores] = useState([]);
  const [clientStores, setClientStores] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getSearch = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);

    searchStore(searchData);
  };

  const searchStore = (data) => {
    if (data) {
      setStores([]);
      const listStores = [];
      clientStores.map((store) => {
        if (store.storeName.includes(data)) {
          listStores.push(store);
        }
      });
      setStores(listStores);
    } else {
      setStores(clientStores);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getStores({
        longtitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });

    const getStores = async (position) => {
      try {
        const response = await userApi.getStores(position);
        if (response?.status === 200) {
          setStores(response.data);
          setClientStores(response.data);
        } else {
          console.log("No store");
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <div>
      <div className="mt-2 mb-4">
        <h1 className="text-center text-4xl">Search</h1>
      </div>
      <div className="my-2">
        <TextInput
          placeholder="Enter store's name"
          name="search"
          value={search}
          onChange={getSearch}
        />
      </div>
      <div className="mt-8 mb-20">
        <div className="text-xl">Result</div>
        {stores &&
          stores.length > 0 &&
          stores.map((store) => {
            return (
              <StoreCardRow
                key={store.id}
                store={store}
                onClick={() => navigate(`/store/${store.id}`)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchStore;
