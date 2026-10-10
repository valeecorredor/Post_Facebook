import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena: password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.usuario);
        localStorage.setItem('currentUser', JSON.stringify(data.usuario));
        return { success: true };
      } else {
        return { success: false, message: data.msg || 'Error en el login' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          email: userData.email,
          contrasena: userData.password,
          fecha_nacimiento: '2000-01-01', // Valor por defecto si no lo hay
          genero: 'Otro'
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Después de registrar, hacemos login o lo tratamos como exitoso
        return { success: true };
      } else {
        return { success: false, message: data.msg || 'Error en el registro' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
