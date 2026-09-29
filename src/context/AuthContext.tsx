import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'PMU_DIRECTOR' | 'FIELD_INSPECTOR' | 'NGO_INSTITUTE' | null;

export interface AuthUser {
  role: UserRole;
  name: string;
  subtitle: string;
  initials: string;
  avatarColor: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'nigrani360_auth_user';

export const ROLE_PROFILES: Record<NonNullable<UserRole>, AuthUser> = {
  PMU_DIRECTOR: {
    role: 'PMU_DIRECTOR',
    name: 'Dr. Alok Verma',
    subtitle: 'Joint Director, PMU National Command',
    initials: 'AV',
    avatarColor: 'bg-blue-600',
    avatar: '/avatar_alok.jpg',
  },
  FIELD_INSPECTOR: {
    role: 'FIELD_INSPECTOR',
    name: 'R. Sharma',
    subtitle: 'Field Officer',
    initials: 'RS',
    avatarColor: 'bg-[#00875A]',
    avatar: '/avatar_rsharma.jpg',
  },
  NGO_INSTITUTE: {
    role: 'NGO_INSTITUTE',
    name: 'Sahyog Sanstha',
    subtitle: 'Centre Admin · MH-042 Pimpalgaon',
    initials: 'SS',
    avatarColor: 'bg-slate-600',
    avatar: '/avatar_sunita.jpg',
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role && ROLE_PROFILES[parsed.role as NonNullable<UserRole>]) {
          return ROLE_PROFILES[parsed.role as NonNullable<UserRole>];
        }
      }
    } catch (e) {
      console.warn('[AuthContext] Failed to load saved auth user:', e);
    }
    // Default to PMU_DIRECTOR so the dashboard is immediately accessible
    return ROLE_PROFILES.PMU_DIRECTOR;
  });

  const login = (role: UserRole) => {
    if (!role) return;
    const profile = ROLE_PROFILES[role];
    setUser(profile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('[AuthContext] Failed to persist auth user:', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[AuthContext] Failed to remove auth user:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
