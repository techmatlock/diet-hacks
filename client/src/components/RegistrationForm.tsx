import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './UserContext';

type Props = {
  isMobile: boolean | null;
};
/**
 * Form that registers a user.
 */
export function RegistrationForm({ isMobile }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = (await res.json()) as User;
      alert(`Successfully registered ${user.username}.`);
      navigate('/sign-in');
    } catch (err) {
      alert(`Error registering user: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={
        isMobile
          ? 'flex flex-col items-center mt-12 py-8 px-32 rounded-md bg-accent-gray'
          : 'flex flex-col items-center mt-12 py-8 px-32 rounded-md bg-accent-gray'
      }>
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-1">
          <div>
            <label className="mb-1 block">
              Username
              <input
                required
                name="username"
                type="text"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
            <label className="mb-1 block">
              Password
              <input
                required
                name="password"
                type="password"
                className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="align-middle text-center border rounded py-2.5 px-6 text-xs font-medium bg-lime-green text-white hover:bg-green-700">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
