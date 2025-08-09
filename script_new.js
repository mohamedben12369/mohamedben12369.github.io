// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 69, 19, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #d4af37, #f4d03f)';
        header.style.backdropFilter = 'none';
    }
});

// Form Submission Handler with Excel Export
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('fullName').value;
            const phone = document.getElementById('phoneNumber').value;
            const city = document.getElementById('city').value;
            const quantity = document.getElementById('quantity').value;
            const orderDate = new Date().toLocaleString('ar-SA');
            
            // Basic validation
            if (!name || !phone || !city || !quantity) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Phone validation (accepts most Middle Eastern formats)
            const phoneRegex = /^(\+|00)?[0-9]{8,15}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('يرجى إدخال رقم هاتف صحيح');
                return;
            }
            
            // Change button state
            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Create the order data
            const orderData = {
                date: orderDate,
                name: name,
                phone: phone,
                city: city,
                quantity: quantity
            };
            
            // Save order to localStorage
            saveOrderToLocalStorage(orderData);
            
            // Create a "view all orders" link for the admin
            createOrUpdateAdminPanel();
            
            setTimeout(() => {
                alert(`شكراً لك ${name}! تم استلام طلبكم وسنتواصل معكم قريباً على الرقم ${phone}`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    // Create admin panel on page load
    createOrUpdateAdminPanel();
    
    // Intersection Observer for Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to save order to localStorage
function saveOrderToLocalStorage(orderData) {
    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
    
    // Add new order
    existingOrders.push(orderData);
    
    // Save back to localStorage
    localStorage.setItem('farnaan_orders', JSON.stringify(existingOrders));
}

// Function to create or update admin panel
function createOrUpdateAdminPanel() {
    // Check if admin panel already exists
    let adminPanel = document.getElementById('admin-panel');
    
    if (!adminPanel) {
        // Create the admin panel
        adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.className = 'admin-panel';
        adminPanel.style.position = 'fixed';
        adminPanel.style.bottom = '20px';
        adminPanel.style.right = '20px';
        adminPanel.style.background = '#8b4513';
        adminPanel.style.color = '#fff';
        adminPanel.style.padding = '10px 15px';
        adminPanel.style.borderRadius = '5px';
        adminPanel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        adminPanel.style.zIndex = '1000';
        adminPanel.style.cursor = 'pointer';
        adminPanel.style.display = 'none'; // Hidden by default
        
        // Add click event to export all orders
        adminPanel.addEventListener('click', exportAllOrders);
        
        // Add admin panel to the body
        document.body.appendChild(adminPanel);
        
        // Add keyboard shortcut to toggle admin panel (Ctrl+Shift+A)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Update admin panel content
    const orders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
    adminPanel.textContent = `📊 تصدير جميع الطلبات (${orders.length})`;
}

// Function to export all orders as a single Excel file
function exportAllOrders() {
    // Get all orders from localStorage
    const orders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
    
    if (orders.length === 0) {
        alert('لا توجد طلبات لتصديرها');
        return;
    }
    
    // Create Excel data with headers
    const excelData = [
        ['تاريخ الطلب', 'الاسم الكامل', 'رقم الهاتف', 'المدينة', 'الكمية']
    ];
    
    // Add each order as a row
    orders.forEach(order => {
        excelData.push([
            order.date,
            order.name,
            order.phone,
            order.city,
            order.quantity
        ]);
    });
    
    // Export to Excel
    exportToExcel(excelData, 'جميع_طلبات_عسل_الفرنان');
}

// Function to export data to Excel
function exportToExcel(data, fileName) {
    try {
        // Create a workbook with a worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "طلبات");
        
        // Generate the Excel file and download
        XLSX.writeFile(wb, fileName + ".xlsx");
    } catch (error) {
        console.error("Error creating Excel file:", error);
        // Fallback to CSV if Excel generation fails
        exportToCSV(data, fileName);
    }
}

// Fallback function to export as CSV
function exportToCSV(data, fileName) {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Add BOM for Arabic support
    
    data.forEach(row => {
        const csvRow = row.join(',');
        csvContent += csvRow + '\r\n';
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName + ".csv");
    document.body.appendChild(link);
    
    // Download the file
    link.click();
    document.body.removeChild(link);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(139, 69, 19, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #d4af37, #f4d03f)';
        header.style.backdropFilter = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
