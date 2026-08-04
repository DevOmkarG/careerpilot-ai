import axios from "axios";

const API = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export async function uploadResume(file, jobDescription = "") {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_description", jobDescription);

  const response = await api.post(
    "/upload-resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export const signupUser = async (data) => {
  const response = await api.post("/signup", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};

export const generateCoverLetter = (data) =>
  api.post("/cover-letter", data);

export const getHistory = () =>
  api.get("/history");

export const deleteHistory = (id) =>
  api.delete(`/history/${id}`);

export const jobMatcher = (formData) =>
  api.post("/job-match", formData);

export const generateInterview = (data) =>
  api.post("/interview", data);

export const submitInterview = (data) =>
  api.post("/interview-feedback", data);