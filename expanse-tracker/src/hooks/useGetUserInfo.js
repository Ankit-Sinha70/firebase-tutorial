export const useGetUserInfo = () => {
  const { name, profile, userId, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profile, userId, isAuth };
};
