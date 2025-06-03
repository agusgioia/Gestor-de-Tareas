import axios from "axios";

const API_BASE_Render = "https://api-gestortrello.onrender.com/api/boards";

export const getBoards = async () => {
  try {
    const response = await axios.get(API_BASE_Render);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
}

export const getBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${API_BASE_Render}/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching board:", error);
    throw error;
  }
}

export const getUserBoards = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_Render}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user boards:", error);
    throw error;
  }
}

export const createBoard = async (board) => {
  try {
    const response = await axios.post(API_BASE_Render, board);
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
}

export const updateBoard = async (boardId, updatedBoard) => {
  try {
    const response = await axios.put(`${API_BASE_Render}/${boardId}`, updatedBoard);
    return response.data;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
}

export const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(`${API_BASE_Render}/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
}

export const AddList = async (boardId, listTitle) => {
  try {
    const response = await axios.post(
      `${API_BASE_Render}/${boardId}/lists`,
      { title: listTitle }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding list to board:", error.response?.data || error.message);
    throw error;
  }
};

export const DeleteList = async (boardId, listTitle) => {
  try {
    const response = await axios.delete(
      `${API_BASE_Render}/${boardId}/lists/${listTitle}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting list from board:", error);
    throw error;
  }
}

export const AddCard = async (boardId, listTitle, card) => {
  try {
    const response = await axios.post(
      `${API_BASE_Render}/${boardId}/lists/${listTitle}/cards`,
      card,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding card to board:", error);
    throw error;
  }
}

export const deleteCard = async (boardId, listTitle, cardTitle) => {
  try {
    const response = await axios.delete(
      `${API_BASE_Render}/${boardId}/lists/${listTitle}/cards/${cardTitle}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting card from board:", error);
    throw error;
  }
}


