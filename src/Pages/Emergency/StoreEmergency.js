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
  const [selectedRequestId, setSelectedRequestId] = useState();

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

  const onSelectRequest = (data) => {
    setPopup(true);
    setSelectedRequestId(data);
  };

  const onAssignEmployee = async (data) => {
    // ASSGIN EMPLOYEE
    try {

      const responseComment = await userApi.assignEmployee({
        requestId: selectedRequestId,
        employeeId: data,
      });
      if (responseComment?.status === 200) {
        clearData();
      } else {
        console.log("No comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearData = () => {
    setSelectedRequestId();
    setPopup(false);
  };

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
            <div
              className="text-orange text-left text-sm cursor-pointer"
              onClick={clearData}
            >
              Back
            </div>
          </div>
          <div>
            {employees &&
              employees.length > 0 &&
              employees.map((employee, index) => {
                if (employee.currentRequestId === null) {
                  return (
                    <EmployeeCard
                      onAssignEmployee={onAssignEmployee}
                      key={index}
                      employee={employee}
                    />
                  );
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
                  onClick={() => onSelectRequest(request.id)}
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
