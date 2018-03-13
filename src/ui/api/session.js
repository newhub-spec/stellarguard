import axios from './axios';
import User from '../models/User';

export async function getSession() {
  const { user } = await axios.get('/session');
  if (user) {
    return {
      user: User.fromJson(user)
    };
  }

  return {};
}

export async function signIn({ email, password, code }) {
  const user = await axios.post('/session', {
    email,
    password,
    code: code || undefined
  });

  return User.fromJson(user);
}

export async function signOut() {
  return await axios.delete('/session');
}
