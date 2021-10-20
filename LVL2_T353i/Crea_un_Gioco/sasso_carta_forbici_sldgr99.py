def rules():
	print("Si possono usare solo i numeri 0[sasso] 1[carta] e 2[forbici]")

def action():
	while True:
		action = input("Sasso[0] carta[1] forbici[2].. ")
		check = checkAction(action)
		if check != 0:
			break
	return action

def checkAction(action):
	if action != "0" and action != "1" and action != "2":
		return 0
	else:
		return 1

def checkWin(roundGame):
	move1 = roundGame[0]
	move2 = roundGame[1]
	if move1 == "0" and move2 == "1":
		print("Vince giocatore 2 con carta")
	elif move1 == "1" and move2 == "2":
		print("Vince giocatore 2 con forbici")
	elif move1 == "2" and move2 == "0":
		print("Vince giocatore 2 con sasso")
	if move1 == "1" and move2 == "0":
		print("Vince giocatore 1 con carta")
	elif move1 == "2" and move2 == "1":
		print("Vince giocatore 1 con forbici")	
	elif move1 == "0" and move2 == "2":
		print("Vince giocatore 1 con sasso")			
	elif move1 == move2:
		print("Pareggio")

def main():
	rules()
	move1 = action()
	move2 = action()
	roundGame = []
	roundGame.append(move1)
	roundGame.append(move2)
	checkWin(roundGame)

if __name__ == '__main__':
	main()