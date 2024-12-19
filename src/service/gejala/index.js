export const getGejala = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejala`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const getGejalaById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejala/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const createGejala = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nama", request.nama);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/gejala`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const updateGejala = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nama", request.nama);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/gejala/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const deleteGejala = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejala/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Masih Ada Gejala Terkait di Database");
  }
  return result?.data;
};
