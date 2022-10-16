import { useEffect, useState } from "react";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide } from "react-icons/fa";
import CheckBox from "../../Components/Input/CheckBox";
import ConfirmButton from "../../Components/Button/ConfirmButton";
import userApi from "../../API/Services/userApi";
import StoreCardEmergency from "../../Components/Card/StoreCardEmergency";
import UserMap from "../../Components/UserMap/UserMap";
import { useSelector } from "react-redux";
import EmployeeMap from "../../Components/UserMap/EmployeeMap";

const EmployeeEmergency = ({ socket }) => {
  const user = useSelector((state) => state.user.user);
  const [requestInformation, setRequestInformation] = useState({});
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [isHasRequest, setIsHasRequest] = useState(false);
  const [loadCord, setLoadCord] = useState(false);

  // useEffect(() => {
  //   const getCustomerRequest = async () => {
  //     try {
  //       const responseComment = await userApi.getCustomerEmergencyRequest();
  //       if (responseComment?.status === 200) {
  //         if (responseComment.data) {
  //           SetRequestStatus(responseComment.data.status);
  //           setRequestInformation(responseComment.data);
  //         }
  //       } else {
  //         console.log("No comment");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   socket.on("changed-request", (data) => {
  //     console.log(data);
  //     if (data) {
  //       const cords = data.operator.coordinates.split(", ");
  //       setLat(cords[0]);
  //       setLng(cords[1]);
  //     }
  //     getCustomerRequest();
  //   });
  // }, [socket]);

  useEffect(() => {
    socket.on("customer-change-coordinates", (data) => {
      console.log(user);
      if (data.employeeId === user.loginStore.id) {
        setIsHasRequest(true);
        const cords = data.customerCoordinates.split(", ");
        setLat(cords[1]);
        setLng(cords[0]);
        setLoadCord(true);
      }
    });
  }, [socket]);

  useEffect(() => {
    setInterval(async () => {
      if (isHasRequest || user.loginStore.currentRequestId) {
        try {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const coordinate = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            };

            const responseComment = await userApi.changeEmployeePosition({
              requestId: user.loginStore.currentRequestId,
              coordinates: `${coordinate.longitude}, ${coordinate.latitude}`,
            });
            if (responseComment?.status === 200) {
              if (responseComment.data) {
              }
            } else {
              console.log("No comment");
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }, 10000);
  }, []);

  return (
    <div>
      <div className="mt-2 mb-4">
        <h1 className="text-center text-4xl">Request</h1>
      </div>
      <>
        {loadCord ? (
          <EmployeeMap lng={lng} lat={lat} />
        ) : (
          <div className="h-96 flex items-center justify-center">
            <h1 className="text-2xl text-center">There's no requests at the moment</h1>
          </div>
        )}
      </>
    </div>
  );
};
export default EmployeeEmergency;
