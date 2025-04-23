// SNACK 1

// Funzione che restituisce una Promise contenente il titolo di un post specifico
function getPostTitle(id) {
    // Effettua una chiamata HTTP GET all'endpoint per ottenere un post specifico tramite il suo ID
    return fetch(`https://dummyjson.com/posts/${id}`)
        .then(response => {
            // Controlla se la risposta è valida (status code 200-299)
            if (!response.ok) throw new Error("Post not found");

            // Converte la risposta da JSON a oggetto JavaScript
            return response.json();
        })
        .then(post =>
            // Estrae e restituisce solo il titolo del post
            post.title
        );
}

// Funzione che restituisce una Promise con i dati completi di un post, incluso l'autore
function getPost(id) {
    // Primo fetch per ottenere i dati del post
    return fetch(`https://dummyjson.com/posts/${id}`)
        .then(response => {
            // Se la risposta non è OK, lancia un errore
            if (!response.ok) throw new Error("Post not found");

            // Converte la risposta JSON in oggetto JavaScript
            return response.json();
        })
        .then(post => {
            // Una volta ottenuto il post, facciamo un'altra fetch per ottenere l'autore
            return fetch(`https://dummyjson.com/users/${post.userId}`)
                .then(response => {
                    // Se la risposta non è OK, lancia un errore
                    if (!response.ok) throw new Error("User not found");

                    // Converte la risposta JSON in oggetto JavaScript
                    return response.json();
                })
                .then(user => {
                    // Aggiunge l'autore all'oggetto post come nuova proprietà "user"
                    post.user = user;

                    // Restituisce il post arricchito con l'autore
                    return post;
                });
        });
}

