"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Booking() {
      const router = useRouter(); // ✅ Define router

    useEffect(() => {
    (async () => {
      try {
        const me = await fetch("/api/me", { credentials: "include" });
        if (!me.ok) {
          router.replace("/login");
          return;
        }
        // Fetch with credentials so cookie is sent to the protected API
        await fetchCourses();
      } catch {
        router.replace("/login");
      }
    })();
  }, []);
    return (
        <div>
            <h1>Booking</h1>
        </div>
    )
}

export default Booking;