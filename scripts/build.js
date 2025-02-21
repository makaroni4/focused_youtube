import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function build() {
  const platforms = ["chromium", "firefox"]

  // Parse command line arguments
  const args = process.argv.slice(2)
  const modeIndex = args.indexOf("--mode")

  if (modeIndex === -1 || !args[modeIndex + 1]) {
    console.error("Please specify platform with --mode [chromium|firefox]")
    process.exit(1)
  }

  const targetPlatform = args[modeIndex + 1].toLowerCase()

  if (!platforms.includes(targetPlatform)) {
    console.error(`Invalid platform "${targetPlatform}". Supported platforms are: ${platforms.join(", ")}`)
    process.exit(1)
  }

  console.log("targetPlatform", targetPlatform)

  const targetDir = `dist_${targetPlatform}`

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const manifestPath = path.join(__dirname, "..", "platforms", targetPlatform, "manifest.json")
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))

  fs.writeFileSync(
    path.join(targetDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  )
}

build()
