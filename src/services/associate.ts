import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export interface Associate {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
}

export const getAssociates = async (token: string, search?: string) => {
  try {
    const response = await axios.get(`${apiUrl}/associates`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        name: search || ""
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const createAssociate = async (name: string, email: string, phone: string, document: string, token: string) => {
  try {
    const response = await axios.post(`${apiUrl}/associates`, {
      name,
      email,
      phone,
      document
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const importAssociate = async (form: FormData, token: string) => {
  try {
    const response = await axios.post(`${apiUrl}/associates/import`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}


export const updateAssociate = async (id: string, name: string, email: string, phone: string, document: string, token: string) => {
  try {
    const response = await axios.put(`${apiUrl}/associates`, {
      associate_id: id,
      name,
      email,
      phone,
      document
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteAssociate = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/associates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
