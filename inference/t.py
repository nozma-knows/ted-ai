import tiktoken
import json
encoding = tiktoken.encoding_for_model("gpt-3.5-turbo-0613")
f = json.load(open("./out_rounded.json"))



s=str(f).replace('{', '').replace('}', '').replace('"', "").replace(",", "")

r = encoding.encode(s)

print(len(r))

with open('rounded_modified_test', "w") as file:
    json.dump(s, file, indent=4)