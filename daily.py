import os
import subprocess
from datetime import datetime

# Path to the cloned repository
REPO_PATH =  os.path.dirname(os.path.realpath(__file__))  # Replace with the actual path

# Path to the daily_commit.txt file
FILE_PATH = os.path.join(REPO_PATH, "daily_commit.txt")

# Change to the repository directory
os.chdir(REPO_PATH)

# Write the current date and time to daily_commit.txt
with open(FILE_PATH, "a") as file:
    file.write(f"Commit made on {datetime.now()}\n")

# Git commands to add, commit, and push
try:
    subprocess.run(["git", "add", "."], check=True)  # Stage all changes
    subprocess.run(["git", "commit", "-m", f"Auto commit on {datetime.now().date()}"], check=True)
    subprocess.run(["git", "push"], check=True)  # Push to the remote repository
    print("Commit and push successful!")
except subprocess.CalledProcessError as e:
    print("Error occurred while committing or pushing:", e)
