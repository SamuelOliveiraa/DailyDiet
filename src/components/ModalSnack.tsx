import {
  Modal,
  Text,
  ModalBackdrop,
  ModalContent,
  ModalFooter
} from "@gluestack-ui/themed";
import Button from "./Button";
import { router } from "expo-router";
import { StorageSnacks } from "../storage/snackStorage";
import { StorageHistory } from "../storage/historyStorage";
import { useToastNotification } from "../hooks/useToastNotification";

type Props = {
  id: string;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalSnack({ id, modal, setModal }: Props) {
  const { showErrorToast, showSuccessToast } = useToastNotification();

  function toggleModal() {
    setModal(!modal);
  }

  async function removeSnack() {
    try {
      await StorageSnacks.removeSnack(id);
      await StorageHistory.removedHistory(id);

      showSuccessToast("Refeição excluída com sucesso!");

      toggleModal();
      router.push("/");
    } catch (error) {
      showErrorToast("Não foi possivel Excluir o registro da refeição");
    }
  }

  return (
    <Modal
      isOpen={modal}
      closeOnOverlayClick
      onClose={() => {
        setModal(false);
      }}
      px="$6"
    >
      <ModalBackdrop />
      <ModalContent gap="$2" px="$3" py="$4" w="$full">
        <Text
          p="$5"
          fontFamily="$body"
          fontWeight="$bold"
          fontSize="$xl"
          textAlign="center"
        >
          Deseja realmente excluir o registro da refeição?
        </Text>
        <ModalFooter gap="$3">
          <Button
            title="Cancelar"
            type="secondary"
            flex={1}
            onPress={toggleModal}
          />
          <Button title="Sim, excluir" flex={1} onPress={removeSnack} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
