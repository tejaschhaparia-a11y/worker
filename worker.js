(async () => {
  try {
    const res = await fetch(
      "https://image-api.shivam01agar10wal.workers.dev/",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 20fe8vUzBz98PTpH0reUP-VxsFYTvohIZLiLHwEf", // yahan apni actual secret key daalna
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "A futuristic city in the clouds" }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Error:", err);
      return;
    }

    const blob = await res.blob();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    img.style.height = "500px";
    document.body.appendChild(img);
  } catch (e) {
    console.error(e);
  }
})();
