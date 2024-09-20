export const useGetUserInfo = () => {
  const { name, profilePhoto, userId, isAuth } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { name, profilePhoto, userId, isAuth };
};
