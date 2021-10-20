import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)
possibilities = ("sasso", "carta", "forbice")
player1Pick = ""
player2Pick = ""


def checkWinCondition(player1Pick, player2Pick):
    if((player1Pick == possibilities[0] and player2Pick == possibilities[0]) or (player1Pick == possibilities[1] and player2Pick == possibilities[1]) or (player1Pick == possibilities[2] and player2Pick == possibilities[2])):
        print("pareggio")
        return 0
    elif ((player1Pick == possibilities[0] and player2Pick == possibilities[2]) or (player1Pick == possibilities[1] and player2Pick == possibilities[0]) or (player1Pick == possibilities[2] and player2Pick == possibilities[1])):
        print("vince il giocatore uno " + str(player1Pick))
        return 1
    else:
        print("vince il giocatore due " + str(player2Pick))
        return 2


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connessione effettuata da ', addr)
        while True:
            data = conn.recv(1024)
            conn.sendall(bytes(str(data), encoding="ascii"))
            print(data)
            break

data1 = data

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connessione effettuata da ', addr)
        while True:
            data = conn.recv(1024)
            if not data:
                break
            winner = checkWinCondition(data1, data)
            conn.sendall(bytes(str(winner), encoding="ascii"))
