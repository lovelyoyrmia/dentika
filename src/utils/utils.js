export const handleAccessToken = (currentUser) => {
  if (currentUser.photoUrl !== "") {
    return currentUser.accessToken;
  } else {
    return currentUser["stsTokenManager"]["accessToken"];
  }
};
