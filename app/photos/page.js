"use client";

import { useEffect, useState } from "react";
import PhotoItem from "./PhotoItem";

function formatTag(tag) {
  return tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function PhotosPage() {
  const [activeTag, setActiveTag] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const allTags = [...new Set(photos.flatMap((photo) => photo.tags || []))];

  const loadPhotos = async (cursor = null, tag = activeTag) => {
    if (loading) return;

    setLoading(true);

    const tagParam = tag ? `&tag=${tag}` : "";
    const cursorParam = cursor ? `&next_cursor=${cursor}` : "";

    const res = await fetch(`/api/photos?limit=24${cursorParam}${tagParam}`);
    const data = await res.json();

    setPhotos((prev) => {
      const merged = cursor ? [...prev, ...data.photos] : data.photos;

      return merged.filter(
        (photo, index, self) =>
          index === self.findIndex((p) => p.id === photo.id)
      );
    });

    setNextCursor(data.nextCursor || null);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");

    setActiveTag(tag);
    loadPhotos(null, tag);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom && nextCursor && !loading) {
        loadPhotos(nextCursor, activeTag);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextCursor, loading, activeTag]);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/40">
            Gallery
          </p>

          <h1 className="text-3xl font-black md:text-5xl">All photos</h1>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/photos"
              className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.2em] transition ${
                !activeTag
                  ? "bg-white text-black"
                  : "border border-white/20 text-white/70 hover:text-white"
              }`}
            >
              Tous
            </a>

            {allTags.map((tag) => (
              <a
                key={tag}
                href={`/photos?tag=${tag}`}
                className={`rounded-full px-4 py-2 text-sm uppercase tracking-[0.2em] transition ${
                  activeTag === tag
                    ? "bg-white text-black"
                    : "border border-white/20 text-white/70 hover:text-white"
                }`}
              >
                {formatTag(tag)}
              </a>
            ))}
          </div>
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