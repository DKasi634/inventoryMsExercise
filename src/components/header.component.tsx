import { Link, useNavigate } from "react-router-dom"
import BaseButton, { buttonType } from "./buttons/base-button.component"
import { useEffect, useState } from "react"
import { axiosConnectionInstance } from "@/api/utils"
import { ENDPOINTS } from "@/api/endpoints"

const Header = () => {

  const [authTokens, setAuthTokens] = useState<{ access: string, refresh: string }>({ access: "", refresh: "" });
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token")
  const refresh_token = localStorage.getItem("refresh_token")
  
  useEffect(() => {
    setAuthTokens(prev => ({ ...prev, access: access_token || '', refresh: refresh_token || "" }))
    console.log("Access : ", access_token, "\n Refresh : ", refresh_token)
  }, [access_token, refresh_token])


  const removeTokens = () => {
    axiosConnectionInstance.post(ENDPOINTS.LOGOUT, {
      refresh_token: localStorage.getItem("refresh_token")
    },
      { headers: { Authorization: '' } }
    ).then(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token');
      axiosConnectionInstance.defaults.headers['Authorization'] = null;
      navigate('/login')
    });
  }



  return (
    <div className="flex items-center justify-between gap-4 text-lg font-bold w-full py-4 px-8">
      <Link to={'/'} className="text-lg text-black font-bold py-2">InventoryMS</Link>
      <div className="flex items-center justify-evenly gap-6 px-4">
        {authTokens.access.trim() ?
          <BaseButton type={buttonType.dark} clickHandler={removeTokens}>Logout</BaseButton> :
          <>
            <BaseButton type={buttonType.blue} href="/register">Register</BaseButton>
            <BaseButton type={buttonType.dark} href="/login">Login</BaseButton>
          </>
        }
      </div>
    </div>
  )
}

export default Header