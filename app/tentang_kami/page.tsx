"use client";
import Image from "next/image";
import { useData } from "../context/DataContext";

export default function TentangKamiPage() {
    const { aboutUs, webSettings } = useData();

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">

            
            <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">

                
                <div className="flex flex-col items-center gap-4">
                    <Image
                        src="/logo/logo.png"
                        alt="Logo Sasa Kopi"
                        width={80}
                        height={80}
                        className="object-contain"
                        style={{ width: 'auto', height: 'auto' }}
                    />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight">
                        {aboutUs?.title || "Cerita Sasa Kopi"}
                    </h1>
                </div>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl whitespace-pre-line">
                    {aboutUs?.content || `Sasa Kopi adalah sebuah kafe yang berlokasi strategis di Jakarta Timur.
                    Kami berkomitmen untuk menyajikan pengalaman berbeda bagi para penikmat kopi.
                    Dengan memadukan suasana klasik yang nyaman dan fasilitas modern yang lengkap,
                    kami menciptakan ruang yang sempurna untuk relaksasi, pertemuan,
                    atau sekadar menikmati waktu berkualitas.`}
                </p>

            </section>

            
            <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
                        <div className="text-3xl mb-3">☕</div>
                        <h3 className="text-lg font-semibold mb-2">Kopi Pilihan</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Kami menggunakan biji kopi berkualitas terbaik untuk memastikan rasa yang kaya dan memuaskan di setiap tegukan.
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
                        <div className="text-3xl mb-3">✨</div>
                        <h3 className="text-lg font-semibold mb-2">Fasilitas Modern</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Nikmati fasilitas lengkap seperti WiFi kencang, area yang bersih dan wangi, serta tempat yang sangat nyaman.
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
                        <div className="text-3xl mb-3">🤝</div>
                        <h3 className="text-lg font-semibold mb-2">Suasana Nyaman</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Tempat yang sempurna untuk bekerja, belajar, atau sekadar berkumpul bersama teman dan keluarga tercinta.
                        </p>
                    </div>
                </div>
            </section>

            
            <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold font-sans">Gallery Sasa Kopi</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Intip suasana hangat di dalam Sasa Kopi</p>
                </div>

                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
                    <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group bg-neutral-200 dark:bg-neutral-800">
                        
                        
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">Foto Utama 1 (Besar)</div>
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2">Foto 2</div>
                    </div>
                    <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2">Foto 3</div>
                    </div>
                    <div className="col-span-2 md:col-span-2 row-span-1 relative rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2">Foto 4 (Lebar)</div>
                    </div>
                </div>
            </section>

            
            <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="bg-amber-50 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-amber-100 dark:border-neutral-800 flex flex-col md:flex-row">

                    
                    <div className="p-8 md:w-1/3 flex flex-col justify-center space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold font-sans mb-2">Kunjungi Kami</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Rasakan langsung suasana syahdu berpadu dengan wangi kopi racikan terbaik kami.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Alamat Sasa Kopi
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                                {webSettings?.address || `Jl. Raya Jakarta Timur No. 123,\nKecamatan Makasar, Jakarta Timur,\nDKI Jakarta 13560`}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Jam Operasional
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Setiap Hari: 09:00 - 22:00 WIB
                            </p>
                        </div>
                    </div>

                    
                    <div className="md:w-2/3 h-[300px] md:h-auto min-h-[400px] relative">
                        
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.7358760085!2d106.8152599661448!3d-6.249495767597144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d1a1b32943b%3A0x6b8d4e9c7c25a1e8!2sJakarta%20Timur%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Sasa Kopi di Google Maps"
                        ></iframe>
                    </div>

                </div>
            </section>

        </div>
    );
}