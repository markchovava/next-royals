export function trimRightToChar(str, char) {
    const index = str.lastIndexOf(char);
    if (index !== -1) {
      return str.substring(0, index);
    } else {
      return str; // Character not found, return original string
    }
  }


export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US',   
        options);   
  
  }