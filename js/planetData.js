// Planet Data Configuration
export const planetData = [
    { 
        name: "Merkurius", 
        texture: './texture/mercury.jpg', 
        size: 0.8, 
        distance: 15, 
        speed: 4.7, 
        questions: [
            "Aku planet terkecil dan paling dekat dengan Matahari.",
            "Aku tidak memiliki atmosfer dan permukaanku penuh kawah.",
            "Temperaturku sangat ekstrem, siang sangat panas, malam sangat dingin.",
            "Aku mengorbit Matahari dalam waktu hanya 88 hari Bumi.",
            "Namaku diambil dari nama dewa pembawa pesan dalam mitologi Romawi."
        ]
    },
    { 
        name: "Venus", 
        texture: './texture/venus.jpg', 
        size: 1.5, 
        distance: 22, 
        speed: 3.5, 
        questions: [
            "Aku planet terpanas di tata surya meski bukan yang terdekat dengan Matahari.",
            "Atmosferku sangat tebal dan terdiri dari gas karbon dioksida.",
            "Aku berputar berlawanan arah dengan planet lain (retrograde).",
            "Aku dijuluki 'Bintang Fajar' atau 'Bintang Senja' karena sangat terang.",
            "Tekanan atmosferku 92 kali lebih besar dari Bumi."
        ]
    },
    { 
        name: "Bumi", 
        texture: './texture/bumi.jpg', 
        size: 1.6, 
        distance: 30, 
        speed: 3.0, 
        hasMoon: true, 
        questions: [
            "Aku satu-satunya planet yang memiliki kehidupan.",
            "70% permukaanku ditutupi oleh air.",
            "Aku memiliki satu satelit alami yang disebut Bulan.",
            "Atmosferku mengandung 78% nitrogen dan 21% oksigen.",
            "Aku memiliki lapisan ozon yang melindungi dari radiasi UV."
        ]
    },
    { 
        name: "Mars", 
        texture: './texture/mars.jpg', 
        size: 0.9, 
        distance: 40, 
        speed: 2.4, 
        questions: [
            "Aku dijuluki 'Planet Merah' karena warna permukaanku.",
            "Aku memiliki gunung tertinggi di tata surya, Olympus Mons.",
            "Aku memiliki dua satelit kecil bernama Phobos dan Deimos.",
            "Di permukaanku ditemukan es air di kutub utara dan selatan.",
            "Aku menjadi target utama eksplorasi manusia untuk kolonisasi."
        ]
    },
    { 
        name: "Jupiter", 
        texture: './texture/jupiter.jpg', 
        size: 4.0, 
        distance: 60, 
        speed: 1.3, 
        questions: [
            "Aku planet terbesar di tata surya, raksasa gas.",
            "Aku memiliki Bintik Merah Raksasa, badai yang berlangsung ratusan tahun.",
            "Aku memiliki lebih dari 79 satelit, termasuk Ganymede yang terbesar.",
            "Aku berputar sangat cepat, satu hari hanya 10 jam.",
            "Gravitasiku sangat kuat dan melindungi planet dalam dari asteroid."
        ]
    },
    { 
        name: "Saturnus", 
        texture: './texture/saturn.jpg', 
        size: 3.5, 
        distance: 80, 
        speed: 0.9, 
        hasRing: true, 
        questions: [
            "Aku terkenal dengan cincin indahku yang terbuat dari es dan batuan.",
            "Aku planet raksasa gas kedua terbesar setelah Jupiter.",
            "Aku memiliki lebih dari 80 satelit, termasuk Titan yang besar.",
            "Cincinku sangat lebar tapi sangat tipis, hanya sekitar 10 meter.",
            "Aku bisa mengapung di air karena kepadatanku lebih rendah dari air."
        ]
    },
    { 
        name: "Uranus", 
        texture: './texture/uranus.jpg', 
        size: 2.5, 
        distance: 100, 
        speed: 0.6, 
        questions: [
            "Aku planet yang berputar miring, hampir menggelinding di orbitku.",
            "Aku berwarna biru muda karena metana di atmosferku.",
            "Sumbuku miring 98 derajat, hampir berbaring di orbitku.",
            "Aku memiliki 27 satelit yang dinamai dari karakter Shakespeare.",
            "Aku ditemukan pada tahun 1781 oleh William Herschel."
        ]
    },
    { 
        name: "Neptunus", 
        texture: './texture/neptune.jpg', 
        size: 2.4, 
        distance: 120, 
        speed: 0.5, 
        questions: [
            "Aku planet terjauh dari Matahari di tata surya.",
            "Aku memiliki angin terkencang di tata surya, mencapai 2.100 km/jam.",
            "Warna biruku lebih gelap dari Uranus karena komposisi atmosfer berbeda.",
            "Aku memiliki satelit besar bernama Triton yang mengorbit mundur.",
            "Aku ditemukan melalui perhitungan matematika sebelum diamati langsung."
        ]
    }
];
