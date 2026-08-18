/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const DEMO_CREDENTIALS = {
  email: "demo@hbsscoffee.com",
  password: "demo123",
  name: "Demo User",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = !!user;

  const signIn = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const validEmail =
          email === DEMO_CREDENTIALS.email ||
          (user && email === user.email) ||
          !email;

        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          const existing = user
            ? user
            : {
                id: Date.now().toString(),
                name: DEMO_CREDENTIALS.name,
                email: DEMO_CREDENTIALS.email,
                createdAt: new Date().toISOString(),
                addresses: [],
                paymentMethods: [],
              };
          setUser(existing);
          setIsLoading(false);
          return existing;
        }

        if (user && email === user.email) {
          setIsLoading(false);
          return user;
        }

        if (!validEmail) {
          throw new Error("Invalid email or password");
        }

        throw new Error("Invalid email or password");
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    [user]
  );

  const signUp = useCallback(
    async (formData) => {
      setIsLoading(true);
      try {
        const newUser = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          createdAt: new Date().toISOString(),
          addresses: [],
          paymentMethods: [],
        };
        setUser(newUser);
        setIsLoading(false);
        return newUser;
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (profileData) => {
      setIsLoading(true);
      try {
        setUser((prev) => {
          const updated = { ...prev, ...profileData };
          return updated;
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const addAddress = useCallback(
    async (addressData) => {
      setIsLoading(true);
      try {
        const newAddress = {
          id: Date.now().toString(),
          ...addressData,
        };
        setUser((prev) => {
          const existing = prev.addresses || [];
          let addresses = [...existing, newAddress];
          if (newAddress.isDefault) {
            addresses = addresses.map((a) => ({
              ...a,
              isDefault: a.id === newAddress.id,
            }));
          }
          return { ...prev, addresses };
        });
        setIsLoading(false);
        return newAddress;
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const updateAddress = useCallback(
    async (addressId, addressData) => {
      setIsLoading(true);
      try {
        setUser((prev) => {
          const addresses = (prev.addresses || []).map((a) =>
            a.id === addressId ? { ...a, ...addressData } : a
          );
          let updated = addresses;
          if (addressData.isDefault) {
            updated = addresses.map((a, idx) => ({
              ...a,
              isDefault: idx === addresses.findIndex((a2) => a2.id === addressId),
            }));
          }
          return { ...prev, addresses: updated };
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const removeAddress = useCallback(
    async (addressId) => {
      setIsLoading(true);
      try {
        setUser((prev) => ({
          ...prev,
          addresses: (prev.addresses || []).filter((a) => a.id !== addressId),
        }));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const addPaymentMethod = useCallback(
    async (methodData) => {
      setIsLoading(true);
      try {
        const newMethod = {
          id: Date.now().toString(),
          ...methodData,
        };
        setUser((prev) => {
          const existing = prev.paymentMethods || [];
          let paymentMethods = [...existing, newMethod];
          if (newMethod.isDefault) {
            paymentMethods = paymentMethods.map((m) => ({
              ...m,
              isDefault: m.id === newMethod.id,
            }));
          }
          return { ...prev, paymentMethods };
        });
        setIsLoading(false);
        return newMethod;
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const updatePaymentMethod = useCallback(
    async (methodId, methodData) => {
      setIsLoading(true);
      try {
        setUser((prev) => {
          let paymentMethods = (prev.paymentMethods || []).map((m) =>
            m.id === methodId ? { ...m, ...methodData } : m
          );
          if (methodData.isDefault) {
            paymentMethods = paymentMethods.map((m, idx) => ({
              ...m,
              isDefault: idx === paymentMethods.findIndex((m2) => m2.id === methodId),
            }));
          }
          return { ...prev, paymentMethods };
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const removePaymentMethod = useCallback(
    async (methodId) => {
      setIsLoading(true);
      try {
        setUser((prev) => ({
          ...prev,
          paymentMethods: (prev.paymentMethods || []).filter(
            (m) => m.id !== methodId
          ),
        }));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        addPaymentMethod,
        updatePaymentMethod,
        removePaymentMethod,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
