export default async function fetchKullanicilar() {
  const response = await fetch("/api/kullanicilar.json");
  console.log("response :>> ", response);
  if (!response.ok) {
    throw new Error(" kullanıcılara getirirken bir hata oluştu");
  }

  return response.json();
}
