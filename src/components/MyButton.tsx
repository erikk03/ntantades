// MyButton.tsx
import {extendVariants, Button} from "@nextui-org/react";

export const MyButton = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    size: {
      xs: "flex px-2 min-w-12 h-34 text-xs rounded-md",
    },
  },
});