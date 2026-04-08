// src/components/Notification.jsx
import React from "react";

function Notification({ notification, markAsRead, deleteNotification }) {
  const typeColors = {
    info: "#cce5ff",
    success: "#d4edda",
    warning: "#fff3cd",
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "5px 0",
        padding: "5px",
        backgroundColor: typeColors[notification.type || "info"],
        borderRadius: "5px",
        transition: "all 0.3s ease",
      }}
    >
      <p><strong>{notification.text}</strong></p>
      <p style={{ fontSize: "12px", color: "#555" }}>{notification.time}</p>
      <div>
        {!notification.read && (
          <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
        )}{" "}
        <button onClick={() => deleteNotification(notification.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Notification;