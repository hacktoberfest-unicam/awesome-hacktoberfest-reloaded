public class GameGrid {

    public final int width = 3, height = 3;
    private char[][] grid;
    private int occupiedLocations;

    public GameGrid(){
            grid = new char[width][height];
            occupiedLocations = 0;
    }

    public void placeSymbolAtPosition(char symbol, int xPosition, int yPosition ){
        if(!symbolIsValid(symbol))
            throw new IllegalArgumentException();
        grid[xPosition][yPosition] = symbol ;
        occupiedLocations++;
    }

    public boolean checkIfWin(){
        if(!checkColumnsWin() && !checkRowsWin() && !checkDiagonalsWin())
            return false;
        return true;
    }

    private boolean checkRowsWin(){
        if(symbolIsValid(grid[0][0]) && symbolIsValid(grid[0][1]) && symbolIsValid(grid[0][2]) && grid[0][0] == grid[0][1] && grid[0][1] == grid[0][2])
            return true;
        if(symbolIsValid(grid[1][0]) && symbolIsValid(grid[1][1]) && symbolIsValid(grid[1][2]) && grid[1][0] == grid[1][1] && grid[1][1] == grid[1][2])
            return true;
        if(symbolIsValid(grid[2][0]) && symbolIsValid(grid[2][1]) && symbolIsValid(grid[2][2]) && grid[2][0] == grid[2][1] && grid[2][1] == grid[2][2])
            return true;
        return false;
    }

    private boolean checkColumnsWin(){
        if(symbolIsValid(grid[0][0]) && symbolIsValid(grid[1][0]) && symbolIsValid(grid[2][0]) && grid[0][0] == grid[1][0] && grid[1][0] == grid[2][0])
            return true;
        if(symbolIsValid(grid[0][1]) && symbolIsValid(grid[1][1]) && symbolIsValid(grid[2][1]) && grid[0][1] == grid[1][1] && grid[1][1] == grid[2][1])
            return true;
        if(symbolIsValid(grid[0][2]) && symbolIsValid(grid[1][2]) && symbolIsValid(grid[2][2]) && grid[0][2] == grid[1][2] && grid[1][2] == grid[2][2])
            return true;
        return false;
    }

    private boolean checkDiagonalsWin(){
        if(symbolIsValid(grid[0][0]) && symbolIsValid(grid[1][1]) && symbolIsValid(grid[2][2]) && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2])
            return true;
        if(symbolIsValid(grid[2][0]) && symbolIsValid(grid[1][1]) && symbolIsValid(grid[0][2]) && grid[2][0]  == grid[1][1] && grid[1][1] == grid[0][2])
            return true;
        return false;
    }

    public void printGridStatus(){
        for(int i=0; i<width; i++){
            System.out.print("|");
            for(int j=0; j<height; j++){
                System.out.print(grid[i][j] + "|");
            }
            System.out.println();
        }
    }

    public boolean gridIsFull(){
        return occupiedLocations == width * height;
    }

    private boolean symbolIsValid(char symbol){
        return (symbol == 'X' || symbol == 'O') && symbol != 0 ;
    }
}
