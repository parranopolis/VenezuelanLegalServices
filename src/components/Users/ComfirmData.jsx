export function ConfirmData() {

    const q = sessionStorage.getItem('formData')
    const w = JSON.parse(q)
    console.log(w)
    return (
        <span>Confirmar Datos</span>
    )
}