// Complete fixed version of the Google Sheets integration script
// This script handles the form submission and sends data to Google Sheets

// Google Apps Script Web App URL (already deployed)
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbySGBBmkjhrvBGp1zOEhI1y1E6y7jR_c-Uph54V4KgCEkXpNqYo23h1ItvI_KR-KNT2Uw/exec";

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission Handler
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                date: new Date().toLocaleString(),
                name: document.getElementById('fullName').value,
                phone: document.getElementById('phoneNumber').value,
                city: document.getElementById('city').value,
                quantity: document.getElementById('quantity').value,
                product: "عسل الفرنان", // Default product
                address: '',
                notes: ''
            };
            
            // Debug output - Check if values are being captured
            console.log("Form data:", formData);
            
            // Basic validation
            if (!formData.name || !formData.phone || !formData.city || !formData.quantity) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Show loading state
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'جاري المعالجة...';
            
            // Convert to URL-encoded form data instead of JSON
            const urlEncodedData = new URLSearchParams();
            Object.keys(formData).forEach(key => {
                urlEncodedData.append(key, formData[key]);
            });
            
            // Send data to Google Sheets using XMLHttpRequest for better compatibility
            const xhr = new XMLHttpRequest();
            xhr.open('POST', GOOGLE_SHEET_WEB_APP_URL);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onload = function() {
                // Save to localStorage as backup
                saveOrderToLocalStorage(formData);
                
                // Show success message
                alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
                orderForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            };
            
            xhr.onerror = function() {
                console.error('Error submitting form');
                
                // Save to localStorage as backup
                saveOrderToLocalStorage(formData);
                
                // Show error message
                alert('تم حفظ طلبك محلياً. سنتواصل معك قريباً.');
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            };
            
            // Send the request
            xhr.send(urlEncodedData.toString());
        });
    }
    
    // Try to send any stored orders
    setTimeout(function() {
        retrySendingFailedOrders();
    }, 3000);
});

// Function to save order to localStorage as backup
function saveOrderToLocalStorage(orderData) {
    try {
        // Get existing orders or initialize empty array
        const existingOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
        
        // Add new order with timestamp
        orderData.savedAt = new Date().toISOString();
        orderData.sentToSheets = false;
        existingOrders.push(orderData);
        
        // Save back to localStorage
        localStorage.setItem('farnaan_orders', JSON.stringify(existingOrders));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Function to retry sending failed orders
function retrySendingFailedOrders() {
    try {
        const savedOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
        if (savedOrders.length === 0) return;
        
        // Only process orders that haven't been confirmed as sent
        const unsentOrders = savedOrders.filter(function(order) {
            return !order.sentToSheets;
        });
        
        if (unsentOrders.length === 0) return;
        
        console.log(`Attempting to send ${unsentOrders.length} saved orders...`);
        
        // Process each unsent order
        unsentOrders.forEach(function(order, index) {
            // Convert to URL-encoded form data
            const urlEncodedData = new URLSearchParams();
            Object.keys(order).forEach(key => {
                if (key !== 'savedAt' && key !== 'sentToSheets') {
                    urlEncodedData.append(key, order[key]);
                }
            });
            
            const xhr = new XMLHttpRequest();
            xhr.open('POST', GOOGLE_SHEET_WEB_APP_URL);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onload = function() {
                // Mark as sent
                savedOrders[savedOrders.findIndex(o => o.savedAt === order.savedAt)].sentToSheets = true;
                localStorage.setItem('farnaan_orders', JSON.stringify(savedOrders));
                console.log('Successfully sent saved order to Google Sheets');
            };
            
            xhr.onerror = function() {
                console.error('Failed to send saved order');
            };
            
            // Send the request
            xhr.send(urlEncodedData.toString());
        });
    } catch (error) {
        console.error('Error in retry process:', error);
    }
}
