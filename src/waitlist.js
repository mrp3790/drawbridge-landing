// src/waitlist.js

// Function to save email to local storage as fallback
export const saveEmailToWaitlist = (email) => {
  try {
    // Get existing emails from localStorage
    const existingEmails = JSON.parse(localStorage.getItem('waitlist') || '[]');
    
    // Add new email with timestamp
    existingEmails.push({
      email,
      timestamp: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('waitlist', JSON.stringify(existingEmails));
    
    // Show emails in console for development
    console.log("Emails in waitlist:", existingEmails);
    
    return true;
  } catch (err) {
    console.error("Error saving email:", err);
    return false;
  }
};
