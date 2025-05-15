import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import BlogListPage from "./components/BlogListPage";
import BlogDetailPage from "./components/BlogDetailPage";
import BlogFormPage from "./components/BlogFormPage";
import "./App.css";

const POSTS_PER_PAGE = 5;

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("blogapp_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("blogapp_blogs");
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  const [currentPage, setCurrentPage] = useState("list");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.setItem("blogapp_blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    user
      ? localStorage.setItem("blogapp_user", JSON.stringify(user))
      : localStorage.removeItem("blogapp_user");
  }, [user]);

  const handleLoginOrSignup = () => {
    setAuthError("");

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError("Email and password are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(authEmail.trim())) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("blogapp_users") || "{}");

    if (isLoginMode) {
      if (users[authEmail]?.password === authPassword) {
        setUser({ email: authEmail });
        setCurrentPage("list");
        setAuthEmail("");
        setAuthPassword("");
      } else {
        setAuthError("Invalid email or password.");
      }
    } else {
      if (users[authEmail]) {
        setAuthError("User with this email already exists.");
        return;
      }
      users[authEmail] = { password: authPassword };
      localStorage.setItem("blogapp_users", JSON.stringify(users));
      setUser({ email: authEmail });
      setCurrentPage("list");
      setAuthEmail("");
      setAuthPassword("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
    setSelectedBlogId(null);
  };

  const canEditDelete = (blog) => user && blog.author === user.email;

  const handleSelectBlog = (id) => {
    setSelectedBlogId(id);
    setCurrentPage("detail");
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
      setSelectedBlogId(null);
      setCurrentPage("list");
    }
  };

  const handleEditBlog = (blog) => {
    setBlogTitle(blog.title);
    setBlogContent(blog.content);
    setSelectedBlogId(blog.id);
    setFormError("");
    setCurrentPage("edit");
  };

  const handleBlogFormSubmit = () => {
    setFormError("");

    if (!blogTitle.trim()) {
      setFormError("Title is required.");
      return;
    }

    if (!blogContent.trim()) {
      setFormError("Content is required.");
      return;
    }

    if (currentPage === "create") {
      const newBlog = {
        id: Date.now().toString(),
        title: blogTitle.trim(),
        content: blogContent.trim(),
        author: user.email,
        createdAt: new Date().toISOString(),
      };
      setBlogs([newBlog, ...blogs]);
    } else if (currentPage === "edit") {
      setBlogs(
        blogs.map((b) =>
          b.id === selectedBlogId
            ? { ...b, title: blogTitle.trim(), content: blogContent.trim() }
            : b
        )
      );
    }

    setBlogTitle("");
    setBlogContent("");
    setCurrentPage(currentPage === "edit" ? "detail" : "list");
  };

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = blogs.slice(
    (pageNumber - 1) * POSTS_PER_PAGE,
    pageNumber * POSTS_PER_PAGE
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#121212",
        color: "#f5f5f5",
      }}
    >
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={(target) => {
          setCurrentPage(target);
          if (target === "create") {
            setBlogTitle("");
            setBlogContent("");
            setFormError("");
          }
          if (target === "login") {
            setIsLoginMode(true);
            setAuthError("");
          }
        }}
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "clamp(600px, 70%, 1000px)",
            backgroundColor: "#1f1f1f",
            padding: "40px 30px",
            borderRadius: "16px",
            boxShadow: "0 0 16px rgba(0, 0, 0, 0.6)",
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          }}
        >
          {currentPage === "login" && (
            <LoginPage
              isLoginMode={isLoginMode}
              setIsLoginMode={setIsLoginMode}
              authEmail={authEmail}
              setAuthEmail={setAuthEmail}
              authPassword={authPassword}
              setAuthPassword={setAuthPassword}
              authError={authError}
              onAuthenticate={handleLoginOrSignup}
            />
          )}

          {currentPage === "list" && (
            <BlogListPage
              blogs={paginatedBlogs}
              onSelectBlog={handleSelectBlog}
              user={user}
              currentPageNumber={pageNumber}
              totalPages={totalPages}
              onPageChange={setPageNumber}
            />
          )}

          {currentPage === "detail" && selectedBlogId && (
            <BlogDetailPage
              blog={blogs.find((b) => b.id === selectedBlogId)}
              canEditDelete={canEditDelete}
              onEdit={handleEditBlog}
              onDelete={handleDeleteBlog}
              onBack={() => {
                setCurrentPage("list");
                setSelectedBlogId(null);
              }}
            />
          )}

          {(currentPage === "create" || currentPage === "edit") && user && (
            <BlogFormPage
              page={currentPage}
              blogTitle={blogTitle}
              setBlogTitle={setBlogTitle}
              blogContent={blogContent}
              setBlogContent={setBlogContent}
              formError={formError}
              onSubmit={handleBlogFormSubmit}
              onCancel={() => {
                setBlogTitle("");
                setBlogContent("");
                setFormError("");
                setCurrentPage(currentPage === "edit" ? "detail" : "list");
                if (currentPage === "edit") setSelectedBlogId(null);
              }}
            />
          )}

          {!user && currentPage !== "login" && (
            <p style={{ textAlign: "center", marginTop: "40px" }}>
              Please{" "}
              <button
                onClick={() => setCurrentPage("login")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4eaaff",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                login
              </button>{" "}
              to create or edit blog posts.
            </p>
          )}
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          justifyContent: "center",
          color: "#aaa",
          padding: "20px 20px",
          fontSize: "0.9rem",
          borderTop: "1px solid #333",
          width: "100%",
        }}
      >
        &copy; {new Date().getFullYear()} Blog App — Built by
        Akshay Jadhav
      </footer>
    </div>
  );
};

export default App;
