"use client";

import { useEffect } from "react";

export default function ShotgunWidget() {
  useEffect(() => {
    window.__shotgun = {
      "events-listing": {
        organizerId: 209528,
        layout: "shotgun",
        showEventTags: false,
        showEventState: true,
      },
    };

    const script = document.createElement("script");
    script.src = "https://widgets.shotgun.live/events-listing.js";
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement("style");
    style.innerHTML = `
      #shotgun-events-listing * {
        color: white !important;
      }

      #shotgun-events-listing time,
      #shotgun-events-listing span {
        color: #c084fc !important;
      }

      #shotgun-events-listing img {
        border-radius: 1.5rem !important;
      }

      #shotgun-events-listing a {
        border-radius: 1.5rem !important;
        overflow: hidden !important;
        background: #090909 !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        margin-bottom: -2.25rem !important;
      }

      #shotgun-events-listing a > div {
        padding: 1.25rem !important;
      }

      #shotgun-events-listing button,
      #shotgun-events-listing [role="button"] {
        display: none !important;
      }
    `;

    setTimeout(() => {
      document.head.appendChild(style);
    }, 1000);

    return () => {
      script.remove();
      style.remove();
    };
  }, []);

  return (
    <div className="shotgun-wrapper">
      <section id="shotgun-events-listing" />
    </div>
  );
}