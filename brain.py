
# from llama_index.core.readers.base import BaseReader
# print("BaseReader Loaded")

# from llama_index.core.schema import Document
# print("Document Loaded")

# from llama_index.core.storage import StorageContext
# print("StorageContext Loaded")

# from llama_index.core.indices.loading import load_index_from_storage
# print("load_index_from_storage Loaded")

# from llama_index.core.indices.vector_store.base import VectorStoreIndex
# print("VectorStoreIndex Loaded")

from models import intent_classification
print("intent_classification Loaded")


print("Loaded")

while True:
    print(intent_classification(input(">>> ")))

"""

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
"Type Text"
]

"""
