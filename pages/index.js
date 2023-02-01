import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Code-ify your ideas!</h1>
          </div>
          <div className="header-subtitle">
            <h2>Translate plain English into Python, R and SQL.</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <Textarea
            color="primary"
            minRows={4}
            placeholder="Start changing the world."
            variant="plain"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          {/* New code I added here */}
          function MyApp() {
            <div className = "prompt-buttons">
              <a className={isGenerating ? "generate-button loading" : "generate-button"} onClick={callGenerateEndpoint}>
                <div className="generate">
                  return {isGenerating ? <span class="loader"></span> : <Button variant="contained">Generate</Button>}
                </div>
              </a>
            </div>
          };
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Home;
