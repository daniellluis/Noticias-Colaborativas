import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api/api";
import { ErrorContext } from "../components/error";
import "./usersTop.css";

const UsersTop = () => {
  const [, setError] = useContext(ErrorContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    loadUsers();
  }, [setError]);

  return (
    <div className="container-top-aside">
      <h3 className="user-top-title">Top Usuarios</h3>
      <ul>
        {users
          .filter((user) => user.rol === "reader")
          .map((user) => (
            <Link to={`/OtherUserProfile/${user.id}`} key={user.id}>
              <li className="user-li-karma">
                <img
                  className="avatar-top-user"
                  src={
                    user.avatar
                      ? `${process.env.REACT_APP_STATIC}/images/profiles/${user.avatar}`
                      : "/avatar/defaul-profile-image.png"
                  }
                  alt="avatar"
                />
                <div className="karma">
                  <span className="name-list-top">{user.name}</span>
                  <span>Karma: {Math.round(user.mediaTop)}</span>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
export default UsersTop;
