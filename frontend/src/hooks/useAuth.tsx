import useAuthStore from "../store/useAuthStore";

export interface AuthData {
  isAuthenticated: boolean;
  username?: string;
  token?: string;
}

const useAuth = (): [AuthData, (data: AuthData) => void] => {
  const setAuthData = useAuthStore((state: any) => state.setData);
  const authData = useAuthStore((state: any) => state.data);

  return [authData, setAuthData];
};

export default useAuth;
