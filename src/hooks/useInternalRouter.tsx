import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { RoutePath } from '../pages/Routes';

export function useInternalRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: RoutePath) {
        navigate(path);
      },
    };
  }, [navigate]);
}
