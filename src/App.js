import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import photos from "./photos";
import "react-photo-album/styles.css";
import "./App.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function App() {
  const [index, setIndex] = useState(-1);

  return (
    <div style={{ padding: "1rem", maxWidth: "1500px", margin: "0 auto" }}>
      <h1 className="main-title">Anton Olavi</h1>

      <nav className="navbar">
        <a href="#home">Hem</a>
        <a href="#om">Om mig</a>
        <a href="#kontakt">Kontakt</a>
      </nav>

      <PhotoAlbum
        layout="rows"
        photos={photos}
        targetRowHeight={200}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
        plugins={[Zoom, Thumbnails]}
      />

      <footer className="footer">
        © {new Date().getFullYear()} Anton Olavi. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
