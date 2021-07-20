import * as io from '@actions/io'
import * as exec from '@actions/exec'
import {chdir, cwd} from 'process'
import {readdirSync} from 'fs'

export function listDir(dir: string): Array<string> {
  const arr: string[] = []
  const files = readdirSync(dir)
  files.forEach(file => {
    arr.push(file)
  })
  return arr
}

export async function workFlow(version: number | string) {
  // Printing current directory
  const workDir = cwd()
  console.log(`Starting directory: ${workDir}`)

  const cpPath: string = await io.which('cp', true)
  const rmPath: string = await io.which('rm', true)

  const gitPath: string = await io.which('git', true)
  const wgetPath: string = await io.which('wget', true)
  const unzipPath: string = await io.which('unzip', true)

  if (!gitPath || !wgetPath || !unzipPath) {
    await exec.exec('apt', ['update'])
    await exec.exec('apt', ['install', '-y', 'git', 'wget', 'unzip'])
  }

  await io.mkdirP(`${workDir}/kodwork`).then(fn => {
    try {
      chdir(`${workDir}/kodwork`)
      console.log(`New directory: ${cwd()}`)
    } catch (err) {
      console.error(`chdir: ${err}`)
    }
  })

  await exec.exec(`"${wgetPath}"`, [
    `https://static.kodcloud.com/update/download/kodbox.${version}.zip`,
    '-O',
    './new.zip'
  ])
  await exec.exec(`"${unzipPath}"`, ['./new.zip', '-d', './new'])
  await exec
    .exec(`"${gitPath}"`, [
      'clone',
      'git@github.com:pliplive/kodbox.git',
      'src'
    ])
    .then(fn => {
      try {
        chdir(`${workDir}/kodwork/src`)
        console.log(`New directory: ${cwd()}`)
      } catch (err) {
        console.error(`chdir: ${err}`)
      }
    })

  await exec.exec(`"${gitPath}"`, [
    'config',
    '--local',
    'user.name',
    'pliplive'
  ])
  await exec.exec(`"${gitPath}"`, [
    'config',
    '--local',
    'user.email',
    'initc@outlook.com'
  ])

  const srcFiles = listDir(`${workDir}/kodwork/src/`)
  srcFiles.forEach(async file => {
    if (file[0] !== '.'){
        await exec.exec(`"${rmPath}"`, ['-rf', `${workDir}/kodwork/src/${file}`])
    }
  })

  const newFiles = listDir(`${workDir}/kodwork/new/`)
  newFiles.forEach(async file => {
    await exec.exec(`"${cpPath}"`, [
      '-ap',
      `${workDir}/kodwork/new/${file}`,
      '.'
    ])
  })

  await exec.exec(`"${gitPath}"`, ['add', '*'])
  await exec.exec(`"${gitPath}"`, ['status'])
  await exec.exec(`"${gitPath}"`, ['commit', '-m', `${version}`])
  await exec.exec(`"${gitPath}"`, [
    'tag',
    '-a',
    `${version}`,
    '-m',
    `${version}`
  ])

  await exec.exec(`"${gitPath}"`, ['push', '-u', 'origin', 'master', '--tags'])
}
