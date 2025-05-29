import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  modalTitle: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

export default function ReusableModal({
  isOpen,
  onClose,
  children,
  modalTitle,
  size,
}: ReusableModalProps) {
  const { onOpenChange } = useDisclosure();
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size={size ? size : "md"}
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
