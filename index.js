'use strict'

const { URLSearchParams } = require('url')
const { nanoid } = require('nanoid')

const query = input => Object.fromEntries(new URLSearchParams(input))

module.exports = (req, res) => {
  const url = req.url.substring(1)
  const { size } = query(url)

  if (size !== undefined) {
    const hash = nanoid(size)
    return res.redirect(`/${hash}`)
  } else {
    return res.send(
      `Generated a ${url.length} characters URL. Send \`/?size=n\` to create a new one.`
    )
  }
}
