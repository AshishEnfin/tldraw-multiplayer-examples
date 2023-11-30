import { Tldraw, track, useEditor } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'
import { useEffect, useState } from 'react'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

export default function YjsExample() {

	const [Id, setId] = useState("")

    useEffect(() => {
        const queryString = window.location.search;

        const URL_Params = new URLSearchParams(queryString)

        const idParams = URL_Params.get("id")

        if (idParams) {
            setId(idParams)
        }
    }, [])

	const store = useYjsStore({
		roomId: Id,
		hostUrl: HOST_URL,
	})

	return (
		<div className="tldraw__editor">
			<Tldraw autoFocus store={store} shareZone={<NameEditor />} />
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
