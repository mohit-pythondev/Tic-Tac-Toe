import os
import subprocess
from datetime import datetime
import random

# Path to the cloned repository
REPO_PATH =  os.path.dirname(os.path.realpath(__file__))  # Replace with the actual path

# Path to the daily_commit.txt file
FILE_PATH = os.path.join(REPO_PATH, "daily_commit.txt")
commit_messages = [
    "Refactored code for better performance",
    "Added new feature to Tic-Tac-Toe",
    "Fixed minor bugs",
    "Improved user interface",
    "Optimized database queries",
    "Updated documentation",
    "Enhanced security features",
    "Added logging functionality",
    "Improved error handling",
    "Fixed typos in comments",
    "Upgraded dependencies",
    "Improved code readability",
    "Simplified logic in game flow",
    "Added test cases for new features",
    "Fixed alignment issues",
    "Improved responsiveness on smaller screens",
    "Cleaned up unused code",
    "Added support for new platforms",
    "Updated daily_commit.txt with random changes",
    "Enhanced overall user experience"
]
# Change to the repository directory
os.chdir(REPO_PATH)

# Write the current date and time to daily_commit.txt
with open(FILE_PATH, "a") as file:
    file.write(f"{random.choice(commit_messages)}\n")

# Git commands to add, commit, and push
try:
    subprocess.run(["git", "add", "."], check=True)  # Stage all changes
    subprocess.run(["git", "commit", "-m", f"Auto commit on {datetime.now().date()}"], check=True)
    subprocess.run(["git", "push"], check=True)  # Push to the remote repository
    print("Commit and push successful!")
except subprocess.CalledProcessError as e:
    print("Error occurred while committing or pushing:", e)
