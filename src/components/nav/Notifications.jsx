import React from "react";
import "../../styles/nav/Notifications.css";

function Notifications({ notificationsArr, setShowNotifications }) {
  return (
    <div
      className="notifications"
      onMouseLeave={() => setShowNotifications(false)}
    >
      {notificationsArr.map((note, index) => (
        <div className="note" key={index}>
          <p>
            {note.id} - {note.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
