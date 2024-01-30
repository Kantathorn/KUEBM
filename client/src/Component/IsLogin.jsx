import React,{ useEffect } from 'react'
import axios from 'axios'

function IsLogin() {
    //Check if logged in
    useEffect(() => {
        axios.get('http://localhost:5500/user/role',{withCredentials: true}).then((response) => {
            console.log(response.data)
            if (response.data === 'SystemAdmin') {
                window.location.href = '/system_admin'
            }
            else if (response.data === 'ClubManager') {
                window.location.href = '/club_manager'
            }
            else if (response.data === 'EquipmentManager') {
                window.location.href = '/equipment_manager'
            }
            else if (response.data === 'User') {
                window.location.href = '/user'
            }
        })
        .catch((error) => {})
    }, [])
}

export default IsLogin