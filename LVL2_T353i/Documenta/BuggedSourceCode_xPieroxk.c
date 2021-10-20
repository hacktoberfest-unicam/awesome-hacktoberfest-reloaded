#include <stdio.h>

int main(){
    /*Questo programma prende in input un indice e poi stampa
     * un indirizzo. L'indirizzo stampato e`: indirizzo base dell'array arr + offset dato dall'indice*/
    int arr[] = {1, 2, 3, 4, 5, 6};
    printf("Inserisci un indice: \n");
    int numero;
    scanf("%d",&numero);
    printf("%p",&arr[numero]);
    return 0;
}
