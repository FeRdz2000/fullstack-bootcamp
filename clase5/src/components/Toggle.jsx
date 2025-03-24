import { forwardRef, useImperativeHandle, useState } from "react"

export const Toggle = forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    // guardar función toggleVisibility en la referencia que puede ser utilizado fuera del componente
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setVisible(false)}>Cancel</button>
            </div>
        </div>
    )
})
