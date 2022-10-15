import { useEffect, useState } from "react";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import CheckBox from "../../Components/Input/CheckBox";
import ConfirmButton from "../../Components/Button/ConfirmButton";
import userApi from "../../API/Services/userApi";
import StoreCardEmergency from "../../Components/Card/StoreCardEmergency";

const Emergency = () => {
  const [bike, setBike] = useState(true);
  const [showStores, setShowStores] = useState(false);
  const [stores, setStores] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [requestStatus, SetRequestStatus] = useState(-1);
  const [requestInformation, setRequestInformation] = useState({});

  useEffect(() => {
    const getCustomerRequest = async () => {
      try {
        const responseComment = await userApi.getCustomerEmergencyRequest();
        if (responseComment?.status === 200) {
          if (responseComment.data) {
            SetRequestStatus(responseComment.data.status);
            setRequestInformation(responseComment.data);
          }
        } else {
          console.log("No comment");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCustomerRequest();
  }, []);

  const getStores = () => {
    setShowStores(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await userApi.getStores({
          longtitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        if (response?.status === 200) {
          setStores(response.data);
        } else {
          console.log("No store");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const changeIsCalling = (data) => {
    setIsCalling(data);
  };

  const changeRequestStatus = (data) => {
    SetRequestStatus(data);
  };

  const cancelRequest = async () => {
    try {
      const responseComment = await userApi.updateEmergencyRequest({
        id: requestInformation.id,
        status: -1,
      });
      if (responseComment?.status === 200) {
        SetRequestStatus(-1);
        setBike(true);
        setShowStores(false);
        setIsCalling(false);
        setRequestInformation({});
      } else {
        console.log("No comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {requestStatus === -1 && (
        <div>
          {showStores ? (
            <div>
              <div>
                <h3
                  className="cursor-pointer text-orange"
                  onClick={() => setShowStores(false)}
                >
                  Back
                </h3>
              </div>
              <div className="mt-8 mb-20">
                <div className="text-xl">Result</div>
                {stores &&
                  stores.length > 0 &&
                  stores.map((store) => {
                    if (bike) {
                      if (store.emergency.type === "bike") {
                        return (
                          <StoreCardEmergency
                            changeRequestStatus={changeRequestStatus}
                            isCalling={isCalling}
                            changeIsCalling={changeIsCalling}
                            key={store.id}
                            store={store}
                          />
                        );
                      }
                    } else {
                      if (store.emergency.type === "car") {
                        return (
                          <StoreCardEmergency
                            changeRequestStatus={changeRequestStatus}
                            isCalling={isCalling}
                            changeIsCalling={changeIsCalling}
                            key={store.id}
                            store={store}
                          />
                        );
                      }
                    }

                    return <></>;
                  })}
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-2 mb-4">
                <h1 className="text-center text-4xl">Emergency</h1>
              </div>
              <div className="mt-2 mb-4">
                <h2 className="text-center">Describe your problems</h2>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="rounded-lg flex items-center py-3 px-4 w-fit bg-gray-100">
                    <div
                      className={`px-8 py-1 rounded-md cursor-pointer text-lg flex items-center justify-center ${
                        bike
                          ? "text-orange shadow-md bg-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      onClick={() => setBike(true)}
                    >
                      <RiMotorbikeFill className="mr-2" />
                      <div>Bike</div>
                    </div>
                    <div
                      className={`px-8 py-1 rounded-md cursor-pointer text-lg flex items-center justify-center ${
                        !bike
                          ? "text-orange shadow-md bg-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                      onClick={() => setBike(false)}
                    >
                      <FaCarSide className="mr-2" />
                      <div>Car</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="py-3 cursor-pointer text-xl">
                  <CheckBox label="Flat tire" />
                  <hr />
                </div>
                <div className="py-3 cursor-pointer text-xl">
                  <CheckBox label="Out of gas" />
                  <hr />
                </div>
                <div className="py-3 cursor-pointer text-xl">
                  <CheckBox label="Burning bike" />
                  <hr />
                </div>
                <div className="py-3 cursor-pointer text-xl">
                  <CheckBox label="Unable to move" />
                  <hr />
                </div>
                <div className="py-3 cursor-pointer text-xl">
                  <CheckBox label="Undefined" />
                  <hr />
                </div>
              </div>
              <div className="mt-20">
                <ConfirmButton text="Find now" onClick={getStores} />
              </div>
            </div>
          )}
        </div>
      )}
      {requestStatus === 0 && (
        <div className="flex-col text-center mt-8 text-green-500">
          <p className="text-xl">Your Emergency Request is pending</p>
          <button
            onClick={cancelRequest}
            className="rounded-md bg-red-500 text-white p-2 hover:shadow-md mt-4"
          >
            Cancel emergency request
          </button>
        </div>
      )}
    </>
  );
};
export default Emergency;
