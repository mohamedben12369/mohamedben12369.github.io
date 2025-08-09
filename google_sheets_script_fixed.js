// This script contains the complete, fixed version of the Google Sheets integration
// Copy this entire file to replace your current google_sheets_script.js

// Replace with your actual Google Apps Script Web App URL after deployment
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzZCR6vVnr0jcCVUVlH0IhXrNfh6bxcjNPVA0Eu5CaAOmRSb-UU_yFgaFOTx_5ufmJGWA/exec";

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
    
    // Form Submission Handler with Google Sheets Integration
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
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
            
            // Basic validation
            if (!formData.name || !formData.phone || !formData.city || !formData.quantity) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Disable submit button during processing
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'جاري المعالجة...';
            
            // Send data to Google Sheets
            sendToGoogleSheets(formData)
                .then(function() {
                    // Save to localStorage as backup
                    saveOrderToLocalStorage(formData);
                    
                    // Show success message
                    alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
                    orderForm.reset();
                })
                .catch(function(error) {
                    console.error('Error submitting form:', error);
                    
                    // Save to localStorage as backup
                    saveOrderToLocalStorage(formData);
                    
                    // Show error message
                    alert('تم حفظ طلبك محلياً. سيتم إرسال طلبك عندما تعود الاتصال بالإنترنت.');
                    orderForm.reset();
                })
                .finally(function() {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'إرسال الطلب';
                });
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        animateElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Try to send any stored orders
    setTimeout(retrySendingFailedOrders, 5000);
});

// Function to send data to Google Sheets
async function sendToGoogleSheets(data) {
    try {
        const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for cross-origin requests
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        
        // Due to 'no-cors' mode, we can't actually check the response
        // We'll assume success if no error is thrown
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        throw error;
    }
}

// Function to save order to localStorage as backup
function saveOrderToLocalStorage(orderData) {
    try {
        // Get existing orders or initialize empty array
        const existingOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
        
        // Add new order with timestamp
        orderData.savedAt = new Date().toISOString();
        existingOrders.push(orderData);
        
        // Save back to localStorage
        localStorage.setItem('farnaan_orders', JSON.stringify(existingOrders));
        
        // Limit the number of orders stored (optional)
        if (existingOrders.length > 100) {
            // Keep only the latest 100 orders
            const trimmedOrders = existingOrders.slice(-100);
            localStorage.setItem('farnaan_orders', JSON.stringify(trimmedOrders));
        }
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
        let successCount = 0;
        
        Promise.all(unsentOrders.map(async function(order, index) {
            try {
                await sendToGoogleSheets(order);
                savedOrders[index].sentToSheets = true;
                successCount++;
                return true;
            } catch (error) {
                console.error('Failed to send saved order:', error);
                return false;
            }
        })).then(function() {
            // Update localStorage with new status
            localStorage.setItem('farnaan_orders', JSON.stringify(savedOrders));
            
            if (successCount > 0) {
                console.log(`Successfully sent ${successCount} saved orders to Google Sheets.`);
            }
        });
    } catch (error) {
        console.error('Error in retry process:', error);
    }
}
