import React from "react";

const styles = {
  pageWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    margin: "0 auto",
    width: "100%",
    maxWidth: "8000px",
    boxSizing: "border-box",
    justifyContent: "center",
    backgroundColor: "#121212",
    minHeight: "100vh",
  },
  container: {
    width: "100%",
    maxWidth: "800px",
    padding: "30px 20px",
    backgroundColor: "#000000",
    color: "#fff",
  },
  title: {
    fontSize: "2em",
    color: "#4eaaff",
    marginBottom: "10px",
    fontWeight: "600",
  },
  blogMeta: {
    fontSize: "0.95em",
    color: "#bbb",
    marginBottom: "15px",
    fontWeight: "4000",
  },
  blogContent: {
    whiteSpace: "pre-wrap",
    fontSize: "1.1em",
    color: "#ddd",
    lineHeight: "1.6",
  },
  buttonPrimary: {
    backgroundColor: "#0078d7",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "10px",
    marginTop: "25px",
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
    marginTop: "25px",
    transition: "background-color 0.3s",
  },
  backButton: {
    backgroundColor: "#333",
    color: "#ccc",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "columns",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "25px",
    transition: "background-color 0.3s",
  },
};

const formatDate = (isoString) => {
  const d = new Date(isoString);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetailPage = ({ blog, canEditDelete, onEdit, onDelete, onBack }) => {
  if (!blog) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <p style={{ color: "#ccc" }}>Blog post not found.</p>
          <button style={styles.backButton} onClick={onBack}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>{blog.title}</h2>
        <div style={styles.blogMeta}>
          By <strong>{blog.author}</strong> on {formatDate(blog?.createdAt)}
        </div>
        <div style={styles.blogContent}>{blog.content}</div>

        {canEditDelete(blog) && (
          <div>
            <button style={styles.buttonPrimary} onClick={() => onEdit(blog)}>
              Edit
            </button>
            <button
              style={styles.buttonDanger}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this blog post?"
                  )
                ) {
                  onDelete(blog.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        )}

        <div>
          <button style={styles.backButton} onClick={onBack}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
