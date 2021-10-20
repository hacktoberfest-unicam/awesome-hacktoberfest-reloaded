import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Press a key to start");
        Scanner sc = new Scanner(System.in);
        sc.next();
        GameGrid grid = new GameGrid();
        grid.printGridStatus();
        char symbol;
        int xAxis, yAxis;
        System.out.println("X starts the game");
        boolean xTurn = true;
        while(!grid.checkIfWin() && !grid.gridIsFull()){
            if(xTurn == true)
                symbol = 'X';
            else symbol = 'O';
            System.out.println("Insert x coordinate");
            xAxis = sc.nextInt();
            System.out.println("Insert y coordinate");
            yAxis = sc.nextInt();
            grid.placeSymbolAtPosition(symbol, xAxis, yAxis);
            grid.printGridStatus();
            xTurn = !xTurn;
        }
        System.out.println("Game finished");
    }
}
