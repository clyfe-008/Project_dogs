import React from 'react';

function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Handle successful logout, e.g., update authentication state
      } else {
        // Handle logout error and display a message to the user
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;