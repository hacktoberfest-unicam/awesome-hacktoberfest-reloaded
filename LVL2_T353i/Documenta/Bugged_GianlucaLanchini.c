#include <stdio.h>

// questo programma prende in input un intero e restituisce l'elemento dell'array con indice l'intero
int main(){
    int arr[] = {1, 2, 3, 4, 5, 6};
    printf("Inserisci un indice: \n");
    int numero;
    scanf("%d", &numero);
    printf("%d", arr[numero]);
}
