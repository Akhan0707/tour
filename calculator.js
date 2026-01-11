const destinationRates = {
    'bali': { base: 100, accommodation: 80 },
    'paris': { base: 150, accommodation: 120 },
    'tokyo': { base: 130, accommodation: 100 },
    'default': { base: 120, accommodation: 90 }
};

const styleMultipliers = {
    'budget': 1.0,
    'standard': 1.5,
    'luxury': 2.5
};

function calculateCost() {
       const destination = document.getElementById('destination').value.toLowerCase().trim();
    const travellers = parseInt(document.getElementById('travellers').value);
    const days = parseInt(document.getElementById('days').value);
    const style = document.getElementById('style').value;
    
    if (!destination || isNaN(travellers) || isNaN(days)) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    let rates = destinationRates['default'];
    for (const dest in destinationRates) {
        if (destination.includes(dest)) {
            rates = destinationRates[dest];
            break;
        }
    }
    
    const dailyCost = rates.base * styleMultipliers[style];
    const accommodationCost = rates.accommodation * styleMultipliers[style];
    const totalPerPerson = (dailyCost + accommodationCost) * days;
    const totalCost = totalPerPerson * travellers;
    
    const formattedDest = destination.charAt(0).toUpperCase() + destination.slice(1);
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Your Estimated Trip Cost</h3>
        <div class="cost-breakdown">
            <p><strong>Destination:</strong> ${formattedDest}</p>
            <p><strong>Travellers:</strong> ${travellers} person(s)</p>
            <p><strong>Duration:</strong> ${days} days</p>
            <p><strong>Travel Style:</strong> ${style.charAt(0).toUpperCase() + style.slice(1)}</p>
            <hr>
            <p><strong>Daily Cost per Person:</strong> $${dailyCost.toFixed(2)}</p>
            <p><strong>Accommodation per Person:</strong> $${accommodationCost.toFixed(2)}</p>
            <p><strong>Total per Person:</strong> $${totalPerPerson.toFixed(2)}</p>
            <h2 class="total-cost">Total Estimated Cost: $${totalCost.toFixed(2)}</h2>
        </div>
        <p class="note"><i class="fas fa-info-circle"></i> This includes flights, accommodation, and basic activities.</p>
    `;
   
    resultDiv.style.animation = 'fadeIn 0.5s ease-in';
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .cost-breakdown {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .total-cost {
        color: #e74c3c;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid #eee;
    }
    
    .note {
        font-size: 0.9rem;
        color: #666;
        margin-top: 1rem;
    }
`;
document.head.appendChild(style);