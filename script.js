// SNACK 1

// Funzione che restituisce una Promise contenente il titolo di un post specifico
function getPostTitle(id) {

    return new Promise((resolve, reject) => {
        // Effettua una richiesta HTTP per ottenere il post con l'ID specificato
        fetch(`https://dummyjson.com/posts/${id}`)
            // Converte la risposta in formato JSON
            .then(res => res.json())
            // Risolve la Promise con il titolo del post
            .then(post => resolve(post.title))
            // In caso di errore, rigetta la Promise
            .catch(reject)
    });

}

// Uso della funzione getPostTitle
getPostTitle(1)
    // Stampa il titolo se la richiesta ha successo
    .then(title => console.log(`Titolo del post:`, title))
    // Stampa l'errore se qualcosa va storto
    .catch(err => console.error(err));


// BONUS => Funzione che restituisce una Promise contenente l'intero post + info dell'autore
function getPost(id) {

    // Prima richiesta: ottiene il post con l'ID dato
    return new Promise((resolve, reject) => {
        fetch(`https://dummyjson.com/posts/${id}`)
            // Converte la risposta in JSON
            .then(res => res.json())
            .then(post => {
                // Seconda richiesta: ottiene i dati dell'autore usando l'userId del post
                fetch(`https://dummyjson.com/users/${post.userId}`)
                    // Converte la risposta dell'utente in JSON
                    .then(res => res.json())
                    .then(user => {
                        // Combina il post originale con i dati dell'utente
                        const result = {
                            // Spread operator per copiare tutte le proprietà del post
                            ...post,
                            // Aggiunge la nuova proprietà 'user'
                            user
                        }
                        // Risolve la Promise con l'oggetto completo
                        resolve(result);
                    })
            })
            // Se uno qualsiasi dei fetch fallisce, rigetta la Promise
            .catch(reject)
    });

}

// Uso della funzione getPost
getPost(1)
    // Stampa il post + autore se tutto va bene
    .then(post => console.log(`Post completo:`, post))
    // Stampa l'errore se qualcosa va storto
    .catch(err => console.error(err));


// SNACK 2

// // Funzione che simula il lancio di un dado
// function lanciaDado() {

//     return new Promise((resolve, reject) => {

//         // Attende 3 secondi prima di "lanciare il dado"
//         setTimeout(() => {
//             console.log(`Lancio del dado...`);

//             // Genera un numero casuale tra 0 e 1
//             const erroreProbabilita = Math.random();

//             if (erroreProbabilita < 0.2) {
//                 // 20% di probabilità che il dado si incastri
//                 reject("❌ Il dado si è incastrato!");
//             } else {
//                 // Se il dado non si incastra, genera un numero casuale tra 1 e 6
//                 const risultato = Math.floor(Math.random() * 6) + 1;
//                 // Risolve la Promise restituendo il risultato del dado
//                 resolve(`🎲 È uscito: ${risultato}`);
//             }
//         }, 3000); // tempo di attesa
//     });
// }

// // Esempio d’uso:
// lanciaDado()
//     // Mostra il risultato del dado
//     .then(result => console.log(result))
//     // Mostra un eventuale errore
//     .catch(error => console.error(error));


// BONUS => // Funzione HOF che crea una funzione lanciaDado con memoria del risultato precedente

function creaLanciaDado() {
    // Variabile chiusa nella closure per ricordare l'ultimo lancio
    let ultimoRisultato = null;

    return function lanciaDado() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const erroreProbabilita = Math.random();

                if (erroreProbabilita < 0.2) {
                    reject("❌ Il dado si è incastrato!");
                } else {
                    const risultato = Math.floor(Math.random() * 6) + 1;

                    // Verifica se è uguale all'ultimo lancio
                    if (risultato === ultimoRisultato) {
                        console.log("🎉 Incredibile! Stesso numero due volte di fila!");
                    }

                    // Salvia il risultato per il prossimo lancio
                    ultimoRisultato = risultato;

                    resolve(`🎲 È uscito: ${risultato}`);
                }
            }, 3000);
        });
    }
}

// Crea un dado con memoria
const lanciaDado = creaLanciaDado();

// Prova più lanci
lanciaDado().then(console.log).catch(console.error);
setTimeout(() => lanciaDado().then(console.log).catch(console.error), 4000);
setTimeout(() => lanciaDado().then(console.log).catch(console.error), 8000);




