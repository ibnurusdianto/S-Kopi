import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Categories
  const catKopi = await prisma.categories.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "Kopi" },
  });
  const catNonKopi = await prisma.categories.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: "Non-Kopi" },
  });
  const catCemilan = await prisma.categories.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: "Cemilan" },
  });

  // Default Menus
  const menus = [
    { id: 1, name: "Kopi Hitam", description: "Kopi tubruk murni dari biji kopi pilihan nusantara dengan aroma yang kuat.", base_price: 15000, image_url: "https://images.unsplash.com/photo-1550133730-695473e544be?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 2, name: "Kopi Susu Gula Aren", description: "Perpaduan espresso, susu segar, dan manisnya gula aren alami.", base_price: 22000, image_url: "https://images.unsplash.com/photo-1599321955726-e048426594af?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 3, name: "Cappuccino", description: "Espresso klasik dengan busa susu tebal dan taburan bubuk cokelat.", base_price: 25000, image_url: "https://images.unsplash.com/photo-1517701550927-30cfcb64d4b2?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 4, name: "Cafe Latte", description: "Lebih banyak susu daripada cappuccino, sangat lembut di lidah.", base_price: 25000, image_url: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 5, name: "Vanilla Latte", description: "Latte lembut dengan sirup vanilla berkualitas tinggi.", base_price: 28000, image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 6, name: "Caramel Macchiato", description: "Espresso, sirup vanilla, susu, dan saus karamel di atasnya.", base_price: 30000, image_url: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop", category_id: catKopi.id, is_available: true, stock: 99 },
    { id: 7, name: "Es Teh Manis", description: "Teh melati seduh segar dengan gula pasir asli.", base_price: 10000, image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop", category_id: catNonKopi.id, is_available: true, stock: 99 },
    { id: 8, name: "Lemon Tea", description: "Teh segar dengan perasan jeruk lemon asli yang menyegarkan.", base_price: 15000, image_url: "https://images.unsplash.com/photo-1627490450550-98319fdb1df3?q=80&w=500&auto=format&fit=crop", category_id: catNonKopi.id, is_available: true, stock: 99 },
    { id: 9, name: "Matcha Latte", description: "Bubuk matcha premium Jepang dipadukan dengan susu segar.", base_price: 28000, image_url: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=500&auto=format&fit=crop", category_id: catNonKopi.id, is_available: true, stock: 99 },
    { id: 10, name: "Chocolate Ice", description: "Cokelat pekat pilihan yang disajikan dingin memanjakan lidah.", base_price: 25000, image_url: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=500&auto=format&fit=crop", category_id: catNonKopi.id, is_available: true, stock: 99 },
    { id: 11, name: "Kentang Goreng", description: "Kentang goreng renyah dengan taburan bumbu gurih rahasia.", base_price: 18000, image_url: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=500&auto=format&fit=crop", category_id: catCemilan.id, is_available: true, stock: 99 },
    { id: 12, name: "Pisang Goreng Keju", description: "Pisang kepok manis digoreng krispi dengan parutan keju melimpah.", base_price: 20000, image_url: "https://images.unsplash.com/photo-1605050965319-3543d463b218?q=80&w=500&auto=format&fit=crop", category_id: catCemilan.id, is_available: true, stock: 99 },
  ];

  for (const menu of menus) {
    await prisma.products.upsert({
      where: { id: menu.id },
      update: {},
      create: menu,
    });
  }

  // Pegawai
  const rolePegawai = await prisma.roles.upsert({
    where: { name: "pegawai" },
    update: {},
    create: { name: "pegawai" },
  });

  await prisma.users.upsert({
    where: { username: "pegawai" },
    update: {},
    create: {
      username: "pegawai",
      full_name: "Pegawai 1",
      password_hash: "pegawai",
      role_id: rolePegawai.id,
    }
  });

  // Vouchers
  await prisma.vouchers.upsert({
    where: { code: "SASA50" },
    update: {},
    create: { code: "SASA50", discount_type: "percent", discount_amount: 50, is_active: true }
  });
  await prisma.vouchers.upsert({
    where: { code: "KOPI100" },
    update: {},
    create: { code: "KOPI100", discount_type: "fixed", discount_amount: 10000, is_active: true }
  });

  // Web Settings
  const defaultWebSettings = {
    headerLogoText: "Sasa Kopi",
    footerText: "2026 Sasa Kopi. All rights reserved.",
    address: "Jl. Kopi Harum No.12, Jakarta",
    phone: "+62 812-3456-7890",
    email: "halo@sasakopi.com",
    socialLinks: { instagram: "@sasakopi", facebook: "Sasa Kopi" }
  };

  await prisma.web_settings.upsert({
    where: { key_name: "global_settings" },
    update: {},
    create: { key_name: "global_settings", value: JSON.stringify(defaultWebSettings) }
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
