// Google Sheets direct integration script - simplified version
// This script sends form data directly to Google Sheets using iframe technique

// Create a hidden iframe for Google Sheets form submission
let hiddenFrame;

document.addEventListener('DOMContentLoaded', function() {
    // Create hidden iframe for form submissions
    hiddenFrame = document.createElement('iframe');
    hiddenFrame.name = 'hidden-form-frame';
    hiddenFrame.style.display = 'none';
    document.body.appendChild(hiddenFrame);

    // Mobile navigation code
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Handle form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        // Create a real form submission to Google Script
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const fullName = document.getElementById('fullName').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const city = document.getElementById('city').value;
            const quantity = document.getElementById('quantity').value;
            
            if (!fullName || !phoneNumber || !city || !quantity) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Show loading state
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'جاري المعالجة...';
            
            // Create a new form to submit directly to Google Apps Script
            const googleForm = document.createElement('form');
            googleForm.method = 'POST';
            googleForm.action = 'https://script.google.com/macros/s/AKfycbzh7xbSjdmKxEiRzuZ2N3mCZbX5ZDJqe2u1TH_lTnNa5UJJ1Ffs4MkgMoQiJAZaHsIxfA/exec';
            googleForm.target = 'hidden-form-frame';
            
            // Add form data
            addField(googleForm, 'date', new Date().toLocaleString());
            addField(googleForm, 'name', fullName);
            addField(googleForm, 'phone', phoneNumber);
            addField(googleForm, 'city', city);
            addField(googleForm, 'quantity', quantity);
            addField(googleForm, 'product', 'عسل الفرنان');
            
            // Add to document and submit
            document.body.appendChild(googleForm);
            googleForm.submit();
            document.body.removeChild(googleForm);
            
            // Save backup to localStorage
            const orderData = {
                date: new Date().toLocaleString(),
                name: fullName,
                phone: phoneNumber,
                city: city,
                quantity: quantity,
                product: 'عسل الفرنان'
            };
            saveOrderToLocalStorage(orderData);
            
            // Show success message
            alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
            orderForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    }
});

// Helper function to add field to form
function addField(form, name, value) {
    const field = document.createElement('input');
    field.type = 'hidden';
    field.name = name;
    field.value = value;
    form.appendChild(field);
}

// Function to save order to localStorage as backup
function saveOrderToLocalStorage(orderData) {
    try {
        const existingOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
        orderData.savedAt = new Date().toISOString();
        existingOrders.push(orderData);
        localStorage.setItem('farnaan_orders', JSON.stringify(existingOrders));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}
