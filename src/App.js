import { useOutletContext, useParams } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { LoginView } from './views/LoginView';

const LandingView = () => <div>Landing View</div>;
const ListsPostsView = () => <div>List Posts View</div>;
const SignUpView = () => <div>SignUp View</div>;
const ForgotPasswordView = () => <div>Forgot Password View</div>;
const AboutView = () => <div>About View</div>;
const PostsView = () => <div>Posts View</div>;
const SettingsView = () => <div>Settings View</div>;
const NotFoundView = () => <div>Not Found View</div>;

const HomeView = () => {
  const session = useOutletContext();
  return session.data ? <ListsPostsView /> : <LandingView />;
};

const UserView = () => {
  const session = useOutletContext();
  return <div>User {session.data?.email} View</div>;
};

const PostView = () => {
  const params = useParams();
  // request with params.uuid from db the post and return <NotFoundView /> in case is post does not exist
  return <div>Post: {params.uuid} View</div>;
};

export const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginView />} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute element={<SignUpView />} />}
        />
        <Route
          path="/forgot-password"
          element={<PublicRoute element={<ForgotPasswordView />} />}
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute
              element={<ProtectedRoute element={<UserView />} />}
            />
          }
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<SettingsView />} />}
        />
        <Route path="/posts" element={<ProtectedRoute />}>
          <Route index element={<PostsView />} />
          <Route path=":uuid" element={<PostView />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};
