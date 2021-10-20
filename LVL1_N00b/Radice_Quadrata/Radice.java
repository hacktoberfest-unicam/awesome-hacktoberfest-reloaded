import java.util.Scanner;

class Radice {
    private int value;
    private int square;

    public Radice(int v) {
        setValue(v);
    }

    public void setValue(int v) {
        if (v >= 0)
            value = v;
    }

    public int getValue() {
        return value;
    }

    public int getSquare() {
        return square;
    }

    public boolean isSquare() {
        for (int i = 1; i <= value; i++)
            if ((i * i) == value) {
                square = i;
                return true;
            }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Radice r;

        try {
            System.out.println("\nInserire un'intero da controllare");
            r = new Radice(sc.nextInt());
            if (r.isSquare())
                System.out.println("La radice è " + r.getSquare());
            else
                System.out.println("Non è un quadrato");
        } catch (Exception e) {
            System.out.println("Il valore in input deve essere un'intero");
        }
    }
}