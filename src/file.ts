import * as io from "@actions/io"
import * as exec from "@actions/exec"
import process from 'process';
  
export async function workFlow(version: number | string){
    // Printing current directory
    console.log("current working directory: "+ process.cwd());

    const gitPath: string = await io.which('git', true)
    const wgetPath: string = await io.which('wget', true)
    const unzipPath: string = await io.which('unzip', true)

    if (!gitPath || !wgetPath || !unzipPath){
        await exec.exec('apt',['update'])
        await exec.exec('apt',['install', '-y', 'git', 'wget', 'unzip'])
    }

    await io.mkdirP('./kodwork')

    process.chdir('./kodwork');
    await exec.exec(`"${wgetPath}"`,[`https://static.kodcloud.com/update/download/kodbox.${version}.zip`, '-O', './new.zip'])
    await exec.exec(`"${unzipPath}"`, ['./new.zip','-d', './new'])
    await exec.exec(`"${gitPath}"`, ['clone', 'git@github.com:pliplive/kodbox.git', 'src'])

    process.chdir('./src');
    await exec.exec(`"${gitPath}"`, ['config', '--local', 'user.name', 'pliplive'])
    await exec.exec(`"${gitPath}"`, ['config', '--local', 'user.email', 'initc@outlook.com'])

    await io.rmRF('*')
    const options = { recursive: true, force: false }
    await io.cp('../new/', '.', options)

    await exec.exec(`"${gitPath}"`, ['add', '*'])
    await exec.exec(`"${gitPath}"`, ['status'])
    await exec.exec(`"${gitPath}"`, ['commit', '-m', `${version}`])
    await exec.exec(`"${gitPath}"`, ['tag', '-a', `${version}`, '-m', `${version}`])

    await exec.exec(`"${gitPath}"`,['push', '-u', 'origin', 'master', '--tags'])
}