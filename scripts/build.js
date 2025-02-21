const fs = require('fs')
const path = require('path')
const { browsers } = require('../build.config.js')

function generateManifest(browser) {
  const baseManifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'))

  const manifest = {
    ...baseManifest,
    manifest_version: browsers[browser].manifestVersion,
    ...browsers[browser].browserSpecific
  }

  // Firefox-specific adjustments
  if (browser === 'firefox') {
    // Convert service_worker to background scripts for Firefox
    if (manifest.background?.service_worker) {
      manifest.background = {
        scripts: [manifest.background.service_worker]
      }
    }

    // Adjust web_accessible_resources format for manifest v2
    if (manifest.web_accessible_resources) {
      manifest.web_accessible_resources = manifest.web_accessible_resources[0].resources
    }
  }

  return manifest
}

async function build() {
  for (const browser of Object.keys(browsers)) {
    const targetDir = `dist/${browser}`

    // Create browser-specific directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Generate and save browser-specific manifest
    const manifest = generateManifest(browser)
    fs.writeFileSync(
      path.join(targetDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    )
  }
}

build()
