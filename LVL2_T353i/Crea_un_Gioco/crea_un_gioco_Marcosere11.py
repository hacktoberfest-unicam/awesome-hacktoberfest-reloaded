'''Sasso carta forbici'''
possibilities = ("sasso", "carta", "forbice")
player1Pick = ""
player2Pick = ""
inGame = 0
player1Name = input("Insersci il nome del player 1 ")
player2Name = input("Inserisci il nome del player 2 ")


def askAndCheckInput(name):
    choice = input(name + " scegli un oggetto tra " + str(possibilities))
    while choice not in possibilities:
        choice = input(name + " scegli un oggetto tra " + str(possibilities))
    return choice


def checkWinCondition(player1Pick, player2Pick):
    if((player1Pick == possibilities[0] and player2Pick == possibilities[0]) or (player1Pick == possibilities[1] and player2Pick == possibilities[1]) or (player1Pick == possibilities[2] and player2Pick == possibilities[2])):
        print("Parità, nessuno vince, si ricomincia")
        return 0
    elif ((player1Pick == possibilities[0] and player2Pick == possibilities[2]) or (player1Pick == possibilities[1] and player2Pick == possibilities[0]) or (player1Pick == possibilities[2] and player2Pick == possibilities[1])):
        print(player1Name + " vince")
        return 1
    else:
        print(player2Name + " vince")
        return 2


while(inGame == 0):
    player1Pick = askAndCheckInput(player1Name)
    player2Pick = askAndCheckInput(player2Name)
    inGame = checkWinCondition(player1Pick, player2Pick)
