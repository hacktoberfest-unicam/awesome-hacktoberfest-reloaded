package hangman_GianlucaLanchini;

import java.util.Scanner;
import java.util.*;

public class Player {
	private char[] answer;
	private int bodyCount;
	private char letterGuessed;
	private List<String> alreadyGuessed;
	
	public Player(Master mas) {
		this.answer = new char[mas.getLenght()];
		this.bodyCount = 0;
		this.alreadyGuessed = new ArrayList<String>();
	}
	
	public char[] getAnswer() {
		return this.answer;
	}
	
	public List<String> getGuessed() {
		return this.alreadyGuessed;
	}
	
	public void currentBody() {
		System.out.println("Here is how many body parts there are: " + this.bodyCount);
	}
	
	public void currentAnswer() {
		System.out.print("Here is how many letters you guessed: ");
		for(char a : this.answer) {
			System.out.print(a);
		}
		System.out.println();
	}
	
	public void setLetterGuessed(char letter) {
		this.letterGuessed = letter;
	}
	
	public void addLetters(int[] index) {
		for(int i = 0; i < index.length; i++) {
			this.answer[index[i]] = this.letterGuessed;
		}
	}
	
	public boolean error() {
		this.bodyCount++;
		if(this.bodyCount == 6)
			return false;
		return true;
	}
}
