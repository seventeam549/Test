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

// تابع اصلی برای درخواست دسترسی به موقعیت مکانی
function requestLocation() {
    // ⚠️ توجه: این دستور باعث می‌شود که مرورگر (کروم) اعلان امنیتی رسمی خود را نمایش دهد.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // تابع موفقیت (اگر کاربر در اعلان مرورگر "Allow" را بزند)
            (position) => {
                hideConsentBox();
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                showMainContent(`✅ دسترسی مجاز شد. موقعیت شما: عرض جغرافیایی ${lat}، طول جغرافیایی ${lon}`);
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
    // در این حالت، ما وضعیت "رد شده" را در Local Storage ذخیره نمی‌کنیم،
    // زیرا اگر بخواهیم در آینده دوباره درخواست دهیم، همچنان اعلان مرورگر ظاهر خواهد شد.
});

// در ابتدا، فرض می‌کنیم کاربر هنوز تصمیم نگرفته است.
// این خط را برای شروع نمایش پیام تایید سفارشی نیاز نداریم، زیرا آن به طور پیش‌فرض در HTML نمایش داده می‌شود.
