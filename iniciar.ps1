$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
  $taskPnpmCommand = Get-Command pnpm -ErrorAction SilentlyContinue
  if ($taskPnpmCommand) {
    $taskPnpm = $taskPnpmCommand.Source
  } else {
    $taskPnpm = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd'
    if (-not (Test-Path -LiteralPath $taskPnpm)) {
      throw 'Instale Node.js e pnpm conforme o README antes de iniciar.'
    }
  }
  if (-not (Test-Path -LiteralPath 'node_modules')) {
    & $taskPnpm install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { throw 'A instalação das dependências não foi concluída.' }
  }
  & $taskPnpm dev
} finally {
  Pop-Location
}
