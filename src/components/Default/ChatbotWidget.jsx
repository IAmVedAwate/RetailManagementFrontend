import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleWidget = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question) return;
        setIsLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            setResponse('Error communicating with chatbot.');
        }
        setIsLoading(false);
    };

    return (
        <div>
            {/* Floating Button / Chatbot Panel */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
                {!isOpen && (
                    <button
                        className="btn btn-black rounded-circle"
                        style={{ width: '60px', height: '60px', padding: 0 }}
                        onClick={toggleWidget}>
                        <img
                            src="/Chatbot-logo.jpg"
                            alt="Chatbot"
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                    </button>
                )}
                {isOpen && (
                    <div
                        className="card shadow"
                        style={{
                            width: '50vw',
                            height: '80vh',
                            position: 'fixed',
                            bottom: '0',
                            right: '0',
                            zIndex: 9999,
                            borderRadius: '0'
                        }}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Chatbot</h5>
                            <button className="btn btn-sm btn-danger" onClick={toggleWidget}>Close</button>
                        </div>
                        <div className="card-body" style={{ overflowY: 'auto' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="question">Your Question:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="question"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-2" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                            {response && (
                                <div className="mt-3">
                                    <h6>Response:</h6>
                                    <ReactMarkdown>{response}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatbotWidget;
