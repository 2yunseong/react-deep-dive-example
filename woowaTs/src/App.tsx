import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './apis/user';

function App() {
  const { data: request, status } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
  if (status === 'error') return <></>;
  if (status === 'pending') return <></>;
  return <div className='App'>{request.data.name}</div>;
}

export default App;
