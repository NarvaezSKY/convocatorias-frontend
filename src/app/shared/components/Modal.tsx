import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";

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
  // onSubmit,
  children,
  modalTitle,
}: ReusableModalProps) {
  const { onOpenChange } = useDisclosure();

  // const handleSubmit = async () => {
  //   if (onSubmit) {
  //     await onSubmit();
  //     onClose();
  //   }
  // };

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
