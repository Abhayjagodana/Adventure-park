import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Sneaker Land - Adventure Park",
};

export default function AboutPage() {
    return (
        <main className="bg-gray-50 text-gray-800">

            {/* Page Title */}
            <section className="relative h-[500px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/1920x800-0.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
                    <nav className="mb-2">
                        <ul className="flex space-x-2 text-white text-sm">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li>/</li>
                            <li>About Us</li>
                        </ul>
                    </nav>
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 w-full">
                        <Image
                            src="/an-extra-ordinary-kind-of-fish-e1628655121470.jpg"
                            alt="About Sneaker Land"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <h2 className="text-3xl font-semibold mb-4">Know about Sneaker Land</h2>
                        <p className="text-gray-600 mb-4">
                            Dolor in reprehenderit in voluptate velit esse cillum dolore fugiat nulla pariatur sed eiusmod simply free text tempor incidi dunt.
                        </p>
                        <p className="text-gray-600 mb-6">
                            First join us at Restar Amusement Park, where every moment is an adventure waiting to unfold. Get ready to experience the thrill of a lifetime – your journey into fun begins here!
                        </p>
                        <a
                            href="/package"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Book Your Ticket
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-12">What they’re saying?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial Card */}
                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <div className="mb-4 text-purple-600 text-3xl">“</div>
                            <p className="mb-4">⭐⭐⭐⭐ <br />Amazing park! Loved every ride!</p>
                            <h5 className="font-semibold">John Doe</h5>
                            <span className="text-sm text-gray-500">Customer</span>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <div className="mb-4 text-purple-600 text-3xl">“</div>
                            <p className="mb-4">⭐⭐⭐⭐⭐ <br />The team is so friendly and helpful!</p>
                            <h5 className="font-semibold">Jane Smith</h5>
                            <span className="text-sm text-gray-500">Customer</span>
                        </div>

                         <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                            <div className="mb-4 text-purple-600 text-3xl">“</div>
                            <p className="mb-4">⭐⭐⭐⭐⭐ <br />The team is so friendly and helpful!</p>
                            <h5 className="font-semibold">Jane Smith</h5>
                            <span className="text-sm text-gray-500">Customer</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-12">The Team in Our Amusement Park</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src="/team-1.jpg"
                                alt="Aleesha"
                                width={400}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Aleesha <span className="text-purple-600 font-normal">Animal & Fish Doctor</span></h3>
                                <p className="text-gray-600">We are a family united by the passion to create unforgettable moments for our guests.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src="/team-3.jpg"
                                alt="Michale"
                                width={400}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Michale <span className="text-purple-600 font-normal">Ride Engineer</span></h3>
                                <p className="text-gray-600">From cheerful faces at the entrance welcoming you to skilled technicians ensuring safety.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <Image
                                src="/team-4.jpg"
                                alt="Sarah"
                                width={400}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Sarah <span className="text-purple-600 font-normal">Animal & Fish Doctor</span></h3>
                                <p className="text-gray-600">Join us where the heart of fun is the incredible team making your visit magical!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
