module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    },
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
      title: 'Options'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'amazon-auto-order-script':[
              'src/content-scripts/amazon-auto-order-script.js'
            ],
            'check-url':[
              'src/content-scripts/check-url.js'
            ],
            'amazon-add-to-cart':[
              'src/content-scripts/amazon-add-to-cart.js'
            ],
            'content-script':[
              'src/content-scripts/content-script.js'
            ],
            'amazon-checkout':[
              'src/content-scripts/amazon-checkout.js'
            ],
            'amazon-address-fill-up':[
              'src/content-scripts/amazon-address-fill-up.js'
            ],
            'amazon-payselect':[
              'src/content-scripts/amazon-payselect.js'
            ]
          }
        }
      }
    }
  }
}
