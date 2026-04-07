export async function submitContactForm(data: Record<string, unknown>) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getNewsAPI() {
  const response = await fetch("/api/news");
  return response.json();
}

export async function getBlogPostsAPI(category?: string) {
  const search = category ? `?category=${encodeURIComponent(category)}` : "";
  const response = await fetch(`/api/blog${search}`);
  return response.json();
}

export async function getCoursesAPI() {
  const response = await fetch("/api/courses");
  return response.json();
}
