// "use client";

// import { motion } from "framer-motion";

// export default function Loader() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
//       <motion.div
//         className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//       />
//       <motion.span
//         className="ml-4 text-white text-xl font-semibold tracking-widest"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           repeat: Infinity,
//           duration: 1.5,
//           repeatType: "reverse",
//         }}
//       >
//         Loading...
//       </motion.span>
//     </div>
//   );
// }
"use client";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Circle spinner */}
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <span className="mt-4 text-purple-700 font-semibold animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
}


// "use client";

// export default function Loader() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="flex space-x-1">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="w-2 h-2 bg-purple-600 rounded-full animate-ping"
//             style={{ animationDelay: `${i * 0.1}s` }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
