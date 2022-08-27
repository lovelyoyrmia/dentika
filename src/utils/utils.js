import { useEffect, useState } from "react";

export const handleAccessToken = (currentUser) => {
  if (currentUser.photoUrl !== "") {
    return currentUser.accessToken;
  } else {
    return currentUser["stsTokenManager"]["accessToken"];
  }
};

export const handleString = (res) => {
  let resp = res.split("/")[1];
  resp = resp.replace(/-/g, " ");
  const arr = resp.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const result = arr.join(" ");
  return result;
};

export const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  });
  return isOnline;
};
