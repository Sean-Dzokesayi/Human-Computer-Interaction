import os
import csv
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class FilesystemHandler(FileSystemEventHandler):
    def __init__(self, root_directory, output_file):
        super().__init__()
        self.root_directory = root_directory
        self.output_file = output_file

    def on_any_event(self, event):
        if event.is_directory:
            return
        self.update_csv()

    def update_csv(self):
        filesystem_list = create_filesystem_list(self.root_directory)
        save_list_to_csv(filesystem_list, self.output_file)

def create_filesystem_list(root_dir):
    filesystem_list = []
    for root, dirs, files in os.walk(root_dir):
        for directory in dirs:
            filesystem_list.append((os.path.join(root, directory), 'Directory'))
        for file in files:
            filesystem_list.append((os.path.join(root, file), 'File'))
    return filesystem_list

def save_list_to_csv(filesystem_list, output_file):
    with open(output_file, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['Path', 'Type'])
        writer.writerows(filesystem_list)
        return filesystem_list

# if __name__ == "__main__":
#     root_directory = os.path.expanduser("~/Desktop/JAZZ_DIR/")
#     output_file = "fs.csv"
#
#     # Initial creation of CSV
#     filesystem_list = create_filesystem_list(root_directory)
#     save_list_to_csv(filesystem_list, output_file)
    #
    # # Setup filesystem watcher
    # event_handler = FilesystemHandler(root_directory, output_file)
    # observer = Observer()
    # observer.schedule(event_handler, root_directory, recursive=True)
    # observer.start()
    #
    # try:
    #     while True:
    #         time.sleep(1)
    # except KeyboardInterrupt:
    #     observer.stop()
    # observer.join()
