package hangman_GianlucaLanchini;

import java.util.Scanner;

public class main {
	public static void main(String[] args) {
		System.out.println("Let's start the Game!");
		String word;
		Scanner sc = new Scanner(System.in);
		do {
			System.out.print("Write the secret word: ");
			word = sc.nextLine();
		} while(!word.matches("[a-z]+"));
		Master m = new Master(word);
		Player p = new Player(m);
		System.out.println("Your word contains " + m.getLenght() + " letters");
		boolean alive = true;
		boolean victory = false;
		char choice;
		String guess;
		String letter;
		do {
			System.out.println("Start of the turn");
			p.currentAnswer();
			p.currentBody();
			do {
				System.out.print("Want to guess? (y/n) ");
				choice = sc.nextLine().charAt(0);
			} while(choice != 'y' && choice != 'n');
			if(choice == 'y') {
				do {
					System.out.print("Write your guess: ");
					guess = sc.nextLine();
				} while(!(guess.matches("[a-z]+")));
				if(m.checkGuess(guess))
					victory = true;
				else alive = p.error();
			}
			else {
				do {
					do {
						System.out.print("Write a new letter: ");
						letter = sc.nextLine();
					} while(letter.length() != 1 || !(letter.matches("[a-z]+")));
					if(p.getGuessed().contains(letter))
						System.out.println("You already guessed that letter. Try again!");
				}while(p.getGuessed().contains(letter));
				p.setLetterGuessed(letter.charAt(0));
				int[] index = m.checkLetter(letter.charAt(0));
				if(index == null)
					alive = p.error();
				else p.addLetters(index);
			}
			victory = m.checkAnswer(p.getAnswer());
			System.out.println();
			System.out.println();
			System.out.println();
		}while(alive && !victory);
		sc.close();
		if(victory)
			System.out.println("The Player won!");
		else System.out.println("The Master won!");
	}
}
