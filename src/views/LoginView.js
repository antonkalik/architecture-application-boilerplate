import { fakeApi } from '../data/fakeApi';
import { useActionData, useNavigation, useOutletContext } from 'react-router';
import { Form, redirect } from 'react-router-dom';
import { useEffect } from 'react';

export const LoginView = () => {
  const navigation = useNavigation();
  const session = useOutletContext();
  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting';
  const data = useActionData();

  useEffect(() => {
    if (data && !data.error) {
      session.login(data);
      redirect('/');
    }
  });

  return (
    <div>
      <Form action="/login" method="post">
        <label>
          Username:
          <input disabled={isLoading} type="text" name="username" />
        </label>
        <label>
          Password:
          <input disabled={isLoading} type="password" name="password" />
        </label>
        <button disabled={isLoading}>
          {isLoading ? 'loading...' : 'Login'}
        </button>
      </Form>
      {data && data.error && <div>{data.error}</div>}
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const sessionData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };
  try {
    await fakeApi.login(sessionData);
    return sessionData;
  } catch (err) {
    if (err.message === 'Invalid credentials') {
      return {
        error: 'Invalid username or password.',
      };
    }
    throw err;
  }
}
