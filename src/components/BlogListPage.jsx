import React from "react";

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#000000",
    minHeight: "100vh",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  container: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#000000", // Ensure same as pageWrapper
    color: "#fff",
  },

  header: {
    fontSize: "1.8em",
    marginBottom: "20px",
    color: "#4eaaff",
    fontWeight: "600",
  },

  blogPost: {
    borderBottom: "1px solid #444",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

  blogTitle: {
    margin: "0 0 8px 0",
    color: "#4eaaff",
    fontSize: "1.5em",
    fontWeight: "600",
  },

  blogMeta: {
    fontSize: "0.95em",
    color: "#bbb",
    marginBottom: "10px",
  },

  blogContentPreview: {
    fontSize: "1em",
    color: "#ddd",
    lineHeight: "1.5",
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    flexWrap: "wrap",
    gap: "10px",
  },

  pageButton: {
    cursor: "pointer",
    border: "1px solid #4eaaff",
    color: "#4eaaff",
    backgroundColor: "#1a1a1a",
    padding: "8px 14px",
    borderRadius: "6px",
    fontWeight: "600",
    minWidth: "36px",
    textAlign: "center",
    userSelect: "none",
    fontSize: "1em",
  },

  pageButtonActive: {
    cursor: "default",
    borderColor: "#0078d7",
    backgroundColor: "#0078d7",
    color: "white",
  },

  createLink: {
    background: "none",
    border: "none",
    color: "#4eaaff",
    cursor: "pointer",
    padding: 0,
    fontWeight: "600",
    fontSize: "1em",
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

const BlogListPage = ({
  blogs,
  onSelectBlog,
  user,
  currentPageNumber,
  totalPages,
  onPageChange,
}) => (
  <div style={styles.pageWrapper}>
    <div style={styles.container}>
      <h2 style={styles.header}>All Blog Posts</h2>

      {blogs.length === 0 && (
        <p style={{ color: "#ccc" }}>
          No blog posts yet.{" "}
          {user && (
            <button
              style={styles.createLink}
              onClick={() => onPageChange("create")}
            >
              Create one!
            </button>
          )}
        </p>
      )}

      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={styles.blogPost}
          onClick={() => onSelectBlog(blog.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSelectBlog(blog.id);
            }
          }}
        >
          <h3 style={styles.blogTitle}>{blog.title}</h3>
          <div style={styles.blogMeta}>
            By <strong>{blog.author}</strong> on {formatDate(blog.createdAt)}
          </div>
          <p style={styles.blogContentPreview}>
            {blog.content.length > 150
              ? blog.content.slice(0, 150) + "…"
              : blog.content}
          </p>
        </div>
      ))}

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            style={
              currentPageNumber === 1
                ? { ...styles.pageButton, ...styles.pageButtonActive }
                : styles.pageButton
            }
            onClick={() =>
              currentPageNumber > 1 && onPageChange(currentPageNumber - 1)
            }
            disabled={currentPageNumber === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              style={
                currentPageNumber === i + 1
                  ? { ...styles.pageButton, ...styles.pageButtonActive }
                  : styles.pageButton
              }
              onClick={() => onPageChange(i + 1)}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            style={
              currentPageNumber === totalPages
                ? { ...styles.pageButton, ...styles.pageButtonActive }
                : styles.pageButton
            }
            onClick={() =>
              currentPageNumber < totalPages &&
              onPageChange(currentPageNumber + 1)
            }
            disabled={currentPageNumber === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  </div>
);

export default BlogListPage;
