import os
import csv

elecpath = os.path.join("..", "Resources", "election_data.csv")

with open(elecpath) as elecfile:
    
    datareader = csv.reader(elecfile, delimiter=",")

    header = next(datareader)

    tot_votes = len(list(datareader))

print("Election Results.....")
print(f"Total Votes: {tot_votes}.....")
print(f"Total Profit: ${tot_profit}")