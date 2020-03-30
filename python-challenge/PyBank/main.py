import os
import csv

tot_profit = 0
max_diff = 0
min_diff = 0
num_mo = 0
dif_tot = 0

#read budget data
datapath = os.path.join("..", "Resources", "budget_data.csv")

with open(datapath) as datafile:
    datareader = csv.reader(datafile)

    #ignore headers
    data_header = next(datareader)        

    for row in datareader:

        month = row[0]
        profit = int(row[1])

        #net profit/loss for period
        tot_profit += profit

        if num_mo == 0:
            dif_profit = profit
            num_mo += 1
            prev_val = profit
        elif num_mo >= 0:

            #calculate no. months
            num_mo += 1

            #current difference to previous
            dif_profit = profit - prev_val
            
            #max increase/decrease
            if dif_profit > max_diff:
                max_diff = dif_profit
            elif dif_profit < min_diff:
                min_diff = dif_profit
            
            dif_tot += dif_profit
            
            prev_val = profit

            

#avg change...
avg = dif_tot / num_mo

#print above and produce to .txt #to_csv
print("Financial Analysis.....")
print(f"Total Months: {num_mo}")
print(f"Total Profit: ${tot_profit}")
print(f"Average Change: ${avg}")
print(f"Greatest Increase: ${max_diff}")
print(f"Greatest Decrease: ${min_diff}")

exportpath = os.path.join("..", "Resources", "Budget_Export.csv")

with open(exportpath, "w") as exportdata:
    expfile = csv.writer(exportdata)

    expfile.writerow(["Financial Analysis....."])
    expfile.writerow([f"Total Months: {num_mo}"])
    expfile.writerow([f"Total Profit: ${tot_profit}"])
    expfile.writerow([f"Average Profit: ${avg}"])
    expfile.writerow([f"Greatest Increase: ${max_diff}"])
    expfile.writerow([f"Greatest Decrease: ${min_diff}"])
