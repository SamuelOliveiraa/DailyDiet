import { useToast, Toast, ToastDescription } from "@gluestack-ui/themed";

export function useToastNotification() {
  const toast = useToast();

  function showSuccessToast(message: string) {
    toast.show({
      placement: "top",
      render: () => (
        <Toast mt="$16" bg="$green200" p="$3">
          <ToastDescription color="$black" fontFamily="$heading">
            {message}
          </ToastDescription>
        </Toast>
      )
    });
  }

  function showErrorToast(message: string) {
    toast.show({
      placement: "top",
      render: () => (
        <Toast mt="$16" bg="$red300" p="$3">
          <ToastDescription color="$black" fontFamily="$heading">
            {message}
          </ToastDescription>
        </Toast>
      )
    });
  }

  return { showSuccessToast, showErrorToast };
}
