export const getPenyakit = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/penyakit`;

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

export const getPenyakitById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/penyakit/${id}`;

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

export const createPenyakit = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nama", request.nama);
  formData.append("deskripsi", request.deskripsi);
  formData.append("solusi", request.solusi);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/penyakit`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const updatePenyakit = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nama", request.nama);
  formData.append("deskripsi", request.deskripsi);
  formData.append("solusi", request.solusi);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/penyakit/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const deletePenyakit = async (id) => {
  const token = localStorage.getItem("token");

  // let url = `${import.meta.env.VITE_API_URL}/penyakit/${id}`;

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/penyakit/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  // get data
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Masih Ada Diagnosis Terkait di Database");
  }
  return result;
};
