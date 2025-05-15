import React from "react";

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px 20px",
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
  },
  h2: {
    fontWeight: "600",
    color: "#4eaaff",
    fontSize: "1.8em",
    marginBottom: "20px",
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
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  textarea: {
    padding: "10px",
    fontSize: "1em",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    minHeight: "120px",
    resize: "vertical",
  },
  error: {
    color: "#dc3545",
    fontWeight: "600",
    marginTop: "4px",
    marginBottom: "10px",
  },
  buttonPrimary: {
    backgroundColor: "#0078d7",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    marginRight: "10px",
    transition: "background-color 0.3s",
  },
  buttonDanger: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  buttonGroup: {
    marginTop: "10px",
  },
};

const BlogFormPage = ({
  page,
  blogTitle,
  setBlogTitle,
  blogContent,
  setBlogContent,
  formError,
  onSubmit,
  onCancel,
}) => (
  <div style={styles.container}>
    <h2 style={styles.h2}>
      {page === "create" ? "Create New Blog Post" : "Edit Blog Post"}
    </h2>

    {formError && <p style={styles.error}>{formError}</p>}

    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="title">
        Title
      </label>
      <input
        style={styles.input}
        type="text"
        id="title"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        placeholder="Enter blog title"
        maxLength={200}
        autoFocus
      />
    </div>

    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="content">
        Content
      </label>
      <textarea
        style={styles.textarea}
        id="content"
        value={blogContent}
        onChange={(e) => setBlogContent(e.target.value)}
        placeholder="Write your blog content here..."
      />
    </div>

    <div style={styles.buttonGroup}>
      <button style={styles.buttonPrimary} onClick={onSubmit}>
        {page === "create" ? "Publish Blog" : "Update Blog"}
      </button>
      <button style={styles.buttonDanger} onClick={onCancel}>
        Cancel
      </button>
    </div>
  </div>
);

export default BlogFormPage;
