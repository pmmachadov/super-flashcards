import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Flashcard.css";
import "../styles/CodeHighlight.css";

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const renderImage = (imageData) => {
    if (!imageData) return null;
    return (
      <div className="flashcard-image-container">
        <img
          src={imageData}
          alt="Flashcard content"
          className="flashcard-image"
        />
      </div>
    );
  };
  const formatAnswer = (answer) => {
    if (typeof answer !== "string") {
      return formatObjectAnswer(answer);
    }

    const lines = answer.split("\n");
    const formattedLines = [];
    let inCodeBlock = false;
    let codeBlockLines = [];

    lines.forEach((line, index) => {
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
        if (line.includes("Example:") || line.includes("Examples:")) {
          const [intro, code] = line.split(/(?:Example:|Examples:)/);
          formattedLines.push(
            <p key={`intro-${index}`}>
              {intro}
              <strong>Example:</strong>
            </p>
          );

          inCodeBlock = true;
          if (code && code.trim()) {
            codeBlockLines.push(code.trim());
          }
        } else if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLines.push(line);
        } else {
          codeBlockLines.push(line);
        }
      } else if (line.match(/^\d+\./)) {
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
      } else if (line.startsWith("- ")) {
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
      } else {
        if (inCodeBlock) {
          formattedLines.push(renderCodeBlock(codeBlockLines, index));
          codeBlockLines = [];
          inCodeBlock = false;
        }
        if (line.trim()) {
          formattedLines.push(<p key={`text-${index}`}>{line}</p>);
        }
      }
    });

    if (inCodeBlock && codeBlockLines.length > 0) {
      formattedLines.push(renderCodeBlock(codeBlockLines, lines.length));
    }

    return <>{formattedLines}</>;
  };

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
  const highlightSyntax = (code) => {
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
      {" "}
      <div className="flashcard-inner">
        {" "}
        <div className="flashcard-front">
          <h2>Question:</h2>
          <p>{flashcard.question}</p>
          {flashcard.questionImage && (
            <div className="flashcard-image-container">
              <img
                src={flashcard.questionImage}
                alt="Question visual"
                className="flashcard-image"
              />
            </div>
          )}
        </div>{" "}
        <div className="flashcard-back">
          <h2>Answer:</h2>
          <div className="answer-content">{formatAnswer(flashcard.answer)}</div>
          {flashcard.answerImage && (
            <div className="flashcard-image-container">
              <img
                src={flashcard.answerImage}
                alt="Answer visual"
                className="flashcard-image"
              />
            </div>
          )}
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
