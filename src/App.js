import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VoteTable from './components/VoteTable'; // Ensure this path matches your file structure
import ElectionForm from './components/ElectionForm';
import VotingComponent from './components/VotingComponent';
import ResultsComponent from './components/ResultsComponent';
import ManagementComponent from './components/ManagementComponent';

function App() {
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                try {
                    // Request account access
                    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Updated method to request account access
                    setWeb3(web3Instance);
                } catch (error) {
                    console.error("Access to your Ethereum account rejected.");
                }
            } else if (window.web3) {
                setWeb3(new Web3(window.web3.currentProvider));
            } else {
                console.log('Non-Ethereum browser detected. Consider installing MetaMask!');
            }
        };

        loadWeb3();
    }, []);

    return (
        <Router>
            <div>
                <h1>Blockchain-Based Voting System</h1>
                <Routes>
                    <Route path="/" element={<VoteTable />} />
                    <Route path="/create-vote" element={<ElectionForm />} />
                    <Route path="/vote/:id" element={<VotingComponent />} />
                    <Route path="/results/:id" element={<ResultsComponent />} />
                    <Route path="/manage" element={<ManagementComponent />} />
                    {/* Additional routes can be added here as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
