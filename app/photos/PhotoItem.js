"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";

export default function PhotoItem({ photo }) {
  const [open, setOpen] = useState(false);

  const downloadPhoto = (e) => {
    e.stopPropagation();
    window.open(photo.url, "_blank");
  };

  return (
    <>
      <img
        src={photo.url}
        alt=""
        onClick={() => setOpen(true)}
        className="aspect-[3/4] w-full cursor-pointer rounded-2xl border border-white/10 object-cover"
      />

      {open && (
  <div
    onClick={() => setOpen(false)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
  >
    <img
      src={photo.url}
      alt=""
      onClick={(e) => e.stopPropagation()}
      className="max-h-[80vh] max-w-[90vw] object-contain"
    />

    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed left-1/2 z-[9999] -translate-x-1/2"
style={{ bottom: "max(24px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-6 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={downloadPhoto}
          className="text-white transition hover:scale-110"
        >
          <Download size={24} />
        </button>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-white transition hover:scale-110"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}