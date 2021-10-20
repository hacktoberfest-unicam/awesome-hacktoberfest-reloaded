class Occurrency {
    public int[] array;
    public int valueToFind = -1;
    private int firstIndex;
    private int lastIndex;

    public Occurrency(int[] array) {
        this.array = array;
    }

    public Occurrency(int[] array, int valueToFind) {
        this.array = array;
        this.valueToFind = valueToFind;
    }

    public int getFirstIndex() {
        return firstIndex;
    }

    public int getLastIndex() {
        return lastIndex;
    }

    public boolean findOccurrences() {
        if (valueToFind == -1)
            throw new NullPointerException("valueToFind cannot be null");
        for (int i = 0; i < array.length; i++)
            if (array[i] == valueToFind)
                for (int j = array.length - 1; j >= 0; j--)
                    if (array[j] == valueToFind) {
                        firstIndex = i;
                        lastIndex = j;
                        return true;
                    }
        return false;
    }

    public static void main(String[] args) {
        int[] array = { 1, 2, 3, 3, 2, 5, 4, 2 };
        Occurrency o = new Occurrency(array, 2);

        if (!o.findOccurrences())
            System.out.println("No occurrences found");
        else
            System.out.println("Occurrences found at position " + o.getFirstIndex() + " and " + o.getLastIndex());
    }
}