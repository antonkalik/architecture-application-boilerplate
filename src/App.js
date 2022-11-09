import {
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  useOutletContext,
  useParams,
  useRouteError,
} from 'react-router';
import { createBrowserRouter, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { LoginView, action as loginAction } from './views/LoginView';
import { fakeCache } from './data/fakeCache';
import { useEffect, useState } from 'react';
import { fakeApi } from './data/fakeApi';

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
  return <div>Post: {params.uuid} View</div>;
};

const ErrorView = () => {
  const error = useRouteError();

  return (
    <div>
      Error View
      <p>{error.message}</p>
    </div>
  );
};

const SessionProvider = () => {
  const cache = fakeCache.getItem('cache');
  const [data, setData] = useState(cache);

  useEffect(() => {
    fakeApi.getSession().then(setData);
  }, []);

  const logout = async () => {
    setData(null);
    await fakeApi.logout();
  };

  return <Outlet context={{ data, login: setData, logout }} />;
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<SessionProvider />} errorElement={<ErrorView />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginView />} />}
          action={loginAction}
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
    </Route>,
  ]),
);

export const App = () => {
  return <RouterProvider router={router} />;
};
