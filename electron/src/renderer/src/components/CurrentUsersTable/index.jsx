import { useEffect } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router";
export const CurrentUsersTable = ({ users, user_role }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th className="table-header" colSpan="7">
            Current Drivers
          </th>
        </tr>
        <tr>
          <th></th>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          {user_role === "driver" && <th>Car</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td></td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {user_role === "driver" && <td>{user.driver.car.model}</td>}
            <td className="status flex">
              <Button
                text={"View"}
                handleOnClick={() => {
                  user_role === "driver" ? navigate(`/viewDriver/${user.id}`) : navigate(`/viewPassenger/${user.id}`);
                }}
                type={"button"}
                className="accept-btn"
              />
              <Button className={"accept-btn"} text={"Chat"} handleOnClick={() => navigate(`/chat/${user.id}`)} type={"button"} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
