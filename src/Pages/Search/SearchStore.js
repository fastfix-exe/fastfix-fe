import { useEffect, useState } from "react";
import TextInput from "../../Components/Input/TextInput";
import userApi from "../../API/Services/userApi";
import StoreCardRow from "../../Components/Card/StoreCardRow";

const SearchStore = () => {
    const [stores, setStores] = useState();

    useEffect(() => {
        const getStores = async () => {
          try {
            const response = await userApi.getStores();
            if (response?.status === 200) {
              setStores(response.data);
            } else {
              console.log("No store");
            }
          } catch (error) {
            console.log(error);
          }
        };
        getStores();
      }, []);

  return (
    <div>
      <div className="mt-2 mb-4">
        <h1 className="text-center text-4xl">Search</h1>
      </div>
      <div className="my-2">
        <TextInput placeholder="Enter store's name" />
      </div>
      <div className="mt-8 mb-20">
        <div className="text-xl">Result</div>
            {stores &&
            stores.length > 0 &&
            stores.map((store) => {
                console.log(store);
              return <StoreCardRow key={store.id} store={store} />;
            })}
      </div>
    </div>
  );
};

export default SearchStore;
