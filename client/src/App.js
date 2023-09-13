import { useState } from "react";


function App() {
  const [images, setImages] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const getImage = async () => {
    setImages(null);
    setErrorMessage(null);
    if (prompt.trim() === "") {
      setErrorMessage("Enter a prompt...");
      return;
    }

    setLoading(true);
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: prompt,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("http://localhost:4000/images", options);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <section className="search-section">
        

        <div className="input-container">
          <input
            value={prompt}
            placeholder="Describe what you want..."
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={getImage} disabled={loading}>
            Generate
          </button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </section>
      <section className="image-section">
        {loading && <p>Loading...</p>}
        {images?.map((image, index) => (
          <img key={index} src={image.url} alt={`Image of ${prompt}`} />
        ))}
      </section>
    </div>
  );
}

export default App;
