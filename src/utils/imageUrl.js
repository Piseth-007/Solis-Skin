const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:8080";

export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png"; // add a placeholder image in your public/ folder
  if (path.startsWith("http")) return path; // already a full URL
  return `${BACKEND_ORIGIN}${path}`;
};
