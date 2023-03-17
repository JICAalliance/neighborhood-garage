
import "./clipboardCopy.scss";
import { useState } from "react";

function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <span>
         Invitation Code: <i type="text" value={copyText}>{copyText} </i>
         <button onClick={handleCopyClick}>
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
        {/* Bind our handler function to the onClick button property */}
        </span>
    );
  }

  export default ClipboardCopy;