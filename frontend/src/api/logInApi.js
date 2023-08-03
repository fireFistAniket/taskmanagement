const logIN = async (userDetail) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/auth`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetail),
      credentials: "include",
    });
    console.log(response.headers.getSetCookie());
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { logIN };
