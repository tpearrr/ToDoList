// Elementi del DOM
const inputAttivita = document.getElementById('inputAttivita');
const btnAggiungi = document.getElementById('btnAggiungi');
const listaAttivita = document.getElementById('listaAttivita');
const statoVuoto = document.getElementById('statoVuoto');
const contatoreAttivita = document.getElementById('contatoreAttivita');

// Array per memorizzare le attività
let attivita = [];
let contatoreIdAttivita = 1;

// Funzione per aggiungere una nuova attività
function aggiungiAttivita() {
    const testoAttivita = inputAttivita.value.trim();
    
    if (testoAttivita === '') {
        alert('Per favore inserisci un\'attività!');
        return;
    }

    // Crea nuovo oggetto attività
    const nuovaAttivita = {
        id: contatoreIdAttivita++,
        testo: testoAttivita,
        completata: false
    };

    attivita.push(nuovaAttivita);
    inputAttivita.value = '';
    renderizzaAttivita();
}

// Funzione per eliminare un'attività
function eliminaAttivita(idAttivita) {
    attivita = attivita.filter(att => att.id !== idAttivita);
    renderizzaAttivita();
}

// Funzione per completare/annullare un'attività
function cambiaStatoAttivita(idAttivita) {
    const att = attivita.find(att => att.id === idAttivita);
    if (att) {
        att.completata = !att.completata;
        renderizzaAttivita();
    }
}

// Funzione per aggiornare il contatore
function aggiornaContatore() {
    const totaleAttivita = attivita.length;
    const attivitaCompletate = attivita.filter(att => att.completata).length;
    
    if (totaleAttivita === 0) {
        contatoreAttivita.textContent = '0 attività';
    } else {
        contatoreAttivita.textContent = `${totaleAttivita} attività (${attivitaCompletate} completate)`;
    }
}

// Funzione per renderizzare tutte le attività
function renderizzaAttivita() {
    // Pulisci la lista
    listaAttivita.innerHTML = '';

    // Se non ci sono attività, mostra lo stato vuoto
    if (attivita.length === 0) {
        statoVuoto.style.display = 'block';
        aggiornaContatore();
        return;
    }

    statoVuoto.style.display = 'none';

    // Crea elementi per ogni attività
    attivita.forEach(att => {
        const li = document.createElement('li');
        li.className = `elemento-attivita ${att.completata ? 'completata' : ''}`;
        
        li.innerHTML = `
            <span class="testo-attivita">${att.testo}</span>
            <div class="azioni-attivita">
                <button class="btn-completa ${att.completata ? 'completata' : ''}" onclick="cambiaStatoAttivita(${att.id})">
                    ${att.completata ? '↺ Annulla' : '✓ Completa'}
                </button>
                <button class="btn-elimina" onclick="eliminaAttivita(${att.id})">🗑 Elimina</button>
            </div>
        `;
        
        listaAttivita.appendChild(li);
    });

    aggiornaContatore();
}

// Event listeners
btnAggiungi.addEventListener('click', aggiungiAttivita);

inputAttivita.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        aggiungiAttivita();
    }
});

// Focus automatico sull'input
inputAttivita.focus();

// Inizializzazione
renderizzaAttivita();