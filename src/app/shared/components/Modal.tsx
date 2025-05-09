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
}

export default function ReusableModal({
  isOpen,
  onClose,
  children,
  modalTitle,
}: ReusableModalProps) {
  const { onOpenChange } = useDisclosure();
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
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
