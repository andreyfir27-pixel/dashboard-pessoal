// Navegação por abas
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('nav a');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-tab');

            // Remove active class
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Carregar estados salvos
    loadStates();

    // Salvar estados ao mudar
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            saveStates();
        }
    });

    // Salvar tabelas editáveis
    document.addEventListener('input', function(e) {
        if (e.target.hasAttribute('contenteditable')) {
            saveTables();
        }
    });
});

// Funções para salvar/carregar no localStorage
function saveStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const states = {};
    checkboxes.forEach(cb => {
        states[cb.id || cb.className + '-' + Array.from(cb.parentNode.children).indexOf(cb)] = cb.checked;
    });
    localStorage.setItem('checkboxStates', JSON.stringify(states));
}

function loadStates() {
    const states = JSON.parse(localStorage.getItem('checkboxStates') || '{}');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const key = cb.id || cb.className + '-' + Array.from(cb.parentNode.children).indexOf(cb);
        if (states[key] !== undefined) {
            cb.checked = states[key];
        }
    });
}

function saveTables() {
    const tables = document.querySelectorAll('table');
    const tableData = {};
    tables.forEach(table => {
        const id = table.id;
        const rows = [];
        table.querySelectorAll('tbody tr').forEach(tr => {
            const cells = [];
            tr.querySelectorAll('td').forEach(td => {
                cells.push(td.textContent);
            });
            rows.push(cells);
        });
        tableData[id] = rows;
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

// Carregar tabelas (adicione lógica se necessário para restaurar)
