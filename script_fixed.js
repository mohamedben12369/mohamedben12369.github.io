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
document.addEventListener('DOMContentLoaded', function() {
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
});

// Function to export data to Excel
function exportToExcel(data, fileName = 'طلبات_عسل_الفرنان.xlsx') {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert data to worksheet format
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "طلبات");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(wb, fileName);
}

// Function to save order to localStorage
function saveOrderToLocalStorage(orderData) {
    // Get existing orders or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
    
    // Add new order
    existingOrders.push(orderData);
    
    // Save back to localStorage
    localStorage.setItem('farnaan_orders', JSON.stringify(existingOrders));
}

// Create admin panel for viewing all orders
function createOrUpdateAdminPanel() {
    // Check if admin panel already exists
    let adminPanel = document.querySelector('.admin-panel');
    
    if (!adminPanel) {
        // Create admin panel elements
        adminPanel = document.createElement('div');
        adminPanel.className = 'admin-panel';
        
        const adminButton = document.createElement('button');
        adminButton.className = 'admin-button';
        adminButton.textContent = 'عرض جميع الطلبات (للإدارة)';
        
        adminButton.addEventListener('click', showOrdersTable);
        
        adminPanel.appendChild(adminButton);
        
        // Add admin panel to the page (after the contact form)
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.appendChild(adminPanel);
        }
    }
}

// Show table with all orders
function showOrdersTable() {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('farnaan_orders') || '[]');
    
    if (orders.length === 0) {
        alert('لا توجد طلبات حتى الآن');
        return;
    }
    
    // Create modal for orders table
    const modal = document.createElement('div');
    modal.className = 'orders-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'orders-modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => modal.remove());
    
    const title = document.createElement('h3');
    title.textContent = 'جميع الطلبات';
    
    const exportBtn = document.createElement('button');
    exportBtn.className = 'export-excel-btn';
    exportBtn.textContent = 'تصدير إلى Excel';
    exportBtn.addEventListener('click', () => exportToExcel(orders));
    
    const table = document.createElement('table');
    table.className = 'orders-table';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['التاريخ', 'الاسم', 'رقم الهاتف', 'المدينة', 'الكمية'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        ['date', 'name', 'phone', 'city', 'quantity'].forEach(key => {
            const td = document.createElement('td');
            td.textContent = order[key];
            row.appendChild(td);
        });
        
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(exportBtn);
    modalContent.appendChild(table);
    modal.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Add styles for modal and table
    const style = document.createElement('style');
    style.textContent = `
        .orders-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            direction: rtl;
        }
        .orders-modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        .close-modal {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 24px;
            cursor: pointer;
        }
        .orders-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            text-align: center;
        }
        .orders-table th, .orders-table td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .orders-table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .orders-table th {
            padding-top: 12px;
            padding-bottom: 12px;
            background-color: #8B4513;
            color: white;
        }
        .export-excel-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        .admin-panel {
            text-align: center;
            margin: 20px 0;
        }
        .admin-button {
            background: #8B4513;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        .admin-button:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
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
