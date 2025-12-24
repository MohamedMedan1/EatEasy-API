const filterFields = (notAllowedFields, reqBody) => {
  const filteredBody = {};
  const myKeys = Object.keys(reqBody);
  const notAllowedSet = new Set(notAllowedFields);

  if (myKeys.length === 0) return filteredBody;
  
  for (let i = 0; i < myKeys.length; i++){
    if (!notAllowedSet.has(myKeys[i])) {
      filteredBody[myKeys[i]] = reqBody[myKeys[i]];
    }
  }
  return filteredBody;
} 

module.exports = filterFields;