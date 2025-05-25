# JavaScript Flashcards Database

This directory contains the data for the JavaScript Flashcards application.

## Files

- `db.json`: Main database file with the first 50 questions used by the application
- `complete_db.json`: Complete database containing all 476 JavaScript interview questions (only partially implemented currently)
- `generate_db.js`: A script to help generate database entries

## Question Structure

Each question in the database follows this structure:

```json
{
  "id": 1,
  "question": "Question text goes here?",
  "answer": "Answer text goes here."
}
```

## Adding More Questions

To add more questions to the database:

1. Open `db.json`
2. Add new questions to the `flashcards` array
3. Make sure each question has a unique ID

## Categories

You can optionally add categories to questions by adding a `category` field:

```json
{
  "id": 1,
  "question": "Question text goes here?",
  "answer": "Answer text goes here.",
  "category": "ES6"
}
```

## Source

The questions in this database are based on a comprehensive collection of JavaScript interview questions available in the main project README.

## License

This data is provided for educational purposes only.
