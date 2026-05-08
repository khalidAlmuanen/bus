import type {
  City,
  Company,
  Trip,
  Feature,
  Testimonial,
  Faq,
  Stat,
  SiteSettings,
} from "@/lib/types"

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  company_name: "تذكرة سفر",
  short_name: "تذكرة سفر",
  tagline: "احجز رحلتك مع أفضل شركات النقل البري بين اليمن والسعودية",
  phone: "+967777192477",
  phone_raw: "+967777192477",
  whatsapp: "967777192477",
  email: "info@bus-booking.com",
  address: "خدمة حجز الرحلات البرية - اليمن والسعودية",
  years_of_service: 20,
  passengers_served: "500,000+",
  daily_trips: 100,
  fleet_size: 200,
  facebook_url: null,
  instagram_url: null,
  twitter_url: null,
  youtube_url: null,
  tiktok_url: null,
}

const CITIES: City[] = [
  { id: "1", name: "صنعاء", country: "yemen", slug: "sanaa", is_active: true, sort_order: 1 },
  { id: "2", name: "إب", country: "yemen", slug: "ibb", is_active: true, sort_order: 2 },
  { id: "3", name: "تعز", country: "yemen", slug: "taiz", is_active: true, sort_order: 3 },
  { id: "4", name: "المكلا", country: "yemen", slug: "mukalla", is_active: true, sort_order: 4 },
  { id: "5", name: "عدن", country: "yemen", slug: "aden", is_active: true, sort_order: 5 },
  { id: "6", name: "الرياض", country: "saudi", slug: "riyadh", is_active: true, sort_order: 6 },
  { id: "7", name: "جدة", country: "saudi", slug: "jeddah", is_active: true, sort_order: 7 },
  { id: "8", name: "مكة المكرمة", country: "saudi", slug: "makkah", is_active: true, sort_order: 8 },
  { id: "9", name: "الدمام", country: "saudi", slug: "dammam", is_active: true, sort_order: 9 },
  { id: "10", name: "المدينة المنورة", country: "saudi", slug: "madinah", is_active: true, sort_order: 10 },
  { id: "11", name: "تبوك", country: "saudi", slug: "tabuk", is_active: true, sort_order: 11 },
]

const COMPANIES: Company[] = [
  {
    id: "1",
    name: "شركة الكاهلي للنقل",
    short_name: "الكاهلي",
    slug: "alkohali",
    description: "تغطي بشكل رئيسي خطوط (صنعاء - عدن - السعودية). تتميز بخدمات النقل اللوجستي والركاب.",
    about: "تأسست شركة الكاهلي للنقل لتكون جسراً يربط بين اليمن والسعودية، نقدم خدمات نقل الركاب والبضائع بأعلى معايير الجودة والأمان. نتميز بأسطولنا الحديث من الحافلات وطاقمنا المحترف الذي يعمل على راحة المسافرين. نلتزم بدقة المواعيد ونقدم تجربة سفر مريحة وآمنة.",
    coverage: "صنعاء، عدن، السعودية",
    features: ["نقل لوجستي", "نقل الركاب", "خدمة VIP"],
    amenities: [
      { icon: "Armchair", label: "مقاعد VIP", description: "مقاعد قابلة للطي بزاوية 160 درجة" },
      { icon: "Wifi", label: "واي فاي مجاني", description: "إنترنت عالي السرعة طوال الرحلة" },
      { icon: "Tv", label: "شاشات فردية", description: "شاشات HD مع مكتبة أفلام" },
      { icon: "Wind", label: "تكييف مركزي", description: "نظام تكييف ذكي بدرجة حرارة مثالية" },
      { icon: "Coffee", label: "وجبات ومشروبات", description: "خدمة تقديم وجبات خفيفة ومشروبات" },
      { icon: "Plug", label: "شواحن USB", description: "منافذ شحن عند كل مقعد" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/alkohali/bus-exterior-1.jpg", caption: "حافلة الكاهلي من الخارج" },
      { type: "image", url: "/images/companies/alkohali/bus-interior-1.jpg", caption: "المقاعد من الداخل" },
      { type: "image", url: "/images/companies/alkohali/bus-interior-2.jpg", caption: "شاشات الترفيه" },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/images/companies/alkohali/video-thumb.jpg", caption: "جولة داخل الحافلة" },
    ],
    fleet: [
      { id: "1", name: "مرسيدس-بنز تريديك", type: "VIP", capacity: 45, features: ["مقاعد 160 درجة", "واي فاي", "شاشات HD"], image: null },
      { id: "2", name: "سيتارو", type: "فاخرة", capacity: 50, features: ["مقاعد مريحة", "تكييف", "شواحن USB"], image: null },
    ],
    color: "#0d4d3c",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "2",
    name: "شركة البركة",
    short_name: "البركة",
    slug: "albaraka",
    description: "تنطلق من الرياض، جدة، والدمام إلى (صنعاء، تعز، عدن، وإب). تعتبر من الأقوى والأقدم، تمتلك أسطولاً حديثاً من الحافلات VIP.",
    about: "شركة البركة من أعرق وأقدم شركات النقل البري في المنطقة، حيث نقدم خدماتنا منذ أكثر من 20 عاماً. نمتلك أسطولاً حديثاً من الحافلات الفاخرة المجهزة بأحدث التقنيات. نحرص على تقديم تجربة سفر استثنائية تليق بعملائنا الكرام.",
    coverage: "الرياض، جدة، الدمام → صنعاء، تعز، عدن، إب",
    features: ["أسطول حديث VIP", "أقدم الشركات", "رحلات يومية"],
    amenities: [
      { icon: "Armchair", label: "مقاعد فاخرة", description: "مقاعد جلدية قابلة للطي" },
      { icon: "Wifi", label: "واي فاي فائق السرعة", description: "إنترنت 5G مجاني" },
      { icon: "Tv", label: "شاشات 4K", description: "شاشات فائقة الدقة" },
      { icon: "Wind", label: "تكييف مزدوج", description: "تكييف منفصل لكل مقعد" },
      { icon: "Coffee", label: "بوفيه كامل", description: "وجبات ساخنة ومشروبات متنوعة" },
      { icon: "ShieldCheck", label: "نظام أمان", description: "كاميرات مراقبة ونظام GPS" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/albaraka/bus-exterior-1.jpg", caption: "حافلة البركة من الخارج" },
      { type: "image", url: "/images/companies/albaraka/bus-interior-1.jpg", caption: "المقاعد الفاخرة" },
      { type: "image", url: "/images/companies/albaraka/bus-interior-2.jpg", caption: "البوفيه والمطبخ" },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnail: "/images/companies/albaraka/video-thumb.jpg", caption: "جولة في حافلة البركة" },
    ],
    fleet: [
      { id: "1", name: "سيتارو 17", type: "VIP فاخرة", capacity: 48, features: ["مقاعد جلدية", "واي فاي 5G", "شاشات 4K"], image: null },
      { id: "2", name: "نيوبولان تريديك", type: "أولى درجة", capacity: 52, features: ["مقاعد مريحة", "تكييف مزدوج", "بوفيه"], image: null },
    ],
    color: "#1e40af",
    is_active: true,
    sort_order: 2,
  },
  {
    id: "3",
    name: "شركة المتصدر",
    short_name: "المتصدر",
    slug: "almutasaddir",
    description: "تغطي معظم المدن الرئيسية في البلدين عبر منفذ الوديعة. تركز على تقديم رحلات اقتصادية بأسعار تنافسية للمغتربين.",
    about: "شركة المتصدر تهدف إلى تقديم خدمات نقل اقتصادية بأسعار تنافسية دون التضحية بالجودة. نركز على خدمة المغتربين ونوفر رحلات مريحة وآمنة بأسعار في متناول الجميع. عبر منفذ الوديعة، نربط معظم المدن الرئيسية في اليمن والسعودية.",
    coverage: "معظم المدن الرئيسية عبر منفذ الوديعة",
    features: ["أسعار اقتصادية", "منفذ الوديعة", "خدمة المغتربين"],
    amenities: [
      { icon: "Armchair", label: "مقاعد مريحة", description: "مقاعد واسعة قابلة للتعديل" },
      { icon: "Wifi", label: "واي فاي", description: "إنترنت مجاني" },
      { icon: "Wind", label: "تكييف", description: "نظام تكييف قوي" },
      { icon: "Coffee", label: "مشروبات", description: "مياه ومشروبات ساخنة" },
      { icon: "Plug", label: "شواحن", description: "منافذ USB مشتركة" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/almutasaddir/bus-exterior-1.jpg", caption: "حافلة المتصدر من الخارج" },
      { type: "image", url: "/images/companies/almutasaddir/bus-interior-1.jpg", caption: "المقاعد من الداخل" },
      { type: "image", url: "/images/companies/almutasaddir/bus-interior-2.jpg", caption: "المساحة الداخلية" },
    ],
    fleet: [
      { id: "1", name: "هيونداي يوتون", type: "اقتصادي", capacity: 55, features: ["مقاعد مريحة", "تكييف", "شواحن"], image: null },
      { id: "2", name: "كينج لونج", type: "اقتصادي", capacity: 60, features: ["مقاعد واسعة", "واي فاي", "مشروبات"], image: null },
    ],
    color: "#7c3aed",
    is_active: true,
    sort_order: 3,
  },
  {
    id: "4",
    name: "شركة مشوار",
    short_name: "مشوار",
    slug: "mashwar",
    description: "رحلات يومية من جدة ومكة والرياض إلى مختلف محافظات اليمن. تشتهر بدقة المواعيد وتوفير حافلات مكيفة مريحة للمسافات الطويلة.",
    about: "شركة مشوار تتميز بدقة المواعيد والالتزام بالجدول الزمني. نقدم رحلات يومية من المدن السعودية المقدسة إلى مختلف محافظات اليمن. حافلاتنا المكيفة المريحة تضمن لك تجربة سفر هادئة ومريحة للمسافات الطويلة.",
    coverage: "جدة، مكة، الرياض → محافظات اليمن",
    features: ["دقة المواعيد", "حافلات مكيفة", "رحلات يومية"],
    amenities: [
      { icon: "Clock", label: "دقة المواعيد", description: "التزام تام بالجدول الزمني" },
      { icon: "Armchair", label: "مقاعد مريحة", description: "مقاعد واسعة للسفر الطويل" },
      { icon: "Wind", label: "تكييف قوي", description: "نظام تكييف عالي الأداء" },
      { icon: "Wifi", label: "واي فاي", description: "إنترنت مجاني" },
      { icon: "Coffee", label: "مشروبات", description: "مياه ومشروبات ساخنة" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/mashwar/bus-exterior-1.jpg", caption: "حافلة مشوار من الخارج" },
      { type: "image", url: "/images/companies/mashwar/bus-interior-1.jpg", caption: "المقاعد المريحة" },
      { type: "image", url: "/images/companies/mashwar/bus-interior-2.jpg", caption: "نظام التكييف" },
    ],
    fleet: [
      { id: "1", name: "سيتارو", type: "مريحة", capacity: 50, features: ["مقاعد واسعة", "تكييف قوي", "واي فاي"], image: null },
      { id: "2", name: "مرسيدس-بنز", type: "مريحة", capacity: 48, features: ["مقاعد مريحة", "دقة مواعيد", "مشروبات"], image: null },
    ],
    color: "#dc2626",
    is_active: true,
    sort_order: 4,
  },
  {
    id: "5",
    name: "شركة المتحدة",
    short_name: "المتحدة",
    slug: "almuttahida",
    description: "متخصصة في خطوط النقل بين المنطقة الشرقية بالسعودية واليمن. تقدم خدمات نقل الركاب وشحن الطرود والرسائل البريدية.",
    about: "شركة المتحدة متخصصة في خطوط النقل بين المنطقة الشرقية بالسعودية واليمن. نقدم خدمات متكاملة تشمل نقل الركاب وشحن الطرود والرسائل البريدية. نحن الحل الموثوق لنقل كل ما تحتاجه بين البلدين.",
    coverage: "المنطقة الشرقية السعودية ↔ اليمن",
    features: ["نقل الركاب", "شحن الطرود", "الرسائل البريدية"],
    amenities: [
      { icon: "Package", label: "شحن الطرود", description: "خدمة شحن آمنة وموثوقة" },
      { icon: "Mail", label: "الرسائل البريدية", description: "نقل البريد والمستندات" },
      { icon: "Armchair", label: "مقاعد مريحة", description: "مقاعد واسعة للركاب" },
      { icon: "Wind", label: "تكييف", description: "نظام تكييف جيد" },
      { icon: "Wifi", label: "واي فاي", description: "إنترنت مجاني" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/almuttahida/bus-exterior-1.jpg", caption: "حافلة المتحدة من الخارج" },
      { type: "image", url: "/images/companies/almuttahida/bus-interior-1.jpg", caption: "المقاعد من الداخل" },
      { type: "image", url: "/images/companies/almuttahida/cargo-1.jpg", caption: "قسم الشحن" },
    ],
    fleet: [
      { id: "1", name: "سيتارو ركاب", type: "ركاب", capacity: 50, features: ["مقاعد مريحة", "تكييف", "واي فاي"], image: null },
      { id: "2", name: "شاحنة شحن", type: "شحن", capacity: 0, features: ["شحن آمن", "تتبع GPS", "تأمين"], image: null },
    ],
    color: "#ea580c",
    is_active: true,
    sort_order: 5,
  },
  {
    id: "6",
    name: "شركة الريادة",
    short_name: "الريادة",
    slug: "alriyada",
    description: "سرحلات تنطلق من المدينة المنورة وتبوك وصولاً إلى جنوب اليمن. توفر خيارات مرنة للحجز وتتميز بخدمة العملاء عبر الواتساب.",
    about: "شركة الريادة تقدم رحلات من المدينة المنورة وتبوك إلى جنوب اليمن. نتميز بخدمة عملاء ممتازة عبر الواتساب وخيارات مرنة للحجز. نحرص على راحة المسافرين ونقدم تجربة سفر مريحة مع خدمة عملاء على مدار الساعة.",
    coverage: "المدينة المنورة، تبوك → جنوب اليمن",
    features: ["حجز مرن", "خدمة واتساب", "المدينة المنورة"],
    amenities: [
      { icon: "MessageCircle", label: "خدمة واتساب", description: "خدمة عملاء 24/7 عبر واتساب" },
      { icon: "Calendar", label: "حجز مرن", description: "خيارات مرنة للحجز والإلغاء" },
      { icon: "Armchair", label: "مقاعد مريحة", description: "مقاعد واسعة ومريحة" },
      { icon: "Wind", label: "تكييف", description: "نظام تكييف جيد" },
      { icon: "Wifi", label: "واي فاي", description: "إنترنت مجاني" },
    ],
    phone: "+967777192477",
    whatsapp: "967777192477",
    logo: null,
    banner_image: null,
    gallery: [
      { type: "image", url: "/images/companies/alriyada/bus-exterior-1.jpg", caption: "حافلة الريادة من الخارج" },
      { type: "image", url: "/images/companies/alriyada/bus-interior-1.jpg", caption: "المقاعد من الداخل" },
      { type: "image", url: "/images/companies/alriyada/service-1.jpg", caption: "خدمة العملاء" },
    ],
    fleet: [
      { id: "1", name: "سيتارو", type: "مريحة", capacity: 50, features: ["مقاعد مريحة", "تكييف", "واي فاي"], image: null },
      { id: "2", name: "مرسيدس-بنز", type: "مريحة", capacity: 48, features: ["مقاعد واسعة", "خدمة واتساب", "حجز مرن"], image: null },
    ],
    color: "#059669",
    is_active: true,
    sort_order: 6,
  },
]

const TRIPS: Trip[] = [
  // شركة الكاهلي (1)
  { id: "1", company_id: "1", from_city: "صنعاء", to_city: "الرياض", direction: "yemen-to-saudi", duration: "24 ساعة", departure_time: "07:00 صباحاً", price: 350, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 45, featured: true, is_active: true, sort_order: 1 },
  { id: "2", company_id: "1", from_city: "صنعاء", to_city: "جدة", direction: "yemen-to-saudi", duration: "28 ساعة", departure_time: "08:00 صباحاً", price: 350, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 45, featured: true, is_active: true, sort_order: 2 },
  { id: "3", company_id: "1", from_city: "عدن", to_city: "الرياض", direction: "yemen-to-saudi", duration: "22 ساعة", departure_time: "06:00 صباحاً", price: 320, currency: "SAR", bus_type: "VIP مريح", seats_available: 45, featured: false, is_active: true, sort_order: 3 },
  { id: "4", company_id: "1", from_city: "الرياض", to_city: "صنعاء", direction: "saudi-to-yemen", duration: "24 ساعة", departure_time: "04:00 عصراً", price: 350, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 45, featured: true, is_active: true, sort_order: 4 },
  { id: "5", company_id: "1", from_city: "جدة", to_city: "صنعاء", direction: "saudi-to-yemen", duration: "28 ساعة", departure_time: "08:00 مساءً", price: 350, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 45, featured: true, is_active: true, sort_order: 5 },
  { id: "6", company_id: "1", from_city: "الرياض", to_city: "عدن", direction: "saudi-to-yemen", duration: "22 ساعة", departure_time: "03:00 عصراً", price: 320, currency: "SAR", bus_type: "VIP مريح", seats_available: 45, featured: false, is_active: true, sort_order: 6 },
  
  // شركة البركة (2)
  { id: "7", company_id: "2", from_city: "صنعاء", to_city: "الرياض", direction: "yemen-to-saudi", duration: "26 ساعة", departure_time: "06:00 صباحاً", price: 380, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 7 },
  { id: "8", company_id: "2", from_city: "إب", to_city: "جدة", direction: "yemen-to-saudi", duration: "30 ساعة", departure_time: "07:30 صباحاً", price: 380, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 8 },
  { id: "9", company_id: "2", from_city: "تعز", to_city: "الدمام", direction: "yemen-to-saudi", duration: "32 ساعة", departure_time: "05:00 صباحاً", price: 400, currency: "SAR", bus_type: "VIP مريح", seats_available: 50, featured: false, is_active: true, sort_order: 9 },
  { id: "10", company_id: "2", from_city: "عدن", to_city: "الرياض", direction: "yemen-to-saudi", duration: "24 ساعة", departure_time: "08:00 صباحاً", price: 360, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 10 },
  { id: "11", company_id: "2", from_city: "الرياض", to_city: "صنعاء", direction: "saudi-to-yemen", duration: "26 ساعة", departure_time: "03:00 عصراً", price: 380, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 11 },
  { id: "12", company_id: "2", from_city: "جدة", to_city: "إب", direction: "saudi-to-yemen", duration: "30 ساعة", departure_time: "07:30 مساءً", price: 380, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 12 },
  { id: "13", company_id: "2", from_city: "الدمام", to_city: "تعز", direction: "saudi-to-yemen", duration: "32 ساعة", departure_time: "04:00 مساءً", price: 400, currency: "SAR", bus_type: "VIP مريح", seats_available: 50, featured: false, is_active: true, sort_order: 13 },
  { id: "14", company_id: "2", from_city: "الرياض", to_city: "عدن", direction: "saudi-to-yemen", duration: "24 ساعة", departure_time: "06:00 مساءً", price: 360, currency: "SAR", bus_type: "VIP درجة أولى", seats_available: 50, featured: true, is_active: true, sort_order: 14 },

  // شركة المتصدر (3)
  { id: "15", company_id: "3", from_city: "صنعاء", to_city: "الرياض", direction: "yemen-to-saudi", duration: "28 ساعة", departure_time: "09:00 صباحاً", price: 280, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: true, is_active: true, sort_order: 15 },
  { id: "16", company_id: "3", from_city: "تعز", to_city: "جدة", direction: "yemen-to-saudi", duration: "32 ساعة", departure_time: "10:00 صباحاً", price: 280, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: true, is_active: true, sort_order: 16 },
  { id: "17", company_id: "3", from_city: "إب", to_city: "الرياض", direction: "yemen-to-saudi", duration: "30 ساعة", departure_time: "08:00 صباحاً", price: 290, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: false, is_active: true, sort_order: 17 },
  { id: "18", company_id: "3", from_city: "الرياض", to_city: "صنعاء", direction: "saudi-to-yemen", duration: "28 ساعة", departure_time: "05:00 مساءً", price: 280, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: true, is_active: true, sort_order: 18 },
  { id: "19", company_id: "3", from_city: "جدة", to_city: "تعز", direction: "saudi-to-yemen", duration: "32 ساعة", departure_time: "06:00 مساءً", price: 280, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: true, is_active: true, sort_order: 19 },
  { id: "20", company_id: "3", from_city: "الرياض", to_city: "إب", direction: "saudi-to-yemen", duration: "30 ساعة", departure_time: "04:00 مساءً", price: 290, currency: "SAR", bus_type: "اقتصادي", seats_available: 55, featured: false, is_active: true, sort_order: 20 },

  // شركة مشوار (4)
  { id: "21", company_id: "4", from_city: "صنعاء", to_city: "مكة المكرمة", direction: "yemen-to-saudi", duration: "26 ساعة", departure_time: "07:00 صباحاً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: true, is_active: true, sort_order: 21 },
  { id: "22", company_id: "4", from_city: "تعز", to_city: "مكة المكرمة", direction: "yemen-to-saudi", duration: "30 ساعة", departure_time: "09:00 صباحاً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: true, is_active: true, sort_order: 22 },
  { id: "23", company_id: "4", from_city: "إب", to_city: "مكة المكرمة", direction: "yemen-to-saudi", duration: "28 ساعة", departure_time: "08:30 صباحاً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: false, is_active: true, sort_order: 23 },
  { id: "24", company_id: "4", from_city: "مكة المكرمة", to_city: "صنعاء", direction: "saudi-to-yemen", duration: "26 ساعة", departure_time: "07:00 مساءً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: true, is_active: true, sort_order: 24 },
  { id: "25", company_id: "4", from_city: "مكة المكرمة", to_city: "تعز", direction: "saudi-to-yemen", duration: "30 ساعة", departure_time: "05:00 مساءً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: true, is_active: true, sort_order: 25 },
  { id: "26", company_id: "4", from_city: "مكة المكرمة", to_city: "إب", direction: "saudi-to-yemen", duration: "28 ساعة", departure_time: "06:30 مساءً", price: 360, currency: "SAR", bus_type: "VIP مريح", seats_available: 48, featured: false, is_active: true, sort_order: 26 },

  // شركة المتحدة (5)
  { id: "27", company_id: "5", from_city: "المكلا", to_city: "الدمام", direction: "yemen-to-saudi", duration: "18 ساعة", departure_time: "04:00 عصراً", price: 300, currency: "SAR", bus_type: "VIP", seats_available: 45, featured: true, is_active: true, sort_order: 27 },
  { id: "28", company_id: "5", from_city: "المكلا", to_city: "الرياض", direction: "yemen-to-saudi", duration: "20 ساعة", departure_time: "05:00 عصراً", price: 300, currency: "SAR", bus_type: "VIP", seats_available: 45, featured: true, is_active: true, sort_order: 28 },
  { id: "29", company_id: "5", from_city: "الدمام", to_city: "المكلا", direction: "saudi-to-yemen", duration: "18 ساعة", departure_time: "08:00 صباحاً", price: 300, currency: "SAR", bus_type: "VIP", seats_available: 45, featured: true, is_active: true, sort_order: 29 },
  { id: "30", company_id: "5", from_city: "الرياض", to_city: "المكلا", direction: "saudi-to-yemen", duration: "20 ساعة", departure_time: "08:00 صباحاً", price: 300, currency: "SAR", bus_type: "VIP", seats_available: 45, featured: true, is_active: true, sort_order: 30 },

  // شركة الريادة (6)
  { id: "31", company_id: "6", from_city: "المكلا", to_city: "المدينة المنورة", direction: "yemen-to-saudi", duration: "16 ساعة", departure_time: "06:00 صباحاً", price: 320, currency: "SAR", bus_type: "VIP مريح", seats_available: 42, featured: true, is_active: true, sort_order: 31 },
  { id: "32", company_id: "6", from_city: "المكلا", to_city: "تبوك", direction: "yemen-to-saudi", duration: "14 ساعة", departure_time: "07:00 صباحاً", price: 340, currency: "SAR", bus_type: "VIP مريح", seats_available: 42, featured: true, is_active: true, sort_order: 32 },
  { id: "33", company_id: "6", from_city: "المدينة المنورة", to_city: "المكلا", direction: "saudi-to-yemen", duration: "16 ساعة", departure_time: "09:00 مساءً", price: 320, currency: "SAR", bus_type: "VIP مريح", seats_available: 42, featured: true, is_active: true, sort_order: 33 },
  { id: "34", company_id: "6", from_city: "تبوك", to_city: "المكلا", direction: "saudi-to-yemen", duration: "14 ساعة", departure_time: "10:00 مساءً", price: 340, currency: "SAR", bus_type: "VIP مريح", seats_available: 42, featured: true, is_active: true, sort_order: 34 },

]

const FEATURES: Feature[] = [
  { id: "1", title: "مقاعد VIP مريحة", description: "استمتع برحلة هادئة ومريحة مع مقاعد واسعة قابلة للطي تمنحك استرخاءً كاملاً طوال الطريق.", icon: "Armchair", is_active: true, sort_order: 1 },
  { id: "2", title: "إنترنت Wi-Fi مجاني", description: "ابقَ متصلاً بعالمك، أعمالك، وأحبائك مع خدمة الإنترنت السريع والمجاني طوال الرحلة.", icon: "Wifi", is_active: true, sort_order: 2 },
  { id: "3", title: "وجبات ومشروبات", description: "نقدم لك تشكيلة من المشروبات الساخنة والباردة مع وجبات خفيفة لضمان تجربة سفر متكاملة.", icon: "Coffee", is_active: true, sort_order: 3 },
  { id: "4", title: "شواحن USB", description: "لا تقلق من نفاد بطارية هاتفك، كل مقعد مزود بمنفذ USB خاص لشحن أجهزتك طوال الرحلة.", icon: "Plug", is_active: true, sort_order: 4 },
  { id: "5", title: "تتبع مسار الرحلة", description: "نظام GPS دقيق لمتابعة مسار الرحلة لضمان أعلى درجات الأمان والدقة في المواعيد.", icon: "MapPin", is_active: true, sort_order: 5 },
  { id: "6", title: "طاقم قيادة محترف", description: "سائقون ذوو خبرة وكفاءة عالية لضمان وصولك بسلامة وأمان إلى وجهتك.", icon: "ShieldCheck", is_active: true, sort_order: 6 },
]

const TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "أحمد عبدالله", city: "صنعاء", rating: 5, text: "أفضل منصة حجز تعاملت معها! دقة في المواعيد، باصات نظيفة جداً، ومقاعد مريحة جعلت رحلتي الطويلة إلى الرياض سهلة جداً.", is_active: true, sort_order: 1 },
  { id: "2", name: "فاطمة سعيد", city: "جدة", rating: 5, text: "خدمة العملاء ممتازة وراقية. السائقون محترفون والرحلة كانت آمنة وسلسة. شكراً لبوابة الحجز على هذا المستوى الرائع.", is_active: true, sort_order: 2 },
  { id: "3", name: "محمد باوزير", city: "المكلا", rating: 4, text: "رحلتي من المكلا إلى الرياض كانت مريحة رغم طول المسافة. توفر الإنترنت والشواحن في الباص كان منقذاً للوقت.", is_active: true, sort_order: 3 },
  { id: "4", name: "سالم اليافعي", city: "إب", rating: 5, text: "بكل صراحة، الـ VIP في الشركات المتاحة حقيقي وليس مجرد كلام. الباص هادئ والمكيف ممتاز. أنصح بشدة بالحجز من هنا.", is_active: true, sort_order: 4 },
]

const FAQS: Faq[] = [
  { id: "1", question: "كم الوزن المسموح به لكل مسافر؟", answer: "يُسمح لكل مسافر بحمل حقيبتين لا يتجاوز وزنهما الإجمالي 40 كيلوجرام، بالإضافة إلى حقيبة يد صغيرة تصطحبها معك داخل الباص.", is_active: true, sort_order: 1 },
  { id: "2", question: "هل يلزم حجز مسبق للرحلة؟", answer: "نعم، ننصح بالحجز المبكر قبل الرحلة بـ 48 ساعة على الأقل لضمان توفر المقاعد، خاصة في مواسم الأعياد والإجازات.", is_active: true, sort_order: 2 },
  { id: "3", question: "ما هي الأوراق المطلوبة للسفر من اليمن إلى السعودية؟", answer: "يجب توفر جواز سفر ساري المفعول، وتأشيرة دخول صالحة (زيارة، إقامة، أو عمل)، وبطاقة الهوية الوطنية.", is_active: true, sort_order: 3 },
  { id: "4", question: "هل يمكنني إلغاء أو تعديل موعد الرحلة؟", answer: "نعم، يمكنك تعديل أو إلغاء الحجز قبل 24 ساعة من موعد الرحلة مع خصم نسبة بسيطة كرسوم إدارية حسب سياسة الشركة.", is_active: true, sort_order: 4 },
]

const STATS: Stat[] = [
  { id: "1", value: "15+", label: "سنوات من الخبرة", sort_order: 1 },
  { id: "2", value: "10K+", label: "مسافر شهرياً", sort_order: 2 },
  { id: "3", value: "50", label: "باص VIP فاخر", sort_order: 3 },
  { id: "4", value: "100%", label: "دقة وأمان", sort_order: 4 },
]

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS
}

export async function getCities(): Promise<City[]> {
  return CITIES
}

export async function getCompanies(): Promise<Company[]> {
  return COMPANIES.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  return COMPANIES.find(c => c.id === id)
}

export async function getCompanyBySlug(slug: string): Promise<Company | undefined> {
  return COMPANIES.find(c => c.slug === slug)
}

export async function getTrips(options?: {
  direction?: "yemen-to-saudi" | "saudi-to-yemen"
  featured?: boolean
  from?: string
  to?: string
  company_id?: string
  limit?: number
}): Promise<Trip[]> {
  let results = TRIPS.filter(t => t.is_active).sort((a, b) => a.sort_order - b.sort_order)
  
  if (options?.direction) results = results.filter(t => t.direction === options.direction)
  if (options?.featured) results = results.filter(t => t.featured)
  if (options?.from) results = results.filter(t => t.from_city === options.from)
  if (options?.to) results = results.filter(t => t.to_city === options.to)
  if (options?.company_id) results = results.filter(t => t.company_id === options.company_id)
  if (options?.limit) results = results.slice(0, options.limit)
  
  return results
}

export async function getFeatures(): Promise<Feature[]> {
  return FEATURES.filter(f => f.is_active).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS.filter(t => t.is_active).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getFaqs(): Promise<Faq[]> {
  return FAQS.filter(f => f.is_active).sort((a, b) => a.sort_order - b.sort_order)
}

export async function getStats(): Promise<Stat[]> {
  return STATS.sort((a, b) => a.sort_order - b.sort_order)
}
