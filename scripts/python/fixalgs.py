import json
import os

"""
def invert_scramble(scramble):
    moves = scramble.split()[::-1]
    res = []
    for i in moves:
        print(i)
        if not "'" in i and not "2" in i:
            i += "'"
        else:
            i = i.replace("'", "")
        res.append(i)
    return " ".join(res)

file = open("oll_algs_old.json", "r")
data = json.load(file)
file.close()

for case in data:
    for i, scramble in enumerate(data[case]):
        data[case][i] = invert_scramble(scramble)
file = open("oll_algs.json", "w")
json.dump(data, file, indent=4)
"""
with open('oll_cases.json', 'r') as file1:
    data1 = json.load(file1)

# Load JSON data from the second file
with open('oll_algs.json', 'r') as file2:
    data2 = json.load(file2)

# Iterate through keys in file1
for key in data1:
    # Check if the key exists in file2
    if key in data2:
        # Update the 'a2' field in file1 with the array from file2
        data1[key]['scrambles'] = data2[key]

# Save the updated data back to file1
with open('merged_output.json', 'w') as output_file:
    json.dump(data1, output_file, indent=2)