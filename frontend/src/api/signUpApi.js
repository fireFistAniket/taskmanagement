const signUp = async (userDetail) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userDetail),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { signUp };
