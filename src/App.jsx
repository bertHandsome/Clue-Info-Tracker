import React, { useState, useEffect } from 'react';

// Main App component for the CLUE game board
const App = () => {
  // State to manage the selected location (Mansion or Boardwalk)
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Lists for "Who" and "What" categories, constant across both locations
  const whoList = ['Green', 'Mustard', 'Peacock', 'Plum', 'Scarlet', 'White'];
  const whatList = ['Wrench', 'Candlestick', 'Dagger', 'Pistol', 'Lead Pipe', 'Rope'];

  // Lists for "Where" locations specific to Mansion and Boardwalk
  const mansionWhereList = ['Bathroom', 'Office', 'Dining Room', 'Game Room', 'Garage', 'Bedroom', 'Living Room', 'Kitchen', 'Courtyard'];
  const boardwalkWhereList = ['Beach', 'Arcade', 'Jet Ski Rental', 'Ferris Wheel', 'Surf Shop'];

  // State to store the status of each cell in the table.
  // The key will be 'itemName_category' (e.g., 'Green_who', 'Wrench_what', 'Bathroom_where')
  // The value will be 0 (empty), 1 ('x'), or 2 (circle)
  const [cellStates, setCellStates] = useState({});

  // Function to handle the selection of a game location
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Reset cell states when a new location is selected
    setCellStates({});
  };

  // Function to handle cell clicks in the game board table
  const handleCellClick = (itemName, category) => {
    const key = `${itemName}_${category}`;
    // Cycle through states: 0 (empty) -> 1 ('x') -> 2 (circle) -> 0 (empty)
    setCellStates(prevStates => {
      const currentState = prevStates[key] || 0;
      const nextState = (currentState + 1) % 3; // 0, 1, 2
      return { ...prevStates, [key]: nextState };
    });
  };

  // Helper function to render the content of a cell based on its state
  const renderCellContent = (itemName, category) => {
    const key = `${itemName}_${category}`;
    const state = cellStates[key] || 0;
    switch (state) {
      case 1:
        return <span className="font-bold text-lg leading-none">X</span>;
      case 2:
        return <span className="font-bold text-lg leading-none">&#9679;</span>; // Unicode for a circle
      default:
        return null;
    }
  };

  // Determine the 'where' list based on the selected location
  const currentWhereList = selectedLocation === 'Mansion' ? mansionWhereList : boardwalkWhereList;

  // Render the CLUE game application
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-4 font-inter flex flex-col items-center justify-center">
      {/* Page Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-8 drop-shadow-lg text-center">
        CLUE
      </h1>

      {/* Conditional rendering based on whether a location is selected */}
      {!selectedLocation ? (
        // Location selection screen
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-6">
          <button
            onClick={() => handleLocationSelect('Mansion')}
            className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-2xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-75"
          >
            Mansion
          </button>
          <button
            onClick={() => handleLocationSelect('Boardwalk')}
            className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Boardwalk
          </button>
        </div>
      ) : (
        // Game board display after location selection
        <div className="w-full max-w-7xl bg-gray-800 bg-opacity-70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl overflow-x-auto">
          {/* Currently selected location display and back button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Location: <span className="text-yellow-400">{selectedLocation}</span>
            </h2>
            <button
              onClick={() => setSelectedLocation(null)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              Change Location
            </button>
          </div>

          {/* Main game board table */}
          <table className="min-w-full divide-y divide-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tl-lg">Category/Item</th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider rounded-tr-lg">Mark</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {/* "Who" Section */}
              <tr>
                <td colSpan="2" className="px-3 py-3 text-left text-lg font-bold text-yellow-400 uppercase tracking-wider bg-gray-700 rounded-lg shadow-inner">Who</td>
              </tr>
              {whoList.map((who, index) => (
                <tr key={`who-${index}`} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-200">{who}</td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-center text-sm cursor-pointer border border-gray-600 rounded-md bg-gray-700/30 hover:bg-gray-700/60 transition-colors duration-150 relative overflow-hidden"
                    onClick={() => handleCellClick(who, 'who')}
                  >
                    <div className="flex items-center justify-center h-full">
                      {renderCellContent(who, 'who')}
                    </div>
                  </td>
                </tr>
              ))}

              {/* "What" Section */}
              <tr>
                <td colSpan="2" className="px-3 py-3 text-left text-lg font-bold text-yellow-400 uppercase tracking-wider bg-gray-700 rounded-lg shadow-inner">What</td>
              </tr>
              {whatList.map((what, index) => (
                <tr key={`what-${index}`} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-200">{what}</td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-center text-sm cursor-pointer border border-gray-600 rounded-md bg-gray-700/30 hover:bg-gray-700/60 transition-colors duration-150 relative overflow-hidden"
                    onClick={() => handleCellClick(what, 'what')}
                  >
                    <div className="flex items-center justify-center h-full">
                      {renderCellContent(what, 'what')}
                    </div>
                  </td>
                </tr>
              ))}

              {/* "Where" Section */}
              <tr>
                <td colSpan="2" className="px-3 py-3 text-left text-lg font-bold text-yellow-400 uppercase tracking-wider bg-gray-700 rounded-lg shadow-inner">Where ({selectedLocation})</td>
              </tr>
              {currentWhereList.map((where, index) => (
                <tr key={`where-${index}`} className="hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-200">{where}</td>
                  <td
                    className="px-3 py-2 whitespace-nowrap text-center text-sm cursor-pointer border border-gray-600 rounded-md bg-gray-700/30 hover:bg-gray-700/60 transition-colors duration-150 relative overflow-hidden"
                    onClick={() => handleCellClick(where, 'where')}
                  >
                    <div className="flex items-center justify-center h-full">
                      {renderCellContent(where, 'where')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
