import React, { useState, useEffect } from 'react';
import { getBugs } from '../services/bugService';

const BugList = () => {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const data = await getBugs();
                setBugs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBugs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Bug List</h2>
            {bugs.length === 0 ? (
                <p>No bugs reported yet</p>
            ) : (
                <ul>
                    {bugs.map(bug => (
                        <li key={bug._id}>
                            <h3>{bug.title}</h3>
                            <p>{bug.description}</p>
                            <span>Status: {bug.status}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BugList;