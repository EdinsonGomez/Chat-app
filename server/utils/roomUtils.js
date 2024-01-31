export const roomNameGenerator = (messageData) => {
  let dictionary = [messageData.from, messageData.to];
  dictionary.sort();
  return dictionary.join('-');
}