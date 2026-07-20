// public/app.js
let allSoftware = [];

async function fetchSoftware() {
    try {
        const res = await fetch('/api/software');
        allSoftware = await res.json();
        renderSoftware(allSoftware);
        renderCategoryPills();
    } catch (e) {
        console.error(e);
        document.getElementById('softwareGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:3rem;">
                <p>Failed to load software data. Please try again later.</p>
            </div>`;
    }
}

function renderSoftware(software) {
    const grid = document.getElementById('softwareGrid');
    grid.innerHTML = '';

    software.forEach(app => {
        const cardHTML = `
            <div class="card">
                <div class="card-header">
                    <img src="${app.icon}" alt="${app.title}">
                </div>
                <div class="card-body">
                    <span class="category-badge" style="background: ${getCategoryColor(app.category)}; color: white;">
                        ${app.category}
                    </span>
                    <h3>${app.title}</h3>
                    <div class="version">v${app.version}</div>
                    <div class="rating">
                        ${'★'.repeat(Math.floor(app.rating))} <span style="color:#888;">(${app.rating})</span>
                    </div>
                    <p>${app.description}</p>
                    
                    <div class="card-footer">
                        <a href="${app.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn-get">
                            Get / Visit <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

function getCategoryColor(cat) {
    const colors = {
        'Productivity': '#00A86B',
        'System Utilities': '#FF6B00',
        'Security': '#00BFFF',
        'Media Tools': '#FF4500',
        'Web Apps': '#0078D4',
        'Developer Tools': '#7B68EE'
    };
    return colors[cat] || '#666';
}

function renderCategoryPills() {
    const categories = [...new Set(allSoftware.map(s => s.category))];
    const container = document.getElementById('pillFilters');
    container.innerHTML = `<span class="active-pill" data-cat="">All</span>`;
    
    categories.forEach(cat => {
        const pill = document.createElement('span');
        pill.className = 'pill';
        pill.textContent = cat;
        pill.dataset.cat = cat;
        container.appendChild(pill);
    });

    container.addEventListener('click', (e) => {
        if (e.target.dataset.cat !== undefined) {
            document.querySelectorAll('#pillFilters span').forEach(s => s.classList.remove('active-pill'));
            e.target.classList.add('active-pill');
            
            const filtered = e.target.dataset.cat 
                ? allSoftware.filter(s => s.category === e.target.dataset.cat)
                : allSoftware;
            renderSoftware(filtered);
        }
    });
}

// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = allSoftware.filter(app => 
        app.title.toLowerCase().includes(term) || 
        app.description.toLowerCase().includes(term)
    );
    renderSoftware(filtered);
});

// Category dropdown sync
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const val = e.target.value;
    const filtered = val ? allSoftware.filter(s => s.category === val) : allSoftware;
    renderSoftware(filtered);
});

// Modals
window.showModal = function(type) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    
    if (type === 'privacy') {
        body.innerHTML = `<h2>Privacy Policy</h2><p>This is a demo application. We respect your privacy and do not collect personal data beyond standard analytics.</p>`;
    } else if (type === 'terms') {
        body.innerHTML = `<h2>Terms of Service</h2><p>By using WinApps Hub, you agree to our terms. All external links are provided as-is.</p>`;
    } else if (type === 'dmca') {
        body.innerHTML = `<h2>DMCA Disclaimer</h2><p>We respect copyright. Contact us to remove any infringing content.</p>`;
    }
    
    modal.style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('modal').style.display = 'none';
};

// Request button
document.getElementById('requestBtn').addEventListener('click', () => {
    alert("Thank you! Software submission form coming soon.");
});

// Initialize
fetchSoftware();
