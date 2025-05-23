import React, { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import { sportPhotos, resorPhotos } from "./photos";
import "react-photo-album/styles.css";
import "./App.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function App() {
  const [index, setIndex] = useState(-1);
  const [allPhotos, setAllPhotos] = useState([]);
  const [offset, setOffset] = useState(0); // För att spåra vilken sektion vi klickar i

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const handleClick = (sectionOffset, index) => {
    setOffset(sectionOffset);
    setIndex(index);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "1500px", margin: "0 auto" }}>
      <h1 className="main-title">Anton Olavi</h1>

      <nav className="navbar">
        <a href="#home">Hem</a>
        <a href="#om">Om mig</a>
        <a href="#kontakt">Kontakt</a>
      </nav>

      <h2 className="section-title">Sport</h2>
      <PhotoAlbum
        layout="rows"
        photos={sportPhotos}
        targetRowHeight={200}
        onClick={({ index }) => handleClick(0, index)}
        renderPhoto={({ imageProps }) => (
          <img
            {...imageProps}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            style={{
              ...imageProps.style,
              userSelect: "none",
              pointerEvents: "auto",
            }}
          />
        )}
      />

      <h2 className="section-title">Resor</h2>
      <PhotoAlbum
        layout="rows"
        photos={resorPhotos}
        targetRowHeight={200}
        onClick={({ index }) => handleClick(sportPhotos.length, index)}
        renderPhoto={({ imageProps }) => (
          <img
            {...imageProps}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            style={{
              ...imageProps.style,
              userSelect: "none",
              pointerEvents: "auto",
            }}
          />
        )}
      />

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={[...sportPhotos, ...resorPhotos]}
        plugins={[Zoom, Thumbnails]}
      />

      <footer className="footer">
        © {new Date().getFullYear()} Anton Olavi. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
