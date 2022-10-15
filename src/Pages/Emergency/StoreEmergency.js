import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../API/Services/userApi";
import EmployeeCard from "../../Components/Card/EmployeeCard";
import RequestCard from "../../Components/Card/RequestCard";

const StoreEmergency = () => {
  const user = useSelector((state) => state.user.user);
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const getRequests = async () => {
      try {
        if (user) {
          const response = await userApi.getEmergencyRequest({
            storeId: user.loginStore.id,
          });
          if (response?.status === 200) {
            setRequests(response.data);
          } else {
            console.log("No request");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRequests();
  }, [user]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        if (user) {
          const response = await userApi.getEmployee({
            storeId: user.loginStore.id,
          });
          if (response?.status === 200) {
            setEmployees(response.data);
          } else {
            console.log("No employee");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEmployees();
  }, [user]);

  return (
    <div>
      <div className="mt-2 mb-4">
        {popup ? (
          <h1 className="text-center text-4xl">Employees</h1>
        ) : (
          <h1 className="text-center text-4xl">Emergency</h1>
        )}
      </div>
      {popup ? (
        <>
          <div>
            <div className="text-orange text-left text-sm cursor-pointer" onClick={() => setPopup(false)}>Back</div>
          </div>
          <div>
            {employees &&
              employees.length > 0 &&
              employees.map((employee, index) => {
                if (employee.currentRequestId === null) {
                  return <EmployeeCard key={index} employee={employee} />;
                }
                return <></>;
              })}
          </div>
        </>
      ) : (
        <div>
          {requests &&
            requests.length > 0 &&
            requests.map((request, index) => {
              return (
                <RequestCard
                  key={index}
                  onClick={() => setPopup(true)}
                  request={request}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default StoreEmergency;
