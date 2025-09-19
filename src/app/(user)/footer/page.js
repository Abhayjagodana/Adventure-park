// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function Footer() {
//     return (
//         <section className="main-footer">
//             {/* Top Section */}
//             <div className="footer-top relative">
//                 {/* Background Pattern */}
//                 <div
//                     className="pattern-layer absolute inset-0"
//                     style={{
//                         backgroundImage: "url(/assets/images/shape/shape-4.png)",
//                         backgroundRepeat: "no-repeat",
//                         backgroundSize: "cover",
//                     }}
//                 ></div>

//                 <div className="auto-container relative z-10">
//                     <div className="row clearfix flex flex-wrap">
//                         {/* Logo & Social Links */}
//                         <div className="col-lg-4 col-md-6 col-sm-12 footer-column p-4">
//                             <div className="footer-widget logo-widget">
//                                 <figure className="footer-logo">
//                                     <Link href="/">
//                                         <Image
//                                             src="/assets/images/logo-white.png"
//                                             alt="Logo"
//                                             width={180}
//                                             height={80}
//                                         />
//                                     </Link>
//                                 </figure>
//                                 <ul className="footer-social flex gap-4 mt-4">
//                                     <li>
//                                         <Link href="/">
//                                             <i className="fab fa-facebook-f"></i>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link href="/">
//                                             <i className="fab fa-instagram"></i>
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link href="/">
//                                             <i className="fab fa-youtube"></i>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* Links */}
//                         <div className="col-lg-4 col-md-6 col-sm-12 footer-column p-4">
//                             <div className="footer-widget links-widget">
//                                 <div className="widget-title mb-4">
//                                     <h5>Links</h5>
//                                 </div>
//                                 <div className="widget-content">
//                                     <ul className="links-list space-y-2">
//                                         <li>
//                                             <Link href="/about">ABOUT US</Link>
//                                         </li>
//                                         <li>
//                                             <Link href="/package">BOOK TICKETS</Link>
//                                         </li>
//                                         <li>
//                                             <Link href="/contact">OUR CONTACT</Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Contact */}
//                         <div className="col-lg-4 col-md-6 col-sm-12 footer-column p-4">
//                             <div className="footer-widget contact-widget">
//                                 <div className="widget-title mb-4">
//                                     <h5>Contact</h5>
//                                 </div>
//                                 <div className="widget-content">
//                                     <ul className="info space-y-2">
//                                         <li>
//                                             <i className="flaticon-telephone"></i>{" "}
//                                             <a href="tel:6668880000">666 888 0000</a>
//                                         </li>
//                                         <li>
//                                             <i className="flaticon-email"></i>{" "}
//                                             <a href="mailto:sneakerland218@gmail.com">
//                                                 sneakerland218@gmail.com
//                                             </a>
//                                         </li>
//                                         <li>
//                                             <i className="flaticon-pin"></i> 66 Broklyn Golden Street,
//                                             New York
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Section */}
//             <div className="footer-bottom centred bg-black text-white py-4 text-center">
//                 <div className="auto-container">
//                     <div className="copyright">
//                         <p>
//                             &copy; Copyright 2025 by{" "}
//                             <Link href="/" className="text-purple-400 hover:underline">
//                                 Sneaker Land
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(/assets/images/shape/shape-4.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Footer Top */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Logo & Social */}
        <div>
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={180}
              height={80}
              className="mb-4"
            />
          </Link>
          <div className="flex gap-4 text-xl">
            <Link href="/" className="hover:text-purple-400">
              <FaFacebookF />
            </Link>
            <Link href="/" className="hover:text-purple-400">
              <FaInstagram />
            </Link>
            <Link href="/" className="hover:text-purple-400">
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* Links */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Links</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-purple-400">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link href="/package" className="hover:text-purple-400">
                BOOK TICKETS
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-400">
                OUR CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-lg font-semibold mb-4">Contact</h5>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-purple-400" />
              <a href="tel:6668880000" className="hover:text-purple-400">
                666 888 0000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-purple-400" />
              <a
                href="mailto:sneakerland218@gmail.com"
                className="hover:text-purple-400"
              >
                sneakerland218@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-400" />
              <span>66 Broklyn Golden Street, New York</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 bg-black py-4 text-center">
        <p>
          © 2025 Sneaker Land. All rights reserved.{" "}
          <Link href="/" className="text-purple-400 hover:underline">
            Sneaker Land
          </Link>
        </p>
      </div>
    </footer>
  );
}
