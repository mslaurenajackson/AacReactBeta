const saveBoard = (board) => {

    localStorage.setItem('myAacBoard', JSON.stringify(board));
    alert('Board saved successfully!');
  
  };
  
  export const loadBoard = () => {
  
    const saved = localStorage.getItem('aacBoard');
  
    return saved ? JSON.parse(saved) : [];
  
  };

  export default saveBoard;