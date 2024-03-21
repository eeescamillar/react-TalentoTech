import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000', //COMUNICACION CON LA API DE EXPRESS
    prepareHeaders: (headers, { }) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiN2ZjNmU0YTVjOTJjNWRlZmNlYzIiLCJlbWFpbCI6ImFuZHJlYXNAY29ycmVvLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDk4MTM3OSwiZXhwIjoxNzEwOTg0OTc5fQ.aHcByrL_1CwtqOwDkM0PB0DZsv02mcIXZdRjwC03h8g";
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }), // Hace las veces de Axios
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user',
      providesTags: ["Users"], // Funcion que se ejecuta al hacer un llamado en conjutno con el invalidate
      transformResponse: response => response.sort((a, b) =>
        (a.name.toUpperCase() < b.name.toUpperCase()) ? -1
          : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0)
    }),
    getUserById: builder.query({
      query: (_id) => '/user/' + _id,
      providesTags: ['User']
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/user',
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ["Users"]
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: ["Users", "User"]
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/user/${_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Users"]
    })
  })
})
// la nomencaltura es 'USE'+'funcion'+"nombreDeLaClase"+'QUERY o MUTATION SEGUN CORRESPONDA'
export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = apiSlice
