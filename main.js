const { app, BrowserWindow, ipcMain,autoUpdater  } = require('electron/main')
const path = require('node:path')
// import isDev from "electron-is-dev";
// const {isDev} = require('electron-is-dev')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'src/assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})




    // require('update-electron-app')()
    const server = 'https://update.electronjs.org'
    const feed = `${server}/OWNER/REPO/${process.platform}-${process.arch}/${app.getVersion()}`

    autoUpdater.setFeedURL(feed)

    setInterval(() => {
        autoUpdater.checkForUpdates()
    }, 5000)
    console.log('Running in production');
