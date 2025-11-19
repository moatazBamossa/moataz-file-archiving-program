import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, setUser, setLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const signIn = async (email: string, password: string) => {
    console.log("password", password);
    // Mock login - accepts any email/password
    setUser({ id: "mock-user", email });
    navigate("/dashboard");
  };

  const signOut = async () => {
    await useAuthStore.getState().signOut();
    navigate("/login");
  };

  return {
    user,
    signIn,
    signOut,
  };
}
