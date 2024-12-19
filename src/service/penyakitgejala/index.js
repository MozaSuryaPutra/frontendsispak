export const getPenyakitGejala = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejalaPenyakit`;

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

export const getPenyakitGejalaById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejalaPenyakit/${id}`;

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

export const createPenyakitGejala = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("cf", request.cf);
  formData.append("penyakit_id", request.penyakit_id);
  formData.append("gejala_id", request.gejala_id);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/gejalaPenyakit`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const updatePenyakitGejala = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("plate", request.plate);
  formData.append("PenyakitGejalamodels_id", request.PenyakitGejalamodels_id);
  formData.append("rentPerDay", request.rentPerDay);
  formData.append("availableAt", request.availableAt);
  formData.append("available", request.available);
  formData.append("year", request.year);
  if (request.image) {
    formData.append("image", request.image);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/gejalaPenyakit/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  return result?.data;
};

export const deletePenyakitGejala = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/gejalaPenyakit/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Masih Ada Penyakit Geja;a Terkait di Database");
  }
  return result;
};

export const getPenyakitGejalaSearched = async (capacity, availableAt) => {
  console.log("Capacity:", capacity);
  console.log("AvailableAt:", availableAt);

  const token = localStorage.getItem("token");
  let params = new URLSearchParams();

  if (capacity) {
    params.append("capacity", capacity);
  }
  if (availableAt) {
    params.append("availableAt", availableAt);
  }

  let url = `${import.meta.env.VITE_API_URL}/gejalaPenyakit/search?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result?.data;
};
