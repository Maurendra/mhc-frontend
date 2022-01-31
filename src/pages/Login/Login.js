import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../AuthContext";
import UserRepositories from "../../config/data/Repositories/UserRepositories";

export default () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAuth } = React.useContext(AuthContext);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const getUsers = async () => {
    const res = await UserRepositories.fetchUsers();
    if (res.data) {
      let users = res.data;
      users.map((user, index) => {
        if (user.username == username && user.password == password) {
          let auth = { id: user._id, role: user.type, name: user.name };
          setAuth(auth);
        }
      });
    }
  };

  const login = async () => {
    await getUsers();
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-2/6 mb-4">
        <p className="text-2xl font-bold">MHC</p>
        <p className="mb-4 text-xs">Event Organizer</p>
        <div className="bg-blue-900 p-8 rounded-lg border-2 ">
          <h1 className="font-bold text-4xl text-white mb-4">Sign In</h1>
          <div className="mb-4">
            <div className="mb-4">
              <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                <input
                  type="text"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Username"
                  value={username}
                  onChange={handleChangeUsername}
                ></input>
              </div>
            </div>
            <div>
              <div className="w-full bg-neutral-50 py-4 px-8 border-2 border-neutral-300 items-center rounded-lg flex space-x-4">
                <input
                  type="password"
                  className="text-neutral-500 placeholder-gray-300 text-base leading-6 flex-1 bg-neutral-50 border-none focus:outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={handleChangePassword}
                ></input>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between mb-8">
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label inline-block text-white"
                htmlFor="flexCheckDefault"
              >
                Remember Me
              </label>
            </div>
            <p className="text-white text-base font-bold">Forget Password?</p>
          </div>
          <div
            className="flex items-center w-full justify-center"
            onClick={login}
          >
            <div className="bg-white hover:bg-blue-400 hover:text-white border-2 border-neutral-600 rounded-lg py-4 px-12 cursor-pointer w-fit">
              <p className="font-bold">Sign In</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
