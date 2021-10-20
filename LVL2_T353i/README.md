# LVL2_T353i
Il moltiplicatore di questo livello è x1 quindi ogni punteggio dei problemi sarà moltiplicato per questo valore
## I problemi di questo livello sono 4:
1. [Ordinamento](Ordinamento/) [1 punto]
2. [Documenta & Correggi](Documenta/) [1 punto]
3. [Crea un Gioco](Crea_un_Gioco/) [4 punti]
4. [Crea una BlockChain](Crea_una_Blockchain/) [5 punti]

## 1. Ordinamento
Lo scopo è realizzare un algoritmo di ordinamento di un array, in un linguaggio tra quelli forniti in [Whitelist](/WHITELIST.md) o nella lista [Linguaggi Utilizzabili](/LINGUAGGI_UTILIZZABILI.md)

## 2. Documenta & Correggi
Restituisci il [codice](Documenta/BuggedSourceCode.c) fornito dopo aver corretto gli errori presenti e aver spiegato cosa fa tale programma

## 3. Crea un Gioco
In un linguaggio a tua scelta della lista dei [Linguaggi Utilizzabili](/LINGUAGGI_UTILIZZABILI.md), realizza un gioco a tua scelta tra quelli presenti nel file [GIOCHI](/GIOCHI.md). Non è necessario che i giochi funzionino online, è sufficiente che 2 giocatori, alternandosi allo stesso computer, possano giocare al gioco realizzato. Inoltre non è necessaria l'interfaccia grafica

## 4. Crea una Blockchain
In un linguaggio a tua scelta della lista dei [Linguaggi Utilizzabili](/LINGUAGGI_UTILIZZABILI.md), realizza una blockchain.

La blockchain è una catena di blocchi, ogni blocco è composto da:
* dei dati, per esempio un file o un messaggio,
* il timestamp;
* l'hash ottenuto da dati e timestamp;
* il link al blocco precedente;
* il link al blocco successivo;

Normalmente le blockchain sono distribuite in una rete P2P dove tutti gli utenti hanno una copia della stessa blockchain, la veridicità dei dati contenuti nella blockchain è ottenuta per maggioranza, se il 50% +1 dei dispositivi che partecipano alla blockchain P2P hanno un blocco in uno specifico posto, allora quel blocco deve stare la e viene accettato come verità da tutta la rete.
Ovviamente perchè questo gioco sia considerato valido, non è necessario creare una blockchain P2P con tutte le funzionalità, basta creare un software che simula la realizzazione dei blocchi della blockchain e unisce più blocchi sequenzialmente in ordine, il programma non deve necessariamente salvare i dati e potrebbe perdere tutto al termine dell'esecuzione
