/**
 * Cytech Limited - Products Database
 * Central source of truth for all products across the ecommerce store.
 */

const PRODUCTS_DATA = [
    {
        id: "hp-elitebook",
        name: "HP EliteBook 840 G6 Laptop",
        category: "laptop",
        categoryName: "Laptops",
        price: 75000,
        originalPrice: 85000,
        badge: "HOT DEAL",
        rating: 4.8,
        reviewCount: 38,
        inStock: true,
        stockCount: 12,
        image: "image/HP-Elitebook-840-G6-1-400x400-removebg-preview.png",
        shortDescription: "Intel Core i7 8th Gen, 16GB DDR4 RAM, 512GB NVMe SSD, 14-inch Full HD display.",
        description: "The HP EliteBook 840 G6 is an enterprise-grade ultrabook designed for modern business professionals, content creators, and students. Built with a sleek precision-crafted aluminum chassis, this powerhouse features an 8th Generation Intel Core i7 processor, 16GB high-speed DDR4 memory, and ultra-fast 512GB NVMe SSD storage. It delivers seamless multitasking, crisp visuals on its 14-inch anti-glare Full HD screen, and long-lasting all-day battery life with HP Fast Charge.",
        keyFeatures: [
            "Intel Core i7-8665U Processor (Up to 4.8 GHz with Intel Turbo Boost)",
            "16GB DDR4 RAM (Expandable up to 32GB)",
            "512GB PCIe NVMe High-Speed Solid State Drive",
            "14.0-inch diagonal FHD IPS eDP anti-glare LED-backlit (1920 x 1080)",
            "Bang & Olufsen tuned dual stereo speakers with noise cancellation",
            "Backlit spill-resistant ergonomic keyboard",
            "Fingerprint reader & Windows Hello IR facial recognition",
            "Genuine Windows 11 Pro 64-bit pre-installed"
        ],
        specifications: {
            "Processor": "Intel Core i7-8665U (4 Cores, 8 Threads, up to 4.8GHz)",
            "Memory (RAM)": "16 GB DDR4-2400 MHz",
            "Storage": "512 GB PCIe NVMe M.2 SSD",
            "Display": "14.0\" FHD (1920x1080) IPS, Anti-Glare",
            "Graphics": "Intel UHD Graphics 620",
            "Wireless": "Intel Dual Band Wireless-AC 802.11a/b/g/n/ac + Bluetooth 5.0",
            "Ports": "1 Thunderbolt (USB Type-C), 2 USB 3.1 Gen 1, 1 HDMI 1.4b, 1 RJ-45, Headphone/mic combo",
            "Battery": "HP 3-cell 50 Wh Long Life Li-ion with Fast Charging",
            "Weight": "1.48 kg (3.26 lbs)",
            "Operating System": "Windows 11 Pro Genuine",
            "Warranty": "1 Year Comprehensive Cytech Warranty"
        }
    },
    {
        id: "canon-imagerunner",
        name: "Canon imageRunner 2206N Multifunction Printer",
        category: "printer",
        categoryName: "Printers",
        price: 65000,
        originalPrice: 72000,
        badge: "OFFICE ESSENTIAL",
        rating: 4.7,
        reviewCount: 24,
        inStock: true,
        stockCount: 8,
        image: "image/images__15_-removebg-preview.png",
        shortDescription: "A3 Monochrome multifunction laser printer with Print, Copy, and Color Scan capabilities.",
        description: "The Canon imageRunner 2206N is a robust, cost-effective black-and-white A3 multifunctional device built to accelerate document workflows in demanding small-to-medium offices. Featuring reliable laser printing at up to 22 pages per minute, high-resolution color scanning, intuitive touch-key navigation, and seamless network connectivity via Ethernet and Wi-Fi, it streamlines daily copying, scanning, and printing tasks with minimal operating costs.",
        keyFeatures: [
            "All-in-one Print, Copy and Color Scanning in A3/A4 formats",
            "Fast output of up to 22 pages per minute (A4) and 11 ppm (A3)",
            "Integrated Ethernet and Wi-Fi network connectivity",
            "Mobile printing via Canon PRINT Business app and Apple AirPrint",
            "Large 3.5-inch intuitive mono touch display",
            "High paper capacity: 250-sheet standard cassette + 80-sheet multipurpose tray",
            "Low energy consumption with Energy Star certification",
            "Durable drum unit with high toner yield for low cost per page"
        ],
        specifications: {
            "Machine Type": "Monochrome A3 Laser Multifunctional",
            "Core Functions": "Print, Copy, and Color Scan",
            "Print Speed": "Up to 22 ppm (A4), up to 11 ppm (A3)",
            "Print Resolution": "600 x 600 dpi",
            "Paper Input Capacity": "Standard 330 sheets (expandable to 580 sheets)",
            "Paper Output Capacity": "250 sheets",
            "Connectivity": "100Base-TX/10Base-T Ethernet, Wi-Fi 802.11b/g/n, USB 2.0",
            "Scanning": "Flatbed & optional DADF color scanner",
            "Memory": "512 MB RAM",
            "Dimensions": "622 mm x 589 mm x 499 mm",
            "Weight": "Approx. 28.7 kg",
            "Warranty": "1 Year On-site Manufacturer Warranty"
        }
    },
    {
        id: "epson-eb-w55",
        name: "Epson EB-W55 WXGA Business Projector",
        category: "projector",
        categoryName: "Projectors",
        price: 55000,
        originalPrice: 62000,
        badge: "TOP RATED",
        rating: 4.9,
        reviewCount: 31,
        inStock: true,
        stockCount: 15,
        image: "image/espson-removebg-preview.png",
        shortDescription: "4,000 Lumens WXGA 3LCD projector with HDMI, USB, and optional wireless projection.",
        description: "Deliver bright, clear, and engaging presentations in boardrooms, training centers, and classrooms with the Epson EB-W55. Utilizing advanced 3LCD technology with an impressive 4,000 lumens of both white and color brightness, this WXGA (1280 x 800) projector creates vivid, cinema-like images on screen sizes up to 320 inches even in ambient daylight. Equipped with dual HDMI ports and durable lamp life lasting up to 12,000 hours in Eco mode.",
        keyFeatures: [
            "4,000 Lumens high color and white brightness with 3LCD technology",
            "WXGA (1280 x 800) widescreen HD resolution",
            "Remarkable contrast ratio of 16,000:1 for deep blacks and crisp text",
            "Massive display projection size from 33 inches up to 320 inches",
            "Dual HDMI inputs for connecting laptops, media boxes, and consoles",
            "Long lamp life: up to 12,000 hours in Eco mode (equivalent to 18 years at 1.5h/day)",
            "Automatic vertical keystone and manual horizontal slider for quick alignment",
            "Built-in 2W speaker and remote control included"
        ],
        specifications: {
            "Projection Technology": "3LCD Technology, RGB liquid crystal shutter",
            "Native Resolution": "WXGA (1280 x 800) 16:10 aspect ratio",
            "Color / White Brightness": "4,000 ANSI Lumens",
            "Contrast Ratio": "16,000 : 1",
            "Lamp Life": "Normal 6,000 h, Eco mode 12,000 h",
            "Projection Ratio": "1.30 - 1.56:1 (Zoom: 1.2x Optical)",
            "Screen Size": "33 inches - 320 inches",
            "Video Interfaces": "2 x HDMI (1 with MHL support), VGA in, Composite in, USB 2.0 Type A/B",
            "Audio": "Built-in 2W speaker + Audio In/Out",
            "Weight": "2.8 kg",
            "Warranty": "2 Years Cytech Carry-in Warranty"
        }
    },
    {
        id: "logitech-m170",
        name: "Logitech M170 Wireless Optical Mouse",
        category: "accessories",
        categoryName: "Accessories",
        price: 3500,
        originalPrice: 4200,
        badge: "BESTSELLER",
        rating: 4.6,
        reviewCount: 95,
        inStock: true,
        stockCount: 50,
        image: "image/logitech_m170-removebg-preview.png",
        shortDescription: "Reliable 2.4GHz wireless mouse with 12-month battery life and plug-and-play USB nano receiver.",
        description: "The Logitech M170 Wireless Mouse offers reliable wireless freedom with plug-and-play simplicity. Thanks to powerful 2.4GHz wireless connectivity with a range of up to 10 meters (33 feet), you'll experience virtually no delays, drops, or interference. Featuring an ambidextrous, comfortable contoured shape that feels great in either hand, smooth optical tracking on almost any surface, and up to 12 months of battery life on a single AA battery.",
        keyFeatures: [
            "Reliable 2.4 GHz wireless connection with up to 10-meter range",
            "Plug-and-play USB nano receiver—no pairing software required",
            "Up to 12 months of battery life with smart sleep power saving",
            "Smooth, responsive 1000 DPI optical sensor tracking",
            "Ambidextrous design for comfortable right- or left-handed use",
            "Durable mechanical switches rated for millions of clicks",
            "Ultra-compact and portable for laptops and travel",
            "Compatible with Windows, macOS, ChromeOS, and Linux"
        ],
        specifications: {
            "Sensor Technology": "Smooth Optical Tracking",
            "Sensor Resolution": "1,000 DPI",
            "Number of Buttons": "3 (Left, Right, Middle click with scroll wheel)",
            "Wireless Technology": "Advanced 2.4 GHz wireless",
            "Wireless Range": "Up to 10 meters (33 ft)",
            "Battery Type": "1 x AA Battery (Included)",
            "Battery Life": "Up to 12 months",
            "Dimensions": "97.7 mm x 61.5 mm x 35.2 mm",
            "Weight": "70.5 g (with battery)",
            "Compatibility": "Windows 10/11, macOS 10.8+, Chrome OS, Linux kernel 2.6+",
            "Warranty": "1 Year Replacement Warranty"
        }
    },
    {
        id: "ubiquiti-unifi",
        name: "Ubiquiti UniFi AC Lite Access Point",
        category: "networking",
        categoryName: "Networking",
        price: 12000,
        originalPrice: 14500,
        badge: "PRO CHOICE",
        rating: 4.9,
        reviewCount: 42,
        inStock: true,
        stockCount: 18,
        image: "image/wifi-removebg-preview.png",
        shortDescription: "Dual-Radio AC867 Gigabit 802.11ac Wi-Fi access point with Power over Ethernet (PoE).",
        description: "The Ubiquiti UniFi AC Lite AP features an ultra-compact, minimalist ceiling-mount design in a refined industrial form factor. Delivering simultaneous dual-band 2x2 MIMO technology, the UniFi AC Lite AP reaches combined speeds of up to 1167 Mbps (300 Mbps on 2.4GHz and 867 Mbps on 5GHz). Centrally managed using the powerful, free UniFi Network Controller software, it enables centralized guest portals, zero-handoff seamless roaming, bandwidth throttling, and enterprise-grade security.",
        keyFeatures: [
            "Simultaneous dual-band 802.11ac 2x2 MIMO Wi-Fi technology",
            "Up to 867 Mbps speed on 5 GHz and 300 Mbps on 2.4 GHz band",
            "Gigabit Ethernet port with 24V Passive PoE support (PoE injector included)",
            "Centralized UniFi Network Application software management",
            "Sleek, minimalist wall and ceiling mount hardware included",
            "Enterprise WPA-Enterprise / WPA2 security & guest portal hot-spot management",
            "Advanced RF optimization, channel steering, and airtime fairness",
            "Over 200+ concurrent active client connections capacity"
        ],
        specifications: {
            "Wi-Fi Standards": "802.11 a/b/g/n/ac",
            "MIMO": "2x2 Dual-Band",
            "Max Speeds": "5 GHz: 867 Mbps | 2.4 GHz: 300 Mbps",
            "Ethernet Interface": "1 x 10/100/1000 Gigabit RJ45 Port",
            "Power Method": "24V Passive PoE (Pairs 4, 5+; 7, 8 Return)",
            "Max Power Consumption": "6.5 W",
            "Antennas": "2 x Integrated Dual-Band Antennas (3 dBi each)",
            "Concurrent Clients": "200+",
            "Dimensions": "160 mm x 160 mm x 31.45 mm",
            "Weight": "170 g (185 g with mounting kits)",
            "Warranty": "1 Year Official Warranty"
        }
    },
    {
        id: "sony-ps4-controller",
        name: "Sony PlayStation 4 DualShock 4 Wireless Controller",
        category: "accessories",
        categoryName: "Accessories",
        price: 8000,
        originalPrice: 9500,
        badge: "GAMING",
        rating: 4.8,
        reviewCount: 67,
        inStock: true,
        stockCount: 22,
        image: "image/Sony_PS4_DualShock_4-removebg-preview.png",
        shortDescription: "Precision wireless gaming controller with multi-touch pad, integrated light bar, and motion sensors.",
        description: "Take total control of your gaming experience with the official Sony DualShock 4 Wireless Controller for PlayStation 4 and PC. Featuring refined analog sticks and trigger buttons for supreme precision, an innovative clickable multi-touch pad, an integrated light bar that interacts with games, and a built-in speaker paired with a 3.5mm stereo headset jack. Upload gameplay moments with the dedicated Share button and recharge easily via any standard micro-USB cable.",
        keyFeatures: [
            "Precision analog sticks and responsive trigger buttons",
            "Multi-touch clickable capacitive touchpad on face of controller",
            "Integrated light bar showing player health, status, and alerts",
            "Built-in speaker and 3.5mm stereo headset audio jack",
            "Highly sensitive built-in accelerometer and gyroscope motion sensors",
            "Share button for instant video clip and screenshot uploading",
            "Bluetooth and USB wired connection to PS4, PC, Mac, Android, and iOS",
            "Internal rechargeable lithium-ion battery"
        ],
        specifications: {
            "Platform Compatibility": "PlayStation 4, PC (Windows), macOS, iOS, Android",
            "Connectivity": "Bluetooth Ver 2.1+EDR / Micro USB",
            "Keys / Switches": "PS button, SHARE, OPTIONS, D-Pad, Action buttons, L1/R1, L2/R2, L3/R3, Touchpad click",
            "Touchpad": "2-Point Capacitive Touchpad with Click Mechanism",
            "Sensors": "Six-axis motion sensing system (three-axis gyroscope, three-axis accelerometer)",
            "Audio": "Built-in mono speaker, 3.5mm stereo headset jack",
            "Battery": "Built-in Lithium-ion Rechargeable Battery (1000 mAh)",
            "Color": "Jet Black",
            "Weight": "Approx. 210 g",
            "Warranty": "1 Year Replacement Warranty"
        }
    }
];

// Helper functions for accessing and filtering products
function getAllProducts() {
    return PRODUCTS_DATA;
}

function getProductById(id) {
    if (!id) return null;
    return PRODUCTS_DATA.find(p => p.id.toLowerCase() === id.toLowerCase()) || null;
}

function getProductsByCategory(category) {
    if (!category || category === "all") return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getRelatedProducts(productId, limit = 3) {
    const current = getProductById(productId);
    if (!current) return PRODUCTS_DATA.slice(0, limit);
    
    // First find same category products, excluding self
    const sameCategory = PRODUCTS_DATA.filter(p => p.id !== current.id && p.category === current.category);
    const otherProducts = PRODUCTS_DATA.filter(p => p.id !== current.id && p.category !== current.category);
    
    const combined = [...sameCategory, ...otherProducts];
    return combined.slice(0, limit);
}

function formatKSh(amount) {
    return "KSh " + Number(amount).toLocaleString();
}
