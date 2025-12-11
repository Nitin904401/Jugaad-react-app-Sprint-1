// Fake API for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
  token?: string;
}

const mockUsers: Record<string, User & { password: string }> = {
  'customer@test.com': {
    id: '1',
    email: 'customer@test.com',
    name: 'John Customer',
    role: 'customer',
    password: '123456'
  },
  'vendor@test.com': {
    id: '2',
    email: 'vendor@test.com',
    name: 'Jane Vendor',
    role: 'vendor',
    password: '123456'
  },
  'admin@test.com': {
    id: '3',
    email: 'admin@test.com',
    name: 'Admin User',
    role: 'admin',
    password: '123456'
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers[email];
      if (user && user.password === password) {
        const { password, ...userWithoutPassword } = user;
        resolve({
          ...userWithoutPassword,
          token: `token_${user.id}_${Date.now()}`
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 600);
  });
};

export const register = async (
  email: string,
  password: string,
  name: string,
  role: 'customer' | 'vendor' | 'admin' = 'customer'
): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: `${Object.keys(mockUsers).length + 1}`,
        email,
        name,
        role,
        token: `token_${Date.now()}`
      };
      mockUsers[email] = { ...newUser, password };
      resolve(newUser);
    }, 600);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
};

export const getCurrentUser = async (token: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would validate the token on the backend
      const user = Object.values(mockUsers).find((u) => u.token === token);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword as User);
      } else {
        resolve(null);
      }
    }, 300);
  });
};
