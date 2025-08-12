"use client";
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const AdminWrap = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 16px 96px 16px;
  color: #fff;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 32px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #18181c;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 48px;
`;
const Input = styled.input`
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-size: 1rem;
`;
const Button = styled.button`
  background: #00ff6a;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
`;
const ErrorMsg = styled.div`
  color: #ff5e62;
  margin-bottom: 12px;
`;

export default function AdminPage() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // ...existing code...

  useEffect(() => {
    // Mock user authentication
    setUser({ id: 1, name: 'Admin' });
    setLoading(false);
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    // Mock login
    if (email === 'admin' && password === 'password') {
      setUser({ id: 1, name: 'Admin' });
      setLoading(false);
    } else {
      setError('Invalid credentials');
    }
  }

  if (loading) return <AdminWrap>Loading...</AdminWrap>;
  if (!user) {
    return (
      <AdminWrap>
        <Title>Admin Login</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Form onSubmit={handleLogin}>
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button type="submit">Login</Button>
        </Form>
      </AdminWrap>
    );
  }

  return (
    <AdminWrap>
      <Title>Admin Dashboard</Title>
      {/* Other admin functionalities can be added here */}
    </AdminWrap>
  );
}