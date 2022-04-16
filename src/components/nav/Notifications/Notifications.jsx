import React from "react";
import "./Notifications.css";
import { DeleteOutline } from "@material-ui/icons";

function Notifications({
  notifications,
  setNotifications,
  setShowNotifications,
}) {
  const handleNotification = (id) => {
    setNotifications((prevState) => prevState.filter((note) => note.id !== id));
  };

  return (
    <div
      className="notifications"
      onMouseLeave={() => setShowNotifications(false)}
    >
      {notifications.map(({ id, message }, index) => (
        <div className="note" key={index}>
          <p>
            <DeleteOutline
              className="delete-icon"
              fontSize="small"
              color="error"
              onClick={() => handleNotification(id)}
            />
            {index + 1} - {message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
