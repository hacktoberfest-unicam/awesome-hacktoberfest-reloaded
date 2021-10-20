#include <stdio.h>

int main() {
  int arr[6] = {1, 2, 3, 4, 5, 6};
  printf("Inserisci un indice: \n");
  int numero;
  scanf("%d", &numero);
  printf("%d", arr[numero]);
  return 0;
}
