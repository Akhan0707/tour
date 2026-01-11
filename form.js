document.addEventListener('DOMContentLoaded', function() {
     const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
               const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
             
                setTimeout(() => {
                    document.getElementById('contactMessageStatus').innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            Message sent successfully! We'll respond within 24 hours.
                        </div>
                    `;
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
   
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('formMessage').innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            Appointment request submitted! Our travel expert will contact you soon.
                        </div>
                    `;
                    appointmentForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
});

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            field.style.borderColor = '#e74c3c';
            field.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
            
            field.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                    this.style.borderColor = '';
                    this.style.boxShadow = '';
                }
            });
        }
    });
    
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.classList.add('error');
            emailField.style.borderColor = '#e74c3c';
            alert('Please enter a valid email address.');
            isValid = false;
        }
    }
    
    return isValid;
}

const formStyles = document.createElement('style');
formStyles.textContent = `
    .error {
        border-color: #e74c3c !important;
        background-color: #ffeaea;
    }
    
    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        border: 1px solid #c3e6cb;
        animation: fadeIn 0.5s ease-in;
    }
    
    .success-message i {
        color: #28a745;
        margin-right: 10px;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(formStyles);