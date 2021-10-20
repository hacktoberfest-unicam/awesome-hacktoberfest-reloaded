# BuggedSourceCode - Cositn Dragoi Spiegazione

## Scopo

Lo scopo del programma scritto in C è stampare un elemento di un array passando in input il suo l'indice di memoria.

## Programma

Il programma iniziale:

``` c
#include <stdio.h>                       // <1>

int main(){                              // <2>
    int arr[] = {1, 2, 3, 4, 5, 6 ,};    // <3>
    printf("Inserisci un indice: \n");   // <4>
    int numero;                          // <5>
    scanf("%d");                         // <6>
    printf(&arr[numero]);                // <7>
}                                        // <8>
```

Purtroppo ha dei bug. Vedremmo come risolverli. 

## Spiegazione

1. La prima istruzione è corretta. Bisogna include la libreria **stdio.h** cioè di **Standard Input/Output**.
2. Dichiariamo la funzione **main**. È la prima funzione che il compilatore esegue.
3. Dichiariamo il array di nome **arr**, ma incontriamo due errori. Il primo errore è che al array non è stato assegnato una dimensione `int arr[]`. Per sapere quanta dimensione assegnare guardiamo gli elementi tra parantesi **{}**. Contiamo, il numero degli elementi: è 6. Qui troviamo il secondo errore, infatti c'è una virgola di troppo prima della parentesi graffa chiusa `,}`. Apportando le modifiche il codice diventa:

``` c
#include <stdio.h>                       // <1>

int main(){                              // <2>
    int arr[6] = {1, 2, 3, 4, 5, 6};     // <3>
    printf("Inserisci un indice: \n");   // <4>
    int numero;                          // <5>
    scanf("%d");                         // <6>
    printf(&arr[numero]);                // <7>
}                                        // <8>
```

4. Stampa una stringa sullo standard output. Il `\n` serve per ritornare a capo.
5. Dichiara una variabile **nome** di tipo *int*.
6. Chiediamo in input l'indice del array. Purtroppo c'è un errore. La funzione **scanf** prende due argomenti: il tipo e l'indirizzo in memoria della variabile. In questo caso _scanf_ chiede in input un numero intero`%d`, però non sa dove salvarlo. Aggiungiamo il secondo argomento: `&numero`. Il simbolo **&** di fronte ad una variabile indica di prendere il riferimento all'indirizzo di memoria della variabile. Apportando le modifiche il codice diventa:

``` c
#include <stdio.h>                       // <1>

int main(){                              // <2>
    int arr[6] = {1, 2, 3, 4, 5, 6};     // <3>
    printf("Inserisci un indice: \n");   // <4>
    int numero;                          // <5>
    scanf("%d", &numero);                // <6>
    printf(&arr[numero]);                // <7>
}                                        // <8>
```

7. Non ci resta che stampare l'elemento del array nella posizione che abbiamo chiesto precedentemente in input. Osserviamo un errore. Si come dobbiamo stampare un intero (il contenuto del array in posizione `&numero` è di tipo intero) dobbiamo aggiungere il tipo restituito dalla funzione **printf** in questo caso un intero `%d`. Togliamo anche **&** di fronte ad `&arr[numero]` perché non ci interessa l'indirizzo di memoria ma il suo contenuto. Apportando le modifiche il codice diventa:

``` c
#include <stdio.h>                       // <1>

int main(){                              // <2>
    int arr[6] = {1, 2, 3, 4, 5, 6};     // <3>
    printf("Inserisci un indice: \n");   // <4>
    int numero;                          // <5>
    scanf("%d", &numero);                // <6>
    printf("%d", arr[numero]);           // <7>
}                                        // <8>
```

8. Fine del blocco codice e fine del programma. Però attenzione! La nostra funzione main e' stata dichiarata di tipo **int** quindi il compilatore si aspetta un **return**. Aggiungiamo **return 0** per dire che il programma finisce con successo 🥳. Apportando le ultime modifiche il codice diventa:

``` c
#include <stdio.h>                       // <1>

int main(){                              // <2>
    int arr[6] = {1, 2, 3, 4, 5, 6};     // <3>
    printf("Inserisci un indice: \n");   // <4>
    int numero;                          // <5>
    scanf("%d", &numero);                // <6>
    printf("%d", arr[numero]);           // <7>
    return 0;                            // <8>
}                                        // <8>
```
