import React, { useContext } from 'react';
import LedsContext from '../context/led/ledContext';
import { frameToCode } from '../framesToCode';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components';
import 'prismjs/components/prism-c.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.js';
import { useEffect } from 'react';
const Code = () => {
  const { state } = useContext(LedsContext);
  // TODO MOVE TO OWN PAGE
  useEffect(() => {
    Prism.highlightAll();
  }, [state]);
  return (
    <>
      <div className="row mb-2 mt-2">
        <div className="col">
          <h2>Code</h2>
        </div>
      </div>
      <pre className="line-numbers language-c ">
        <code className="language-c">{frameToCode(state)}</code>
      </pre>
    </>
  );
};

export default Code;
