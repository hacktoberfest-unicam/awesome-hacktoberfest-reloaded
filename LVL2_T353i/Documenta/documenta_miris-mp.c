#include <stdio.h>

void positioning_ship(int mode)
{
}

int main()
{
    printf("***** CARTA FORBICI SASSO ******\n");
    printf("0 per carta, 1 per sasso e 2 per forbici\n");

    int prima_scelta = -1;
    int seconda_scelta = -1;

    int carta = 0;
    int sasso = 1;
    int forbici = 2;
    while (prima_scelta != carta && prima_scelta != sasso && prima_scelta != forbici)
    {
        printf("Il primo giocatore digiti il numero corrispondente alla propria scelta: ");
        scanf("%d", &prima_scelta);
    }

   
    char hide = 'y';
    printf("Premere n per stoppare generazione di una nuova linea altrimenti qualsiasi altro carattere per continuare");
    while (hide != 'n') {
        printf("\n");
        scanf("%c", &hide);
    }


    while (seconda_scelta != carta && seconda_scelta != sasso && seconda_scelta != forbici)
    {
        printf("Il secondo giocatore digiti il numero corrispondente alla propria scelta: ");
        scanf("%d", &seconda_scelta);
    }

    if (prima_scelta == carta)
    {
        if (seconda_scelta == sasso)
        {
            printf("Carta batte sasso, giocatore 1 ha vinto!\n");
        }
        if (seconda_scelta == forbici)
        {
            printf("Forbici batte carta, giocatore 2 ha vinto!\n");
        }
        else
        {
            printf("Vi leggete nella mente, riprovate\n");
        }
    }
    if (prima_scelta == sasso)
    {
        if (seconda_scelta == carta)
        {
            printf("Carta batte sasso, giocatore 2 ha vinto!\n");
        }
        if (seconda_scelta == forbici)
        {
            printf("Sasso batte forbici, giocatore 1 ha vinto!\n");
        }
        else
        {
            printf("Vi leggete nella mente, riprovate\n");
        }
    }
    if (prima_scelta == forbici)
    {
        if (seconda_scelta == carta)
        {
            printf("Forbici batte carta, giocatore 1 ha vinto!\n");
        }
        if (seconda_scelta == sasso)
        {
            printf("Sasso batte forbici, giocatore 2 ha vinto!\n");
        }
        else
        {
            printf("Vi leggete nella mente, riprovate\n");
        }
    }
}