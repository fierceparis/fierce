"use client";

import { useEffect, useState } from "react";
import PhotoItem from "./PhotoItem";

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPhotos = async () => {
    if (loading) return;

    setLoading(true);

    const url = nextCursor
      ? `/api/photos?limit=24&next_cursor=${nextCursor}`
      : `/api/photos?limit=24`;

    const res = await fetch(url);
    const data = await res.json();

    setPhotos((prev) => {
      const merged = [...prev, ...data.photos];

      const unique = merged.filter(
        (photo, index, self) =>
          index === self.findIndex((p) => p.id === photo.id)
      );

      return unique;
    });

    setNextCursor(data.nextCursor);
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500;

      if (nearBottom && nextCursor && !loading) {
        loadPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextCursor, loading]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/40">
            Gallery
          </p>

          <h1 className="text-3xl font-black md:text-5xl">
            All photos
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </div>

        {loading && (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}

        {!nextCursor && photos.length > 0 && (
          <p className="mt-10 text-center text-sm uppercase tracking-[0.2em] text-white/30">
            Toutes les photos sont chargées
          </p>
        )}
      </div>
    </main>
  );
}