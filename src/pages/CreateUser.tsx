import React from "react";
import FormWrapper from "../components/Form/FormWrapper";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser } from "../store/userSlice";
import { FieldConfig } from "../types/FieldConfig";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  fullname: string;
  email: string;
  password: string;
  role?: string;
  rememberMe: boolean;
};

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.user.users);

  const fields: FieldConfig<FormData>[] = [
    {
      name: "fullname",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      minLength: 6,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: false,
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
      ],
    },
    {
      name: "rememberMe",
      label: "Remember Me",
      type: "checkbox",
    },
  ];

  const handleSubmit = (data: FormData) => {
    const isEmailTaken = users.some((user) => user.email === data.email);

    if (isEmailTaken) {
      alert(
        "Bu e-posta adresi zaten kayıtlı. Lütfen farklı bir e-posta girin."
      );
      return;
    }
    dispatch(addUser(data));
    navigate("/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-teal-500 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header & Avatar */}
        <div className="h-28 bg-cyan-400 flex justify-center items-end relative">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white absolute -bottom-10 flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-tr from-indigo-500 to-blue-600">
            👤
          </div>
        </div>

        {/* Form */}
        <div className="pt-14 pb-8 px-6">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
            Create New User
          </h2>
          <FormWrapper<FormData> fields={fields} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
