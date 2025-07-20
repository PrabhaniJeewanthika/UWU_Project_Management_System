import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CoordinatorLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/logincoordinator');
  }, [navigate]);

  return null; 
};

export default CoordinatorLogout;