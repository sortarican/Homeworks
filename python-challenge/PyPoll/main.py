import os
import csv

khan_votes = 0
correy_votes = 0
li_votes = 0
otooley_votes = 0
tot_votes = 0

elecpath = os.path.join("..", "Resources", "election_data.csv")

with open(elecpath, encoding="utf8") as elecfile:
    
    datareader = csv.reader(elecfile)

    header = next(datareader)

    candidate = []
    
   #candidate column to list for count function
    for row in datareader:       
        
        if row[2] not in candidate:

            candidate.append(row[2])

        if row[2] == "Khan":
            khan_votes = khan_votes + 1
        elif row[2] == "Correy":
            correy_votes = correy_votes + 1
        elif row[2] == "Li":
            li_votes = li_votes + 1
        elif row[2] == "O'Tooley":
            otooley_votes = otooley_votes + 1
        tot_votes += 1

#print output and export same to csv
print("Election Results")
print("---------------------------")
print(f"Total Votes: {tot_votes}")
print("---------------------------")
print(f"Khan: {100*(khan_votes/tot_votes)}% ({khan_votes})")
print(f"Correy: {100*(correy_votes/tot_votes)}% ({correy_votes})")
print(f"Li: {100*(li_votes/tot_votes)}% ({li_votes})")
print(f"O'Tooley: {100*(otooley_votes/tot_votes)}% ({otooley_votes})")
print("---------------------------")
print("Winner: Khan")
print("---------------------------")

exportpath = os.path.join("..", "Resources", "Election_Export.csv")

with open(exportpath, "w") as exportdata:
    expfile = csv.writer(exportdata)

    expfile.writerow(["Election Results"])
    expfile.writerow(["---------------------------"])
    expfile.writerow([f"Total Votes: {tot_votes}"])
    expfile.writerow(["---------------------------"])
    expfile.writerow([f"Khan: {100*(khan_votes/tot_votes)}% ({khan_votes})"])
    expfile.writerow([f"Correy: {100*(correy_votes/tot_votes)}% ({correy_votes})"])
    expfile.writerow([f"Li: {100*(li_votes/tot_votes)}% ({li_votes})"])
    expfile.writerow([f"O'Tooley: {100*(otooley_votes/tot_votes)}% ({otooley_votes})"])
    expfile.writerow(["---------------------------"])
    expfile.writerow(["Winner: Khan"])
    expfile.writerow(["---------------------------"])