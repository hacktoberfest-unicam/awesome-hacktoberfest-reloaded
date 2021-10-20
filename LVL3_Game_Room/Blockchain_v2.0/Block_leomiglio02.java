import java.util.Date;

public class Block_leomiglio02 {
    private String dati;
    private Date timestamp;
    private int hash = 31;
    private Block_leomiglio02 precedente;
    private Block_leomiglio02 successivo;

    public Block_leomiglio02(String d, Date t) {
        setTimestamp(t);
        setDati(d);
        hashCode();
    }

    public Block_leomiglio02(String d, Date t, Block_leomiglio02 p, Block_leomiglio02 s) {
        setTimestamp(t);
        setDati(d);
        this.precedente = p;
        this.successivo = s;

        hashCode();
    }

    public void setDati(String d) {
        if (d == null)
            throw new NullPointerException("dati is null");
        this.dati = d;
    }

    public void setTimestamp(Date t) {
        if (t == null)
            throw new NullPointerException("timestamp is null");
        this.timestamp = t;
    }

    public int hashCode() {
        hash = hash * 7 + dati.hashCode();
        hash = hash * 7 + timestamp.hashCode();
        if (precedente != null)
            hash = hash * 7 + precedente.hashCode();
        return hash;
    }

    public void setPrecedente(Block_leomiglio02 b) {
        if (b == null)
            throw new NullPointerException("b cannot be null");
        this.precedente = b;
    }

    public void setSuccessivo(Block_leomiglio02 b) {
        if (b == null)
            throw new NullPointerException("b cannot be null");
        this.successivo = b;
    }

    public String getDati() {
        return dati;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public Block_leomiglio02 getSuccessivo() {
        return successivo;
    }

    public Block_leomiglio02 getPrecedente() {
        return precedente;
    }
}
