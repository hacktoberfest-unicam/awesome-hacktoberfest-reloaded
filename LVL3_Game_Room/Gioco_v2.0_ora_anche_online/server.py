import socket
import threading

SERVER = '127.0.0.1'
PORT = 63541
FORMAT = 'utf-8'
ADDR = (SERVER, PORT)
DISCONNECT_MSG = '!exit'
DISCONNECT_CLIENT = '!close'
HEADER = 64
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
player = []
mossa = {}
num_thread = 0

# funzione per gestire le azioni dei client
def check_action(msg, conn):
    if msg != "0" and msg != "1" and msg != "2":
        send("Rispettare le regole del gioco!", conn)
        return msg
    else:
        send("In attesa della mossa dell'avversario..", conn)
        return msg

    pass

# funzione per gestire l'invio dei dati
def send(msg, conn):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    conn.send(send_length)
    conn.send(message)


# funzione per gestire le connessioni in entrata
def handle_connection(conn, addr, mossa):
    print(f"[NUOVA CONNESSIONE] {addr} connesso al server.")
    send("Si possono usare solo i numeri 0[sasso] 1[carta] e 2[forbici]", conn)
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
                action1 = check_action(msg, conn)
                mossa[conn] = action1
                if num_thread >= 1 and len(mossa) >= 1:
                    msg = check_winner(mossa, player)
                    send_to_player(msg, player)

    conn.close()

#def check_winner(action1, action2):
def check_winner(mosse, players):
    action = []
    for pl in players:
        action.append(mosse.get(pl))
    if action[0] == "0" and action[1] == "1":
        return ("Vince giocatore 2 con carta")
    elif action[0] == "1" and action[1] == "2":
        return("Vince giocatore 2 con forbici")
    elif action[0] == "2" and action[1] == "0":
        return("Vince giocatore 2 con sasso")
    if action[0] == "1" and action[1] == "0":
        return("Vince giocatore 1 con carta")
    elif action[0] == "2" and action[1] == "1":
        return("Vince giocatore 1 con forbici")
    elif action[0] == "0" and action[1] == "2":
        return("Vince giocatore 1 con sasso")
    elif action[0] == action[1]:
        return("Pareggio")

# funzione per mandre i dati ai giocatori
def send_to_player(msg, player):
    for pl in player:
        send(msg, pl)

# funzione per porre il server in ascolto delle connessioni in entrata
def start_server(s):
    s.listen()
    print(f"[IN ASCOLTO] Server in ascolto su {SERVER}")
    while True:
        # si pone in attesa delle connessioni ritornando 2 valori, conn avrà l'oggetto che gestirà i send e recv
        # addr conterrà una tupla con ind ip e porta
        global mossa
        global player
        global num_thread
        conn, addr = s.accept()

        thread1 = threading.Thread(target=handle_connection, args=(conn, addr, mossa))
        player += [conn]
        thread1.start()
        print(f"[CONNESSIONI ATTIVE] {threading.active_count() - 1}")
        num_thread = threading.active_count() - 1
        '''work ma solo se si aggiunge un nuovo client
        if num_thread >= 1 and len(mossa) >= 1:
            msg = check_winner(mossa, player)
            send_to_player(msg, player)'''

# funzione per inizializzare il server
def initialize_server():
    s.bind(ADDR)
    start_server(s)


def main():
    print(f"[INIZIALIZZAZIONE IN CORSO] Server in accensione")
    initialize_server()


if __name__ == "__main__":
    main()