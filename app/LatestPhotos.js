"use client";

import { useEffect, useState } from "react";
import PhotoItem from "./photos/PhotoItem";

export default function LatestPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/photos?limit=8");
      const data = await res.json();
      setPhotos(data.photos || []);
    }

    load();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}