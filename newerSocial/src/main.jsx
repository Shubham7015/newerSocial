import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//  Pages
import Home from "./pages/Home.jsx";
import { Protected, Login } from "./components/index.js";
import AddPost from "./pages/AddPost.jsx";
import SignUp from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import Post from "./pages/Post.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import NotFound from "./pages/NotFound.jsx";

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
