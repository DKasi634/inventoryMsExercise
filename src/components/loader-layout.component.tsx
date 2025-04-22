
import { FiLoader } from "react-icons/fi"



const LoaderLayoutComponent = () => {
  return (
    <div className="h-full w-full bg-black/10 z-20 flex flex-col items-center justify-center fixed inset-0">
        <span className="animate-spin mx-auto text-3xl min-h-8 aspect-square"><FiLoader/></span>
    </div>
  )
}

export default LoaderLayoutComponent