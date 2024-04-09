from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from trl import SFTTrainer
import json
from peft import LoraConfig
import transformers
import torch

lora_config = LoraConfig(
    r=8,
    target_modules=["q_proj", "o_proj", "k_proj", "v_proj", "gate_proj", "up_proj", "down_proj"],
    task_type="CAUSAL_LM",
)



# Assuming your JSON file is named "data.json"
file_path = "data/open_app.json"

# Open the JSON file and load its contents into a dictionary
with open(file_path, "r") as file:
    data = json.load(file)

# Now, "data" contains the contents of your JSON file as a Python dictionary
# print(data)

classification_labels = [
"Open App",
"Create New File",
"Increase Volume",
"Decrease Volume",
"Move File",
"Update File",
"Other",
"Question",
"Goto Link",
"Close App",
"Append To File",
"Type Text", 
"View File Contents"
]

model_id = "google/gemma-2b"
tokenizer = AutoTokenizer.from_pretrained(model_id, token="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")
model = AutoModelForCausalLM.from_pretrained(model_id, token="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")

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
input_text = ""

while input_text != "q:":
    input_text = input(">>> ")
    if input_text == "q:":
        continue
   
    input_ids = tokenizer(input_text, return_tensors="pt")

    outputs = model.generate(**input_ids)
    print(tokenizer.decode(outputs[0]))



# def formatting_func():
#     global data
#     output_texts = []
#     for example in data:
#         row = f"""Classify intent: \nOptions: {classification_labels}\nText: {example['text']}\nClass: {example['class']}"""
#         output_texts.append(row)
#     return output_texts


# formatted_data = formatting_func()

# for i in formatted_data:
#     print(f"{i}\n\n")

# trainer = SFTTrainer(
#     model=model,
#     train_dataset=data["train"],
#     args=transformers.TrainingArguments(
#         per_device_train_batch_size=1,
#         gradient_accumulation_steps=4,
#         warmup_steps=2,
#         max_steps=10,
#         learning_rate=2e-4,
#         fp16=True,
#         logging_steps=1,
#         output_dir="outputs",
#         optim="paged_adamw_8bit"
#     ),
#     peft_config=lora_config,
#     formatting_func=formatting_func,
# )
# trainer.train()


# while True:
#     text = input(">>> ")
#     device = "cuda:0"
#     inputs = tokenizer(text, return_tensors="pt").to(device)

#     outputs = model.generate(**inputs, max_new_tokens=20)
#     print(tokenizer.decode(outputs[0], skip_special_tokens=True))
