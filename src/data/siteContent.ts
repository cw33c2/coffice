import { StoreInfo, GalleryItem } from "./schema";

export const siteInfo: StoreInfo = {
  name: "COFFICE",
  subtitle: "A cup of coffee, a moment of peace.",
  description: "每一個清晨，從純粹開始。為您準備好，專屬的靜謐角落。",
  address: "台北市中山區咖啡路 123 號",
  phone: "02-2345-6789",
  openingHours: "Mon-Sun 09:00 - 18:00",
  socialLinks: {
    instagram: "https://instagram.com/coffice_tw",
    facebook: "https://facebook.com/cofficetw"
  }
};

export const galleryItems: GalleryItem[] = [
  {
    id: "img-1",
    title: "靜謐的入口",
    category: "space",
    imageUrl: "/coffice/cozy_coffee_entrance_1790311210385.jpg"
  },
  {
    id: "img-2",
    title: "黑貓店長",
    category: "team",
    imageUrl: "/coffice/black_cat_portrait_1790312058979.jpg"
  },
  {
    id: "img-3",
    title: "舒適的木質座位區",
    category: "space",
    imageUrl: "/coffice/bg.jpg"
  },
  {
    id: "img-4",
    title: "精湛工藝，暖心拿鐵",
    category: "latte_art",
    imageUrl: "/coffice/cozy_coffee_latte_art_1790311102024.jpg"
  }
];
