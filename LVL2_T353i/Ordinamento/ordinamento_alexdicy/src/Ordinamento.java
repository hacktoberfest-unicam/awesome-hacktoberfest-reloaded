/**
 * Implementazione del bubble sort
 *
 * @author Lorenzo Lapucci
 */
public class Ordinamento {
    public static void main(String[] args) {
        int[] array = new int[]{0, 67, 34, 12, 2, 6, 35, 26, 7648, 13, 6, 92, 8, 1, 60, 97};
        boolean swap = true;
        while (swap) {
            swap = false;
            for (int i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    int temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swap = true;
                }
            }
        }


        for (int n : array) {
            System.out.println(n);
        }
    }
}
