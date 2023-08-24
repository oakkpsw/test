import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import UsersList from "./pages/User/UsersList.tsx"
import PostList from "./pages/Post/PostList.tsx"
import PostDetail from "./pages/Post/PostDetail.tsx"
import CreatePost from "./pages/Post/CreatePost.tsx"
import UsersDetail from "./pages/User/UsersDetail.tsx"
import CreateUsers from "./pages/User/CreateUsers.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PostList />
            </PrivateRoute>
          }
        />
        <Route path="/posts" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PrivateRoute>
              {" "}
              <PostDetail />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/create-user" element={<CreateUsers />} />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <UsersDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* <Route path="/*" element={<ErrorPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
