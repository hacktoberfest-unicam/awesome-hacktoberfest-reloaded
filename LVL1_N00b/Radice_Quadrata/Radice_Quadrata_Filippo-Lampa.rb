puts "Insert number"  
input = gets
inputNumber = input.to_i
count = 0;
    while true do 
      if ((count * count) > inputNumber) 
        puts "Not a perfect square"
        break;
	  end
      if (count * count == inputNumber)
		puts "Perfect square, the square is " + count.to_s       
		break;
	  end
	  count+=1
	end