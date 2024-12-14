export const diagnosisPasien = async (request) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/diagnosis`, {
    headers: {
      "Content-Type": "application/json", // Pastikan header untuk JSON
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      id_user: request.id_user,
      gejala: request.gejala, // Array gejala sesuai request
    }),
  });
  console.log("ini response", request.id_user);
  const result = await response.json();
  console.log("ini result", request.gejala);
  if (!response.ok) {
    throw new Error(result?.message || "Terjadi kesalahan pada API");
  }

  return result?.data;
};
