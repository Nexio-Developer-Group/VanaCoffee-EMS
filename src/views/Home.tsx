// Home.tsx
import React, { useEffect } from 'react';
import { useAuth } from '@/auth';
import AdminHome from './admin/home';
import UserHome from './users/home';
import { ADMIN, USER } from '@/constants/roles.constant';

const Home: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    // You can add any setup logic here if needed
  }, []);

  if (`${user?.authority}` === ADMIN) {
    return <AdminHome />;
  }

  if (`${user?.authority}` === USER) {
    return <UserHome />;
  }

  // Fallback for unauthorized or unknown roles
  return (
    <div className="flex justify-center items-center h-full text-gray-500">
      <p>No dashboard available for your role.</p>
    </div>
  );
};

export default Home;
