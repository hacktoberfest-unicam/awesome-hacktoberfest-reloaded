#include <stdio.h>

/*
Il seguente codice prende in input un intero e stampa
il contenuto del relativo indice nell'array "arr"
*/

int main(){
    int arr[] = {1, 2, 3, 4, 5, 6 ,};
    printf("Inserisci un indice: \n");
    int numero;
    scanf("%d", &numero);
    printf("%d",arr[numero]);
}