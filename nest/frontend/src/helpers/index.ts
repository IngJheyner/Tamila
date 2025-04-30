export const authLocalStorage = () => {
  const { token, id, name } = JSON.parse(localStorage.getItem('auth') || '{}');
  return { token, id, name };
};
