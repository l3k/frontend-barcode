import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export interface Product {
  id: string;
  name: string;
  description: string;
  value: number;
  code: string;
}

export const getProducts = async (token: string, search?: string) => {
  try {
    const response = await axios.get(`${apiUrl}/products`, {
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

export const createProduct = async (code: string, name: string, description: string, value: number, token: string) => {
  try {
    const response = await axios.post(`${apiUrl}/products`, {
      code,
      name,
      description,
      value
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

export const importProduct = async (form: FormData, token: string) => {
  try {
    const response = await axios.post(`${apiUrl}/products/import`, form, {
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

export const getPdf = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/products/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob',
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateProduct = async (id: string, code: string, name: string, description: string, value: number, token: string) => {
  try {
    const response = await axios.put(`${apiUrl}/products`, {
      product_id: id,
      code,
      name,
      description,
      value
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

export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    throw error
  }
}
