import socket
import threading
from datetime import datetime

SERVER = '127.0.0.1'
PORT = 63541
FORMAT = 'utf-8'
ADDR = (SERVER, PORT)
DISCONNECT_MSG = '!exit'
DISCONNECT_CLIENT = '!close'
HEADER = 128
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clients = []
nickname = {}

# funzione per gestire l'invio dei dati
def send(msg, conn):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    conn.send(send_length)
    conn.send(message)


# funzione per gestire l'invio del messaggio a tutti i client connessi
def send_all(msg, conn):
    for client in clients:
        if client != conn:
            send(msg, client)

# funzione per gestire la scelta del nickname
def choose_nick(conn):
    send("Scegli il tuo nickname", conn)
    msg_length = conn.recv(HEADER).decode(FORMAT)
    if msg_length:
        msg_length = int(msg_length)
        msg = conn.recv(msg_length).decode(FORMAT)
    nickname[conn] = msg
    return msg

# funzione per ritornare il nickname e mandarlo come messaggio
def send_nick(conn):
    return nickname.get(conn)

# funzione per gestire le connessioni in entrata
def handle_connection(conn, addr):
    print(f"[NUOVA CONNESSIONE] {addr} connesso al server.")
    # controllo che non invia codesto messaggio a proprietario host connesso RESOLVED
    tmp = choose_nick(conn)
    send_all("[NUOVA CONNESSIONE] " + str(addr) + " connesso al server con nickname "+ tmp, conn)
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        if msg_length:
            msg_length = int(msg_length)
            msg = conn.recv(msg_length).decode(FORMAT)
            if msg == DISCONNECT_MSG:
                print(f"[{addr}] {msg}")
                print(f"[DISCONNESSIONE] {addr} disconnesso dal server.")
                send(DISCONNECT_CLIENT, conn)
                connected = False
            else:
                print(f"[{addr}] {msg}")
                nick = send_nick(conn)
                date = datetime.now()
                date = str(date)[:-7]
                send_all("["+str(nick)+" "+date+"] "+msg, conn)

    conn.close()


# funzione per porre il server in ascolto delle connessioni in entrata
def start_server(s):
    global clients
    s.listen()
    print(f"[IN ASCOLTO] Server in ascolto su {SERVER}")
    while True:
        global clients
        # si pone in attesa delle connessioni ritornando 2 valori, conn avrà l'oggetto che gestirà i send e recv
        # addr conterrà una tupla con ind ip e porta
        conn, addr = s.accept()
        thread = threading.Thread(target=handle_connection, args=(conn, addr))
        clients += [conn]
        thread.start()
        print(f"[CONNESSIONI ATTIVE] {threading.active_count() - 1}")


# funzione per inizializzare il server
def initialize_server():
    s.bind(ADDR)
    start_server(s)


def main():
    print(f"[INIZIALIZZAZIONE IN CORSO] Server in accensione")
    initialize_server()


if __name__ == "__main__":
    main()
