const fs = require('fs')
const path = require('path')

async function build() {
  const platforms = ['chromium', 'firefox']

  for (const platform of platforms) {
    const targetDir = `dist/${platform}`

    // Create platform-specific directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    // Copy platform-specific manifest
    const manifestPath = path.join('platforms', platform, 'manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

    fs.writeFileSync(
      path.join(targetDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    )
  }
}

build()
