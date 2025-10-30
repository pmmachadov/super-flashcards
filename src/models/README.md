# Flashcards Database - Multi-Subject System

This directory contains the data for the Flashcards application with support for multiple subjects.

## Files

- `subjects.json`: Configuration file that lists all available subjects
- `programacion.json`: Programming flashcards database
- `matematicas.json`: Mathematics flashcards database
- `ingles.json`: English flashcards database
- Add more subject JSON files as needed!

## How to Add a New Subject

### Step 1: Create the JSON file

Create a new JSON file in this directory with the structure:

```json
{
  "questions": [
    {
      "id": 1,
      "question": "Your question here?",
      "answer": "Your answer here."
    },
    {
      "id": 2,
      "question": "Another question?",
      "answer": "Another answer."
    }
  ]
}
```

**Example:** `historia.json`, `fisica.json`, `quimica.json`

### Step 2: Register the subject in subjects.json

Open `subjects.json` and add your new subject to the array:

```json
{
  "subjects": [
    // ... existing subjects ...
    {
      "id": "historia",
      "name": "Historia",
      "file": "historia.json",
      "icon": "📜",
      "color": "#E91E63"
    }
  ]
}
```

**Properties:**

- `id`: Unique identifier (lowercase, no spaces)
- `name`: Display name
- `file`: JSON filename
- `icon`: Emoji icon (optional)
- `color`: Hex color code for the button

### Step 3: That's it!

The app will automatically detect and load your new subject. No code changes needed!

## Question Structure

Each question follows this structure:

```json
{
  "id": 1,
  "question": "Question text goes here?",
  "answer": "Answer text goes here.",
  "questionImage": null, // Optional: URL to image
  "answerImage": null // Optional: URL to image
}
```

## Color Suggestions

- 🔵 Blue: `#2196F3`
- 🟢 Green: `#4CAF50`
- 🟠 Orange: `#FF9800`
- 🔴 Red: `#F44336`
- 🟣 Purple: `#9C27B0`
- 🟡 Yellow: `#FFC107`
- 🔵 Cyan: `#00BCD4`
- 🟤 Brown: `#795548`

## License

This data is provided for educational purposes only.
