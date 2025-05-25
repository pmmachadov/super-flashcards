// Individual Flashcard component
import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Flashcard.css";
import "../styles/CodeHighlight.css";

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  // Format answer with code highlighting
  const formatAnswer = (answer) => {
    // If answer is an object, convert it to a formatted string
    if (typeof answer !== "string") {
      return formatObjectAnswer(answer);
    }

    // Format code blocks and other content types
    const lines = answer.split("\n");
    const formattedLines = [];
    let inCodeBlock = false;
    let codeBlockLines = [];

    // Process each line to handle code blocks and other formatting
    lines.forEach((line, index) => {
      // Detect code blocks (usually after a code example or has JS syntax)
      if (
        line.includes("Example:") ||
        line.includes("Examples:") ||
        line.trim().startsWith("function") ||
        line.includes("=>") ||
        line.includes("const ") ||
        line.includes("var ") ||
        line.includes("let ") ||
        line.includes("{") ||
        line.includes("}")
      ) {
        // If it's the start of an example, output the text before example
        if (line.includes("Example:") || line.includes("Examples:")) {
          const [intro, code] = line.split(/(?:Example:|Examples:)/);
          formattedLines.push(
            <p key={`intro-${index}`}>
              {intro}
              <strong>Example:</strong>
            </p>
          );

          // Start collecting code lines
          inCodeBlock = true;
          if (code && code.trim()) {
            codeBlockLines.push(code.trim());
          }
        } else if (!inCodeBlock) {
          // If not already in a code block but line has code, start a block
          inCodeBlock = true;
          codeBlockLines.push(line);
        } else {
          // Continue adding lines to the existing code block
          codeBlockLines.push(line);
        }
      }
      // Handle numbered lists
      else if (line.match(/^\d+\./)) {
        // If we were in a code block, render it now
        if (inCodeBlock) {
          formattedLines.push(renderCodeBlock(codeBlockLines, index));
          codeBlockLines = [];
          inCodeBlock = false;
        }
        formattedLines.push(
          <div key={`list-${index}`} className="list-item">
            {line}
          </div>
        );
      }
      // Handle bullet points
      else if (line.startsWith("- ")) {
        // If we were in a code block, render it now
        if (inCodeBlock) {
          formattedLines.push(renderCodeBlock(codeBlockLines, index));
          codeBlockLines = [];
          inCodeBlock = false;
        }
        formattedLines.push(
          <div key={`bullet-${index}`} className="list-item">
            {line}
          </div>
        );
      }
      // Regular text
      else {
        // If we were in a code block, render it now
        if (inCodeBlock) {
          formattedLines.push(renderCodeBlock(codeBlockLines, index));
          codeBlockLines = [];
          inCodeBlock = false;
        }
        // Add regular text line if it's not empty
        if (line.trim()) {
          formattedLines.push(<p key={`text-${index}`}>{line}</p>);
        }
      }
    });

    // Handle any remaining code block at the end
    if (inCodeBlock && codeBlockLines.length > 0) {
      formattedLines.push(renderCodeBlock(codeBlockLines, lines.length));
    }

    return <>{formattedLines}</>;
  };

  // Helper to render a code block with all collected lines
  const renderCodeBlock = (codeLines, keyIndex) => {
    return (
      <div key={`code-${keyIndex}`} className="code-container">
        {codeLines.map((line, idx) => (
          <div key={idx} className="code-line">
            {highlightSyntax(line)}
          </div>
        ))}
      </div>
    );
  };
  // Helper function to highlight JavaScript syntax
  const highlightSyntax = (code) => {
    // Replace keywords with spans
    let highlighted = code
      .replace(
        /\b(var|let|const|function|return|if|else|for|while|class|import|export|from|true|false|null|undefined|new|this|typeof|instanceof)\b/g,
        '<span class="keyword">$1</span>'
      )
      .replace(
        /\b(document|window|Array|String|Object|Number|Math|Date|JSON|console|Promise)\b/g,
        '<span class="builtin">$1</span>'
      )
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>')
      .replace(/(\/\/.*$)/g, '<span class="comment">$1</span>')
      .replace(/\b([A-Z][A-Za-z0-9_]+)\b/g, '<span class="class">$1</span>')
      .replace(/\b([a-zA-Z]+)(?=\()/g, '<span class="function">$1</span>');

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  // Handle complex object answers (like in questions 42, 61, 75, 77)
  const formatObjectAnswer = (obj) => {
    return (
      <div className="code-container">
        {JSON.stringify(obj, null, 2)
          .split("\\n")
          .map((line, index) => (
            <div key={index} className="code-line">
              {highlightSyntax(line)}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard-inner">
        {" "}
        <div className="flashcard-front">
          <h2>Question:</h2>
          <p>{flashcard.question}</p>
        </div>{" "}
        <div className="flashcard-back">
          <h2>Answer:</h2>
          <div className="answer-content">{formatAnswer(flashcard.answer)}</div>
        </div>
      </div>
    </div>
  );
};

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

export default Flashcard;
