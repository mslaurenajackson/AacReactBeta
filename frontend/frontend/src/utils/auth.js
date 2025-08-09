export const signOut = () => {
    // Clear any stored authentication tokens/session data
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // Redirect to login page or home
    window.location.href = '/login';
  };