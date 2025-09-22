// import Image from "next/image";
// import UserHeader from "./Header/page";
// import "../globals.css";
// import Sidebar from "./sidebar/page";
// export default function Home() {
//   return (
//     <div>
//       <UserHeader/>
//       <Sidebar/>
//       <h1>Welcome to the Adventure App</h1>
//     </div>
//   );
// }
// app/page.tsx (Next.js 13+ App Router)
// Or pages/index.tsx if you are using Pages Router

"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./Header/page";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Footer from "./footer/page";
export default function HomePage() {
  return (
    <div className="boxed_wrapper">
      {/* Header (replace with your own component later) */}
      <Header />

      {/* Banner Section */}
      <section className="banner-section">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          loop={true}
          className="h-[500px] w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-[500px] w-full">
              <Image
                src="/banner-1.jpg"
                alt="Banner 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                <h3 className="text-lg md:text-2xl">Explore Our Adventure Park</h3>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Where Thrills Await at Every Turn!
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-[500px] w-full">
              <Image
                src="/banner-2.jpg"
                alt="Banner 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                <h3 className="text-lg md:text-2xl">Unforgettable Experiences</h3>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Adventure Like Never Before!
                </h2>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-[500px] w-full">
              <Image
                src="/banner-3.jpg"
                alt="Banner 3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                <h3 className="text-lg md:text-2xl">Family Fun Guaranteed</h3>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Create Memories That Last Forever!
                </h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Info Section */}
      <section className="info-section py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-4xl mb-4">🎟️</div>
            <h5 className="font-bold">
              <Link href="/booking">Buy Tickets</Link>
            </h5>
            <p>Grab your tickets online and enjoy Sneaker Land Adventure Park!</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-4xl mb-4">📅</div>
            <h5 className="font-bold">
              <Link href="/resorts">Book Resort</Link>
            </h5>
            <p>Join us for a season of adventure and relaxation.</p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-4xl mb-4">🗺️</div>
            <h5 className="font-bold">
              <Link href="/IMG-20240328-WA0004.jpg">Park Map</Link>
            </h5>
            <p>Discover every corner of Sneaker Land with our park map.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/about-1.jpg"
            alt="About Sneaker Land"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Best Adventure Park
            </h2>
            <h4 className="mb-2 text-lg font-semibold">
              Help us introduce Sneaker Land around the world.
            </h4>
            <p className="mb-4">
              Every moment is a journey into joy and excitement!
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Captivating Entertainment</li>
              <li>Exceptional Guest Service</li>
              <li>Memorable experiences for families</li>
            </ul>
            <Link
              href="/booking"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700"
            >
              Book Ticket
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Beautiful!! Sneaker Land</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Link href="/rides">
            <div className="relative">
              <Image
                src="/chair-swinger.jpg"
                alt="All Rides"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded">
                All Rides
              </span>
            </div>
          </Link>
          <Link href="/rides">
            <div className="relative">
              <Image
                src="/freefall.jpg"
                alt="High Thriller Rides"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded">
                High Thriller Rides
              </span>
            </div>
          </Link>
          <Link href="/rides">
            <div className="relative">
              <Image
                src="/excited-black-woman-riding-car-in-amusement-park-e1645720200253.jpg"
                alt="Family Rides"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded">
                Family Rides
              </span>
            </div>
          </Link>
          <Link href="/rides">
            <div className="relative">
              <Image
                src="/bumper-car.jpg"
                alt="Kiddie Rides"
                width={300}
                height={200}
                className="rounded-lg shadow-md"
              />
              <span className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded">
                Kiddie Rides
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Adventure Section */}
      <section className="adventure-section py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Your Adventure Begins Here</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg">
                  🌙 Night at the Adventure Park
                </h4>
                <p>
                  Experience the park under the stars with thrills and lights all
                  around.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">🤝 Good Support from Our Team</h4>
                <p>
                  Our dedicated staff ensures you have the best experience from
                  start to finish.
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/girls-in-park-of-amusements.jpg"
            alt="Adventure"
            width={500}
            height={350}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
