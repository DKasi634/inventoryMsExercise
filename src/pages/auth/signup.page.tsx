import GenericInput from "@/components/generic-input/generic-input.component";
import PasswordInput from "@/components/generic-input/password-input.component"; // Import the reusable PasswordInput
import React, { useState } from "react";
import BaseButton, { buttonType } from "@/components/buttons/base-button.component";
import { Link, useNavigate } from "react-router-dom";
import LoaderLayoutComponent from "@/components/loader-layout.component";
import { axiosConnectionInstance } from "@/api/utils";
import { ENDPOINTS } from "@/api/endpoints";



export type emailToVerifyState = {
  userEmail: string
}

const SignUpPage: React.FC = () => {

  const initialFormData = { userName: "", email: "", password: "", confirmPassword: "" }
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(false);


  // const [signupError, setSignupError] = useState<AuthError | null>(authError);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);

  // const location = useLocation();
  // const nextLocation: nextRouteLocation = location.state;



  // useEffect(() => {
  //   if (currentUser && currentUser.user && currentUser.profile) {
  //     navigate("/me")
  //   }
  // }, [currentUser])

  // useEffect(() => {
  //   if (navigateToSignin) {
  //     setFormData(initialFormData);
  //     const timer = setTimeout(() => {
  //       navigate("/login", { state: { userEmail: formData.email } as emailToVerifyState });
  //       dispatch(clearNavigateToSignIn())
  //     }, 4000);
  //     return () => clearTimeout(timer)
  //   }
  // }, [navigateToSignin, navigate, dispatch])



  const validateField = (field: keyof typeof formData, value: string) => {
    let error = "";
    switch (field) {
      case "userName":
        if (!value.trim()) {
          error = "This field is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format.";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match"; // 
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleNavigateToSignin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/login")
  }

  const handleCustomFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
      const formErrors = Object.keys(formData).reduce((acc, field) => {
        const error = validateField(
          field as keyof typeof formData,
          formData[field as keyof typeof formData]
        );
        return { ...acc, [field]: error };
      }, {} as typeof errors);

      setErrors(formErrors);

      if (Object.values(formErrors).every((err) => !err)) {

        axiosConnectionInstance
          .post(ENDPOINTS.REGISTER, {
            email: formData.email,
            user_name: formData.userName,
            password: formData.password
          }).then((_) => {
            // We replace the response by an undercore '_' as we're not using it
            // console.log("\nResponse data : ", _.data);
            navigate("/login")
          })
      }
    setAuthLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4 relative">
      <div className="w-full max-w-md p-8 space-y-3 lg:rounded-xl lg:bg-white lg:shadow-lg">
        <h2 className="text-2xl font-bold text-center">Signup</h2> {/* Sign Up */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name & Last Name Group */}
          <GenericInput
            label="User name"
            type="text"
            value={formData.userName}
            onChange={(e) => handleCustomFieldChange("userName", e.target.value)}
            error={errors.userName}
            name="userName"
            placeholder=""
          />


          {/* Email */}
          <GenericInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleCustomFieldChange("email", e.target.value)}
            error={errors.email}
            name="email"
            placeholder="john@gmail.com"
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            id="password"
            value={formData.password}
            onChange={(value) => handleCustomFieldChange("password", value)}
            error={errors.password}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm password"
            id="confirm_password"
            value={formData.confirmPassword}
            onChange={(value) => handleCustomFieldChange("confirmPassword", value)}
            error={errors.confirmPassword}
          />

          <p className="w-full text-xs !mt-8">Already have an account ? <Link to={"/login"} onMouseDown={handleNavigateToSignin} className="text-green font-bold px-2 underline-offset-2 underline">Login</Link> </p>

          {/* Submit Button */}
          <BaseButton
            type={buttonType.blue} submitType="submit" rounded={false}
            className="w-full !px-4 !py-2 !mt-4 text-sm font-medium"
          >
            Sign Up
          </BaseButton>

          {/* <GoogleSigninButton accountType={formData.accountType as UserRole} /> */}
        </form>
      </div>
      {authLoading && <LoaderLayoutComponent />}
    </div>
  );
};

export default SignUpPage;