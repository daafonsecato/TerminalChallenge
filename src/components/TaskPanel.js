// TaskPanel.js
import React, { useEffect, useState, useRef } from 'react'; // Make sure useRef is imported
import './TaskPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';


function TaskPanel({ onCheckClick }) {
    const [taskDetails, setTaskDetails] = useState('');
    // Additional state for timer
    const [timeLeft, setTimeLeft] = useState('58:39');
    const taskPanelRef = useRef(null);

    useEffect(() => {
        // Fetch task details as you already have

        // Timer logic
        const timerInterval = setInterval(() => {
            // Split the time into minutes and seconds
            const [minutes, seconds] = timeLeft.split(':').map(Number);

            // Calculate the remaining time
            if (minutes === 0 && seconds === 0) {
                // Timer has reached 0, you can handle this case as needed
                clearInterval(timerInterval);
            } else if (seconds === 0) {
                // Decrease minutes and set seconds to 59
                setTimeLeft(`${minutes - 1}:${59}`);
            } else {
                // Decrease seconds by 1
                setTimeLeft(`${minutes}:${seconds - 1}`);
            }
        }, 1000); // Update every second

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(timerInterval);
        };
    }, [timeLeft]);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch('tasks/task1/index.html');
                const html = await response.text();
                setTaskDetails(html);
            } catch (error) {
                console.error('Error fetching task details:', error);
                setTaskDetails('Failed to load task details.');
            }
        };

        fetchTaskDetails();
    }, []);

    // Click handler using event delegation
    const handlePanelClick = async (event) => {
        if (event.target.tagName === 'CODE') {
            try {
                await navigator.clipboard.writeText(event.target.textContent);
                alert('Code copied to clipboard');
            } catch (err) {
                console.error('Unable to copy code:', err);
            }
        }
    };

    return (
        <div className="TaskPanel" ref={taskPanelRef} onClick={handlePanelClick}>
            <div className="task-panel-header">
                <h2>Task</h2>
                <div className="task-timer">{timeLeft}</div>
                <button className="expand-button">
                    <FontAwesomeIcon icon={faExpand} />
                </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: taskDetails }} />
            <div className="task-panel-footer">
                <button className="check-button" onClick={onCheckClick}>Check</button>

                <button className="try-later-button">Try Later</button>
            </div>
        </div>
    );
}
export default TaskPanel;
