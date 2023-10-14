import json

# Load the JSON data
with open("./out.json") as json_file:
    data = json.load(json_file)

# Round the start and end times for every item in the array
for item in data['data']:
    item['start'] = round(item['start'])
    item['end'] = round(item['end'])

# Saving the modified data back to the file (optional)
with open("./out_rounded.json", "w") as json_file:
    json.dump(data, json_file, indent=4)

# If you want to print the modified JSON data:
print(json.dumps(data, indent=4))
