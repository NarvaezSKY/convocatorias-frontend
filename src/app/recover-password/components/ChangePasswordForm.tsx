import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider, Form, Spinner } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa";
import { IoLockClosed as LockClosedIcon } from "react-icons/io5";

import { useRecoverPass } from "../hooks/useRecoverPass";

interface FormValues {
	confirmPassword: string
	password: string
}

interface ChangePasswordFormProps {
	token: string
}

export const ChangePasswordForm = ({ token }: ChangePasswordFormProps) => {
	const { isLoading, handleResetPassword } = useRecoverPass()
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<FormValues>()
	const password = watch("password")

	const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
	const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

	return (
		<Form className="space-y-6" onReset={() => reset()} onSubmit={handleSubmit((data) => handleResetPassword(token, data.password))}>
			<div className="space-y-2 w-full">
				<Input
					isRequired
					label="Contraseña"
					autoComplete="new-password"
					labelPlacement="outside"
					placeholder="Ingresa tu contraseña"
					type={isPasswordVisible ? "text" : "password"}
					variant="bordered"
					startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
							{isPasswordVisible ? (
								<EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
							) : (
								<EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
							)}
						</button>
					}
					classNames={{
						input: "text-sm",
						inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
					}}
					{...register("password", {
						required: "La contraseña es obligatoria",
					})}
					errorMessage={errors.password?.message}
					isInvalid={!!errors.password}
				/>
			</div>

			<div className="space-y-2 w-full">
				<Input
					isRequired
					label="Confirmar contraseña"
					labelPlacement="outside"
					placeholder="Confirma tu contraseña"
					type={isConfirmPasswordVisible ? "text" : "password"}
					variant="bordered"
					startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none flex-shrink-0" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
							{isConfirmPasswordVisible ? (
								<EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
							) : (
								<EyeIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
							)}
						</button>
					}
					classNames={{
						input: "text-sm",
						inputWrapper: "border-gray-200 hover:border-gray-300 focus-within:!border-blue-500 h-14",
					}}
					{...register("confirmPassword", {
						required: "Confirma tu contraseña",
						validate: (value) => value === password || "Las contraseñas no coinciden",
					})}
					errorMessage={errors.confirmPassword?.message}
					isInvalid={!!errors.confirmPassword}
				/>
			</div>

			<div className="space-y-2 w-full">
				<Button
					className="w-full mb-2 h-14 text-success font-semibold"
					isDisabled={isLoading}
					color="success"
					variant="flat"
					type="submit"
					radius="lg"
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							<Spinner size="sm" color="white" />
							<span>Enviando correo...</span>
						</div>
					) : (
						"Recuperar contraseña"
					)}
				</Button>

				<Button
					type="reset"
					variant="flat"
					className="w-full h-14 border-gray-200 hover:border-gray-300 transition-colors"
					radius="lg"
				>
					Limpiar campos
				</Button>
			</div>

			<div className="relative">
				<Divider className="my-6" />
			</div>
		</Form>
	)
}
