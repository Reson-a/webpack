import CONFIG from '@/js/config'

let gui

if (CONFIG.isDebug) {
  let dat = require('@/libs/dat.gui.js').dat
  gui = new dat.GUI()
} else gui = null

export default gui
