import { AuthType } from "../types/AuthType";

export const register = async (data: AuthType): Promise<number> => {
  const { name, email, password } = data;
 try {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error de registro:', errorData);
    throw new Error(errorData.message || 'Error en el registro');
  }

  return response.status;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 } catch (error: any) {
  console.error('Error completo:', error);
  return 0;
 }
};

export const login = async (data: AuthType): Promise<[AuthType | null, number]> => {
  const { email, password } = data;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de registro:', errorData);
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();
    return [data, response.status];
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return [null, 0];
  }
}


