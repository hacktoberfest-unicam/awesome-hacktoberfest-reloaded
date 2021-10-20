class Ordinamento {
    public int[] array;

    public Ordinamento(int[] array) {
        this.array = array;
    }

    public void Order() {
        int temp;
        for (int i = 0; i < array.length; i++)
            for (int j = 0; j < array.length; j++)
                if (array[i] < array[j]) {
                    temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }

    }

    public static void main(String[] args) {
        int[] array = { 1, 5, 2, 4, 7, 3, 6, 9, 8 };
        Ordinamento o = new Ordinamento(array);
        o.Order();
        for (int i = 0; i < o.array.length; i++)
            System.out.print(o.array[i] + " ");
    }
}