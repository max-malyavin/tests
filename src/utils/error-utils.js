export const handleAsyncServerAppError = (data, thunkAPI) => {
  return thunkAPI.rejectWithValue({ errors: data.messages, fieldsErrors: data.fieldsErrors });
};

export const handleAsyncServerNetworkError = (error, thunkAPI) => {
  return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined });
};
