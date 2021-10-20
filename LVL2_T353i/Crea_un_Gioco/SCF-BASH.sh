figlet "S-C-F"
guard=0
win=0
again=1
while [ $again -eq 1 ]; do
while [ $guard -eq 0 ]; do
	guard1=0
	guard2=0
	in1=""
	in2=""
	while [ $guard1 -eq 0 ]; do
		echo "Player 1, choose. [s/c/f]"
		read -s sus
		if [ "$sus" == "s" ] || [ "$sus" == "c" ] || [ "$sus" == "f" ] ; then
			in1="$sus"
			guard1=1
		fi
	done
		
	while [ $guard2 -eq 0 ]; do
		echo "Player 2, choose. [s/c/f]"
		read -s sus
		if [ "$sus" == "s" ] || [ "$sus" == "c" ] || [ "$sus" == "f" ] ; then
			in2="$sus"
			guard2=1
		fi
	done

	if [ "$in1" == "s" ] && [ "$in2" == "f" ] ; then
		win=1
		break
	elif [ "$in1" == "s" ] && [ "$in2" == "c" ] ; then
		win=2
		break
	elif [ "$in1" == "c" ] && [ "$in2" == "s" ] ; then
		win=1
		break
	elif [ "$in1" == "c" ] && [ "$in2" == "f" ] ; then
		win=2
		break
	elif [ "$in1" == "f" ] && [ "$in2" == "s" ] ; then
		win=2
		break
	elif [ "$in1" == "s" ] && [ "$in2" == "f" ] ; then
		win=1
		break
	else 
		echo "Tied, play again"
	fi
done
	toilet "p$win wins"
	agin=1
	while [ $agin -eq 1 ]; do
		echo "play again? [[y]/n]"
		read in3
		if [ "$in3" == "n" ]; then
			again=0
			agin=0
			echo "Goodbye."
		fi
		if [ "$in3" == "" ] || [ "$in3" == "y" ]; then
			echo "Pog"
			agin=0
		fi
	done
done

