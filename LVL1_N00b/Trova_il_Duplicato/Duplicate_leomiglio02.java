class Duplicate {
    int[] array;
    private int index;

    public Duplicate(int[] array) {
        this.array = array;
    }

    public int findDuplicate() {
        for (int i = 0; i < array.length; i++)
            for (int j = i + 1; j < array.length; j++)
                if (array[i] == array[j]) {
                    index = j + 1;
                    return index;
                }
        return -1;
    }

    public int getIndex() {
        return index;
    }

    public static void main(String[] args) {
        int[] array = { 1, 2, 3, 4, 5, 6, 7, 3 };
        Duplicate duplicate = new Duplicate(array);
        if (duplicate.findDuplicate() == -1)
            System.out.println("Duplicate not found");
        else
            System.out.println("Il valore in posizione " + duplicate.getIndex() + " è duplicato");
    }

}