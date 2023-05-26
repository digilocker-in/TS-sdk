
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./digilocker-sdk.cjs.production.min.js')
} else {
  module.exports = require('./digilocker-sdk.cjs.development.js')
}
