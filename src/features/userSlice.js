/*
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const userSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "localhost:3000"
  }),// hace las veces de axios
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
      providesTags: ["Users"], // funcion que se ejecuta al hacer un llamado conjuto con el 
      transformResponse: response => response.sort((a,b) => b._id - a._id) // transforma y ordena
    })
  })
})

export const { useGetUsersQuery } = userSlice
*/

import { createSlice } from "@reduxjs/toolkit"

 // Metodo para usar el createSlice de reduxtoolkit
const users = [
  {
    "_id": "65ea5fbead0bebdbaadfe1bd",
    "id": 13,
    "name": "David",
    "lastname": "Anderson",
    "email": "DavAnd@example.com",
    "password": "$2b$10$N9mUYhlBBnhU7TEWoGnJ1ODz8xbQP4yI8rvMOGr/pa.SnQho8qgC.",
    "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkCFiM-POX-FNnY5ZfkUhTl41gjFh2bomPw&usqp=CAU"
  }
]

export const userSlice = createSlice({
  name: 'users',
  initialState: users,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    }
  }
})


export const { addUser } = userSlice.actions
export default userSlice.reducer
