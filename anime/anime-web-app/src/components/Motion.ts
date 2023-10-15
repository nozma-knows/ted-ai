import { Button, FormControl, Grid, GridItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionGrid = motion(Grid);
export const MotionGridItem = motion(GridItem);
export const MotionFormControl = motion(FormControl);
export const MotionButton = motion(Button);

export const gridAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};

export const itemAnimation = {
  hidden: { opacity: 0, x: 0, y: 20 },
  show: { opacity: 1, x: 0, y: 0 },
};
