#include <stdio.h>

// il codice chiede all'utente di inserire un indice per andare a pescare l'elemento all'interno dell'array corrispondente
int main()
{
    int arr[] = {1, 2, 3, 4, 5, 6};

int length = sizeof(arr)/sizeof(arr[0]);

    printf("Inserisci un indice compreso da 0 a %d \n", length-1);
    
    int numero = 0;
    do 
    {
        printf("Inserisci un indice: ");
        scanf("%d", &numero);
    }while (numero >= length);
    
    printf("%d", arr[numero]);
}