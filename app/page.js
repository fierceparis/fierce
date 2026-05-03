import ShotgunWidget from "./ShotgunWidget";
import PhotoItem from "./photos/PhotoItem";
import ContactForm from "./ContactForm";
import LatestPhotos from "./LatestPhotos";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* HERO VIDEO */}
      <section className="relative h-screen overflow-hidden mb-24">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/promo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <img
  src="/logo.png"
  alt="Fierce"
  className="w-[360px] md:w-[600px] mx-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.35)] fade-pulse"
/>
          <p className="mt-8 max-w-xl text-lg text-white/80">
            Queer parties, pop culture & club nights in Paris.
          </p>
        </div>
      </section>

      {/* SHOTGUN */}

<section
  id="tickets"
  className="bg-black px-6 pb-6 text-white"
  style={{ paddingTop: "3rem" }}
>
  <div className="mx-auto max-w-5xl">
    <div className="mb-10 text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/40">
        Next events
      </p>
      <h2 className="text-3xl font-black md:text-5xl">
        Tickets
      </h2>
    </div>

    <ShotgunWidget />
  </div>
</section>

      {/* PHOTOS */}

<section className="bg-black px-6 py-20 text-white">
  <div className="mx-auto max-w-6xl">
    <div className="mb-10 text-center">
      <p className="mb-2 text-sm uppercase tracking-[0.35em] text-white/40">
        Gallery
      </p>

      <h2 className="text-3xl font-black md:text-5xl">
        Latest photos
      </h2>
    </div>

    <LatestPhotos />

    <div className="mt-10 text-center">
      <a
        href="/photos"
        className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80 transition hover:bg-white hover:text-black"
      >
        Toutes les photos
      </a>
    </div>
  </div>
</section>

      {/* SOCIAL + CONTACT */}
      <section id="contact" className="grid md:grid-cols-2 gap-10 px-6 py-16">
        
        <div>
          <h2 className="text-3xl font-bold mb-6">Follow us</h2>
          <div className="flex gap-3 flex-wrap">
            <a className="border border-white/20 px-4 py-2 rounded-full" href="https://instagram.com/lafierceparis">
              Instagram
            </a>
            <a className="border border-white/20 px-4 py-2 rounded-full" href="https://tiktok.com/@lafierceparis">
              TikTok
            </a>
            <a className="border border-white/20 px-4 py-2 rounded-full" href="https://shotgun.live/venues/fierce">
              Shotgun
            </a>
          </div>
        </div>

     <ContactForm />

      </section>

      {/* ABOUT */}
      <section className="px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">Qui sommes-nous ?</h2>
        <p className="max-w-3xl text-white/70 text-lg leading-relaxed">
          Fierce rassemble des soirées queer, pop et club pensées comme des espaces de liberté,
          de fête et de communauté. De La Fierce à The House, notre ambition est simple :
          créer des nuits inclusives, visuelles et ultra pop.
        </p>
      </section>

    </main>
  );
}