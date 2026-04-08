// src/components/Dashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import Notification from "./Notification";

function Dashboard({ user }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Welcome to the system!",
      read: false,
      type: "info",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [filter, setFilter] = useState("all");
  const listRef = useRef(null);

  // auto scroll when new notification comes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [notifications]);

  const addNotification = (text = "New notification received!", type = "info") => {
    const newNotification = {
      id: Date.now(),
      text,
      read: false,
      type,
      time: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [...prev, newNotification]);

    const soundFile = type === "warning" ? "/alert-loud.mp3" : "/alert.mp3";
    const audio = new Audio(soundFile);
    audio.volume = 1.0;
    audio.play().catch(() => {});
  };

  // 🔔 automatic notifications (3 sec interval, stop after 5)
  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (count < 5) {
        addNotification("Automatic system notification", "info");
        count++;
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter(
    (n) => filter === "all" || !n.read
  );

  return (
    <div style={{ padding: "20px", maxWidth: "450px", margin: "auto" }}>
      <h2>Welcome, {user}!</h2>
      <p>Unread Notifications: {unreadCount}</p>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => addNotification("Info: Welcome!", "info")}>
          Add Info
        </button>{" "}
        <button onClick={() => addNotification("Success: Task done!", "success")}>
          Add Success
        </button>{" "}
        <button onClick={() => addNotification("Warning: Check system!", "warning")}>
          Add Warning
        </button>{" "}
        <button onClick={clearAll}>Clear All</button>
      </div>

      <div
        ref={listRef}
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {filteredNotifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          filteredNotifications.map((n) => (
            <Notification
              key={n.id}
              notification={n}
              markAsRead={markAsRead}
              deleteNotification={deleteNotification}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
