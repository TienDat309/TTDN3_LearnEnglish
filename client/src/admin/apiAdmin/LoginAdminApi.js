import { useState, useEffect } from 'react'
import axios from 'axios'

function LoginAdminApi(token) {
    const [isLoginAdmin, setisLoginAdmin] = useState(false)
    const [admin, setadmin] = useState([])
    const [idadmin, setidadmin] = useState([])
    useEffect(() => {
        if (token) {
            const getAdmin = async() => {
                try {
                    const res = await axios.get('http://localhost:5000/admin/inforadmin', {
                        headers: { Authorization: token }
                    })
                    setadmin(res.data)
                    setisLoginAdmin(true)
                    setidadmin(res.data._id)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getAdmin()

        }
    }, [token])
    return {
        admin: [admin, setadmin],
        isLoginAdmin: [isLoginAdmin, setisLoginAdmin],
        idadmin: [idadmin, setidadmin]
    }
}

export default LoginAdminApi