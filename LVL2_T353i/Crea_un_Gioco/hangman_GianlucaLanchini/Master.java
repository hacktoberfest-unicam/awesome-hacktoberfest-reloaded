package hangman_GianlucaLanchini;
import java.util.*;

public class Master {
	private String word;
	private char[] wordByLetter;
	private int wordLenght;
	
	public Master(String str) {
		this.word = str;
		this.wordLenght = word.length();
		this.wordByLetter = new char[word.length()];
		for(int i = 0; i < word.length(); i++) {
			wordByLetter[i] = word.charAt(i);
		}
	}
	
	public int getLenght() {
		return this.wordLenght;
	}
	
	public boolean checkGuess(String guess) {
		if(guess.equals(word)) {
			System.out.println("You guessed right!!!");
			return true;
		}
		return false;
	}
	
	public int[] checkLetter(char letter) {
		boolean check = false;
		int cont = 0;
		int[] sost = new int[this.getLenght()];
		for(int i = 0; i < this.wordLenght; i++) {
			if(this.wordByLetter[i] == letter) {
				check = true;
				sost[cont] = i;
				cont++;
			}
		}
		int index[] = new int[cont];
		for(int i = 0; i < index.length; i++) {
			index[i] = sost[i];
		}
		if (!check) {
			return null;
		}
		System.out.println("You guessed right!");
		return index;
	}
	
	public boolean checkAnswer(char[] answer) {
		boolean check = true;
		for(int i = 0; i < this.getLenght(); i++) {
			if(answer[i] != this.wordByLetter[i])
				check = false;
		}
		return check;
	}
}
