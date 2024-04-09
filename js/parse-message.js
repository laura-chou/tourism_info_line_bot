export const ParseMessage = (text) => {
  const originalList = ['台', '線', '瓶', '製']
  const replaceList = ['臺', '縣', '屏', '置']
  let replaceText = ''
  for (const item of text) {
    const index = originalList.indexOf(item)
    replaceText += item.replace(originalList[index], replaceList[index])
  }
  return replaceText
}

export const ReplaceText = (text) => {
  const replaceList = ['市', '鄉', '區', '鎮']
  let replaceText = text
  replaceList.forEach(word => {
    replaceText = replaceText.replace(word, '')
  })
  return replaceText
}
