import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Flashcard.css";
import "../styles/CodeHighlight.css";

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
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
    // Detectar lenguaje por patrones
    const isSQL = /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|DATABASE|JOIN|INNER|LEFT|RIGHT|OUTER|GROUP BY|ORDER BY|HAVING)\b/i.test(code);
    const isPHP = /\b(\$[a-zA-Z_]|<\?php|\?>|echo|print|function|class|public|private|protected|namespace|use)\b/.test(code);
    const isPython = /\b(def|import|from|class|if|elif|else|for|while|in|range|print|return|lambda|with|as|try|except|finally|raise)\b/.test(code);
    const isHTML = /<[a-z][\s\S]*>/i.test(code);
    const isCSS = /[a-z-]+\s*:\s*[^;]+;/.test(code);

    let highlighted = code;

    if (isSQL) {
      // SQL keywords
      highlighted = highlighted.replace(
        /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|DATABASE|ALTER|DROP|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|AS|AND|OR|NOT|IN|LIKE|BETWEEN|IS|NULL|COUNT|SUM|AVG|MAX|MIN|DISTINCT|UNION|INDEX|PRIMARY KEY|FOREIGN KEY)\b/gi,
        '<span class="keyword">$1</span>'
      );
    } else if (isPHP) {
      // PHP keywords
      highlighted = highlighted.replace(
        /\b(echo|print|function|return|if|else|elseif|for|foreach|while|do|switch|case|break|continue|class|public|private|protected|static|final|abstract|interface|extends|implements|new|this|self|parent|namespace|use|require|include|require_once|include_once|die|exit|try|catch|throw|finally)\b/g,
        '<span class="keyword">$1</span>'
      );
      // PHP variables
      highlighted = highlighted.replace(
        /(\$[a-zA-Z_][a-zA-Z0-9_]*)/g,
        '<span class="variable">$1</span>'
      );
      // PHP tags
      highlighted = highlighted.replace(
        /(&lt;\?php|\?&gt;|<\?php|\?>)/g,
        '<span class="tag">$1</span>'
      );
    } else if (isPython) {
      // Python keywords
      highlighted = highlighted.replace(
        /\b(def|import|from|class|if|elif|else|for|while|in|range|print|return|lambda|with|as|try|except|finally|raise|assert|pass|break|continue|yield|global|nonlocal|async|await|and|or|not|is|None|True|False)\b/g,
        '<span class="keyword">$1</span>'
      );
      // Python decorators
      highlighted = highlighted.replace(
        /(@[a-zA-Z_][a-zA-Z0-9_]*)/g,
        '<span class="decorator">$1</span>'
      );
      // Python self
      highlighted = highlighted.replace(
        /\bself\b/g,
        '<span class="builtin">self</span>'
      );
    } else if (isHTML) {
      // HTML tags
      highlighted = highlighted.replace(
        /&lt;([a-z][a-z0-9]*)\b[^&]*&gt;|<([a-z][a-z0-9]*)\b[^>]*>/gi,
        '<span class="tag">&lt;$1$2&gt;</span>'
      );
      highlighted = highlighted.replace(
        /&lt;\/([a-z][a-z0-9]*)&gt;|<\/([a-z][a-z0-9]*)>/gi,
        '<span class="tag">&lt;/$1$2&gt;</span>'
      );
      // HTML attributes
      highlighted = highlighted.replace(
        /\b([a-z-]+)=/gi,
        '<span class="attribute">$1</span>='
      );
    } else if (isCSS) {
      // CSS properties
      highlighted = highlighted.replace(
        /([a-z-]+)\s*:/gi,
        '<span class="property">$1</span>:'
      );
      // CSS values with units
      highlighted = highlighted.replace(
        /:\s*([^;]+);/g,
        ': <span class="value">$1</span>;'
      );
    } else {
      // JavaScript/Java keywords
      highlighted = highlighted.replace(
        /\b(var|let|const|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|finally|throw|new|this|super|extends|implements|interface|enum|public|private|protected|static|final|abstract|package|void|int|double|float|char|boolean|byte|short|long|true|false|null|undefined|typeof|instanceof)\b/g,
        '<span class="keyword">$1</span>'
      );
      // Built-in objects
      highlighted = highlighted.replace(
        /\b(document|window|Array|String|Object|Number|Math|Date|JSON|console|Promise|Set|Map|WeakMap|WeakSet|Proxy|Reflect|Symbol|BigInt|RegExp|Error|System|Collections|List|ArrayList|HashMap|HashSet|LinkedList|TreeMap|TreeSet|Stack|Queue)\b/g,
        '<span class="builtin">$1</span>'
      );
    }

    // Common patterns for all languages
    // Strings
    highlighted = highlighted.replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span class="string">$1</span>'
    );
    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+(\.\d+)?)\b/g,
      '<span class="number">$1</span>'
    );
    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*$|#.*$|--.*$|\/\*[\s\S]*?\*\/)/g,
      '<span class="comment">$1</span>'
    );
    // Functions
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g,
      '<span class="function">$1</span>'
    );
    // Classes (PascalCase)
    highlighted = highlighted.replace(
      /\b([A-Z][A-Za-z0-9_]+)\b/g,
      '<span class="class">$1</span>'
    );

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
