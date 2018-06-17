export const loadImage = function getBase64 (url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => 'data:;base64,' + new Buffer(response.data, 'binary').toString('base64'))
}
