import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GlueStackInput,
  InputField
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string | null;
  description?: boolean;
  isInvalid?: boolean;
};

export default function Input({
  errorMessage,
  description,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl w="$full" isInvalid={invalid}>
      <GlueStackInput
        isInvalid={invalid}
        h={`${description ? "$24": '$12'}`}
        $focus={{
          borderColor: invalid ? "$red600" : "$gray600"
        }}
        $invalid={{
          borderColor: "$red600"
        }}
        rounded="$md"
      >
        <InputField cursorColor="black" {...rest} />
      </GlueStackInput>
      <FormControlError>
        <FormControlErrorText color="$red600">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
