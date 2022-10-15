import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApi from "../../API/Services/userApi";
import { BsStarHalf, BsLink45Deg } from "react-icons/bs";
import {
  AiFillPhone,
  AiFillMail,
  AiTwotoneStar,
  AiOutlineStar,
  AiOutlineSend,
} from "react-icons/ai";
import { FaWrench } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { MdLocationOn } from "react-icons/md";
import UserMap from "../../Components/UserMap/UserMap";
import { useSelector } from "react-redux";
import TextInput from "../../Components/Input/TextInput";

const customStar = {
  size: 30,
  isHalf: true,
  edit: false,
  emptyIcon: <AiOutlineStar />,
  halfIcon: <BsStarHalf />,
  filledIcon: <AiTwotoneStar />,
};

const StoreProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [store, setStore] = useState();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [thanks, setThanks] = useState(false);
  const [star, setStar] = useState(0);
  let params = useParams();

  const [openMap, setOpenMap] = useState(false);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const getComment = (e) => {
    setComment(e.target.value);
  };

  const postComment = async () => {
    try {
      const response = await userApi.postComment({
        storeId: params.id,
        content: comment,
      });
      if (response?.status === 200) {
        console.log(response.data);
        setComments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setComment("");
  };

  const ratingStore = async (data) => {
    setThanks(false);
    try {
      const response = await userApi.ratingStore({
        storeId: params.id,
        rating: data,
      });
      if (response?.status === 200) {
        setThanks(true);
      } else {
        console.log("Rating failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkData = () => {
      if (!params) {
        navigate("/dashboard");
      } else {
        try {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const response = await userApi.getStoreById({
              storeId: params.id,
              latitude: position.coords.latitude,
              longtitude: position.coords.longitude,
            });
            if (response?.status === 200) {
              // console.log(response.data);
              const cord = response.data.coordinates.split(", ");
              setLng(cord[1]);
              setLat(cord[0]);
              setRating({ ...customStar, value: response.data.rating });
              setStore(response.data);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getComments = async () => {
      try {
        const responseComment = await userApi.getStoreComment({
          storeId: params.id,
        });
        if (responseComment?.status === 200) {
          setComments(responseComment.data);
        } else {
          console.log("No comment");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getCurrentRating = async () => {
      try {
        const response = await userApi.getCurrentRating({
          storeId: params.id,
        });
        if (response?.status === 200) {
          setStar(response.data);
          if (response.data > 0) {
            setThanks(true);
          } else {
            setThanks(false);
          }
        } else {
          setRating(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkData();

    getComments();

    getCurrentRating();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!openMap && (
        <>
          <div className="bg-orange h-48 w-full pt-8">
            <h1 className="text-center text-white text-4xl">Profile</h1>
          </div>
          {store && (
            <div>
              <div className="-translate-y-20">
                <div className=" w-full overflow-hidden flex justify-center">
                  <img
                    src={store.avatarPicture}
                    alt="a"
                    className="w-48 bg-white rounded-full border border-1 border-black p-1"
                  />
                </div>
                <div>
                  <div className="text-center text-3xl font-bold my-5">
                    {store.storeName ? store.storeName.toUpperCase() : store.employeeName.toUpperCase()}
                  </div>
                  <div className="flex justify-center">
                    <ReactStars {...rating} />
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-2xl font-medium">Information</div>
                  <hr />
                  <div
                    className="flex items-center text-xl py-4 cursor-pointer hover:shadow-md underline"
                    onClick={() =>
                      window.open(
                        `tel:+${store.phoneNumber}`,
                        "",
                        "width=400,height=400"
                      )
                    }
                  >
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <AiFillPhone className="text-xl" />
                    </div>
                    {store.phoneNumber}
                    <div>
                      <BsLink45Deg />
                    </div>
                  </div>
                  <hr />
                  <div
                    className="flex items-center text-xl py-4 cursor-pointer hover:shadow-md"
                    onClick={() => setOpenMap(true)}
                  >
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <MdLocationOn className="text-xl" />
                    </div>
                    <div className="underline">See store on map</div>
                    <div>
                      <BsLink45Deg />
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center text-xl py-4">
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <AiFillMail className="text-xl" />
                    </div>
                    {store.email}
                  </div>
                  <hr />
                  <div className="flex items-center text-xl py-4">
                    <div className="rounded-full p-1 bg-orange text-white mr-3">
                      <FaWrench className="text-xl" />
                    </div>
                    {store.emergency.type.toUpperCase()}
                  </div>
                  <hr />
                </div>
                <div className="my-4">
                  <h1>Comment</h1>
                </div>
                <hr />
                <div className="mt-1">
                  {thanks ? (
                    <div className="text-center text-red-600">
                      Thanks for your rating
                    </div>
                  ) : (
                    <div className="text-center">Rating this store</div>
                  )}
                  <div className="flex justify-center py-2">
                    <ReactStars
                      key={`stars_${star}`}
                      size={30}
                      count={5}
                      isHalf={false}
                      value={star}
                      emptyIcon={<AiOutlineStar />}
                      filledIcon={<AiTwotoneStar />}
                      onChange={ratingStore}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="rounded-full w-12"
                        src={user.loginUser.avatarPicture}
                        alt="a"
                      />
                    </div>
                    <div className="w-full">
                      <TextInput
                        name="comment"
                        value={comment}
                        onChange={getComment}
                        placeholder="Comment"
                      />
                    </div>
                    <div
                      onClick={postComment}
                      className="ml-4 p-2 bg-orange text-white rounded-full cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <AiOutlineSend />
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
                <div>
                  {comments &&
                    comments.length > 0 &&
                    comments.map((comment, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 my-4"
                        >
                          <div>
                            <img
                              className="rounded-full w-12"
                              src={comment.avatar}
                              alt="a"
                            />
                          </div>
                          <div>
                            <div className="font-bold">{comment.name}</div>
                            <div>{comment.content}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {openMap && (
        <div>
          <UserMap lat={lat} lng={lng} store={store} />
        </div>
      )}
    </div>
  );
};

export default StoreProfile;
