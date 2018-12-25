const SettingsReducer = (data = null, action) => {
  switch (action.type) {
    default:
      if (data === undefined || data === null) {
        return {};
      } else {
        return data;
      }
  }
};

export default SettingsReducer;
