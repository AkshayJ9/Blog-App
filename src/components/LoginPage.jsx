import React from "react";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    color: "#fff",
    padding: "20px",
  },
  formBox: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  },
  h2: {
    fontWeight: "600",
    color: "#4eaaff",
    marginBottom: "20px",
    fontSize: "1.6em",
    textAlign: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#ccc",
  },
  input: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  error: {
    color: "#dc3545",
    fontWeight: "600",
    marginTop: "4px",
    marginBottom: "10px",
    textAlign: "center",
  },
  buttonPrimary: {
    backgroundColor: "#0078d7",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    width: "100%",
    fontSize: "1em",
  },
  toggleText: {
    marginTop: "12px",
    textAlign: "center",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#4eaaff",
    cursor: "pointer",
    padding: 0,
    fontWeight: "600",
    fontSize: "1em",
  },
};

const LoginPage = ({
  isLoginMode,
  setIsLoginMode,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authError,
  onAuthenticate,
}) => (
  <div style={styles.container}>
    <div style={styles.formBox}>
      <h2 style={styles.h2}>{isLoginMode ? "Login" : "Sign Up"}</h2>
      {authError && <p style={styles.error}>{authError}</p>}
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.input}
          type="email"
          id="email"
          value={authEmail}
          onChange={(e) => setAuthEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="password">
          Password
        </label>
        <input
          style={styles.input}
          type="password"
          id="password"
          value={authPassword}
          onChange={(e) => setAuthPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button style={styles.buttonPrimary} onClick={onAuthenticate}>
        {isLoginMode ? "Login" : "Sign Up"}
      </button>

      <p style={styles.toggleText}>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          style={styles.toggleButton}
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  </div>
);

export default LoginPage;
