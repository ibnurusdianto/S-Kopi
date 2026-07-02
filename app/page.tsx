import Image from "next/image";
import Link from "next/link";

export default function Home() {
  
  const quickLinks = [
    { name: "Lihat Menu", href: "/menu", bg: "bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90" },
    { name: "Redeem Voucher", href: "/redeem", bg: "border border-gray-300 dark:border-neutral-700 text-foreground hover:bg-black/5 dark:hover:bg-white/5" },
    { name: "Hubungi Kontak", href: "/kontak", bg: "text-gray-600 dark:text-gray-400 hover:text-foreground underline underline-offset-4" }
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-center">

      
      <div className="absolute top-[-10%] left-[-10%] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-[#7c2d12]/10 dark:bg-[#7c2d12]/20 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#f59e0b]/5 dark:bg-[#f59e0b]/10 blur-[100px] sm:blur-[150px] pointer-events-none" />

      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10 flex flex-col items-center justify-center min-h-[75vh]">
        
        
        <div className="flex flex-col space-y-8 text-center items-center max-w-3xl">

          
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo/logo.png"
              alt="Logo Sasa Kopi"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
              Sasa Kopi
            </span>
          </div>

          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight leading-tight text-balance">
            Suasana <span className="text-amber-700 dark:text-amber-500">Kuno</span>,<br className="hidden sm:inline" /> Fasilitas <span className="text-amber-700 dark:text-amber-500">Modern</span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-balance">
            Sasa Kopi adalah tempat kopi modern yang berada di lokasi Jakarta Timur,
            dengan suasana kuno namun fasilitas sangat modern, memiliki wifi stabil,
            wc yang bersih, wangi dan terutama dalam menu makanan, minuman dan snack
            yang enak, gurih dan memuaskan.
          </p>

          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`w-full sm:w-auto text-center px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${link.bg}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}