import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.user.users);
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  console.log(users);
  console.log(currentUser);

  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center">
      {users.map((user, index) => {
        const isCurrent = currentUser?.email === user.email;

        return (
          <div
            key={index}
            className="w-[300px] rounded-xl shadow-lg overflow-hidden bg-white relative"
          >
            <div className="h-28 bg-cyan-400 flex justify-center items-end relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white absolute -bottom-10">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.fullname
                  )}&background=random`}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-14 pb-4 px-6 text-center">
              <h3 className="text-lg font-semibold">{user.fullname}</h3>
              <p className="text-gray-500 text-sm">{user.role ?? "Unknown"}</p>
            </div>

            {isCurrent && (
              <button
                onClick={handleLogout}
                className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded"
              >
                Logout
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
