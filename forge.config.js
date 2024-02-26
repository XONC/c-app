const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('node:path')
module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'public/icon/icon.ico')// no file extension required
  },
  rebuildConfig: {},
  makers: [
    {
      // window
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
        // exe 的图标
        iconUrl: path.join(__dirname, 'public/icon/icon.ico'),
        // The ICO file to use as the icon for the generated Setup.exe
        setupIcon: path.join(__dirname, 'public/icon/icon.ico')
      },
    },
    {
      // Path to the icon to use for the app in the DMG window
      name: '@electron-forge/maker-dmg',
      config: {
        icon: path.join(__dirname, 'public/icon/icon.icns')
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: path.join(__dirname, 'public/icon/icon.png')
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
