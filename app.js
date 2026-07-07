// 1. Ambil semua elemen yang memiliki kelas 'scroll-animate'
const animatedElements = document.querySelectorAll('.scroll-animate');

// 2. Atur konfigurasi kapan animasi dipicu
const observerOptions = {
    root: null,         // Menggunakan viewport (layar browser) sebagai acuan
    threshold: 0.15,    // Animasi jalan jika 15% bagian elemen sudah masuk layar
    rootMargin: "0px"   // Tidak ada jarak tambahan di luar layar
};

// 3. Buat fungsi Observer-nya
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Jika elemen sudah masuk ke dalam area layar
        if (entry.isIntersecting) {
            // Hapus kelas transparansi dan pergeseran bawah
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            
            // Tambahkan kelas untuk membuatnya muncul (opsional, untuk memastikan)
            entry.target.classList.add('opacity-100', 'translate-y-0');
            
            // Berhenti memantau elemen ini karena animasi sudah selesai berjalan sekali
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 4. Perintahkan observer untuk memantau setiap elemen yang ditargetkan
animatedElements.forEach(element => {
    scrollObserver.observe(element);
});

// Ambil elemen HTML yang dibutuhkan
const htmlTag = document.documentElement;
const toggleBtn = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Fungsi untuk memperbarui tampilan ikon tombol
function updateIcons(isDark) {
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// 1. CEK PILIHAN SEBELUMNYA SAAT WEB DI-LOAD
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Jika user pernah memilih dark, atau sistem operasinya default-nya dark
if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlTag.classList.add('dark');
    updateIcons(true);
} else {
    htmlTag.classList.remove('dark');
    updateIcons(false);
}

// 2. LOGIKA KETIKA TOMBOL TOGGLE DIKLIK
toggleBtn.addEventListener('click', () => {
    // Toggle (pasang/lepas) kelas 'dark' di tag <html>
    htmlTag.classList.toggle('dark');
    
    // Cek apakah sekarang posisinya dark mode atau tidak
    const isDarkNow = htmlTag.classList.contains('dark');
    
    // Simpan status terbaru ke localStorage browser
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    
    // Perbarui ikon
    updateIcons(isDarkNow);
});
// Aktifkan penggantian tag <i> menjadi ikon SVG Lucide
lucide.createIcons();

// Ambil element tombol luar & menu dropdown-nya
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Fungsi Utama: Buka dan tutup menu saat tombol diklik
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        // Logika buka tutup menu mobile
        mobileMenu.classList.toggle('hidden');
        
        // Cari ikon di dalam tombol untuk ditukar secara dinamis
        const openIcon = menuToggle.querySelector('[data-lucide="menu"]');
        const closeIcon = menuToggle.querySelector('[data-lucide="x"]');
        
        if (openIcon && closeIcon) {
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        }
    });
}

// Otomatis menutup menu dropdown saat salah satu tautan menu diklik
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            
            // Kembalikan ikon hamburger ke bentuk semula (garis tiga)
            const openIcon = menuToggle?.querySelector('[data-lucide="menu"]');
            const closeIcon = menuToggle?.querySelector('[data-lucide="x"]');
            
            if (openIcon && closeIcon) {
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }
    });
});