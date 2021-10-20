#include <stdio.h>


int result(int choice1, int choice2){
    if(choice1 == choice2)
        return 0;
    else if (choice1 == 1){
        if(choice2 == 2)
            return 2;
        else
            return 1;
    }
    else if (choice1 == 2){
        if(choice2 == 1)
            return 1;
        else
            return 2;
    }
    else {
        if(choice2 == 1)
            return 2;
        else
            return 1;
    }
}

int main() {
    // choice
    int choice1;
    int choice2;
    printf("Player 1: "
           "1-Rock "
           "2-Paper "
           "3-Scissor\n");
    scanf("%d",&choice1);
    if (choice1 != 1 && choice1 != 2 && choice1 != 3 )
        printf("valore non ammesso");
    printf("Player 2: "
           "1-Rock "
           "2-Paper "
           "3-Scissor\n");
    scanf("%d",&choice2);
    if (choice2 != 1 && choice2 != 2 && choice2 != 3 )
        printf("wrong value!");
    // result
    if(result(choice1,choice2) == 0)
        printf("Draw!");
    else
        printf("PLayer %d wins" ,result(choice1,choice2));
    return 0;
}

