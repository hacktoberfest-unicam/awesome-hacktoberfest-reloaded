#include <stdio.h>

int menu();
int newGame(char* name1, char* name2);
int move();
int main() {
    int choice = menu();
    char player1[30], player2[30];
	printf("Enter player1: ");
	scanf("%s",player1);
	printf("Enter player2: ");
	scanf("%s",player2);
	int result= newGame(player1, player2);
	if(result == 0)
		printf("The winner is %s",player1);
	else
		printf("The winner is %s",player2);
    return 0;
}

int menu(){
    int choice;
    printf("*----------------------------------*\n");
    printf("1. Play game\n");
    printf("0. Exit\n");

    do{
        printf("Enter a choice (0-2): ");
        scanf("%d",&choice);
    }while(choice < 0 || choice > 1);

    return choice;
}

int newGame(char* name1, char* name2){
	int turn = 0;
	int move1, move2;
	while(1==1){
		printf("%s, enter your move (rock = 0, paper = 1, scissors = 2): ",name1);
		move1 = move(name1);
		printf("%s, enter your move (rock = 0, paper = 1, scissors = 2): ",name2);
		move2 = move(name2);
		
		if(move1 == move2)
			printf("Game result: tie!\n");
		if((move1 == 0 && move2 == 2) || (move1 == 1 && move2 == 0) || (move1 == 2 && move2 == 1))
			return 0;
		if((move1 == 0 && move2 == 1) || (move1 == 1 && move2 == 2) || (move1 == 2 && move2 == 0))
			return 1;
	}
	
}

int move(){
	int move;
	do{
		scanf("%d",&move);
	}while(move < 0 || move > 2);
	
	return move;
}
