import React from "react";

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderBottom: "1px solid #444",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "linear-gradient(to right, #1e1e1e, #121212)",
    backdropFilter: "blur(10px)",
    transition: "background-color 0.3s ease",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    userSelect: "none",
    cursor: "pointer",
  },
  outerContainer: {
    width: "100%",
    maxWidth: "800px", // Match maxWidth with App.jsx
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between", // Title left, buttons right
    alignItems: "center",
    padding: "20px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: "#f0f0f0",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2196f3",
    cursor: "pointer",
    userSelect: "none",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  button: {
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",

    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "background-color 0.3s ease",
  },
  userLabel: {
    fontWeight: "500",
    color: "#ccc",
    fontSize: "0.95rem",
    marginRight: "10px",
  },
};

const Header = ({ user, onLogout, onNavigate }) => {
  const handleNavigateHome = () => onNavigate("list");

  return (
    <div style={styles.wrapper}>
      <div style={styles.outerContainer}>
        <header style={styles.container}>
          <div
            style={styles.title}
            role="button"
            tabIndex={0}
            onClick={handleNavigateHome}
            onKeyDown={(e) => e.key === "Enter" && handleNavigateHome()}
            aria-label="Go to blog homepage"
            title="React Blog App"
          >
            Blog App
          </div>

          <nav style={styles.nav} aria-label="Main Navigation">
            {user ? (
              <>
                <span style={styles.userLabel}>Hi, {user.email}</span>
                <button
                  style={styles.button}
                  onClick={() => onNavigate("create")}
                >
                  New Post
                </button>
                <button style={styles.button} onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button style={styles.button} onClick={() => onNavigate("login")}>
                Login / Signup
              </button>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;
