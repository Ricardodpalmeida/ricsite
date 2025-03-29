/**
 * responsive-test.js
 * 
 * A browser script to help test responsive design at different breakpoints.
 * This can be loaded as a bookmarklet or pasted in the browser console.
 * 
 * Instructions:
 * 1. Open the website you want to test in Chrome/Firefox
 * 2. Open Developer Tools (F12)
 * 3. Paste this entire script in the Console and press Enter
 * 4. Use the floating controller that appears to test different device sizes
 */

(function() {
  // Don't re-initialize if already present
  if (document.getElementById('responsive-tester')) {
    console.log('Responsive tester already running');
    return;
  }
  
  // Common device sizes for testing
  const devices = [
    { name: 'Mobile S', width: 320, height: 568 }, // iPhone SE
    { name: 'Mobile M', width: 375, height: 667 }, // iPhone 8
    { name: 'Mobile L', width: 428, height: 926 }, // iPhone 13 Pro Max
    { name: 'Tablet', width: 768, height: 1024 }, // iPad
    { name: 'Tablet L', width: 1024, height: 1366 }, // iPad Pro
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];
  
  // Our breakpoints (match the CSS media queries)
  const breakpoints = [
    { name: 'Mobile (≤ 480px)', width: 480, height: 800 },
    { name: 'Tablet (481-768px)', width: 768, height: 1024 },
    { name: 'Desktop (769-1200px)', width: 1200, height: 800 },
    { name: 'Large Desktop (> 1200px)', width: 1440, height: 900 }
  ];
  
  // Create the UI
  const tester = document.createElement('div');
  tester.id = 'responsive-tester';
  tester.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 9999;
    font-family: Arial, sans-serif;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    min-width: 220px;
  `;
  
  // Create draggable header
  const header = document.createElement('div');
  header.style.cssText = `
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    cursor: move;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  header.innerHTML = '<span><b>Responsive Tester</b></span>';
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
  `;
  closeButton.onclick = () => tester.remove();
  header.appendChild(closeButton);
  
  tester.appendChild(header);
  
  // Get original window dimensions
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  
  // Add reset button
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Reset Size';
  resetButton.style.cssText = `
    background: #444;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 10px;
  `;
  resetButton.onclick = () => {
    window.resizeTo(originalWidth, originalHeight);
    showCurrentSize();
  };
  
  // Create breakpoint buttons
  const breakpointContainer = document.createElement('div');
  breakpointContainer.innerHTML = '<div style="margin-bottom: 8px;"><b>Breakpoints:</b></div>';
  
  // Display current size
  const sizeDisplay = document.createElement('div');
  sizeDisplay.style.cssText = `
    margin-top: 10px;
    font-size: 12px;
    color: #ccc;
  `;
  
  function showCurrentSize() {
    sizeDisplay.innerHTML = `Current: ${window.innerWidth}px × ${window.innerHeight}px`;
  }
  
  showCurrentSize();
  
  // Listen for resize events
  window.addEventListener('resize', showCurrentSize);
  
  // Add buttons for each breakpoint
  breakpoints.forEach(bp => {
    const button = document.createElement('button');
    button.innerHTML = bp.name;
    button.style.cssText = `
      background: #333;
      color: white;
      border: none;
      padding: 6px;
      margin: 4px 4px 4px 0;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      display: block;
      width: 100%;
      text-align: left;
    `;
    button.onmouseover = () => { button.style.background = '#555'; };
    button.onmouseout = () => { button.style.background = '#333'; };
    button.onclick = () => {
      window.resizeTo(bp.width, bp.height);
      showCurrentSize();
    };
    breakpointContainer.appendChild(button);
  });
  
  // Add device buttons
  const deviceContainer = document.createElement('div');
  deviceContainer.innerHTML = '<div style="margin: 10px 0 8px 0;"><b>Common Devices:</b></div>';
  
  devices.forEach(device => {
    const button = document.createElement('button');
    button.innerHTML = `${device.name} (${device.width}x${device.height})`;
    button.style.cssText = `
      background: #333;
      color: white;
      border: none;
      padding: 6px;
      margin: 4px 4px 4px 0;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      display: block;
      width: 100%;
      text-align: left;
    `;
    button.onmouseover = () => { button.style.background = '#555'; };
    button.onmouseout = () => { button.style.background = '#333'; };
    button.onclick = () => {
      window.resizeTo(device.width, device.height);
      showCurrentSize();
    };
    deviceContainer.appendChild(button);
  });
  
  // Orientation toggle
  const orientationButton = document.createElement('button');
  orientationButton.innerHTML = 'Toggle Orientation';
  orientationButton.style.cssText = `
    background: #444;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 10px;
  `;
  orientationButton.onclick = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    window.resizeTo(currentHeight, currentWidth);
    showCurrentSize();
  };
  
  // Add elements to the tester
  tester.appendChild(breakpointContainer);
  tester.appendChild(deviceContainer);
  tester.appendChild(sizeDisplay);
  
  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = `
    display: flex;
    margin-top: 10px;
  `;
  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(orientationButton);
  
  tester.appendChild(buttonContainer);
  
  // Add to the page
  document.body.appendChild(tester);
  
  // Make it draggable
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  
  header.onmousedown = (e) => {
    isDragging = true;
    dragOffsetX = e.clientX - tester.offsetLeft;
    dragOffsetY = e.clientY - tester.offsetTop;
  };
  
  document.onmousemove = (e) => {
    if (isDragging) {
      tester.style.left = (e.clientX - dragOffsetX) + 'px';
      tester.style.top = (e.clientY - dragOffsetY) + 'px';
      tester.style.right = 'auto';
      tester.style.bottom = 'auto';
    }
  };
  
  document.onmouseup = () => {
    isDragging = false;
  };
  
  // Handling for touch devices
  header.ontouchstart = (e) => {
    isDragging = true;
    dragOffsetX = e.touches[0].clientX - tester.offsetLeft;
    dragOffsetY = e.touches[0].clientY - tester.offsetTop;
  };
  
  document.ontouchmove = (e) => {
    if (isDragging) {
      tester.style.left = (e.touches[0].clientX - dragOffsetX) + 'px';
      tester.style.top = (e.touches[0].clientY - dragOffsetY) + 'px';
      tester.style.right = 'auto';
      tester.style.bottom = 'auto';
    }
  };
  
  document.ontouchend = () => {
    isDragging = false;
  };
  
  console.log('Responsive tester initialized!');
})();

// Export as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    init: function() {
      // This will be initialized by pasting in console or as bookmarklet
      console.log('Load this script in browser console for testing responsive design');
    }
  };
} 