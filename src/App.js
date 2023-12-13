import React, { useState } from 'react';
import TaskPanel from './components/TaskPanel';
import TerminalPanel from './components/TerminalPanel';
import Split from 'react-split';
import './App.css';

function App() {
  const ttydUrl = 'http://localhost:7681'; // Replace with your ttyd URL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState); // Toggle the state
  };

  return (
    <div className="App">
      <div className="BasePanels">
        <Split
          className="App"
          sizes={[50, 50]} // Initial sizes of the three panels (left, middle, right)
          minSize={100} // Minimum size of each panel
          expandToMin={false} // Prevent panels from collapsing to minimum size
          gutterSize={10} // Size of the gutter between panels
          gutterAlign="center" // Align the gutter in the center
          snapOffset={30} // Snap to minimum size if within 30 pixels
        >
          <div className="LeftPanel">
            <TaskPanel onCheckClick={toggleModal} />

          </div>
          <div className="RightPanel">
            <TerminalPanel wsUrl={ttydUrl} />
          </div>
        </Split>
      </div>

      {/* Modal */}
      {isModalOpen && (

        <div className="modal-background">
          <div className="flex justify-start content-center" style={{ marginTop: '50px' }}>
            <div>
              <div id="modal-1702509518071" className="modal" data-testid="config-test-kke-modal" tabIndex="0">
                <div className="modal-content">
                  <h4>Finish?</h4>
                  <p> Are you sure you want to mark the task completed? You must verify your work to make sure
                    it has been completed as expected. </p><br />
                  <p> Once marked finished, you will not be able to make any changes. </p>
                </div>
                <div className="modal-footer">
                  <button className="waves-effect waves-green btn-flat" onClick={toggleModal}>Cancel</button>
                  <button className="waves-effect waves-green btn-flat">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;