import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../src/components/user/slice';

const UserSync: React.FC = () => {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        dispatch(
          setUser({
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || null,
          })
        );
      } else {
        dispatch(clearUser());
      }
    }
  }, [isLoaded, user, dispatch]);

  return null;
};

export default UserSync;
