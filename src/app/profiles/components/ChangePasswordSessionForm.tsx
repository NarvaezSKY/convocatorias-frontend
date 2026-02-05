import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider, Form, Spinner } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye as EyeIcon, FaEyeSlash as EyeSlashIcon } from "react-icons/fa";
import { IoLockClosed as LockClosedIcon } from "react-icons/io5";

import { useChangePasswordSession } from "../hooks/useChangePasswordSession";

interface FormValues {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface ChangePasswordSessionFormProps {
	onSuccess?: () => void;
}

export const ChangePasswordSessionForm = ({ onSuccess }: ChangePasswordSessionFormProps) => {
	const { isLoading, handleChangePassword } = useChangePasswordSession();
	const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<FormValues>();
	const newPassword = watch("newPassword");

	const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
	const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
	const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

	const onSubmit = async (data: FormValues) => {
		const success = await handleChangePassword(data.currentPassword, data.newPassword);
		if (success && onSuccess) {
			onSuccess();
		}
	};

	return (
		<Form
			className="space-y-6"
			onReset={() => reset()}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-2 w-full">
				<Input
					isRequired
					autoComplete="current-password"
					label="Contraseña actual"
					labelPlacement="outside"
					placeholder="Ingresa tu contraseña actual"
					type={isCurrentPasswordVisible ? "text" : "password"}
					variant="bordered"
					startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none shrink-0" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleCurrentPasswordVisibility}>
							{isCurrentPasswordVisible ? (
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
					{...register("currentPassword", {
						required: "La contraseña actual es obligatoria",
					})}
					errorMessage={errors.currentPassword?.message}
					isInvalid={!!errors.currentPassword}
				/>
			</div>

			<div className="space-y-2 w-full">
				<Input
					isRequired
					autoComplete="new-password"
					label="Nueva contraseña"
					labelPlacement="outside"
					placeholder="Ingresa tu nueva contraseña"
					type={isNewPasswordVisible ? "text" : "password"}
					variant="bordered"
					startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none shrink-0" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
							{isNewPasswordVisible ? (
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
					{...register("newPassword", {
						required: "La nueva contraseña es obligatoria",
						minLength: {
							value: 6,
							message: "La contraseña debe tener al menos 6 caracteres",
						},
					})}
					errorMessage={errors.newPassword?.message}
					isInvalid={!!errors.newPassword}
				/>
			</div>

			<div className="space-y-2 w-full">
				<Input
					isRequired
					label="Confirmar nueva contraseña"
					labelPlacement="outside"
					placeholder="Confirma tu nueva contraseña"
					type={isConfirmPasswordVisible ? "text" : "password"}
					variant="bordered"
					startContent={<LockClosedIcon className="w-5 h-5 text-gray-400 pointer-events-none shrink-0" />}
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
						required: "Confirma tu nueva contraseña",
						validate: (value) => value === newPassword || "Las contraseñas no coinciden",
					})}
					errorMessage={errors.confirmPassword?.message}
					isInvalid={!!errors.confirmPassword}
				/>
			</div>

			<div className="space-y-2 w-full">
				<Button
					className="w-full mb-2 h-14 text-success font-semibold"
					color="success"
					isDisabled={isLoading}
					radius="lg"
					type="submit"
					variant="flat"
				>
					{isLoading ? (
						<div className="flex items-center gap-2">
							<Spinner color="white" size="sm" />
							<span>Cambiando contraseña...</span>
						</div>
					) : (
						"Cambiar contraseña"
					)}
				</Button>

				<Button
					className="w-full h-14 border-gray-200 hover:border-gray-300 transition-colors"
					radius="lg"
					type="reset"
					variant="flat"
				>
					Limpiar campos
				</Button>
			</div>

			<div className="relative">
				<Divider className="my-6" />
			</div>
		</Form>
	);
};
