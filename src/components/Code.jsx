import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components';
import 'prismjs/components/prism-c.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.js';

const Code = ({ code }) => {
  useEffect(() => {
    console.log(code);
    Prism.highlightAll();
  }, [code]);
  return (
    <pre className="line-numbers language-c ">
      <code className="language-c">{code}</code>
    </pre>
  );
};

export default Code;
