class SassoCartaForbici {
    private byte p1 = -1;
    private byte p2 = -1;

    public SassoCartaForbici() {
    }

    public SassoCartaForbici(String p1, String p2) {
        setP1(p1);
        setP1(p2);
    }

    public void setP1(String p) {
        switch (p.toLowerCase()) {
        case "sasso" -> this.p1 = 0;
        case "carta" -> this.p1 = 1;
        case "forbici" -> this.p1 = 2;
        }
    }

    public void setP2(String p) {
        switch (p.toLowerCase()) {
        case "sasso" -> this.p2 = 0;
        case "carta" -> this.p2 = 1;
        case "forbici" -> this.p2 = 2;
        }
    }

    public void setP1(int p) {
        if (p <= 2)
            p1 = (byte) p;
    }

    public void setP2(int p) {
        if (p <= 2)
            p2 = (byte) p;
    }

    public String play() {
        if (p1 == -1 || p2 == -1)
            throw new NullPointerException("p1 e p2 devono essere inizializzate");

        if (p1 == (p2 + 1) % 3)
            return "Il vincitore è p1";
        else if (p2 == (p1 + 1) % 3)
            return "Il vincitore è p2";
        return "Pareggio";
    }

    public static void main(String[] args) {
        SassoCartaForbici s = new SassoCartaForbici();
        s.setP1("Sasso");
        s.setP2("Forbici");
        System.out.println(s.play());// dovrebbe vincere 1 (sasso) contro forbici

        s.setP2("carta");
        System.out.println(s.play());// dovrebbe vincere 2 (carta) contro sasso

        s.setP1("forbici");
        System.out.println(s.play());// dovrebbe vincere 1 (carta) contro forbici

    }
}
