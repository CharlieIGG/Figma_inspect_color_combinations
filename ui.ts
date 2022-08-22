import './ui.css'

if (document.getElementById('create')) {
    document.getElementById('create')!.onclick = () => {
        const textbox = document.getElementById('count') as HTMLInputElement
        const count = parseInt(textbox.value, 10)
        parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
    }
}
if (document.getElementById('cancel')) {
    document.getElementById('cancel')!.onclick = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
    }
}